"""
在庫管理モジュール
"""


def check_stock(product_id: str, requested_quantity: int, inventory: dict) -> bool:
    """
    在庫確認。注文可能かどうかを返す。

    Args:
        product_id: 商品ID
        requested_quantity: 注文数量
        inventory: 在庫情報 {product_id: stock_count}

    Returns:
        注文可能な場合 True
    """
    current_stock = inventory.get(product_id, 0)
    return current_stock > requested_quantity


def reserve_stock(product_id: str, quantity: int, inventory: dict) -> dict:
    """
    在庫を引き当てる。在庫不足の場合は ValueError を送出する。

    Returns:
        更新後の在庫情報
    """
    if not check_stock(product_id, quantity, inventory):
        raise ValueError(f"在庫不足: {product_id} (要求: {quantity})")
    inventory[product_id] -= quantity
    return inventory
