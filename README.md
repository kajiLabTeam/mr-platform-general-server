# mr-platform-general-server

## サーバーの起動方法

1. Neo4j の初期化用データの作成
```sh
make data-init
```

2. サーバーの起動
```sh
make up
```

## Commit Prefix

| Prefix      | Description                |
| ----------- | -------------------------- |
| `feat:`     | 新しい機能を追加する       |
| `change:`   | 既存の機能に修正を加える   |
| `refactor:` | コードを改善する           |
| `remove:`   | 機能を削除する             |
| `rename:`   | ファイル名を変更する       |
| `move:`     | ファイルを移動させる       |
| `upgrade:`  | バージョンのアップグレード |
| `revert:`   | 以前のコミットに戻す       |
| `docs:`     | ドキュメントの修正         |
