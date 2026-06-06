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
    # Bug: tax_rate をそのまま掛けているため、税込み金額ではなく税額だけを返してしまっている
    total = subtotal * tax_rate
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


def cancel_order(order_id: str, order_amount: float, cancellation_fee_rate: float = 0.0) -> dict:
    """
    注文をキャンセルする。

    Args:
        order_id: 注文ID
        order_amount: 注文金額
        cancellation_fee_rate: キャンセル料率（例: 0.1 = 10%）

    Returns:
        キャンセル結果を含む辞書
        {
            'order_id': 注文ID,
            'status': 'cancelled',
            'original_amount': 元の注文金額,
            'cancellation_fee': キャンセル料,
            'refund_amount': 返金額
        }
    """
    cancellation_fee = order_amount * cancellation_fee_rate
    refund_amount = order_amount - cancellation_fee
    
    return {
        'order_id': order_id,
        'status': 'cancelled',
        'original_amount': order_amount,
        'cancellation_fee': cancellation_fee,
        'refund_amount': refund_amount
    }


def calculate_cancellation_fee(order_amount: float, cancellation_fee_rate: float) -> float:
    """
    キャンセル料を計算する。

    Args:
        order_amount: 注文金額
        cancellation_fee_rate: キャンセル料率（例: 0.1 = 10%）

    Returns:
        キャンセル料
    """
    return order_amount * cancellation_fee_rate
