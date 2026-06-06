import { Link, useLocation } from 'react-router-dom'
import { CartItem } from '../types'

interface Props { cart: CartItem[] }

export default function Header({ cart }: Props) {
  const loc = useLocation()
  const totalItems = cart.reduce((s, i) => s + i.quantity, 0)

  return (
    <header style={{
      background: '#2c1a0e',
      borderBottom: '3px solid #c8720a',
      padding: '0 2rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: 64,
      position: 'sticky',
      top: 0,
      zIndex: 100,
    }}>
      <Link to="/" style={{ color: '#faf7f2' }}>
        <h1 style={{ fontSize: '1.5rem', letterSpacing: '0.05em', fontFamily: "'Playfair Display', serif" }}>
          Marché
        </h1>
      </Link>
      <nav style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
        <Link to="/" style={{
          color: loc.pathname === '/' ? '#e8a040' : '#ddd5c5',
          fontSize: '0.9rem',
          fontWeight: 500,
        }}>商品一覧</Link>
        <Link to="/cart" style={{
          background: totalItems > 0 ? '#c8720a' : 'transparent',
          color: totalItems > 0 ? '#ffffff' : '#ddd5c5',
          border: `1px solid ${totalItems > 0 ? '#c8720a' : '#ddd5c5'}`,
          borderRadius: 4,
          padding: '6px 16px',
          fontSize: '0.9rem',
          fontWeight: 500,
        }}>
          カート {totalItems > 0 && `(${totalItems})`}
        </Link>
      </nav>
    </header>
  )
}
