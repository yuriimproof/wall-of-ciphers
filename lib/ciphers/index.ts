// Cipher utilities index

import { encryptCaesar, decryptCaesar, getCaesarShift } from './caesar'
import {
  encryptSubstitution,
  decryptSubstitution,
  generateSubstitutionMap
} from './substitution'
import {
  encryptDigitalDemo,
  decryptDigitalDemo,
  DIGITAL_DEMO_HINT
} from './digital'

export type CipherType = 'caesar' | 'substitution' | 'digital_demo'
export type Epoch = 'proto' | 'industrial' | 'home' | 'digital'

// Map epochs to cipher types
export const EPOCH_TO_CIPHER: Record<Epoch, CipherType> = {
  proto: 'caesar',
  industrial: 'substitution',
  home: 'substitution',
  digital: 'digital_demo',
}

export const EPOCH_NAMES: Record<Epoch, string> = {
  proto: 'Протокриптография',
  industrial: 'Индустриальная эра',
  home: 'Домашняя криптография',
  digital: 'Цифровая эра',
}

export const CIPHER_NAMES: Record<CipherType, string> = {
  caesar: 'Шифр Цезаря',
  substitution: 'Подстановочный шифр',
  digital_demo: 'Цифровое кодирование (Base64)',
}

export const CIPHER_DESCRIPTIONS: Record<CipherType, string> = {
  caesar: 'Каждая буква сдвигается на фиксированное число позиций в алфавите. Например, А → Г при сдвиге 3.',
  substitution: 'Каждая буква заменяется на другую букву по определенному правилу.',
  digital_demo: 'Современное кодирование текста в формат Base64. Это НЕ шифрование, а способ представления данных.',
}

export interface EncryptionResult {
  ciphertext: string
  plaintext: string
  cipher_type: CipherType
  metadata?: any
}

export function encrypt(text: string, cipherType: CipherType): EncryptionResult {
  let ciphertext: string
  let metadata: any = {}

  switch (cipherType) {
    case 'caesar':
      const shift = getCaesarShift()
      ciphertext = encryptCaesar(text, shift)
      metadata.shift = shift
      break

    case 'substitution':
      const map = generateSubstitutionMap(text)
      ciphertext = encryptSubstitution(text, map)
      // Store map for verification (in production, would be stored server-side)
      metadata.map = map
      break

    case 'digital_demo':
      ciphertext = encryptDigitalDemo(text)
      break

    default:
      throw new Error(`Unknown cipher type: ${cipherType}`)
  }

  return {
    ciphertext,
    plaintext: text,
    cipher_type: cipherType,
    metadata,
  }
}

export function verify(guess: string, plaintext: string): boolean {
  // Simple case-insensitive comparison
  return guess.toLowerCase().trim() === plaintext.toLowerCase().trim()
}

export {
  encryptCaesar,
  decryptCaesar,
  getCaesarShift,
  encryptSubstitution,
  decryptSubstitution,
  generateSubstitutionMap,
  encryptDigitalDemo,
  decryptDigitalDemo,
  DIGITAL_DEMO_HINT,
}
