-- Tabla de categorías y relación con productos

CREATE TABLE IF NOT EXISTS categories (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

INSERT INTO categories (id, name, slug) VALUES
  (1, 'Tecnología', 'tecnologia'),
  (2, 'Hogar', 'hogar'),
  (3, 'Deportes', 'deportes'),
  (4, 'Juguetes', 'juguetes'),
  (5, 'Cuidado personal', 'cuidado-personal')
ON CONFLICT (id) DO NOTHING;

SELECT setval('categories_id_seq', (SELECT MAX(id) FROM categories));

ALTER TABLE products
  ADD COLUMN IF NOT EXISTS category_id INTEGER REFERENCES categories(id);

CREATE INDEX IF NOT EXISTS idx_products_category_id ON products(category_id);

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Categories visible for all"
  ON categories FOR SELECT
  USING (true);
