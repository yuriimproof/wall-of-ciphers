'use server'

import { supabase, type Message } from './supabase'
import { encrypt, verify, EPOCH_TO_CIPHER, type Epoch } from './ciphers'

export interface CreateMessageInput {
  authorAlias?: string
  plaintext: string
  epoch: Epoch
}

export interface CreateMessageResult {
  success: boolean
  messageId?: string
  ciphertext?: string
  error?: string
}

export async function createMessage(
  input: CreateMessageInput
): Promise<CreateMessageResult> {
  try {
    // Validate input
    if (!input.plaintext || input.plaintext.trim().length === 0) {
      return { success: false, error: 'Текст сообщения не может быть пустым' }
    }

    if (input.plaintext.length > 280) {
      return { success: false, error: 'Текст сообщения слишком длинный (макс. 280 символов)' }
    }

    // Get cipher type for epoch
    const cipherType = EPOCH_TO_CIPHER[input.epoch]

    // Encrypt the message
    const encrypted = encrypt(input.plaintext, cipherType)

    // Insert into database
    const { data, error } = await supabase
      .from('messages')
      .insert([
        {
          author_alias: input.authorAlias || 'Анонимус',
          epoch: input.epoch,
          cipher_type: cipherType,
          ciphertext: encrypted.ciphertext,
          plaintext: encrypted.plaintext,
          difficulty: calculateDifficulty(input.plaintext, cipherType),
        },
      ])
      .select()
      .single()

    if (error) {
      console.error('Supabase error:', error)
      return { success: false, error: 'Ошибка сохранения в базу данных' }
    }

    return {
      success: true,
      messageId: data.id,
      ciphertext: encrypted.ciphertext,
    }
  } catch (error) {
    console.error('Create message error:', error)
    return { success: false, error: 'Неизвестная ошибка' }
  }
}

export async function getRandomMessage(): Promise<Message | null> {
  try {
    // Get count of all messages
    const { count, error: countError } = await supabase
      .from('messages')
      .select('*', { count: 'exact', head: true })

    if (countError || !count || count === 0) {
      return null
    }

    // Get random offset
    const randomOffset = Math.floor(Math.random() * count)

    // Fetch one message at random offset
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .range(randomOffset, randomOffset)
      .single()

    if (error || !data) {
      return null
    }

    return data as Message
  } catch (error) {
    console.error('Get random message error:', error)
    return null
  }
}

export async function getMessageById(id: string): Promise<Message | null> {
  try {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .eq('id', id)
      .single()

    if (error || !data) {
      return null
    }

    return data as Message
  } catch (error) {
    console.error('Get message by ID error:', error)
    return null
  }
}

export async function getLatestMessages(limit: number = 50): Promise<Message[]> {
  try {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit)

    if (error || !data) {
      return []
    }

    return data as Message[]
  } catch (error) {
    console.error('Get latest messages error:', error)
    return []
  }
}

export interface VerifyResult {
  success: boolean
  correct: boolean
  originalText?: string
}

export async function verifyDecryption(
  messageId: string,
  guess: string
): Promise<VerifyResult> {
  try {
    // Get the message
    const message = await getMessageById(messageId)

    if (!message) {
      return { success: false, correct: false }
    }

    // Verify the guess
    const isCorrect = verify(guess, message.plaintext)

    return {
      success: true,
      correct: isCorrect,
      originalText: isCorrect ? message.plaintext : undefined,
    }
  } catch (error) {
    console.error('Verify decryption error:', error)
    return { success: false, correct: false }
  }
}

// Helper function to calculate difficulty
function calculateDifficulty(text: string, cipherType: string): number {
  const length = text.length

  if (cipherType === 'caesar') {
    return length < 20 ? 1 : length < 50 ? 2 : 3
  }

  if (cipherType === 'substitution') {
    return length < 15 ? 2 : 3
  }

  if (cipherType === 'digital_demo') {
    return 1
  }

  return 2
}
