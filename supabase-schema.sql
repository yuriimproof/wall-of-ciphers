-- Crypto Wall Database Schema
-- Run this SQL in your Supabase project SQL Editor

-- Create messages table
CREATE TABLE IF NOT EXISTS messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  author_alias TEXT,
  epoch TEXT NOT NULL CHECK (epoch IN ('proto', 'industrial', 'home', 'digital')),
  cipher_type TEXT NOT NULL CHECK (cipher_type IN ('caesar', 'substitution', 'digital_demo')),
  ciphertext TEXT NOT NULL,
  plaintext TEXT NOT NULL,
  difficulty INTEGER CHECK (difficulty >= 1 AND difficulty <= 3)
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS messages_created_at_idx ON messages (created_at DESC);
CREATE INDEX IF NOT EXISTS messages_epoch_idx ON messages (epoch);

-- Enable Row Level Security (RLS)
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Create policies for public access
-- Anyone can read messages
CREATE POLICY "Messages are viewable by everyone"
  ON messages FOR SELECT
  USING (true);

-- Anyone can insert messages (for MVP - in production you might want to add rate limiting)
CREATE POLICY "Anyone can insert messages"
  ON messages FOR INSERT
  WITH CHECK (true);

-- Optional: Add some example messages
INSERT INTO messages (author_alias, epoch, cipher_type, ciphertext, plaintext, difficulty)
VALUES
  ('Цезарь', 'proto', 'caesar', 'Гжлжч п кнрсд', 'Привет в мире', 2),
  ('Алан Тьюринг', 'digital', 'digital_demo', 'VGVzdCBtZXNzYWdl', 'Test message', 1),
  ('Анонимус', 'industrial', 'substitution', 'Йугбжм', 'Привет', 1);

-- Comments for documentation
COMMENT ON TABLE messages IS 'Stores encrypted messages from users';
COMMENT ON COLUMN messages.epoch IS 'Historical epoch of cryptography: proto, industrial, home, or digital';
COMMENT ON COLUMN messages.cipher_type IS 'Type of cipher used: caesar, substitution, or digital_demo';
COMMENT ON COLUMN messages.difficulty IS 'Difficulty rating from 1 to 3';
