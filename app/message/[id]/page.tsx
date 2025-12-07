'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Unlock, CheckCircle, XCircle, Share2 } from 'lucide-react'
import { getMessageById, verifyDecryption } from '@/lib/actions'
import { type Message } from '@/lib/supabase'
import { CIPHER_NAMES, CIPHER_DESCRIPTIONS, EPOCH_NAMES } from '@/lib/ciphers'

export default function MessagePage({ params }: { params: { id: string } }) {
  const [message, setMessage] = useState<Message | null>(null)
  const [loading, setLoading] = useState(true)
  const [guess, setGuess] = useState('')
  const [verifying, setVerifying] = useState(false)
  const [result, setResult] = useState<{
    correct: boolean
    originalText?: string
  } | null>(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    loadMessage()
  }, [params.id])

  const loadMessage = async () => {
    setLoading(true)
    const msg = await getMessageById(params.id)
    setMessage(msg)
    setLoading(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!message || !guess.trim()) return

    setVerifying(true)
    const response = await verifyDecryption(message.id, guess)
    setVerifying(false)

    if (response.success) {
      setResult({
        correct: response.correct,
        originalText: response.originalText,
      })
    }
  }

  const shareMessage = () => {
    const url = window.location.href
    navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (loading) {
    return (
      <div className="min-h-screen gradient-bg flex flex-col items-center justify-center p-4">
        <div className="loading text-accent-cyan text-xl">
          Загрузка сообщения...
        </div>
      </div>
    )
  }

  if (!message) {
    return (
      <div className="min-h-screen gradient-bg flex flex-col items-center justify-center p-4">
        <div className="crypto-card p-8 max-w-md text-center">
          <h2 className="text-2xl font-bold mb-4">Сообщение не найдено</h2>
          <p className="text-muted-foreground mb-6">
            Возможно, оно было удалено или ссылка неверна
          </p>
          <Link href="/wall">
            <button className="btn-primary">
              К стене шифров
            </button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen gradient-bg flex flex-col p-4">
      <div className="max-w-2xl w-full mx-auto py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/wall" className="inline-flex items-center gap-2 text-accent-cyan hover:text-accent-blue transition-colors mb-4">
            <ArrowLeft className="w-4 h-4" />
            К стене шифров
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">Зашифрованное послание</h1>
              <p className="text-muted-foreground">
                Попытайся расшифровать это сообщение
              </p>
            </div>
            <button
              onClick={shareMessage}
              className="btn-secondary flex items-center gap-2"
            >
              <Share2 className="w-4 h-4" />
              {copied ? 'Скопировано' : 'Поделиться'}
            </button>
          </div>
        </div>

        {/* Message Card */}
        <div className="crypto-card p-8 mb-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className={`epoch-badge epoch-${message.epoch} mb-2`}>
                {message.epoch}
              </div>
              <h2 className="text-xl font-bold">{EPOCH_NAMES[message.epoch]}</h2>
              <p className="text-sm text-muted-foreground">
                Автор: {message.author_alias || 'Анонимус'}
              </p>
              <p className="text-xs text-muted-foreground">
                {new Date(message.created_at).toLocaleString('ru-RU', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
            </div>
            <div className="text-right">
              <div className="text-sm text-muted-foreground mb-1">Сложность</div>
              <div className="flex gap-1">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-2 h-6 rounded ${
                      i < (message.difficulty || 1)
                        ? 'bg-accent-green'
                        : 'bg-card-border'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="mb-4">
            <label className="text-sm font-medium text-muted-foreground block mb-2">
              Зашифрованное послание:
            </label>
            <div className="cipher-text">
              {message.ciphertext}
            </div>
          </div>

          <div className="bg-accent-cyan/5 border border-accent-cyan/20 rounded-lg p-4">
            <h3 className="text-sm font-bold mb-2">{CIPHER_NAMES[message.cipher_type]}</h3>
            <p className="text-sm text-muted-foreground">
              {CIPHER_DESCRIPTIONS[message.cipher_type]}
            </p>
          </div>
        </div>

        {/* Result Display */}
        <AnimatePresence mode="wait">
          {result && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-6"
            >
              {result.correct ? (
                <div className="crypto-card p-6 border-2 border-accent-green">
                  <div className="flex items-center gap-3 mb-4">
                    <CheckCircle className="w-8 h-8 text-accent-green" />
                    <div>
                      <h3 className="text-xl font-bold text-accent-green">Правильно!</h3>
                      <p className="text-sm text-muted-foreground">
                        Ты успешно расшифровал послание
                      </p>
                    </div>
                  </div>
                  {result.originalText && (
                    <div>
                      <label className="text-sm font-medium text-muted-foreground block mb-2">
                        Оригинальный текст:
                      </label>
                      <div className="bg-accent-green/10 border border-accent-green/30 rounded-lg p-4">
                        {result.originalText}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="crypto-card p-6 border-2 border-red-500">
                  <div className="flex items-center gap-3">
                    <XCircle className="w-8 h-8 text-red-500" />
                    <div>
                      <h3 className="text-xl font-bold text-red-500">Неправильно</h3>
                      <p className="text-sm text-muted-foreground">
                        Попробуй еще раз!
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Guess Form */}
        {!result?.correct && (
          <form onSubmit={handleSubmit} className="crypto-card p-8">
            <div className="space-y-4">
              <div>
                <label htmlFor="guess" className="block text-sm font-medium mb-2">
                  Твоя расшифровка
                </label>
                <textarea
                  id="guess"
                  value={guess}
                  onChange={(e) => setGuess(e.target.value)}
                  placeholder="Введи расшифрованный текст..."
                  className="w-full bg-card-bg border border-card-border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent-cyan transition-all min-h-32 resize-none"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={verifying || !guess.trim()}
                className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {verifying ? (
                  <div className="loading">Проверка...</div>
                ) : (
                  <>
                    <Unlock className="w-5 h-5" />
                    Проверить
                  </>
                )}
              </button>
            </div>
          </form>
        )}

        {/* Success Actions */}
        {result?.correct && (
          <div className="flex gap-4 mt-6">
            <Link href="/decrypt" className="flex-1">
              <button className="btn-primary w-full flex items-center justify-center gap-2">
                <Unlock className="w-5 h-5" />
                Взломать еще одно
              </button>
            </Link>
            <Link href="/wall" className="flex-1">
              <button className="btn-secondary w-full">
                К стене шифров
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
