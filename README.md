# clean-architecture-nodejs-graphql-codegen

Clean Architecture の学習を目的とした、Node.js による バックエンドの実装例です。

# 概要

- Node.js
- TypeScript
- [GraphQL Code Generator (graphql-codegen)](https://graphql-code-generator.com/)
- [Apollo Server (w/Express)](https://www.apollographql.com/docs/apollo-server/)
- [TypeORM](https://typeorm.io/#/)
- Docker (MySQL)
- React.js, [Next.js](https://nextjs.org/), [Fluent UI React](https://developer.microsoft.com/ja-JP/fluentui#/), [formik](https://formik.org/), yup
- Jest, ESLint, Prettier

具体例として TODO アプリを提供しています。

# 動作確認

## setup

- yarn を使用しています
- docker-compose と node.js が必要です

```
yarn
yarn setup
```

## test

```
yarn fix
yarn test
```

- fix = typecheck(tsc) + lint(eslint) + format(prettier)
- test = all UnitTests + IntegrationTests

## development

```
yarn docker:upd
yarn dev
```

- http://localhost:3000/graphql - backend (GraphQL Playground)
- http://localhost:7777/login - frontend (Next.js)

## production

```
yarn rebuild
yarn docker:upd
yarn start
```

- http://localhost:3000/graphql - backend (GraphQL Playground)
- http://localhost:8888/login - frontend (Next.js)

# プロジェクト構成

Monorepo 構成になっており、役割ごとにプロジェクトを分けています。  
明示的にプロジェクトを分けることによって、Clean Architecture を強制する意味合いを持たせています。

- common
  - カスタムエラーオブジェクトなど、全プロジェクトから共通で利用されるもの
- schema
  - .graphql ファイルにて、プロジェクト全体のスキーマおよび API 構成を記述
  - graphql-codegen によって、graphql ファイルから DTO, schema, resolver の型情報を自動生成
- domain-model
  - domain 層と usecase 層を実装
  - 特定のバックエンド実装に依存しない、ビジネスロジックのみを記述
- backend
  - interface 層と infrastructure 層を実装
  - 永続化層の操作に TypeORM を使用、Web サーバとして GraphQL API を提供
- frontend (WIP)
  - React(Next.js) でフロントエンドを実装しています
  - 現在、login/logout・Done/Undone・CreateTodo のユースケースのみをサポートしています

# 特徴

## schema

GraphQL schema によって、フロントエンド・バックエンド間のコントラクトを規定しています。技術的には graphql ファイルにて、データ型（type, input, enum）や API（query, mutation）を規定しています。

#### graphql-codegen による TypeScript 型情報の自動生成

graphql-codegen によって、graphql ファイルから TypeScript の型情報を出力しています。エンティティの型だけでなく、リゾルバの関数型情報なども出力しているため、高い型安全性を保ちながら開発が可能です。

またこのスキーマ情報をもとに、フロントエンド側に対しても Apollo Client に最適化した型情報を生成することができます。コード補完による DX 向上が期待できるほか、型情報に守られた高品質なサービス開発が期待できます。

## domain-model

プロジェクトのコアになるビジネスロジックを実装しており、そのための要素として value-object, entity, usecase などを実装しています。また、外側のレイヤ向けに、repository, presenter, usecase のインタフェースを公開しています。

#### 特定のバックエンド実装に依存しない、ビジネスロジックのみを記述

ユースケースは domain-model 内で完結しており、外側のレイヤがなくてもユースケースが成り立つ実装になっています。実際のところ backend プロジェクトは、ビジネスロジックに対しては controller 経由で usecase を呼び出す実装しかしていません。

振る舞いの正しさの確認には、テストを使用しています。外側のレイヤ（repository, presenter）はモックを使い、usecase に期待するコアな状態遷移やバリデーションを中心に確認しています。

## backend

コアのビジネスロジックは domain-model 側が提供しているため、このプロジェクトの主な目的は外部レイヤとの連携になります。具体的には、GraphQL に対応したサーバ実装と、永続化層の提供をしています。

#### 永続化層の操作に TypeORM を使用

永続化層には MySQL(Docker)を使用し、TypeORM によるリポジトリパターンでの実装を行っています。TypeORM はリポジトリパターンを標準で提供しているため非常に Clean Architecture 向きです。蛇足ですが migration が優秀で、ORM コードと DB の差分を見て自動的にマイグレーションファイルを生成してくれるため、非常に楽です。
