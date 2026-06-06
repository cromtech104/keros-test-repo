"""
注文金額の計算モジュール
"""


def calculate_total(price: float, quantity: int, tax_rate: float) -> float:
    """
    注文の合計金額を計算する。

    Args:
        price: 単価
        quantity: 数量
        tax_rate: 税率（例: 0.1 = 10%）

    Returns:
        税込み合計金額
    """
    subtotal = price * quantity
    total = subtotal * (1 + tax_rate)
    return total


def apply_discount(price: float, discount_rate: float) -> float:
    """
    割引後の価格を計算する。

    Args:
        price: 元の価格
        discount_rate: 割引率（例: 0.1 = 10%オフ）

    Returns:
        割引後の価格
    """
    return price * (1 - discount_rate)
