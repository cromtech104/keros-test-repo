"""
order_history.py のテスト
"""
from order_history import OrderHistory, OrderItem, Order
from datetime import datetime


def test_create_order():
    """注文作成のテスト"""
    history = OrderHistory()
    items = [
        OrderItem(product_name="商品A", price=1000, quantity=2),
        OrderItem(product_name="商品B", price=500, quantity=1)
    ]
    
    order = history.create_order(items, tax_rate=0.1)
    
    assert order.order_id == "ORD-000001"
    assert len(order.items) == 2
    assert order.items[0].product_name == "商品A"
    # (1000 * 2 * 1.1) + (500 * 1 * 1.1) = 2200 + 550 = 2750
    assert order.get_total() == 2750.0
    print(f"✓ test_create_order passed: total={order.get_total()}")


def test_create_order_with_discount():
    """割引適用のテスト"""
    history = OrderHistory()
    items = [
        OrderItem(product_name="商品A", price=1000, quantity=1)
    ]
    
    order = history.create_order(items, tax_rate=0.1, discount_rate=0.1)
    
    # 1000 * 1.1 = 1100, 10%オフで 990
    assert order.get_total() == 990.0
    print(f"✓ test_create_order_with_discount passed: total={order.get_total()}")


def test_get_order_by_id():
    """注文ID検索のテスト"""
    history = OrderHistory()
    items = [OrderItem(product_name="商品A", price=1000, quantity=1)]
    
    order1 = history.create_order(items)
    order2 = history.create_order(items)
    
    found = history.get_order_by_id("ORD-000001")
    assert found is not None
    assert found.order_id == "ORD-000001"
    
    not_found = history.get_order_by_id("ORD-999999")
    assert not_found is None
    print("✓ test_get_order_by_id passed")


def test_get_all_orders():
    """全注文履歴取得のテスト"""
    history = OrderHistory()
    items = [OrderItem(product_name="商品A", price=1000, quantity=1)]
    
    order1 = history.create_order(items)
    order2 = history.create_order(items)
    order3 = history.create_order(items)
    
    all_orders = history.get_all_orders()
    assert len(all_orders) == 3
    # 新しい順に並んでいることを確認
    assert all_orders[0].order_id == "ORD-000003"
    assert all_orders[1].order_id == "ORD-000002"
    assert all_orders[2].order_id == "ORD-000001"
    print("✓ test_get_all_orders passed")


def test_reorder():
    """再注文のテスト"""
    history = OrderHistory()
    items = [
        OrderItem(product_name="商品A", price=1000, quantity=2),
        OrderItem(product_name="商品B", price=500, quantity=1)
    ]
    
    original_order = history.create_order(items, tax_rate=0.1, discount_rate=0.05)
    assert original_order.order_id == "ORD-000001"
    
    # 再注文
    new_order = history.reorder("ORD-000001")
    
    assert new_order is not None
    assert new_order.order_id == "ORD-000002"
    assert len(new_order.items) == 2
    assert new_order.items[0].product_name == "商品A"
    assert new_order.items[0].quantity == 2
    assert new_order.tax_rate == 0.1
    assert new_order.discount_rate == 0.05
    # 合計金額も同じ
    assert new_order.get_total() == original_order.get_total()
    print(f"✓ test_reorder passed: original={original_order.order_id}, new={new_order.order_id}")


def test_reorder_nonexistent():
    """存在しない注文の再注文テスト"""
    history = OrderHistory()
    
    result = history.reorder("ORD-999999")
    assert result is None
    print("✓ test_reorder_nonexistent passed")


def test_order_to_dict():
    """注文情報の辞書変換テスト"""
    items = [
        OrderItem(product_name="商品A", price=1000, quantity=2)
    ]
    order = Order(order_id="ORD-000001", items=items, tax_rate=0.1)
    
    order_dict = order.to_dict()
    
    assert order_dict["order_id"] == "ORD-000001"
    assert len(order_dict["items"]) == 1
    assert order_dict["items"][0]["product_name"] == "商品A"
    assert order_dict["total"] == 2200.0
    print(f"✓ test_order_to_dict passed: {order_dict}")


if __name__ == "__main__":
    print("=== 注文履歴機能のテスト実行 ===")
    test_create_order()
    test_create_order_with_discount()
    test_get_order_by_id()
    test_get_all_orders()
    test_reorder()
    test_reorder_nonexistent()
    test_order_to_dict()
    print("
=== すべてのテストが成功しました ===")
