"""
order.py のテスト
"""
from order import calculate_total, apply_discount, cancel_order, calculate_cancellation_fee


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


if __name__ == "__main__":
    print("=== テスト実行 ===")
    print(f"calculate_total(1000, 2, 0.1) = {calculate_total(1000, 2, 0.1)}")
    print(f"期待値: 2200.0")
    print(f"apply_discount(1000, 0.1) = {apply_discount(1000, 0.1)}")
    print(f"期待値: 900.0")
    print("
=== キャンセル機能テスト ===")
    print(f"cancel_order('ORD001', 2200.0, 0.0) = {cancel_order('ORD001', 2200.0, 0.0)}")
    print(f"cancel_order('ORD002', 2200.0, 0.1) = {cancel_order('ORD002', 2200.0, 0.1)}")
    print(f"calculate_cancellation_fee(2200.0, 0.1) = {calculate_cancellation_fee(2200.0, 0.1)}")
    print(f"期待値: 220.0")
