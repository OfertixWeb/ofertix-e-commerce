interface Category {
  id: number
  name: string
  slug: string
}

interface Product {
  id: number
  code: string
  img_url: string
  normal_price: number
  old_price?: number
  desc: string
  category_id?: number
  categorias?: Category
}

export type { Category, Product }