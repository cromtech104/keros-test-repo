import { Product } from '../types'
import ProductCard from '../components/ProductCard'

interface Props {
  products: Product[]
  onAddToCart: (product: Product) => void
}

export default function ProductList({ products, onAddToCart }: Props) {
  return (
    <main style={{ maxWidth: 1100, margin: '0 auto', padding: '2.5rem 2rem' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '0.4rem' }}>商品一覧</h2>
        <p style={{ color: 'var(--gray)', fontSize: '0.9rem' }}>厳選された {products.length} 点の商品</p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '1.5rem',
      }}>
        {products.map(p => (
          <ProductCard key={p.id} product={p} onAddToCart={onAddToCart} />
        ))}
      </div>
    </main>
  )
}
