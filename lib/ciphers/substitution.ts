// Substitution cipher implementation

const RUSSIAN_ALPHABET = 'абвгдежзийклмнопрстуфхцчшщъыьэюя'

export function generateSubstitutionMap(seed: string = 'default'): Record<string, string> {
  // Create a simple substitution map based on seed
  const alphabet = RUSSIAN_ALPHABET.split('')
  const shuffled = [...alphabet]

  // Simple shuffle based on seed
  let hash = 0
  for (let i = 0; i < seed.length; i++) {
    hash = seed.charCodeAt(i) + ((hash << 5) - hash)
  }

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.abs(hash * (i + 1)) % (i + 1)
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    hash = ((hash << 5) - hash) + i
  }

  const map: Record<string, string> = {}
  alphabet.forEach((char, i) => {
    map[char] = shuffled[i]
    map[char.toUpperCase()] = shuffled[i].toUpperCase()
  })

  return map
}

export function encryptSubstitution(text: string, map: Record<string, string>): string {
  return text
    .split('')
    .map(char => map[char] || char)
    .join('')
}

export function decryptSubstitution(text: string, map: Record<string, string>): string {
  // Create reverse map
  const reverseMap: Record<string, string> = {}
  Object.entries(map).forEach(([key, value]) => {
    reverseMap[value] = key
  })

  return text
    .split('')
    .map(char => reverseMap[char] || char)
    .join('')
}
