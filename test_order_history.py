"""
order_history.py のテスト
"""
import pytest
from datetime import datetime
from pathlib import Path
from order_history import OrderHistory


@pytest.fixture
def temp_history(tmp_path):
    """一時的な注文履歴インスタンスを作成"""
    storage_path = tmp_path / "test_orders.json"
    return OrderHistory(storage_path=str(storage_path))


def test_add_order(temp_history):
    """注文を追加できることを確認"""
    order = temp_history.add_order(
        product_name="テスト商品",
        price=1000.0,
        quantity=2,
        total=2200.0
    )
    
    assert order["order_id"] == 1
    assert order["product_name"] == "テスト商品"
    assert order["price"] == 1000.0
    assert order["quantity"] == 2
    assert order["total"] == 2200.0
    assert "order_date" in order


def test_add_multiple_orders(temp_history):
    """複数の注文を追加できることを確認"""
    order1 = temp_history.add_order("商品A", 500.0, 1, 550.0)
    order2 = temp_history.add_order("商品B", 1000.0, 3, 3300.0)
    
    assert order1["order_id"] == 1
    assert order2["order_id"] == 2
    
    all_orders = temp_history.get_all_orders()
    assert len(all_orders) == 2


def test_get_all_orders_sorted(temp_history):
    """注文履歴が新しい順に取得できることを確認"""
    # 異なる日時で注文を追加
    date1 = datetime(2024, 1, 1, 10, 0, 0)
    date2 = datetime(2024, 1, 2, 10, 0, 0)
    
    temp_history.add_order("商品A", 500.0, 1, 550.0, order_date=date1)
    temp_history.add_order("商品B", 1000.0, 1, 1100.0, order_date=date2)
    
    orders = temp_history.get_all_orders()
    
    # 新しい順にソートされているか確認
    assert orders[0]["product_name"] == "商品B"
    assert orders[1]["product_name"] == "商品A"


def test_get_order_by_id(temp_history):
    """IDで注文を取得できることを確認"""
    temp_history.add_order("商品A", 500.0, 1, 550.0)
    order2 = temp_history.add_order("商品B", 1000.0, 2, 2200.0)
    
    retrieved_order = temp_history.get_order_by_id(2)
    
    assert retrieved_order is not None
    assert retrieved_order["product_name"] == "商品B"
    assert retrieved_order["order_id"] == 2


def test_get_order_by_id_not_found(temp_history):
    """存在しないIDで取得した場合Noneが返ることを確認"""
    temp_history.add_order("商品A", 500.0, 1, 550.0)
    
    retrieved_order = temp_history.get_order_by_id(999)
    
    assert retrieved_order is None


def test_clear_history(temp_history):
    """履歴をクリアできることを確認"""
    temp_history.add_order("商品A", 500.0, 1, 550.0)
    temp_history.add_order("商品B", 1000.0, 1, 1100.0)
    
    temp_history.clear_history()
    
    orders = temp_history.get_all_orders()
    assert len(orders) == 0


def test_persistence(tmp_path):
    """データが永続化されることを確認"""
    storage_path = tmp_path / "persist_test.json"
    
    # 最初のインスタンスで注文を追加
    history1 = OrderHistory(storage_path=str(storage_path))
    history1.add_order("商品A", 500.0, 1, 550.0)
    
    # 新しいインスタンスで読み込めるか確認
    history2 = OrderHistory(storage_path=str(storage_path))
    orders = history2.get_all_orders()
    
    assert len(orders) == 1
    assert orders[0]["product_name"] == "商品A"
