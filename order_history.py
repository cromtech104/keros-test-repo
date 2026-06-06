"""
注文履歴管理モジュール
"""
from typing import List, Dict, Optional
from datetime import datetime
import json
from pathlib import Path


class OrderHistory:
    """
    注文履歴を管理するクラス
    """

    def __init__(self, storage_path: str = "order_history.json"):
        """
        Args:
            storage_path: 注文履歴を保存するファイルパス
        """
        self.storage_path = Path(storage_path)
        self._ensure_storage_exists()

    def _ensure_storage_exists(self) -> None:
        """ストレージファイルが存在しない場合は空のリストで初期化"""
        if not self.storage_path.exists():
            self.storage_path.write_text(json.dumps([]))

    def add_order(self, product_name: str, price: float, quantity: int, 
                  total: float, order_date: Optional[datetime] = None) -> Dict:
        """
        注文を履歴に追加する

        Args:
            product_name: 商品名
            price: 単価
            quantity: 数量
            total: 合計金額
            order_date: 注文日時（Noneの場合は現在時刻）

        Returns:
            追加された注文データ（order_idを含む）
        """
        if order_date is None:
            order_date = datetime.now()

        orders = self._load_orders()
        
        # 新しいorder_idを生成（既存の最大ID + 1）
        order_id = max([o.get("order_id", 0) for o in orders], default=0) + 1

        order_data = {
            "order_id": order_id,
            "product_name": product_name,
            "price": price,
            "quantity": quantity,
            "total": total,
            "order_date": order_date.isoformat()
        }

        orders.append(order_data)
        self._save_orders(orders)
        
        return order_data

    def get_all_orders(self) -> List[Dict]:
        """
        全ての注文履歴を取得する（新しい順）

        Returns:
            注文履歴のリスト
        """
        orders = self._load_orders()
        # 注文日時の降順でソート
        return sorted(orders, key=lambda x: x["order_date"], reverse=True)

    def get_order_by_id(self, order_id: int) -> Optional[Dict]:
        """
        指定されたIDの注文を取得する

        Args:
            order_id: 注文ID

        Returns:
            注文データ、見つからない場合はNone
        """
        orders = self._load_orders()
        for order in orders:
            if order.get("order_id") == order_id:
                return order
        return None

    def _load_orders(self) -> List[Dict]:
        """ストレージから注文データを読み込む"""
        try:
            data = self.storage_path.read_text()
            return json.loads(data)
        except (json.JSONDecodeError, FileNotFoundError):
            return []

    def _save_orders(self, orders: List[Dict]) -> None:
        """注文データをストレージに保存する"""
        self.storage_path.write_text(json.dumps(orders, indent=2, ensure_ascii=False))

    def clear_history(self) -> None:
        """注文履歴を全てクリアする（主にテスト用）"""
        self._save_orders([])
