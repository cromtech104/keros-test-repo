import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import ProductList from './pages/ProductList'
import Cart from './pages/Cart'
import { Product, CartItem } from './types'

const mockProducts: Product[] = [
  { id: '1', name: 'オーガニック全粒粉', price: 580, stock: 3, category: '食品', description: '石臼挽きの香り高い全粒粉' },
  { id: '2', name: 'ハーブティーセット', price: 1200, stock: 5, category: '飲料', description: '季節のハーブ3種詰め合わせ' },
  { id: '3', name: '天然酵母パン', price: 450, stock: 0, category: '食品', description: '毎朝焼きたてをお届け' },
  { id: '4', name: 'ハンドメイド石鹸', price: 380, stock: 8, category: '雑貨', description: 'オリーブオイルベースの優しい石鹸' },
]

function App() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [products] = useState<Product[]>(mockProducts)
  const [errorMessage, setErrorMessage] = useState<string>('')

  const handleAddToCart = (product: Product) => {
    setErrorMessage('')
    const existing = cart.find(item => item.product.id === product.id)
    if (existing) {
      if (existing.quantity >= product.stock) {
        setErrorMessage(`${product.name}の在庫が不足しています（在庫: ${product.stock}）`)
        return
      }
      setCart(cart.map(item =>
        item.product.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ))
    } else {
      setCart([...cart, { product, quantity: 1 }])
    }
  }

  const handleUpdateQty = (productId: string, qty: number) => {
    setErrorMessage('')
    const item = cart.find(item => item.product.id === productId)
    if (item && qty > item.product.stock) {
      setErrorMessage(`${item.product.name}の在庫が不足しています（在庫: ${item.product.stock}）`)
      return
    }
    setCart(cart.map(item =>
      item.product.id === productId ? { ...item, quantity: qty } : item
    ))
  }

  const handleRemove = (productId: string) => {
    setErrorMessage('')
    setCart(cart.filter(item => item.product.id !== productId))
  }

  const clearError = () => {
    setErrorMessage('')
  }

  return (
    <BrowserRouter>
      <div style={{ minHeight: '100vh', background: 'var(--paper)' }}>
        <Header cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)} />
        {errorMessage && (
          <div style={{
            background: '#c0392b',
            color: 'white',
            padding: '1rem',
            textAlign: 'center',
            fontSize: '0.9rem',
            position: 'relative'
          }}>
            {errorMessage}
            <button
              onClick={clearError}
              style={{
                position: 'absolute',
                right: '1rem',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                color: 'white',
                fontSize: '1.2rem',
                padding: '0 0.5rem',
                cursor: 'pointer'
              }}
            >
              ×
            </button>
          </div>
        )}
        <Routes>
          <Route path="/" element={<ProductList products={products} onAddToCart={handleAddToCart} />} />
          <Route path="/cart" element={<Cart cart={cart} onUpdateQty={handleUpdateQty} onRemove={handleRemove} />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App