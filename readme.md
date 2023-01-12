# Reactプロジェクトの作成

## リポジトリの準備
github リポジトリ作成

## docker desktop の設定
docker desktop 
↓
settings
↓
resources
↓
wsl integration
↓
ubuntu-20.04 check on

## ディレクトリノ準備
`\\wsl.localhost\Ubuntu-20.04\home\[user]`に移動

```
mkdir repo
cd repo
```

トークンの設定をしなくて良いように
github desktopで`\\wsl.localhost\Ubuntu-20.04\home\okuda\repo\react-test`にcloneする

## docker, docker-compose

```
docker/
  ├ node/
  │ └ Dockerfile
  └ docker-compose.yml
```

### Dockerfile

```yml:docker/node/Dockerfile
version: "3"
services:
  web:
    build: ./docker/node
    tty: true
    volumes:
      - ./app:/var/www
    ports:
      - "3000:3000"
```

### docker-compose.yml

```yml:docker-compose.yml
version: "3"
services:
  web:
    build: ./docker/node
    tty: true
    volumes:
      - ./app:/var/www
    ports:
      - "3000:3000"
```

## docker起動

```
cd /home/[user]/repo/react-test
docker-compose up -d
```

コンテナにはいる

```
docker-compose exec web bash
```

## WSL で デフォルトユーザを変更

```powershell

# ルートでログイン
wsl -d Ubuntu-20.04 -u root

# `/etc/wsl.conf`ファイルを作成
cat << EOF > /etc/wsl.conf
[user]
default=user-name
[interop]
appendWindowsPath = false
EOF

# wslをシャットダウン
wsl -t Ubuntu-20.04

# wslを再起動
wsl -d Ubuntu-20.04
```

## 初期リポジトリの構成

```
app/
  ├ dist/
  │ ├ index.html
  │ └ main.js
  │
  ├ node_modules/
  │
  ├ src/
  │ ├ App.jsx(tsx)
  │ └ index.jsx(tsx)
  │
  ├ package.lock.json
  ├ pacckage.json
  ├ tsconfig.json
  └ webpack.config.js
```

## 必要なものをインストール

### リアクト関係

```bash
npm init
npm install react react-dom @types/react @types/react-dom
npm install --save-dev webpack webpack-cli webpack-dev-server babel-loader @babel/core @babel/preset-env @babel/preset-react typescript ts-loader sass css-loader style-loader sass-loader
```

### webpack

```bash
touch app/webpack.config.js
```

```js:webpack.config.js
const path = require('path');

module.exports = {
  mode,
  entry,
  output,
  module,
  devServer,
  resolve,
  target,
};
```

上記ファイルの内容を書いていく

#### mode

モードの値は 3 種類  
- production (デフォルト値): 改行やインデント、余分な半角スペースなどを取り除いてバンドル
- development: 改行やインデントをそのままでバンドル
- none

```js:webpack.config.js
  // ...
  mode: 'development',
  // ...
```

#### entry

ファイルを起点にバンドルするかを設定  
設定したファイルからインポートされたモジュールをたどってバンドルする

```js:webpack.config.js
  // ...
  entry: './src/index.jsx',
  // ...
```

#### output

バンドルしたファイルをどこに何という名前で出力するかを設定

```js:webpack.config.js
  // ...
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'main.js',
  },
  // ...
```

#### module, module.rules
`module`はLoader の設定  
  
`module.rules`は配列でLoader を設定するオブジェクトを渡す

```js:webpack.config.js
  // ...
  module: {
    rules: [
      { /* TypeScriptのモジュール */ },
      { /* CSSのモジュール */ },
    ],
  },
  // ...
```

`test`と`use`を設定すればLoaderが動く  
`test`には、正規表現でターゲットとなる拡張子を記入  
`use`には Loader を記入  

```js:webpack.config.js
  // ...
  module: {
    rules: [
      // TypeScript
      {
        test: /\.(ts|tsx)$/,
        use: [
          {
            loader: 'babel-loader',
            options: { presets: ['@babel/preset-env', '@babel/react'] },
          },
          {
            loader: 'ts-loader',
            options: {
              configFile: path.resolve(__dirname, 'tsconfig.json'),
            },
          },
        ]
      },
      // css
      { 
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'sass-loader',
          },
        ]
      },
    ],
  },
  // ...
```

