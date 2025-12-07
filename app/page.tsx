'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Lock, Unlock, Grid3x3 } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen gradient-bg flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl w-full"
      >
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-accent-green via-accent-cyan to-accent-blue bg-clip-text text-transparent"
          >
            Стена шифров
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            Музейный веб-квест по криптографии. Создавай зашифрованные послания,
            разгадывай чужие секреты и погружайся в историю шифров и кодов.
          </motion.p>
        </div>

        {/* Mode Selection Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Encrypt Mode */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Link href="/encrypt">
              <div className="crypto-card p-8 text-center cursor-pointer h-full flex flex-col justify-between group">
                <div>
                  <div className="w-16 h-16 rounded-full bg-accent-green/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-accent-green/20 transition-colors">
                    <Lock className="w-8 h-8 text-accent-green" />
                  </div>
                  <h2 className="text-2xl font-bold mb-3">Создать послание</h2>
                  <p className="text-muted-foreground">
                    Зашифруй свое секретное сообщение и оставь его другим на стене
                  </p>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Decrypt Mode */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <Link href="/decrypt">
              <div className="crypto-card p-8 text-center cursor-pointer h-full flex flex-col justify-between group">
                <div>
                  <div className="w-16 h-16 rounded-full bg-accent-cyan/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-accent-cyan/20 transition-colors">
                    <Unlock className="w-8 h-8 text-accent-cyan" />
                  </div>
                  <h2 className="text-2xl font-bold mb-3">Взломать послание</h2>
                  <p className="text-muted-foreground">
                    Попытайся расшифровать случайное сообщение со стены
                  </p>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Wall Mode */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <Link href="/wall">
              <div className="crypto-card p-8 text-center cursor-pointer h-full flex flex-col justify-between group">
                <div>
                  <div className="w-16 h-16 rounded-full bg-accent-blue/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-accent-blue/20 transition-colors">
                    <Grid3x3 className="w-8 h-8 text-accent-blue" />
                  </div>
                  <h2 className="text-2xl font-bold mb-3">Стена шифров</h2>
                  <p className="text-muted-foreground">
                    Просмотри все зашифрованные послания и выбери любое для взлома
                  </p>
                </div>
              </div>
            </Link>
          </motion.div>
        </div>

        {/* Info Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="text-center text-sm text-muted-foreground"
        >
          <p>
            Проект создан для Музея криптографии
          </p>
        </motion.div>
      </motion.div>
    </div>
  )
}
