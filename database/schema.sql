-- Enable pgvector extension
CREATE EXTENSION IF NOT EXISTS vector;

-- Knowledge base table (stores all your business knowledge)
CREATE TABLE knowledge_base (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  category VARCHAR(100) NOT NULL, -- 'pricing', 'jurisdiction', 'citizenship', 'faq'
  subcategory VARCHAR(100),        -- 'UAE', 'USA', 'KSA', 'Europe'
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  embedding vector(1536),          -- For semantic search
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Client conversations table
CREATE TABLE conversations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id VARCHAR(255) NOT NULL UNIQUE,
  client_name VARCHAR(255),
  client_email VARCHAR(255),
  nationality VARCHAR(100),
  business_type VARCHAR(255),
  budget_range VARCHAR(100),
  messages JSONB DEFAULT '[]',    -- Full conversation history
  client_profile JSONB DEFAULT '{}', -- Extracted profile data
  recommended_destination VARCHAR(100),
  lead_saved BOOLEAN DEFAULT FALSE,
  status VARCHAR(50) DEFAULT 'active', -- active, completed, converted
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Leads table
CREATE TABLE leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  conversation_id UUID REFERENCES conversations(id),
  name VARCHAR(255),
  email VARCHAR(255),
  phone VARCHAR(100),
  nationality VARCHAR(100),
  business_type VARCHAR(255),
  budget VARCHAR(100),
  interested_destination VARCHAR(255),
  notes TEXT,
  status VARCHAR(50) DEFAULT 'new', -- new, contacted, qualified, converted
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Pricing table (easily updatable)
CREATE TABLE pricing (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  destination VARCHAR(100) NOT NULL,  -- 'UAE_FREEZONE', 'UAE_MAINLAND', 'USA_LLC', etc.
  package_name VARCHAR(255) NOT NULL,
  description TEXT,
  base_price DECIMAL(10,2),
  currency VARCHAR(10) DEFAULT 'USD',
  included_services JSONB DEFAULT '[]',
  processing_days INTEGER,
  is_active BOOLEAN DEFAULT TRUE,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Admin users table
CREATE TABLE admin_users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'admin',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Learning logs (for improving AI)
CREATE TABLE learning_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  conversation_id UUID REFERENCES conversations(id),
  question TEXT NOT NULL,
  ai_answer TEXT NOT NULL,
  human_rating INTEGER, -- 1-5 rating by admin
  corrected_answer TEXT, -- If admin corrects the AI answer
  added_to_knowledge BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes
CREATE INDEX ON knowledge_base USING ivfflat (embedding vector_cosine_ops) WITH (lists = 100);
CREATE INDEX ON conversations (session_id);
CREATE INDEX ON conversations (status);
CREATE INDEX ON leads (status);
CREATE INDEX ON leads (email);
