import { Link } from 'react-router-dom'

export default function OrderComplete() {
  const orderNumber = `ORD-${Date.now().toString().slice(-8)}`

  return (
    <main style={{ maxWidth: 560, margin: '5rem auto', padding: '2rem', textAlign: 'center' }}>
      <div style={{
        width: 72, height: 72, borderRadius: '50%',
        background: 'var(--paper)', border: '2px solid var(--amber)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        margin: '0 auto 1.5rem', fontSize: '2rem', color: 'var(--amber)',
      }}>✓</div>

      <h2 style={{ fontSize: '1.8rem', marginBottom: '0.75rem' }}>ご注文ありがとうございます</h2>
      <p style={{ color: 'var(--gray)', marginBottom: '0.5rem' }}>
        注文番号: <strong style={{ color: 'var(--brown)' }}>{orderNumber}</strong>
      </p>
      <p style={{ color: 'var(--gray)', fontSize: '0.9rem', marginBottom: '2.5rem', lineHeight: 1.8 }}>
        ご登録のメールアドレスに確認メールをお送りしました。<br />
        発送準備が整い次第、お知らせいたします。
      </p>

      <Link to="/" style={{
        display: 'inline-block', padding: '11px 28px',
        background: 'var(--brown)', color: 'var(--cream)', borderRadius: 4,
        fontSize: '0.9rem', fontWeight: 500,
      }}>買い物を続ける</Link>
    </main>
  )
}
