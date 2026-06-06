export interface Product {
  id: string
  name: string
  price: number
  stock: number
  category: string
  description: string
  longDescription?: string
  origin?: string
}

export interface CartItem {
  product: Product
  quantity: number
}
