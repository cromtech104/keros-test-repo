"""
再注文機能モジュール
"""
from typing import Dict, Optional
from order_history import OrderHistory
from order import calculate_total


class ReorderService:
    """
    過去の注文から再注文を行うサービスクラス
    """

    def __init__(self, order_history: Optional[OrderHistory] = None):
        """
        Args:
            order_history: 注文履歴管理インスタンス（Noneの場合は新規作成）
        """
        self.order_history = order_history or OrderHistory()

    def reorder_by_id(self, order_id: int, tax_rate: float = 0.1) -> Optional[Dict]:
        """
        指定された注文IDの注文内容で再注文を実行する

        Args:
            order_id: 再注文したい注文ID
            tax_rate: 税率（デフォルト: 0.1 = 10%）

        Returns:
            新しく作成された注文データ、元の注文が見つからない場合はNone
        """
        # 元の注文を取得
        original_order = self.order_history.get_order_by_id(order_id)
        
        if original_order is None:
            return None

        # 元の注文情報から再計算
        product_name = original_order["product_name"]
        price = original_order["price"]
        quantity = original_order["quantity"]
        
        # 合計金額を再計算（価格や税率が変わっている可能性を考慮）
        total = calculate_total(price, quantity, tax_rate)

        # 新しい注文として履歴に追加
        new_order = self.order_history.add_order(
            product_name=product_name,
            price=price,
            quantity=quantity,
            total=total
        )

        return new_order

    def reorder_with_custom_quantity(self, order_id: int, new_quantity: int, 
                                     tax_rate: float = 0.1) -> Optional[Dict]:
        """
        指定された注文IDの商品を数量を変更して再注文する

        Args:
            order_id: 再注文したい注文ID
            new_quantity: 新しい数量
            tax_rate: 税率（デフォルト: 0.1 = 10%）

        Returns:
            新しく作成された注文データ、元の注文が見つからない場合はNone
        """
        if new_quantity <= 0:
            raise ValueError("数量は1以上である必要があります")

        # 元の注文を取得
        original_order = self.order_history.get_order_by_id(order_id)
        
        if original_order is None:
            return None

        # 元の注文情報から再計算（数量のみ変更）
        product_name = original_order["product_name"]
        price = original_order["price"]
        
        # 合計金額を再計算
        total = calculate_total(price, new_quantity, tax_rate)

        # 新しい注文として履歴に追加
        new_order = self.order_history.add_order(
            product_name=product_name,
            price=price,
            quantity=new_quantity,
            total=total
        )

        return new_order
