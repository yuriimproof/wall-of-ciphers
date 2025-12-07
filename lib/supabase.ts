import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Message = {
  id: string
  created_at: string
  author_alias?: string
  epoch: 'digital' | 'industrial' | 'home' | 'proto'
  cipher_type: 'caesar' | 'substitution' | 'digital_demo'
  ciphertext: string
  plaintext: string
  difficulty?: number
}
