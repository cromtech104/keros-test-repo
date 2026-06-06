import { Link } from 'react-router-dom'
import { Product } from '../types'

interface Props {
  product: Product
  onAddToCart: (product: Product) => void
}

export default function ProductCard({ product, onAddToCart }: Props) {
  const outOfStock = product.stock === 0
  const icon = product.category === '食品' ? '🧺' : product.category === '飲料' ? '🫖' : '🧶'

  return (
    <article style={{
      background: 'var(--white)',
      border: '1px solid var(--border)',
      borderRadius: 8,
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      transition: 'box-shadow 0.2s',
    }}
    onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 4px 16px rgba(44,26,14,0.12)')}
    onMouseLeave={e => (e.currentTarget.style.boxShadow = 'none')}
    >
      <Link to={`/products/${product.id}`} style={{
        background: 'var(--paper)',
        padding: '2.5rem 1.5rem 1rem',
        display: 'flex',
        alignItems: 'flex-end',
        minHeight: 120,
      }}>
        <span style={{ fontSize: '2rem' }}>{icon}</span>
      </Link>

      <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
        <span style={{ fontSize: '0.75rem', color: 'var(--gray)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          {product.category}
        </span>
        <Link to={`/products/${product.id}`}>
          <h3 style={{ fontSize: '1.05rem', lineHeight: 1.3 }}>{product.name}</h3>
        </Link>
        <p style={{ fontSize: '0.85rem', color: 'var(--gray)', flex: 1 }}>{product.description}</p>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 }}>
          <span style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--amber)' }}>
            ¥{product.price.toLocaleString()}
          </span>
          <span style={{ fontSize: '0.78rem', color: outOfStock ? '#c0392b' : 'var(--gray)' }}>
            {outOfStock ? '在庫なし' : `在庫 ${product.stock}`}
          </span>
        </div>

        <button
          onClick={() => !outOfStock && onAddToCart(product)}
          disabled={outOfStock}
          style={{
            marginTop: 4,
            padding: '10px',
            background: outOfStock ? 'var(--border)' : 'var(--brown)',
            color: outOfStock ? 'var(--gray)' : 'var(--cream)',
            borderRadius: 4,
            fontSize: '0.88rem',
            fontWeight: 500,
            cursor: outOfStock ? 'not-allowed' : 'pointer',
            transition: 'background 0.2s',
          }}
        >
          {outOfStock ? '在庫切れ' : 'カートに追加'}
        </button>
      </div>
    </article>
  )
}
