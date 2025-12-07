'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, Lock, Copy, Check } from 'lucide-react'
import { createMessage } from '@/lib/actions'
import { EPOCH_NAMES, type Epoch } from '@/lib/ciphers'

export default function EncryptPage() {
  const [authorAlias, setAuthorAlias] = useState('')
  const [plaintext, setPlaintext] = useState('')
  const [epoch, setEpoch] = useState<Epoch>('proto')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<{
    messageId: string
    ciphertext: string
  } | null>(null)
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const response = await createMessage({
      authorAlias: authorAlias || undefined,
      plaintext,
      epoch,
    })

    setLoading(false)

    if (response.success && response.messageId && response.ciphertext) {
      setResult({
        messageId: response.messageId,
        ciphertext: response.ciphertext,
      })
    } else {
      setError(response.error || 'Неизвестная ошибка')
    }
  }

  const copyToClipboard = () => {
    if (result) {
      const url = `${window.location.origin}/message/${result.messageId}`
      navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  if (result) {
    return (
      <div className="min-h-screen gradient-bg flex flex-col items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl w-full"
        >
          <div className="crypto-card p-8">
            <div className="text-center mb-6">
              <div className="w-16 h-16 rounded-full bg-accent-green/20 flex items-center justify-center mx-auto mb-4 glow-green">
                <Check className="w-8 h-8 text-accent-green" />
              </div>
              <h1 className="text-3xl font-bold mb-2">Послание зашифровано!</h1>
              <p className="text-muted-foreground">
                Теперь другие могут попытаться его расшифровать
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground block mb-2">
                  Ваш зашифрованный текст:
                </label>
                <div className="cipher-text">
                  {result.ciphertext}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground block mb-2">
                  Ссылка на послание:
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    readOnly
                    value={`${window.location.origin}/message/${result.messageId}`}
                    className="flex-1 bg-card-bg border border-card-border rounded-lg px-4 py-2 text-sm"
                  />
                  <button
                    onClick={copyToClipboard}
                    className="btn-secondary flex items-center gap-2"
                  >
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    {copied ? 'Скопировано' : 'Копировать'}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex gap-4 mt-8">
              <Link href="/wall" className="flex-1">
                <button className="btn-primary w-full">
                  Посмотреть на стене
                </button>
              </Link>
              <Link href="/" className="flex-1">
                <button className="btn-secondary w-full">
                  На главную
                </button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen gradient-bg flex flex-col p-4">
      <div className="max-w-2xl w-full mx-auto py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-accent-cyan hover:text-accent-blue transition-colors mb-4">
            <ArrowLeft className="w-4 h-4" />
            Назад
          </Link>
          <h1 className="text-4xl font-bold mb-2">Создать зашифрованное послание</h1>
          <p className="text-muted-foreground">
            Выбери эпоху и создай свое секретное сообщение
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="crypto-card p-8">
          <div className="space-y-6">
            {/* Author Alias */}
            <div>
              <label htmlFor="alias" className="block text-sm font-medium mb-2">
                Псевдоним (необязательно)
              </label>
              <input
                id="alias"
                type="text"
                value={authorAlias}
                onChange={(e) => setAuthorAlias(e.target.value)}
                placeholder="Анонимус"
                className="w-full bg-card-bg border border-card-border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent-cyan transition-all"
                maxLength={50}
              />
            </div>

            {/* Epoch Selection */}
            <div>
              <label className="block text-sm font-medium mb-3">
                Выбери эпоху криптографии
              </label>
              <div className="grid grid-cols-2 gap-3">
                {(Object.keys(EPOCH_NAMES) as Epoch[]).map((e) => (
                  <button
                    key={e}
                    type="button"
                    onClick={() => setEpoch(e)}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      epoch === e
                        ? 'border-accent-cyan bg-accent-cyan/10'
                        : 'border-card-border hover:border-accent-cyan/50'
                    }`}
                  >
                    <div className={`epoch-badge epoch-${e} mb-2`}>
                      {e}
                    </div>
                    <div className="text-sm font-medium">{EPOCH_NAMES[e]}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Message Text */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-2">
                Твое секретное сообщение
              </label>
              <textarea
                id="message"
                value={plaintext}
                onChange={(e) => setPlaintext(e.target.value)}
                placeholder="Введи текст для шифрования..."
                className="w-full bg-card-bg border border-card-border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent-cyan transition-all min-h-32 resize-none"
                maxLength={280}
                required
              />
              <div className="text-sm text-muted-foreground mt-2">
                {plaintext.length}/280 символов
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 text-red-400">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || !plaintext.trim()}
              className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <div className="loading">Шифрование...</div>
                </>
              ) : (
                <>
                  <Lock className="w-5 h-5" />
                  Зашифровать послание
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
