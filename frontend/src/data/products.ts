import { Product } from '../types'

// 商品マスタ（商品一覧・商品詳細で共有）
export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'オーガニック全粒粉',
    price: 580,
    stock: 3,
    category: '食品',
    description: '石臼挽きの香り高い全粒粉',
    longDescription: '農薬を使わずに育てた小麦を、昔ながらの石臼でゆっくりと挽きました。ふすままで丸ごと使用しているため、香ばしい風味と豊かな栄養が特徴です。パン作りやお菓子作りに。',
    origin: '北海道',
  },
  {
    id: '2',
    name: 'ハーブティーセット',
    price: 1200,
    stock: 5,
    category: '飲料',
    description: '季節のハーブ3種詰め合わせ',
    longDescription: 'カモミール・ペパーミント・レモングラスの3種を詰め合わせました。一日の終わりのリラックスタイムに、香り高いハーブティーをどうぞ。ノンカフェインです。',
    origin: '長野県',
  },
  {
    id: '3',
    name: '天然酵母パン',
    price: 450,
    stock: 0,
    category: '食品',
    description: '毎朝焼きたてをお届け',
    longDescription: '自家製の天然酵母をじっくり発酵させた、噛むほどに味わい深いパンです。外はパリッと、中はもっちり。素材本来の甘みをお楽しみください。',
    origin: '東京都',
  },
  {
    id: '4',
    name: 'ハンドメイド石鹸',
    price: 380,
    stock: 8,
    category: '雑貨',
    description: 'オリーブオイルベースの優しい石鹸',
    longDescription: 'エクストラバージンオリーブオイルをたっぷり使った、肌に優しい無添加石鹸です。きめ細やかな泡で、しっとりとした洗い上がり。敏感肌の方にもおすすめです。',
    origin: '和歌山県',
  },
  {
    id: '5',
    name: '天然はちみつ',
    price: 2400,
    stock: 6,
    category: '食品',
    description: '濃厚な甘みの国産百花蜜',
    longDescription: 'さまざまな花から集めた百花蜜。濃厚な甘みと豊かな香りが特徴です。加熱処理をしていない生はちみつなので、酵素やビタミンが生きています。',
    origin: '岐阜県',
  },
  {
    id: '6',
    name: '陶器のマグカップ',
    price: 1800,
    stock: 4,
    category: '雑貨',
    description: '手作りの温かみある一品',
    longDescription: '職人が一つひとつ手作りした陶器のマグカップ。手に馴染む形と、やわらかな釉薬の風合いが魅力です。毎日のコーヒーやお茶の時間を豊かにします。',
    origin: '岐阜県',
  },
]

export function findProduct(id: string): Product | undefined {
  return PRODUCTS.find(p => p.id === id)
}
