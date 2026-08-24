-- Criação da tabela de Usuários (Jogadores)
CREATE TABLE IF NOT EXISTS public.users (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  username text NOT NULL UNIQUE,
  password_hash text NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Criação da tabela de Personagens (Characters)
CREATE TABLE IF NOT EXISTS public.characters (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES public.users(id) ON DELETE CASCADE,
  room_id integer REFERENCES public.rooms(id) ON DELETE SET NULL, -- Assuming rooms.id is int, as per previous analysis
  name text NOT NULL,
  class text,
  race text,
  level integer DEFAULT 1,
  hp integer DEFAULT 0,
  max_hp integer DEFAULT 0,
  attributes jsonb DEFAULT '{}'::jsonb,
  actions jsonb DEFAULT '[]'::jsonb,
  abilities jsonb DEFAULT '[]'::jsonb,
  resources jsonb DEFAULT '{}'::jsonb,
  lore text,
  inventory jsonb DEFAULT '[]'::jsonb,
  token_image_url text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Criação da tabela de Entidades (NPCs/Inimigos do Mestre)
CREATE TABLE IF NOT EXISTS public.entities (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  folder text DEFAULT 'Geral',
  hp integer DEFAULT 0,
  max_hp integer DEFAULT 0,
  attributes jsonb DEFAULT '{}'::jsonb,
  actions jsonb DEFAULT '[]'::jsonb,
  abilities jsonb DEFAULT '[]'::jsonb,
  resources jsonb DEFAULT '{}'::jsonb,
  token_image_url text,
  notes text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Habilitar RLS (Row Level Security) - Desabilitado para o MVP
ALTER TABLE public.users DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.characters DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.entities DISABLE ROW LEVEL SECURITY;
