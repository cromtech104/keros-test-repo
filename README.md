# keros-test-repo

Kerosのスパイクテスト用リポジトリ。
注文金額を計算するシンプルなPythonモジュール。

## 使い方

```python
from order import calculate_total, apply_discount

total = calculate_total(price=1000, quantity=2, tax_rate=0.1)
# → 2200.0 (税込み合計)
```

## テスト実行

```bash
python test_order.py
```
