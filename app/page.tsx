'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Lock, Unlock, Grid3x3 } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen gradient-bg flex flex-col items-center justify-center p-6 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl w-full"
      >
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold mb-6 md:mb-8 bg-gradient-to-r from-accent-green via-accent-cyan to-accent-blue bg-clip-text text-transparent"
          >
            Стена шифров
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
          >
            Музейный веб-квест по криптографии. Создавай зашифрованные послания,
            разгадывай чужие секреты и погружайся в историю шифров и кодов.
          </motion.p>
        </div>

        {/* Mode Selection Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 mb-12 md:mb-16">
          {/* Encrypt Mode */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Link href="/encrypt">
              <div className="crypto-card p-10 md:p-12 text-center cursor-pointer h-full flex flex-col justify-between group">
                <div>
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-accent-green/10 flex items-center justify-center mx-auto mb-8 group-hover:bg-accent-green/20 transition-colors">
                    <Lock className="w-10 h-10 md:w-12 md:h-12 text-accent-green" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold mb-5">Создать послание</h2>
                  <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
                    Зашифруй свое секретное сообщение и оставь его на стене для других
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
              <div className="crypto-card p-10 md:p-12 text-center cursor-pointer h-full flex flex-col justify-between group">
                <div>
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-accent-cyan/10 flex items-center justify-center mx-auto mb-8 group-hover:bg-accent-cyan/20 transition-colors">
                    <Unlock className="w-10 h-10 md:w-12 md:h-12 text-accent-cyan" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold mb-5">Взломать послание</h2>
                  <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
                    Попытайся расшифровать случайное зашифрованное сообщение со стены
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
              <div className="crypto-card p-10 md:p-12 text-center cursor-pointer h-full flex flex-col justify-between group">
                <div>
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-accent-blue/10 flex items-center justify-center mx-auto mb-8 group-hover:bg-accent-blue/20 transition-colors">
                    <Grid3x3 className="w-10 h-10 md:w-12 md:h-12 text-accent-blue" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold mb-5">Стена шифров</h2>
                  <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
                    Просмотри все зашифрованные послания на стене и выбери для взлома
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
          className="text-center text-base md:text-lg text-muted-foreground mt-4"
        >
          <p>
            Проект создан для Музея криптографии
          </p>
        </motion.div>
      </motion.div>
    </div>
  )
}
