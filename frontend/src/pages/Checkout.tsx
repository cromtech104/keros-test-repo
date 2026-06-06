import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CartItem } from '../types'

const TAX_RATE = 0.1

interface Props {
  cart: CartItem[]
  onOrderComplete: () => void
}

interface FormData {
  name: string
  email: string
  phone: string
  postalCode: string
  prefecture: string
  address: string
}

const PREFECTURES = ['北海道','青森県','岩手県','宮城県','秋田県','山形県','福島県','茨城県','栃木県','群馬県','埼玉県','千葉県','東京都','神奈川県','新潟県','富山県','石川県','福井県','山梨県','長野県','岐阜県','静岡県','愛知県','三重県','滋賀県','京都府','大阪府','兵庫県','奈良県','和歌山県','鳥取県','島根県','岡山県','広島県','山口県','徳島県','香川県','愛媛県','高知県','福岡県','佐賀県','長崎県','熊本県','大分県','宮崎県','鹿児島県','沖縄県']

export default function Checkout({ cart, onOrderComplete }: Props) {
  const navigate = useNavigate()
  const [form, setForm] = useState<FormData>({
    name: '', email: '', phone: '', postalCode: '', prefecture: '', address: '',
  })
  const [errors, setErrors] = useState<Partial<FormData>>({})

  const subtotal = cart.reduce((s, i) => s + i.product.price * i.quantity, 0)
  const tax = Math.floor(subtotal * TAX_RATE)
  const total = subtotal + tax

  if (cart.length === 0) {
    return (
      <main style={{ maxWidth: 640, margin: '4rem auto', padding: '2rem', textAlign: 'center' }}>
        <p style={{ fontSize: '1.1rem', color: 'var(--gray)', marginBottom: '1.5rem' }}>カートが空です</p>
        <Link to="/" style={{
          display: 'inline-block', padding: '10px 24px',
          background: 'var(--brown)', color: 'var(--cream)', borderRadius: 4, fontSize: '0.9rem',
        }}>商品一覧へ戻る</Link>
      </main>
    )
  }

  const validate = () => {
    const e: Partial<FormData> = {}
    if (!form.name.trim()) e.name = 'お名前を入力してください'
    if (!form.email.includes('@')) e.email = '正しいメールアドレスを入力してください'
    if (!/^\d{10,11}$/.test(form.phone.replace(/-/g, ''))) e.phone = '正しい電話番号を入力してください'
    if (!/^\d{7}$/.test(form.postalCode.replace(/-/g, ''))) e.postalCode = '郵便番号は7桁で入力してください'
    if (!form.prefecture) e.prefecture = '都道府県を選択してください'
    if (!form.address.trim()) e.address = '住所を入力してください'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    onOrderComplete()
    navigate('/order-complete')
  }

  const set = (key: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm(prev => ({ ...prev, [key]: e.target.value }))

  const inputStyle = (hasError: boolean): React.CSSProperties => ({
    width: '100%',
    padding: '10px 12px',
    border: `1px solid ${hasError ? '#c0392b' : 'var(--border)'}`,
    borderRadius: 4,
    fontSize: '0.9rem',
    background: 'var(--white)',
    outline: 'none',
    fontFamily: "'Noto Sans JP', sans-serif",
  })

  const labelStyle: React.CSSProperties = { display: 'block', fontSize: '0.85rem', fontWeight: 500, marginBottom: 6 }
  const errStyle: React.CSSProperties = { fontSize: '0.78rem', color: '#c0392b', marginTop: 4 }
  const req = <span style={{ color: '#c0392b' }}>*</span>

  return (
    <main style={{ maxWidth: 820, margin: '0 auto', padding: '2.5rem 2rem' }}>
      <nav style={{ fontSize: '0.82rem', color: 'var(--gray)', marginBottom: '1.5rem' }}>
        <Link to="/">商品一覧</Link>
        <span style={{ margin: '0 8px' }}>›</span>
        <Link to="/cart">カート</Link>
        <span style={{ margin: '0 8px' }}>›</span>
        <span>お届け先入力</span>
      </nav>

      <h2 style={{ fontSize: '1.8rem', marginBottom: '2rem' }}>お届け先・連絡先</h2>

      <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '2rem', alignItems: 'start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <label style={labelStyle}>お名前 {req}</label>
            <input value={form.name} onChange={set('name')} placeholder="山田 太郎" style={inputStyle(!!errors.name)} />
            {errors.name && <p style={errStyle}>{errors.name}</p>}
          </div>
          <div>
            <label style={labelStyle}>メールアドレス {req}</label>
            <input value={form.email} onChange={set('email')} placeholder="example@email.com" type="email" style={inputStyle(!!errors.email)} />
            {errors.email && <p style={errStyle}>{errors.email}</p>}
          </div>
          <div>
            <label style={labelStyle}>電話番号 {req}</label>
            <input value={form.phone} onChange={set('phone')} placeholder="09012345678" style={inputStyle(!!errors.phone)} />
            {errors.phone && <p style={errStyle}>{errors.phone}</p>}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '160px 1fr', gap: 12 }}>
            <div>
              <label style={labelStyle}>郵便番号 {req}</label>
              <input value={form.postalCode} onChange={set('postalCode')} placeholder="1234567" maxLength={8} style={inputStyle(!!errors.postalCode)} />
              {errors.postalCode && <p style={errStyle}>{errors.postalCode}</p>}
            </div>
            <div>
              <label style={labelStyle}>都道府県 {req}</label>
              <select value={form.prefecture} onChange={set('prefecture')} style={{ ...inputStyle(!!errors.prefecture), appearance: 'auto' }}>
                <option value="">選択してください</option>
                {PREFECTURES.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
              {errors.prefecture && <p style={errStyle}>{errors.prefecture}</p>}
            </div>
          </div>
          <div>
            <label style={labelStyle}>住所（市区町村・番地） {req}</label>
            <input value={form.address} onChange={set('address')} placeholder="渋谷区渋谷1-1-1" style={inputStyle(!!errors.address)} />
            {errors.address && <p style={errStyle}>{errors.address}</p>}
          </div>
        </div>

        <div style={{ position: 'sticky', top: 80 }}>
          <div style={{ background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 8, padding: '1.25rem' }}>
            <h3 style={{ fontSize: '1rem', marginBottom: '1rem', paddingBottom: '0.75rem', borderBottom: '1px solid var(--border)' }}>
              注文内容
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: '1rem' }}>
              {cart.map(item => (
                <div key={item.product.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                  <span style={{ color: 'var(--gray)' }}>{item.product.name} × {item.quantity}</span>
                  <span>¥{(item.product.price * item.quantity).toLocaleString()}</span>
                </div>
              ))}
            </div>
            <div style={{ borderTop: '1px solid var(--border)', paddingTop: '0.75rem', fontSize: '0.85rem', color: 'var(--gray)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <span>小計</span><span>¥{subtotal.toLocaleString()}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                <span>消費税</span><span>¥{tax.toLocaleString()}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: '1rem', color: 'var(--brown)' }}>
                <span>合計</span><span style={{ color: 'var(--amber)' }}>¥{total.toLocaleString()}</span>
              </div>
            </div>
            <button type="submit" style={{
              width: '100%', marginTop: '1.25rem', padding: '12px',
              background: 'var(--amber)', color: 'var(--white)', borderRadius: 4,
              fontSize: '0.95rem', fontWeight: 600,
            }}>
              注文を確定する
            </button>
          </div>
          <Link to="/cart" style={{ display: 'block', textAlign: 'center', marginTop: 12, fontSize: '0.85rem', color: 'var(--gray)' }}>
            ← カートに戻る
          </Link>
        </div>
      </form>
    </main>
  )
}
