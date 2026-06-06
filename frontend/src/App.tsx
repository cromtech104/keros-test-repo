import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Product, CartItem } from './types'
import Header from './components/Header'
import ProductList from './pages/ProductList'
import Cart from './pages/Cart'

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([])

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(i => i.product.id === product.id)
      if (existing) {
        return prev.map(i => i.product.id === product.id
          ? { ...i, quantity: i.quantity + 1 }
          : i
        )
      }
      return [...prev, { product, quantity: 1 }]
    })
  }

  const updateQty = (productId: string, qty: number) => {
    setCart(prev => prev.map(i => i.product.id === productId ? { ...i, quantity: qty } : i))
  }

  const removeItem = (productId: string) => {
    setCart(prev => prev.filter(i => i.product.id !== productId))
  }

  return (
    <>
      <Header cart={cart} />
      <Routes>
        <Route path="/" element={<ProductList cart={cart} onAdd={addToCart} />} />
        <Route path="/cart" element={<Cart cart={cart} onUpdateQty={updateQty} onRemove={removeItem} />} />
      </Routes>
    </>
  )
}