上記のcss部分にオプションを渡さない場合は省略記法ができる

```js:webpack.config.js
  // ...
  module: {
    rules: [
      // ...
      // css
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  },
  // ...
```

#### devServer

開発サーバーを立ち上げるライブラリ`webpack-dev-server`の設定  
サーバーの起点となるディレクトリを記入  
output.pathと同様で問題なし  

```js:webpack.config.js
  // ...
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    port: 3000,
  },
  // ...
```

#### resolve

resolve.extensionsに、拡張子を文字列として配列に渡すことで、インポートのパスに書く拡張子を省略できるようにする

```js:webpack.config.js
  // ...
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },
  // ...
```

#### target

コンパイルするかを設定
- サーバー側(Node.js): `node`と設定
- ブラウザ側(フロント): `web`と設定

```js:webpack.config.js
  // ...
  target: 'web',
  // ...
```

### 完成形

```js:webpack.config.js
const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/index.jsx',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'main.js',
  },
  module: {
    rules: [
      // js jsx
      {
          test: /\.(js|jsx)$/,
          use: [
              {
                  loader: 'babel-loader',
                  options: { presets: ['@babel/preset-env', '@babel/react'] },
              },
          ]
      },
      // ts tsx
      {
        test: /\.(ts|tsx)$/,
        use: [
          {
            loader: 'babel-loader',
            options: { presets: ['@babel/preset-env', '@babel/react'] },
          },
          {
            loader: 'ts-loader',
            options: {
              configFile: path.resolve(__dirname, 'tsconfig.json'),
            },
          },
        ],
      },
      // css
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
    ],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    port: 3000,
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
  },
  target: 'web',
};
```

## hello world

### ディレクトリとファイルを作成

```bash
mkdir app/dist
touch app/dist/index.html
mkdir app/src
touch app/src/index.tsx
touch app/src/App.tsx
```

### リアクトを読み込むファイルを作成

```html:index.html
<html lang="ja">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>webpack × React × TypeScript</title>
  </head>
  <body>
    <div id="root"></div>
    <script defer src="main.js"></script>
  </body>
</html>
```

### Appコンポーネントを作成

```tsx:App.jsx
import React from 'react';

export default () => {
    return (<div>Hello World!</div>)
}
```

### リアクトファイルを作成

```tsx:index.jsx
import React from 'react';
import { createRoot } from 'react-dom/client';

// Appコンポーネントをインポート
import App from './App';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <App />
);
```

### TypeScript の設定(使う場合)

TypeScriptの設定ファイルを作成

```bash
touch app/tsconfig.json
```

```json:tsconfig.json
{
  "compilerOptions": {
    "sourceMap": true,
    "target": "ES2020",
    "module": "ES2020",
    "outDir": "dist",
    "jsx": "react",
    "moduleResolution": "Node",
    "lib": ["ES2020", "DOM"],
    "allowJs": true,
    "allowSyntheticDefaultImports": true
  },
  "exclude": ["./node_modules"]
}
```

### package.json の scripts の設定

`package.json`の`scripts`にコマンドを登録

`build`: npm run build -> distをディレクトリビルドしたファイルmain.jsが生成
`dev`: npm run dev -> webpack-dev-serverを起動 http://localhost:3000

```json:package.json
{
  //  ...
  "scripts": {
    //  ...
    "build": "webpack",
    "dev": "webpack serve"
  },
  //  ...
}
```

### 動かしてみる 

```bash
npm run dev
```

`http://localhost:3000`にアクセスして確認


## ルーターを追加

### フォルダ構成

