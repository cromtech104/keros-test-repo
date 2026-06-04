"""
order.py のテスト
"""
from order import calculate_total, apply_discount


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


if __name__ == "__main__":
    print("=== テスト実行 ===")
    print(f"calculate_total(1000, 2, 0.1) = {calculate_total(1000, 2, 0.1)}")
    print(f"期待値: 2200.0")
    print(f"apply_discount(1000, 0.1) = {apply_discount(1000, 0.1)}")
    print(f"期待値: 900.0")
