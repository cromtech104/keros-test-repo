export interface Product {
  id: string
  name: string
  price: number
  stock: number
  category: string
  description: string
}

export interface CartItem {
  product: Product
  quantity: number
}
