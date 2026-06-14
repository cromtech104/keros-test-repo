import { useState } from 'react'
import { Product } from '../types'
import ProductCard from '../components/ProductCard'

interface Props {
  products: Product[]
  onAddToCart: (product: Product) => void
}

type SortOption = 'default' | 'price-asc' | 'price-desc'

export default function ProductList({ products, onAddToCart }: Props) {
  const [sortOption, setSortOption] = useState<SortOption>('default')

  const sortedProducts = [...products].sort((a, b) => {
    if (sortOption === 'price-asc') {
      return a.price - b.price
    } else if (sortOption === 'price-desc') {
      return b.price - a.price
    }
    return 0 // default: 元の順序を維持
  })

  return (
    <main style={{ maxWidth: 1100, margin: '0 auto', padding: '2.5rem 2rem' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '0.4rem' }}>商品一覧</h2>
        <p style={{ color: 'var(--gray)', fontSize: '0.9rem' }}>厳選された {products.length} 点の商品</p>
      </div>

      <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <label htmlFor="sort-select" style={{ fontSize: '0.9rem', fontWeight: '500' }}>
          並び替え:
        </label>
        <select
          id="sort-select"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value as SortOption)}
          style={{
            padding: '0.5rem 1rem',
            fontSize: '0.9rem',
            border: '1px solid var(--border, #ddd)',
            borderRadius: '4px',
            backgroundColor: 'white',
            cursor: 'pointer',
            outline: 'none',
          }}
        >
          <option value="default">デフォルト</option>
          <option value="price-asc">価格が安い順</option>
          <option value="price-desc">価格が高い順</option>
        </select>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '1.5rem',
      }}>
        {sortedProducts.map(p => (
          <ProductCard key={p.id} product={p} onAddToCart={onAddToCart} />
        ))}
      </div>
    </main>
  )
}
