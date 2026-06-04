"""
inventory.py のテスト
"""
from inventory import check_stock, reserve_stock


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


if __name__ == "__main__":
    print("=== テスト実行 ===")
    inv = {"ITEM001": 5}
    print(f"在庫5、注文5 → {check_stock('ITEM001', 5, inv)}")
    print(f"期待値: True")
    print(f"在庫10、注文5 → {check_stock('ITEM001', 10, inv)}")
    print(f"期待値: True")
