import { Product, CartItem } from '../types'
import ProductCard from '../components/ProductCard'

const PRODUCTS: Product[] = [
  { id: 'P001', name: '有機栽培コーヒー豆', price: 1800, stock: 12, category: '飲料', description: 'エチオピア産シングルオリジン。フルーティーな酸味と甘い余韻。' },
  { id: 'P002', name: '手作りジャム 苺', price: 680, stock: 5, category: '食品', description: '無添加・無農薬の苺を使用。パンにもヨーグルトにも。' },
  { id: 'P003', name: '天然はちみつ', price: 2400, stock: 8, category: '食品', description: '国産百花蜜。濃厚な甘みと豊かな香り。' },
  { id: 'P004', name: 'ハーブティー アソート', price: 1200, stock: 0, category: '飲料', description: '5種類のハーブをブレンド。リラックスタイムに。' },
  { id: 'P005', name: '焼き菓子セット', price: 3200, stock: 3, category: '食品', description: 'クッキー・スコーン・フィナンシェの詰め合わせ。贈り物にも。' },
  { id: 'P006', name: 'オリーブオイル', price: 1560, stock: 15, category: '食品', description: 'スペイン産エクストラバージン。料理の風味を引き立てる。' },
]

interface Props {
  cart: CartItem[]
  onAdd: (product: Product) => void
}

export default function ProductList({ onAdd }: Props) {
  return (
    <main style={{ maxWidth: 1100, margin: '0 auto', padding: '2.5rem 2rem' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '0.4rem' }}>商品一覧</h2>
        <p style={{ color: 'var(--gray)', fontSize: '0.9rem' }}>厳選された {PRODUCTS.length} 点の商品</p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '1.5rem',
      }}>
        {PRODUCTS.map(p => (
          <ProductCard key={p.id} product={p} onAdd={onAdd} />
        ))}
      </div>
    </main>
  )
}
