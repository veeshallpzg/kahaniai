-- Create stories table for storing generated stories
CREATE TABLE IF NOT EXISTS stories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL,
  genre TEXT NOT NULL,
  genre_hindi TEXT NOT NULL,
  duration INTEGER NOT NULL,
  script_content TEXT NOT NULL,
  word_count INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create index for faster user queries
CREATE INDEX IF NOT EXISTS idx_stories_user_id ON stories(user_id);
CREATE INDEX IF NOT EXISTS idx_stories_created_at ON stories(created_at DESC);

-- Disable Row Level Security for development (enable in production)
ALTER TABLE stories DISABLE ROW LEVEL SECURITY;
