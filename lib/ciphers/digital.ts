// Digital demo cipher - simple base64 encoding (not cryptographically secure)

export function encryptDigitalDemo(text: string): string {
  // Encode to base64
  return Buffer.from(text, 'utf-8').toString('base64')
}

export function decryptDigitalDemo(text: string): string {
  try {
    // Decode from base64
    return Buffer.from(text, 'base64').toString('utf-8')
  } catch (error) {
    return ''
  }
}

export const DIGITAL_DEMO_HINT = `
Это простое кодирование Base64 - способ представления текста в виде букв и цифр.
Base64 НЕ является шифрованием - это просто другой способ записи данных.
Попробуйте вставить зашифрованный текст в декодер Base64 онлайн!
`.trim()
