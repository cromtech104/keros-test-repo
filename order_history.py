"""
注文履歴管理モジュール
"""
from dataclasses import dataclass, field
from datetime import datetime
from typing import List, Optional
from order import calculate_total, apply_discount


@dataclass
class OrderItem:
    """注文明細"""
    product_name: str
    price: float
    quantity: int
    
    def get_subtotal(self, tax_rate: float = 0.1) -> float:
        """明細の小計（税込み）を取得"""
        return calculate_total(self.price, self.quantity, tax_rate)


@dataclass
class Order:
    """注文情報"""
    order_id: str
    items: List[OrderItem]
    order_date: datetime = field(default_factory=datetime.now)
    tax_rate: float = 0.1
    discount_rate: float = 0.0
    
    def get_total(self) -> float:
        """注文の合計金額を取得"""
        subtotal = sum(item.get_subtotal(self.tax_rate) for item in self.items)
        if self.discount_rate > 0:
            return apply_discount(subtotal, self.discount_rate)
        return subtotal
    
    def to_dict(self) -> dict:
        """注文情報を辞書形式で取得"""
        return {
            "order_id": self.order_id,
            "order_date": self.order_date.isoformat(),
            "items": [
                {
                    "product_name": item.product_name,
                    "price": item.price,
                    "quantity": item.quantity
                }
                for item in self.items
            ],
            "tax_rate": self.tax_rate,
            "discount_rate": self.discount_rate,
            "total": self.get_total()
        }


class OrderHistory:
    """注文履歴管理クラス"""
    
    def __init__(self):
        self._orders: List[Order] = []
        self._next_order_id = 1
    
    def create_order(self, items: List[OrderItem], tax_rate: float = 0.1, 
                    discount_rate: float = 0.0) -> Order:
        """
        新規注文を作成して履歴に追加する。
        
        Args:
            items: 注文明細のリスト
            tax_rate: 税率
            discount_rate: 割引率
            
        Returns:
            作成された注文
        """
        order_id = f"ORD-{self._next_order_id:06d}"
        self._next_order_id += 1
        
        order = Order(
            order_id=order_id,
            items=items,
            tax_rate=tax_rate,
            discount_rate=discount_rate
        )
        self._orders.append(order)
        return order
    
    def get_order_by_id(self, order_id: str) -> Optional[Order]:
        """
        注文IDから注文情報を取得する。
        
        Args:
            order_id: 注文ID
            
        Returns:
            注文情報（見つからない場合はNone）
        """
        for order in self._orders:
            if order.order_id == order_id:
                return order
        return None
    
    def get_all_orders(self) -> List[Order]:
        """
        すべての注文履歴を取得する（新しい順）。
        
        Returns:
            注文のリスト
        """
        return sorted(self._orders, key=lambda o: o.order_date, reverse=True)
    
    def reorder(self, order_id: str) -> Optional[Order]:
        """
        過去の注文と同じ内容で再注文する。
        
        Args:
            order_id: 元の注文ID
            
        Returns:
            新しい注文（元の注文が見つからない場合はNone）
        """
        original_order = self.get_order_by_id(order_id)
        if original_order is None:
            return None
        
        # 同じ明細で新しい注文を作成
        new_items = [
            OrderItem(
                product_name=item.product_name,
                price=item.price,
                quantity=item.quantity
            )
            for item in original_order.items
        ]
        
        return self.create_order(
            items=new_items,
            tax_rate=original_order.tax_rate,
            discount_rate=original_order.discount_rate
        )
    
    def get_order_count(self) -> int:
        """注文の総数を取得"""
        return len(self._orders)
