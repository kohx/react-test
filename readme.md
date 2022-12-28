# Reactプロジェクトの作成

github リポジトリ作成

`\\wsl.localhost\Ubuntu-20.04\home\[user]`に移動

```
mkdir repo
cd repo
```

トークンの設定をしなくて良いように
github desktopで`\\wsl.localhost\Ubuntu-20.04\home\okuda\repo\react-test`にcloneする

dockerを動かす

```
cd /home/[user]/repo/react-test
docker-compose up -d
```

コンテナにはいる

```
docker-compose exec web bash
```

```
npm init
```

## 初期リポジトリの構成

```
root/
  ├ dist/
  │ ├ index.html
  │ └ main.js
  │
  ├ node_modules/
  │
  ├ src/
  │ ├ App.tsx
  │ └ index.tsx
  │
  ├ package.lock.json
  ├ pacckage.json
  ├ tsconfig.json
  └ webpack.config.js
```