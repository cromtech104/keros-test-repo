"""
order.py のテスト
"""
from order import calculate_total, apply_discount, cancel_order, calculate_cancellation_fee, confirm_order
import pytest


def test_calculate_total_with_tax():
    # 1000円 × 2個、税率10% → 2200円 のはずが...
    result = calculate_total(price=1000, quantity=2, tax_rate=0.1)
    assert result == 2200.0, f"Expected 2200.0, got {result}"


def test_calculate_total_no_tax():
    # 500円 × 3個、税率0% → 1500円
    result = calculate_total(price=500, quantity=3, tax_rate=0.0)
    assert result == 1500.0, f"Expected 1500.0, got {result}"


def test_apply_discount():
    # 1000円の10%オフ → 900円
    result = apply_discount(price=1000, discount_rate=0.1)
    assert result == 900.0, f"Expected 900.0, got {result}"


def test_cancel_order_no_fee():
    # 注文キャンセル（キャンセル料なし）
    result = cancel_order(order_id="ORD001", order_amount=2200.0, cancellation_fee_rate=0.0)
    assert result['order_id'] == "ORD001", f"Expected order_id 'ORD001', got {result['order_id']}"
    assert result['status'] == 'cancelled', f"Expected status 'cancelled', got {result['status']}"
    assert result['original_amount'] == 2200.0, f"Expected original_amount 2200.0, got {result['original_amount']}"
    assert result['cancellation_fee'] == 0.0, f"Expected cancellation_fee 0.0, got {result['cancellation_fee']}"
    assert result['refund_amount'] == 2200.0, f"Expected refund_amount 2200.0, got {result['refund_amount']}"


def test_cancel_order_with_fee():
    # 注文キャンセル（キャンセル料10%）
    result = cancel_order(order_id="ORD002", order_amount=2200.0, cancellation_fee_rate=0.1)
    assert result['order_id'] == "ORD002"
    assert result['status'] == 'cancelled'
    assert result['original_amount'] == 2200.0
    assert result['cancellation_fee'] == 220.0, f"Expected cancellation_fee 220.0, got {result['cancellation_fee']}"
    assert result['refund_amount'] == 1980.0, f"Expected refund_amount 1980.0, got {result['refund_amount']}"


def test_calculate_cancellation_fee():
    # 2200円の10%キャンセル料 → 220円
    result = calculate_cancellation_fee(order_amount=2200.0, cancellation_fee_rate=0.1)
    assert result == 220.0, f"Expected 220.0, got {result}"


def test_calculate_cancellation_fee_no_fee():
    # キャンセル料0%の場合
    result = calculate_cancellation_fee(order_amount=2200.0, cancellation_fee_rate=0.0)
    assert result == 0.0, f"Expected 0.0, got {result}"


def test_confirm_order_success():
    # 在庫10、注文2 → 成功、残在庫8
    inventory = {"ITEM001": 10}
    result = confirm_order(
        order_id="ORD001",
        product_id="ITEM001",
        quantity=2,
        price=1000.0,
        tax_rate=0.1,
        inventory=inventory
    )
    assert result['order_id'] == "ORD001"
    assert result['product_id'] == "ITEM001"
    assert result['quantity'] == 2
    assert result['total_amount'] == 2200.0
    assert result['status'] == 'confirmed'
    assert result['remaining_stock'] == 8
    assert inventory["ITEM001"] == 8, "在庫が減算されていない"


def test_confirm_order_exact_stock():
    # 在庫1、注文1 → 成功、残在庫0
    inventory = {"ITEM001": 1}
    result = confirm_order(
        order_id="ORD002",
        product_id="ITEM001",
        quantity=1,
        price=1000.0,
        tax_rate=0.1,
        inventory=inventory
    )
    assert result['status'] == 'confirmed'
    assert result['remaining_stock'] == 0
    assert inventory["ITEM001"] == 0


def test_confirm_order_insufficient_stock():
    # 在庫1、注文2 → ValueError
    inventory = {"ITEM001": 1}
    with pytest.raises(ValueError, match="在庫不足"):
        confirm_order(
            order_id="ORD003",
            product_id="ITEM001",
            quantity=2,
            price=1000.0,
            tax_rate=0.1,
            inventory=inventory
        )
    # エラー時は在庫が減らない
    assert inventory["ITEM001"] == 1


def test_confirm_order_twice_should_fail():
    # チケットの再現手順：在庫1の商品を1点注文後、もう一度注文すると失敗するはず
    inventory = {"ITEM001": 1}
    
    # 1回目の注文は成功
    result1 = confirm_order(
        order_id="ORD001",
        product_id="ITEM001",
        quantity=1,
        price=1000.0,
        tax_rate=0.1,
        inventory=inventory
    )
    assert result1['status'] == 'confirmed'
    assert inventory["ITEM001"] == 0
    
    # 2回目の注文は失敗
    with pytest.raises(ValueError, match="在庫不足"):
        confirm_order(
            order_id="ORD002",
            product_id="ITEM001",
            quantity=1,
            price=1000.0,
            tax_rate=0.1,
            inventory=inventory
        )


if __name__ == "__main__":
    print("=== テスト実行 ===")
    print(f"calculate_total(1000, 2, 0.1) = {calculate_total(1000, 2, 0.1)}")
    print(f"期待値: 2200.0")
    print(f"apply_discount(1000, 0.1) = {apply_discount(1000, 0.1)}")
    print(f"期待値: 900.0")
    print("\n=== キャンセル機能テスト ===")
    print(f"cancel_order('ORD001', 2200.0, 0.0) = {cancel_order('ORD001', 2200.0, 0.0)}")
    print(f"cancel_order('ORD002', 2200.0, 0.1) = {cancel_order('ORD002', 2200.0, 0.1)}")
    print(f"calculate_cancellation_fee(2200.0, 0.1) = {calculate_cancellation_fee(2200.0, 0.1)}")
    print(f"期待値: 220.0")
    print("\n=== 注文確定テスト ===")
    inventory = {"ITEM001": 10}
    print(f"confirm_order('ORD001', 'ITEM001', 2, 1000.0, 0.1, inventory) = {confirm_order('ORD001', 'ITEM001', 2, 1000.0, 0.1, inventory)}")
    print(f"残在庫: {inventory['ITEM001']}")
