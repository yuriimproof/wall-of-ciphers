// Caesar cipher implementation with Russian alphabet support

const RUSSIAN_ALPHABET = 'абвгдежзийклмнопрстуфхцчшщъыьэюя'
const ENGLISH_ALPHABET = 'abcdefghijklmnopqrstuvwxyz'

export function encryptCaesar(text: string, shift: number = 3): string {
  return text
    .split('')
    .map(char => {
      const lowerChar = char.toLowerCase()

      // Check Russian alphabet
      if (RUSSIAN_ALPHABET.includes(lowerChar)) {
        const index = RUSSIAN_ALPHABET.indexOf(lowerChar)
        const newIndex = (index + shift) % RUSSIAN_ALPHABET.length
        const newChar = RUSSIAN_ALPHABET[newIndex]
        return char === char.toUpperCase() ? newChar.toUpperCase() : newChar
      }

      // Check English alphabet
      if (ENGLISH_ALPHABET.includes(lowerChar)) {
        const index = ENGLISH_ALPHABET.indexOf(lowerChar)
        const newIndex = (index + shift) % ENGLISH_ALPHABET.length
        const newChar = ENGLISH_ALPHABET[newIndex]
        return char === char.toUpperCase() ? newChar.toUpperCase() : newChar
      }

      // Return unchanged if not a letter
      return char
    })
    .join('')
}

export function decryptCaesar(text: string, shift: number = 3): string {
  return encryptCaesar(text, -shift)
}

export function getCaesarShift(): number {
  // Fixed shift for proto epoch
  return 3
}
