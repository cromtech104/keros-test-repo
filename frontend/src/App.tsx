import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import ProductList from './pages/ProductList'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import OrderComplete from './pages/OrderComplete'
import { Product, CartItem } from './types'
import { PRODUCTS } from './data/products'

function App() {
  const [cart, setCart] = useState<CartItem[]>([])
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

  const clearCart = () => setCart([])
  const clearError = () => setErrorMessage('')

  return (
    <div style={{ minHeight: '100vh', background: 'var(--paper)' }}>
      <Header cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)} />
      {errorMessage && (
        <div style={{
          background: '#c0392b',
          color: 'white',
          padding: '1rem',
          textAlign: 'center',
          fontSize: '0.9rem',
          position: 'relative',
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
            }}
          >×</button>
        </div>
      )}
      <Routes>
        <Route path="/" element={<ProductList products={PRODUCTS} onAddToCart={handleAddToCart} />} />
        <Route path="/products/:id" element={<ProductDetail onAddToCart={handleAddToCart} />} />
        <Route path="/cart" element={<Cart cart={cart} onUpdateQty={handleUpdateQty} onRemove={handleRemove} />} />
        <Route path="/checkout" element={<Checkout cart={cart} onOrderComplete={clearCart} />} />
        <Route path="/order-complete" element={<OrderComplete />} />
      </Routes>
    </div>
  )
}

export default App
