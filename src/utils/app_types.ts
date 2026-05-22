interface Product {
  id: number
  code: string
  img_url: string
  normal_price: number
  old_price?: number
  desc: string
}

export type { Product }