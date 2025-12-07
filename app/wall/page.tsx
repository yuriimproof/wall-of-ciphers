'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, Lock } from 'lucide-react'
import { getLatestMessages } from '@/lib/actions'
import { type Message } from '@/lib/supabase'
import { EPOCH_NAMES } from '@/lib/ciphers'

export default function WallPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadMessages()
  }, [])

  const loadMessages = async () => {
    setLoading(true)
    const msgs = await getLatestMessages(50)
    setMessages(msgs)
    setLoading(false)
  }

  if (loading) {
    return (
      <div className="min-h-screen gradient-bg flex flex-col items-center justify-center p-4">
        <div className="loading text-accent-cyan text-xl">
          Загрузка стены шифров...
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen gradient-bg p-4">
      <div className="max-w-6xl w-full mx-auto py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-accent-cyan hover:text-accent-blue transition-colors mb-4">
            <ArrowLeft className="w-4 h-4" />
            Назад
          </Link>
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-2">Стена шифров</h1>
            <p className="text-muted-foreground">
              {messages.length > 0
                ? `${messages.length} зашифрованных посланий ждут расшифровки`
                : 'Пока нет зашифрованных посланий'}
            </p>
          </div>
        </div>

        {/* No Messages State */}
        {messages.length === 0 && (
          <div className="crypto-card p-12 text-center max-w-md mx-auto">
            <Lock className="w-16 h-16 text-muted mx-auto mb-4 opacity-50" />
            <h2 className="text-2xl font-bold mb-4">Стена пуста</h2>
            <p className="text-muted-foreground mb-6">
              Будь первым, кто создаст зашифрованное послание!
            </p>
            <Link href="/encrypt">
              <button className="btn-primary">
                Создать послание
              </button>
            </Link>
          </div>
        )}

        {/* Messages Grid */}
        {messages.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {messages.map((message, index) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Link href={`/message/${message.id}`}>
                  <div className="crypto-card p-6 cursor-pointer h-full flex flex-col group">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className={`epoch-badge epoch-${message.epoch}`}>
                        {message.epoch}
                      </div>
                      <div className="flex gap-1">
                        {[...Array(3)].map((_, i) => (
                          <div
                            key={i}
                            className={`w-1.5 h-5 rounded ${
                              i < (message.difficulty || 1)
                                ? 'bg-accent-green'
                                : 'bg-card-border'
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 mb-4">
                      <h3 className="text-sm font-medium text-muted-foreground mb-2">
                        {EPOCH_NAMES[message.epoch]}
                      </h3>
                      <div className="cipher-text text-xs line-clamp-4 group-hover:text-accent-cyan transition-colors">
                        {message.ciphertext}
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between text-xs text-muted-foreground pt-4 border-t border-card-border">
                      <span>{message.author_alias || 'Анонимус'}</span>
                      <span>
                        {new Date(message.created_at).toLocaleDateString('ru-RU', {
                          day: 'numeric',
                          month: 'short',
                        })}
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}

        {/* CTA */}
        {messages.length > 0 && (
          <div className="text-center mt-12">
            <Link href="/encrypt">
              <button className="btn-primary">
                Создать свое послание
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
