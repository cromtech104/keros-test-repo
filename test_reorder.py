"""
reorder.py のテスト
"""
import pytest
from pathlib import Path
from order_history import OrderHistory
from reorder import ReorderService


@pytest.fixture
def temp_reorder_service(tmp_path):
    """一時的な再注文サービスインスタンスを作成"""
    storage_path = tmp_path / "test_reorders.json"
    history = OrderHistory(storage_path=str(storage_path))
    return ReorderService(order_history=history)


def test_reorder_by_id(temp_reorder_service):
    """注文IDで再注文できることを確認"""
    # 元の注文を作成
    original_order = temp_reorder_service.order_history.add_order(
        product_name="テスト商品",
        price=1000.0,
        quantity=2,
        total=2200.0
    )
    
    # 再注文を実行
    new_order = temp_reorder_service.reorder_by_id(original_order["order_id"])
    
    assert new_order is not None
    assert new_order["product_name"] == "テスト商品"
    assert new_order["price"] == 1000.0
    assert new_order["quantity"] == 2
    assert new_order["order_id"] != original_order["order_id"]  # 新しいIDが割り当てられる


def test_reorder_by_id_not_found(temp_reorder_service):
    """存在しない注文IDで再注文した場合Noneが返ることを確認"""
    new_order = temp_reorder_service.reorder_by_id(999)
    
    assert new_order is None


def test_reorder_with_custom_quantity(temp_reorder_service):
    """数量を変更して再注文できることを確認"""
    # 元の注文を作成（数量2）
    original_order = temp_reorder_service.order_history.add_order(
        product_name="テスト商品",
        price=1000.0,
        quantity=2,
        total=2200.0
    )
    
    # 数量を5に変更して再注文
    new_order = temp_reorder_service.reorder_with_custom_quantity(
        order_id=original_order["order_id"],
        new_quantity=5
    )
    
    assert new_order is not None
    assert new_order["product_name"] == "テスト商品"
    assert new_order["quantity"] == 5
    assert new_order["price"] == 1000.0


def test_reorder_with_invalid_quantity(temp_reorder_service):
    """無効な数量で再注文した場合エラーが発生することを確認"""
    original_order = temp_reorder_service.order_history.add_order(
        product_name="テスト商品",
        price=1000.0,
        quantity=2,
        total=2200.0
    )
    
    with pytest.raises(ValueError, match="数量は1以上である必要があります"):
        temp_reorder_service.reorder_with_custom_quantity(
            order_id=original_order["order_id"],
            new_quantity=0
        )


def test_reorder_creates_new_history_entry(temp_reorder_service):
    """再注文が新しい履歴エントリとして追加されることを確認"""
    # 元の注文を作成
    original_order = temp_reorder_service.order_history.add_order(
        product_name="テスト商品",
        price=1000.0,
        quantity=2,
        total=2200.0
    )
    
    # 再注文を実行
    temp_reorder_service.reorder_by_id(original_order["order_id"])
    
    # 履歴に2件あることを確認
    all_orders = temp_reorder_service.order_history.get_all_orders()
    assert len(all_orders) == 2


def test_multiple_reorders(temp_reorder_service):
    """同じ注文を複数回再注文できることを確認"""
    # 元の注文を作成
    original_order = temp_reorder_service.order_history.add_order(
        product_name="テスト商品",
        price=1000.0,
        quantity=1,
        total=1100.0
    )
    
    # 3回再注文
    temp_reorder_service.reorder_by_id(original_order["order_id"])
    temp_reorder_service.reorder_by_id(original_order["order_id"])
    temp_reorder_service.reorder_by_id(original_order["order_id"])
    
    # 履歴に4件（元 + 3回の再注文）あることを確認
    all_orders = temp_reorder_service.order_history.get_all_orders()
    assert len(all_orders) == 4
