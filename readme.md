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
docker-compose up -d
```

コンテナにはいる

```
docker-compose exec web bash
```

react プロジェクトを作る

```
npx create-react-app {AppName}
or
npx create-react-app .
```