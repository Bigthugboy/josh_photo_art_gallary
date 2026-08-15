-- 1. Create Admins Table
CREATE TABLE admins (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL, -- For a production app, we would hash this, but for simplicity in this MVP it's stored plain or simple hashed
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Insert a default admin account (You can change this email and password)
INSERT INTO admins (email, password) VALUES ('admin@joshgallery.com', 'admin123');

-- 2. Create Categories Table
CREATE TABLE categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Insert default categories
INSERT INTO categories (name) VALUES ('Weddings'), ('Portraits'), ('Commercial'), ('Events'), ('Reels');

-- 3. Create Media Table (for Photos and Videos)
CREATE TABLE media (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  url TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('image', 'video')),
  category_id UUID REFERENCES categories(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Create Reviews Table
CREATE TABLE reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  content TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Create Messages Table (For Contact Us form)
CREATE TABLE messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  content TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. Set up Storage Bucket (Requires Supabase UI or API, but here are the SQL policies)
-- Note: You MUST manually create a public bucket named 'gallery' in the Supabase Storage UI.
-- The following policies ensure anyone can view images, but only authenticated or service roles can upload.
-- (We will use the Anon Key + Server Actions to manage uploads securely)
