"""
inventory.py のテスト
"""
from inventory import check_stock, reserve_stock
import pytest


def test_check_stock_sufficient():
    inventory = {"ITEM001": 10}
    assert check_stock("ITEM001", 5, inventory) is True


def test_check_stock_exact():
    # 在庫数と注文数が同じ場合も注文できるはず
    inventory = {"ITEM001": 5}
    assert check_stock("ITEM001", 5, inventory) is True


def test_check_stock_insufficient():
    inventory = {"ITEM001": 3}
    assert check_stock("ITEM001", 5, inventory) is False


def test_check_stock_zero():
    inventory = {"ITEM001": 0}
    assert check_stock("ITEM001", 1, inventory) is False


def test_reserve_stock_success():
    # 在庫10、注文3 → 成功、残在庫7
    inventory = {"ITEM001": 10}
    result = reserve_stock("ITEM001", 3, inventory)
    assert result["ITEM001"] == 7
    assert inventory["ITEM001"] == 7, "元の在庫辞書も更新されるべき"


def test_reserve_stock_exact():
    # 在庫5、注文5 → 成功、残在庫0
    inventory = {"ITEM001": 5}
    result = reserve_stock("ITEM001", 5, inventory)
    assert result["ITEM001"] == 0


def test_reserve_stock_insufficient():
    # 在庫3、注文5 → ValueError
    inventory = {"ITEM001": 3}
    with pytest.raises(ValueError, match="在庫不足"):
        reserve_stock("ITEM001", 5, inventory)
    # エラー時は在庫が減らない
    assert inventory["ITEM001"] == 3


def test_reserve_stock_zero():
    # 在庫0、注文1 → ValueError
    inventory = {"ITEM001": 0}
    with pytest.raises(ValueError, match="在庫不足"):
        reserve_stock("ITEM001", 1, inventory)


if __name__ == "__main__":
    print("=== テスト実行 ===")
    inv = {"ITEM001": 5}
    print(f"在庫5、注文5 → {check_stock('ITEM001', 5, inv)}")
    print(f"期待値: True")
    inv2 = {"ITEM001": 10}
    print(f"在庫10、注文5 → {check_stock('ITEM001', 5, inv2)}")
    print(f"期待値: True")
    print("\n=== 在庫減算テスト ===")
    inv3 = {"ITEM001": 10}
    print(f"reserve_stock('ITEM001', 3, inventory) → 残在庫: {reserve_stock('ITEM001', 3, inv3)['ITEM001']}")
    print(f"期待値: 7")
