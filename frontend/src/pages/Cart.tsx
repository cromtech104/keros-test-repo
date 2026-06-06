import { Link, useNavigate } from 'react-router-dom'
import { CartItem } from '../types'

const TAX_RATE = 0.1

interface Props {
  cart: CartItem[]
  onUpdateQty: (productId: string, qty: number) => void
  onRemove: (productId: string) => void
}

export default function Cart({ cart, onUpdateQty, onRemove }: Props) {
  const navigate = useNavigate()
  const subtotal = cart.reduce((s, i) => s + i.product.price * i.quantity, 0)
  const tax = Math.floor(subtotal * TAX_RATE)
  const total = subtotal + tax

  if (cart.length === 0) {
    return (
      <main style={{ maxWidth: 640, margin: '4rem auto', padding: '2rem', textAlign: 'center' }}>
        <p style={{ fontSize: '1.1rem', color: 'var(--gray)', marginBottom: '1.5rem' }}>カートは空です</p>
        <Link to="/" style={{
          display: 'inline-block',
          padding: '10px 24px',
          background: 'var(--brown)',
          color: 'var(--cream)',
          borderRadius: 4,
          fontSize: '0.9rem',
        }}>
          商品一覧へ戻る
        </Link>
      </main>
    )
  }

  return (
    <main style={{ maxWidth: 760, margin: '0 auto', padding: '2.5rem 2rem' }}>
      {/* パンくず */}
      <nav style={{ fontSize: '0.82rem', color: 'var(--gray)', marginBottom: '1.5rem' }}>
        <Link to="/">商品一覧</Link>
        <span style={{ margin: '0 8px' }}>›</span>
        <span>カート</span>
      </nav>

      <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>カート</h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: '2rem' }}>
        {cart.map(item => {
          const isAtMaxStock = item.quantity >= item.product.stock
          return (
            <div key={item.product.id} style={{
              background: 'var(--white)',
              border: '1px solid var(--border)',
              borderRadius: 6,
              padding: '1rem 1.25rem',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
            }}>
              <div style={{ flex: 1 }}>
                <p style={{ fontWeight: 500 }}>{item.product.name}</p>
                <p style={{ fontSize: '0.85rem', color: 'var(--gray)' }}>¥{item.product.price.toLocaleString()} / 点</p>
                {isAtMaxStock && (
                  <p style={{ fontSize: '0.78rem', color: '#c0392b', marginTop: 4 }}>在庫上限に達しています</p>
                )}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <button
                  onClick={() => item.quantity > 1 ? onUpdateQty(item.product.id, item.quantity - 1) : onRemove(item.product.id)}
                  style={{ width: 28, height: 28, background: 'var(--paper)', border: '1px solid var(--border)', borderRadius: 4, fontSize: '1rem', cursor: 'pointer' }}
                >−</button>
                <span style={{ minWidth: 28, textAlign: 'center', fontWeight: 500 }}>{item.quantity}</span>
                <button
                  onClick={() => onUpdateQty(item.product.id, item.quantity + 1)}
                  disabled={isAtMaxStock}
                  style={{
                    width: 28,
                    height: 28,
                    background: isAtMaxStock ? 'var(--border)' : 'var(--paper)',
                    border: '1px solid var(--border)',
                    borderRadius: 4,
                    fontSize: '1rem',
                    cursor: isAtMaxStock ? 'not-allowed' : 'pointer',
                    color: isAtMaxStock ? 'var(--gray)' : 'inherit'
                  }}
                >＋</button>
              </div>
              <p style={{ minWidth: 80, textAlign: 'right', fontWeight: 600 }}>
                ¥{(item.product.price * item.quantity).toLocaleString()}
              </p>
              <button
                onClick={() => onRemove(item.product.id)}
                style={{ color: 'var(--gray)', background: 'none', fontSize: '1.1rem', padding: '4px', cursor: 'pointer' }}
              >×</button>
            </div>
          )
        })}
      </div>

      {/* 合計 */}
      <div style={{
        background: 'var(--white)',
        border: '1px solid var(--border)',
        borderRadius: 6,
        padding: '1.25rem',
        marginBottom: '1.5rem',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, color: 'var(--gray)', fontSize: '0.9rem' }}>
          <span>小計</span><span>¥{subtotal.toLocaleString()}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12, color: 'var(--gray)', fontSize: '0.9rem' }}>
          <span>消費税（10%）</span><span>¥{tax.toLocaleString()}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: '1.15rem', borderTop: '1px solid var(--border)', paddingTop: 12 }}>
          <span>合計（税込）</span><span style={{ color: 'var(--amber)' }}>¥{total.toLocaleString()}</span>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
        <Link to="/" style={{
          padding: '11px 24px',
          border: '1px solid var(--border)',
          borderRadius: 4,
          fontSize: '0.9rem',
          color: 'var(--gray)',
        }}>買い物を続ける</Link>
        <button
          onClick={() => navigate('/checkout')}
          style={{
            padding: '11px 32px',
            background: 'var(--amber)',
            color: 'var(--white)',
            borderRadius: 4,
            fontSize: '0.9rem',
            fontWeight: 600,
            cursor: 'pointer'
          }}
        >お届け先を入力する</button>
      </div>
    </main>
  )
}