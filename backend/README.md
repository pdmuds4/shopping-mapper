# shopping-mapper (backend)

## 使用技術
- Python
- FastAPI
- Render.com
- Supabase

## Python環境について
- Python 3.12^
- rye / venv

【注意】
* python周りのソースは`requirements.txt`以外は絶対にコミットしない（`.gitignore`を活用すること）
* `requirements.txt`はバージョンに依存しない（バージョン表記なしで）

## ソースコードについて
* 変数名はスネークケース、関数名はキャメルケース、クラス名はアッパーキャメルケースで命名すること
    * スネークケース：`snake_case`
    * キャメルケース：`camelCase`
    * アッパーキャメルケース：`UpperCamelCase`

## gitの運用について
* `main`, `develop-frontend`には直接コミットしないこと
* `develop-backend`から`feature-(作業領域に相応しい名前)`ブランチ名で生やしてから作業を行うこと
* 作業が完了し、`develop-backend`にマージするときは、プルリクエストを出すこと。Slackで報告すること
