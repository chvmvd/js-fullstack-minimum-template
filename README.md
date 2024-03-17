# Webアプリケーション サンプルプロジェクト

[![CI](https://github.com/chvmvd/web-fullstack-template-basic/actions/workflows/ci.yml/badge.svg)](https://github.com/chvmvd/web-fullstack-template-basic/actions/workflows/ci.yml)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4)](https://github.com/prettier/prettier)
![license: MIT](https://img.shields.io/badge/license-MIT-blue)
![PRs: welcome](https://img.shields.io/badge/PRs-welcome-brightgreen)

Webアプリケーションを作る際に必要なものを一通り揃えた最小限のサンプルプロジェクトです。

## 開発

### 要件

- [Node.js](https://nodejs.org/)
- [Docker](https://www.docker.com/)

### 環境構築

1. 依存パッケージをインストールします。プロジェクトのルートディレクトリで次のコマンドを実行してください。

   ```shell
   npm ci
   ```

1. 環境変数ファイルを作成します。`backend/.env.example`をコピーして`backend/.env`を作成し、`frontend/.env.example`をコピーして`frontend/.env`を作成してください。

1. データベースを起動します。ローカル環境でデータベースを起動する場合は、次のコマンドを実行してください。外部データベースを使用する場合は、次のコマンドを実行する代わりに環境変数ファイルに接続情報を設定してください。

   ```shell
   docker compose up
   ```

1. データベースのスキーマを作成します。`backend`ディレクトリで次のコマンドを実行してください。

   ```shell
   npx prisma db push
   ```

1. データベースに初期データを投入します。`backend`ディレクトリで次のコマンドを実行してください。

   ```shell
   npx prisma db seed
   ```

### 開発サーバーの起動

1. データベースを起動します。外部データベースを使用する場合は、次のコマンドを実行する必要はありません。

   ```shell
   docker compose up
   ```

1. バックエンドサーバーを起動します。`backend`ディレクトリで次のコマンドを実行してください。

   ```shell
   npm run dev
   ```

1. フロントエンドサーバーを起動します。`frontend`ディレクトリで次のコマンドを実行してください。

   ```shell
   npm run dev
   ```

### コミット前

コミット前には、次のコマンドを実行しコードスタイルと型のチェックを行ってください。

```shell
npm run lint && npm run type-check
```
