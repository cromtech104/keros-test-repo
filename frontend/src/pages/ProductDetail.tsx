import { Link, useParams } from 'react-router-dom'
import { Product } from '../types'
import { findProduct } from '../data/products'

interface Props {
  onAddToCart: (product: Product) => void
}

export default function ProductDetail({ onAddToCart }: Props) {
  const { id } = useParams<{ id: string }>()
  const product = id ? findProduct(id) : undefined

  if (!product) {
    return (
      <main style={{ maxWidth: 640, margin: '4rem auto', padding: '2rem', textAlign: 'center' }}>
        <p style={{ fontSize: '1.1rem', color: 'var(--gray)', marginBottom: '1.5rem' }}>商品が見つかりませんでした</p>
        <Link to="/" style={{
          display: 'inline-block', padding: '10px 24px',
          background: 'var(--brown)', color: 'var(--cream)', borderRadius: 4, fontSize: '0.9rem',
        }}>商品一覧へ戻る</Link>
      </main>
    )
  }

  const outOfStock = product.stock === 0
  const icon = product.category === '食品' ? '🧺' : product.category === '飲料' ? '🫖' : '🧶'

  return (
    <main style={{ maxWidth: 900, margin: '0 auto', padding: '2.5rem 2rem' }}>
      {/* パンくず */}
      <nav style={{ fontSize: '0.82rem', color: 'var(--gray)', marginBottom: '1.5rem' }}>
        <Link to="/">商品一覧</Link>
        <span style={{ margin: '0 8px' }}>›</span>
        <span>{product.name}</span>
      </nav>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2.5rem', alignItems: 'start' }}>
        {/* 画像エリア */}
        <div style={{
          background: 'var(--paper)',
          borderRadius: 12,
          height: 320,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '5rem',
        }}>{icon}</div>

        {/* 商品情報 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--gray)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            {product.category}{product.origin && ` ・ ${product.origin}`}
          </span>
          <h2 style={{ fontSize: '2rem', lineHeight: 1.2 }}>{product.name}</h2>
          <p style={{ fontSize: '1.6rem', fontWeight: 700, color: 'var(--amber)' }}>
            ¥{product.price.toLocaleString()}
          </p>
          <p style={{ fontSize: '0.92rem', color: 'var(--gray)', lineHeight: 1.9 }}>
            {product.longDescription || product.description}
          </p>

          <div style={{ fontSize: '0.85rem', color: outOfStock ? '#c0392b' : 'var(--gray)' }}>
            {outOfStock ? '在庫なし' : `在庫 ${product.stock} 点`}
          </div>

          <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
            <button
              onClick={() => !outOfStock && onAddToCart(product)}
              disabled={outOfStock}
              style={{
                padding: '13px 32px',
                background: outOfStock ? 'var(--border)' : 'var(--brown)',
                color: outOfStock ? 'var(--gray)' : 'var(--cream)',
                borderRadius: 4,
                fontSize: '0.95rem',
                fontWeight: 600,
                cursor: outOfStock ? 'not-allowed' : 'pointer',
              }}
            >
              {outOfStock ? '在庫切れ' : 'カートに追加'}
            </button>
            <Link to="/" style={{
              padding: '13px 28px',
              border: '1px solid var(--border)',
              borderRadius: 4,
              fontSize: '0.9rem',
              color: 'var(--gray)',
            }}>一覧に戻る</Link>
          </div>
        </div>
      </div>
    </main>
  )
}