```
app/
  ├ dist/
  │ ├ index.html
  │ └ main.js
  │
  ├ node_modules/
  │
  ├ src/
  │ ├ components
  │ │ └ NavBar.jsx(tsx)
  │ │ 
  │ ├ routers/
  │ │ ├ Home.jsx(tsx)
  │ │ ├ About.jsx(tsx)
  │ │ ├ Contact.jsx(tsx)
  │ │ └ NotFound.jsx(tsx)
  │ │ 
  │ ├ App.jsx(tsx)
  │ └ index.jsx(tsx)
  │
  ├ package.lock.json
  ├ pacckage.json
  ├ tsconfig.json
  └ webpack.config.js
```

### ルータをインストール

```bash
　npm install react-router-dom@6
```

### webpackの設定

以下を追加

```js:app/webpack.config.js
 devServer: {
        //...
        historyApiFallback: true,
    },
```

### ルーティングの設定が行えるように`BrowserRouter`タグを設定

```jsx:app/src/index.jsx
import React from 'react';
import { createRoot } from 'react-dom/client';

// Appコンポーネントをインポート
import App from './App';

// ルータを追加
import { BrowserRouter } from 'react-router-dom';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
    // ルータを追加
    <BrowserRouter>
        <App />
    </BrowserRouter>
);
```

### ルートの追加

APPにルートを追加していく

```jsx:app/src/App.jsx
import React from 'react';

// ルータを追加
import { Routes, Route } from 'react-router-dom';
//　ルートコンポネントを追加
import Home from './routes/Home';
import About from './routes/About';
import Contact from './routes/Contact';
import NotFound from './routes/NotFound';
//　ナビのコンポネントを追加
import Navbar from './components/Navbar';

export default () => {
  return (
    <div className="App">
      {/* `Routes`タグの中に`Route`タグでパストコンポネントを追加 */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}
```

### 各ページを作成

```jsx:app/src/routes/Home.jsx
import React from 'react';

export default () => {
    return (
        <div>
            <h1>Home</h1>
        </div>
    )
}
```

```jsx:app/src/routes/About.jsx
import React from 'react';

export default () => {
    return (
        <div>
            <h1>About</h1>
        </div>
    )
}
```

```jsx:app/src/routes/Contact.jsx
import React from 'react';

export default () => {
    return (
        <div>
            <h1>Contact</h1>
        </div>
    )
}
```

```jsx:app/src/routes/NotFound.jsx
import React from 'react';

export default () => {
    return (
        <div>
            <h1>NotFound</h1>
        </div>
    )
}
```

### ナビを作成

`NavLink`を使うと`isActive`が使える  

`navigate`を使うと`onClick={() => navigate('/')}`のようにリダイレクトできる

```jsx:app/src/routes/Navbar.jsx
import React from 'react';
import { NavLink, navigate } from 'react-router-dom'

export default () => {
    render() {

        let activeStyle = {
            'color': 'tomato',
            'textDecoration': 'none'
        }

        let activeClass = "active-link";

        return (
            <ul>
                <li>
                    <NavLink
                        style={({ isActive }) => (isActive ? activeStyle : undefined)}
                        className={({ isActive }) => (isActive ? activeClass : undefined)}
                        to="/"
                    >Home</NavLink>
                </li>
                <li>
                    <NavLink
                        style={({ isActive }) => (isActive ? activeStyle : undefined)}
                        className={({ isActive }) => (isActive ? activeClass : undefined)}
                        to="/about"
                    >About</NavLink>
                </li>
                <li>
                    <NavLink
                        style={({ isActive }) => (isActive ? activeStyle : undefined)}
                        className={({ isActive }) => (isActive ? activeClass : undefined)}
                        to="/contact"
                    >Contact</NavLink>
                </li>
            </ul>
            // 
            <button onClick={() => navigate('/contact')}>click to Contact</button>
        )
    }
}
```

## base url

`import`が複雑になるので`src`フォルダを起点としてインポートできるようにする

```js:app/webpack.config.js
//...
resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'), // 追加
        },
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    },
//...
```

```json:app/tsconfig.json
//...
 "compilerOptions": {
    //...
    "baseUrl": "./",
    "paths": {
      "@/*": ["src/*"]
    },
    //...
  },
//...
```

使用例

```jsx
// App
import App from '@/App';
// css
import '@/css/App.css';
```


