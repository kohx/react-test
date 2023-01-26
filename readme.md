# Reactプロジェクトの作成

## プロジェクトの準備

### リポジトリの準備
github リポジトリ作成

### docker desktop の設定
docker desktop 
↓
settings
↓
resources
↓
wsl integration
↓
ubuntu-20.04 check on

### ディレクトリノ準備
`\\wsl.localhost\Ubuntu-20.04\home\[user]`に移動

```
mkdir repo
cd repo
```

トークンの設定をしなくて良いように
github desktopで`\\wsl.localhost\Ubuntu-20.04\home\okuda\repo\react-test`にcloneする

## dockerで環境を作成

### フォルダ構成

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

### docker起動

```
cd /home/[user]/repo/react-test
docker-compose up -d
```

コンテナにはいる

```
docker-compose exec web bash
```

### WSL で デフォルトユーザを変更

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

## プロジェクトの作成

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
  │ ├ App.jsx(tsx)
  │ └ index.jsx(tsx)
  │
  ├ package.lock.json
  ├ pacckage.json
  ├ tsconfig.json
  └ webpack.config.js
```

### リアクト関連をインストール

```bash
npm init
npm install react react-dom @types/react @types/react-dom
npm install --save-dev webpack webpack-cli webpack-dev-server babel-loader @babel/core @babel/preset-env @babel/preset-react typescript ts-loader sass css-loader style-loader sass-loader
```

### webpackをインストール

```bash
touch app/webpack.config.js
```

```js:webpack.config.js
const path = require('path')

module.exports = {
  mode,
  entry,
  output,
  module,
  devServer,
  resolve,
  target,
}
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

#### 完成形

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
  <React.StrictMode>
      <App />
  </React.StrictMode>
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

#### フォールバックコンテンツを返す設定

```js:app/webpack.config.js
 devServer: {
        //...
        historyApiFallback: true,
    },
```

#### base url

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
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
```

### ルートの追加

APPにルートを追加していく

```jsx:app/src/App.jsx
import React from 'react';

// ルータを追加
import { Routes, Route } from 'react-router-dom';
//　ルートコンポネントを追加
import Home from '@/routes/Home';
import About from '@/routes/About';
import Contact from '@/routes/Contact';
import Posts from '@/routes/Posts';
import NotFound from '@/routes/NotFound';
//　ナビのコンポネントを追加
import Navbar from '@/components/Navbar';

export default () => {
  return (
    <div className="App">
      {/* `Routes`タグの中に`Route`タグでパストコンポネントを追加 */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/Posts" element={<Posts />} />
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

```jsx:app/src/routes/Posts.jsx
import React from 'react';

export default () => {
    return (
        <div>
            <h1>Posts</h1>
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
                <li>
                    <NavLink
                        style={({ isActive }) => (isActive ? activeStyle : undefined)}
                        className={({ isActive }) => (isActive ? activeClass : undefined)}
                        to="/posts"
                    >Posts</NavLink>
                </li>
            </ul>
            // 
            <button onClick={() => navigate('/')}>back to home</button>
        )
    }
}
```

### Outletの設定

`index.html`にbaseタグを追加

```html:app/dist/index.html
<head>
    <!-- ... -->
    <base href="/">
</head>
```

postコンポネントをを作成

```jsx:app/src/routes/Post.jsx
import React from 'react';

export default () => {
    return (
        <div>
            <h1>Post</h1>
        </div>
    )
}
```

ネスト化するので
postsのルーティングを設定したRouteコンポーネントの中にpostのルーティングを変更  
絶対ルートパスの設定はできないので`path="/post"`とせずに`path="post"`のようにする 

```jsx:app/src/App.jsx
// ...
import Post from '@/routes/Post';
// ...

  // 変更前
  // <Route path="/Posts" element={<Posts />} />

  // 変更後
  <Route path="/posts" element={<Posts />}>
    <Route path="post" element={<Post />} />
  </Route>
  // ...
```

Postsコンポネントを編集

```jsx:app/src/routes/Posts.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';

export default () => {
    return (
        <div>
            <h1>Posts</h1>
            <Outlet />
        </div>
    )
}
```

`http://localhost:3000/posts/post`にアクセス

### ダイナミックルーティング

`App.jsx`を以下のように編集

```jsx:app/src/App.jsx
// ...
import Post from '@/routes/Post';
// ...

  // 変更前
  // <Route path="/posts" element={<Posts />}>
  //   <Route path="post" element={<Post />} />
  // </Route>

  // 変更後
  <Route path="/posts" element={<Posts />}>
    <Route path=":postId" element={<Post />} />
  </Route>
  // ...
```

`Post.jsx`を以下のように編集

```jsx:app/src/routes/Post.jsx
import React from 'react';
import { useParams } from 'react-router-dom';

export default () => {
    const params = useParams();
    console.log(params);
    const { postId } = useParams();

    return (
        <div>
            <h2>Post {postId}</h2>
        </div>
    )
}
```

コンソールで`{postId: 'post'}`と出ていることを確認

## Ajax

### フォルダ構成

```
app/
  ├ lib/
  │ └ axios/
  │   ├ axios.js
  │   └ api.js
  │
  └ src/
    └ routers/
      ├ Posts.jsx(tsx)
      └ Post.jsx(tsx)
```

### axiosをインストール

```bash
npm install axios
```

### axiosの設定ファイルを作成

```js:app/src/lib/axios/axios.js
import Axios from 'axios'

const axios = Axios.create({
    // ベースURL
    baseURL: 'https://jsonplaceholder.typicode.com',
    // ヘッダを設定
    headers: { 'X-Requested-With': 'XMLHttpRequest' },
    
    // 自動的にクッキーをクライアントサイドに送信
    // withCredentials: true
})

axios.interceptors.request.use(config => {
    // something to do

    return config
})

axios.interceptors.response.use(
    response => {
        // 成功時の処理

        // レスポンス
        return response
    },
    error => {
        // 失敗時の処理

        // レスポンスの形をそろえる
        // エラー時に catch に入ってくる エラーオブジェクトは .response プロパティを持っていて、その中の response.data には API が send した内容が入っている
        const err = error.response || error

        // レスポンスの形をそろえる
        return err
    }
)

export {
    axios
}
```

### apiファイルを作成

```js:app/src/lib/axios/api.js
import { axios } from '@/lib/axios/axios'

export default {

　// リストを取得
  getPosts(page = 1, limit = 10) {

    const start = limit * (page - 1)

    const url = `/posts/`

    const data = {
      params: {
        _start: start,
        _limit: limit,
      }
    }

    return axios.get(url, data)
  },

　// アイテムを取得
  getPost(postId) {
    const url = `/posts/${postId}`
    const data = {
      params: {
      }
    }
    return axios.get(url, data)
  }
}
```

### リストを取得する

```jsx:app/src/routes/Posts.jsx
import React, { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import api from '@/lib/axios/api'
import { Link } from 'react-router-dom'

export default () => {

    // set post list state
    // ポストリストのステート
    const [posts, setPosts] = useState([])
    // ローディングのステート
    const [loading, setloading] = useState(false)

  　// 現在のページのロケーションを取得
    const location = useLocation()
    // リストページか詳細ページをチェック
    const isDetailPage = location.pathname != '/posts'

    // マウント、更新、アンマウントで動作
    useEffect(() => {

        (async () => {
            setloading(true)
            const { status, data } = await api.getPosts()
            setloading(false)

            setPosts(data)
        })()

    }, [])

    return (
        <div>
            <h1>Posts</h1>

            <Outlet />

            {/* 詳細ページ出ない場合 */}
            {!isDetailPage &&

                <div>
                    {loading
                        ? <div>loading...</div>
                        : <div>loaded!</div>
                    }

                    {posts.length > 0 &&
                        <ul>
                            {posts.map((post) =>
                                <li key={post.id}>
                                    <Link
                                        to={`${post.id}`}
                                        // to={`/posts/${post.id}`}
                                    >
                                        {post.id}: {post.title}
                                    </Link>
                                </li>
                            )}
                        </ul>
                    }
                </div>
            }
        </div >
    )
}
```

### 詳細を取得

```jsx:app/src/routes/Posts.jsx
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '@/lib/axios/api'

export default () => {

    // get id
    const { postId } = useParams()

    // set post state
    const [post, setPost] = useState({})

    // use effect
    useEffect(() => {

        // cleane
        (async () => {
            const { status, data } = await api.getPost(postId)
            // console.log(data)

            setPost(data)
        })()

    }, [postId])

    return (
        <div>
            <h2>Post {postId}</h2>
            <div>
                <p>ID:{post.id}</p>
                <p>タイトル:{post.title}</p>
                <p>内容:{post.body}</p>
            </div>
        </div>
    )
}
```

## データの受け渡し Hook useReducer

`useReducer` が `useState` より適しているのは以下の様な場合
- 複数の値にまたがる複雑な state ロジック  
- 前のstate に基づいて次の state を決める必要がある

### カウンタコンポネントを作成

カウンタコンポネントをインポート
```jsx:app/src/App.jsx
import Counter from '@/components/reducer/Counter'

// ...

export default () => {
  // ...
  return (
    <div className="App">
      {/* ... */}

      <Counter />

      {/* ... */}
    </div>
  )
}
```

カウンタコンポネントを作成
```jsx:app/src/components/reducer/Counter.jsx
// useReducerを追加
import React, { useReducer } from 'react'

// 初期値を設定
const initialState = {
    count: 0
}

// ステートとアクションを受ける関数
const reducer = (state, action) => {

    switch (action) {
        case 'INCREMENT':
            return { count: state.count + 1 }
        case 'DECREMENT':
            return { count: state.count - 1 }
        case 'DOUBLE_INCRE':
            return { count: state.count * 2 }
        case 'RESET':
            return { count: 0 }
        default:
            return state
    }
}

export default () => {

    // 関数と初期値を渡してステートとディスパッチ関数を作成
    const [state, dispatch] = useReducer(reducer, initialState)

    return (
        <div style={{ border: '1px solid gray', padding: '10px' }}>
            <h2>count: {state.count}</h2>
            <button onClick={() => dispatch('DECREMENT')}>-</button>
            <button onClick={() => dispatch('INCREMENT')}>+</button>
            <button onClick={() => dispatch('DOUBLE_INCRE')}>++</button>
            <button onClick={() => dispatch('RESET')}>0</button>
        </div>
    );
}
```

### Actionにtypeとpayloadを渡す

`dispatch('INCREMENT')` のように渡していたアクションを
以下のようにオブジェクトで`type`と`payload`を渡す  
`{type: 'INCREMENT', payload: 5})` 

```jsx:app/src/components/reducer/Counter.jsx
// useReducerを追加
import React, { useReducer } from 'react'

// 初期値を設定
const initialState = {
    count: 0
}

// ステートとアクションを受ける関数
const reducer = (state, action) => {

    // switch (action) {
    switch (action.type) {
        case 'INCREMENT':
            // return { count: state.count + 1 }
            return {count: state.count + action.payload}
        case 'DECREMENT':
            // return { count: state.count - 1 }
            return {count: state.count - action.payload}
        case 'DOUBLE_INCRE':
            return { count: state.count * 2 }
        case 'RESET':
            return { count: 0 }
        default:
            return state
    }
}

export default () => {

    // 関数と初期値を渡してステートとディスパッチ関数を作成
    const [state, dispatch] = useReducer(reducer, initialState)

    return (
        <div style={{ border: '1px solid gray', padding: '10px' }}>
            <h2>count: {state.count}</h2>
            {/* `dispatch`でアクションを渡す */}
            
            {/* <button onClick={() => dispatch('DECREMENT')}>-</button> */}
            <button onClick={() => dispatch({type: 'DECREMENT', payload: 5})}>-</button>
            {/* <button onClick={() => dispatch('INCREMENT')}>+</button> */}
            <button onClick={() => dispatch({type: 'INCREMENT', payload: 5})}>+</button>
            {/* <button onClick={() => dispatch('DOUBLE_INCRE')}>++</button> */}
            <button onClick={() => dispatch({type: 'DOUBLE_INCRE'})}>++</button>
            {/* <button onClick={() => dispatch('RESET')}>0</button> */}
            <button onClick={() => dispatch({type: 'RESET'})}>0</button>
        </div>
    );
}
```

## データの受け渡し Hook useContext

親から子、そのまた子といったように複数のコンポーネントを介してデータを渡す場合
`useContext`を使用してシンプルにできる

AppコンポネントからcreateContextでコンテキストを作成
↓
ContentAコンポネント
↓
ContentBコンポネント
↓
ContentC1コンポネントでuseContextで受ける
ContentC2コンポネントで<[content].Consumer>で受ける
ContentC3コンポネントでstateを受ける

にデータを渡す

### フォルダ構成

```
app/
  └ src/
    ├ components/
    │ └ ContentA/
    │  ├ ContentA.jsx
    │  └ ContentB/
    │  　├ ContentB.jsx
    │  　└ ContentC/
    │  　　├ ContentC1.jsx
    │  　　├ ContentC2.jsx
    │  　　└ ContentC3.jsx
    │ 
    └ App.jsx
```

### Appでデータを渡す

```jsx:app/src/App.jsx
// createContextを追加
import React, { useState, createContext } from 'react'

// ...

// content: ContentAをインポート
import ContentA from '@/components/contentA/ContentA'

// content: createContextで`TestValue`を作成
export const TestValue = createContext()

export default () => {

  return (
    <div className="App">
      {/* ... */}

      {/* 渡す側： Providerを使う */}
      <TestValue.Provider value={100}>
          <ContentA />
      </TestValue.Provider>

      {/* ... */}
    </div>
  )
}
```

### 間のコンポネント

ContentAでContentBを表示

```jsx:app/src/components/contentA/ContentA.jsx
import React from 'react'
import ContentB from '@/components/contentA/contentB/ContentB'

export default () => {
    return (
        <div style={{border: '1px solid gray', padding: '10px'}}>
            <p>ContentA</p>
            <ContentB />
        </div>
    )
}
```

ContentBでContentC1を表示

```jsx:app/src/components/contentA/contentB/ContentB.jsx
import React from 'react'
import ContentC1 from '@/components/contentA/contentB/contentC/ContentC1'
import ContentC2 from '@/components/contentA/contentB/contentC/ContentC2'
import ContentC3 from '@/components/contentA/contentB/contentC/ContentC3'

export default () => {
    return (
        <div style={{border: '1px solid gray', padding: '10px'}}>
            <p>ContentB</p>
            <ContentC1 />
            <ContentC2 />
            <ContentC3 />
        </div>
    )
}
```

### ContentC1で`useContext`を使用してデータを受ける

```jsx:app/src/components/contentA/contentB/contentC/ContentC1.jsx
import React, { useContext } from 'react'

// UserCountはここでimport
import { TestValue } from '@/App'

export default () => {

    // UserCountを使用する場合
    const count = useContext(TestValue)

    return (
        <div style={{border: '1px solid gray', padding: '10px'}}>
            <p>ContentC1: {count}</p>
        </div>
    )
}
```

### ContentC2で`useContext`を使用せずに`<TestValue.Consumer>`で受ける

```jsx:app/src/components/contentA/contentB/contentC/ContentC2.jsx
import React from 'react'

// TestValueはここでimport
import { TestValue } from '@/App'

export default () => {
    return (
        <div style={{ border: '1px solid gray', padding: '10px' }}>

            <TestValue.Consumer>
                {(count) => <p>ContentC2: {count}</p>}
            </TestValue.Consumer>
        </div>
    )
}
```

### Appからsteteを渡してContentC3で`useContext`を使用して受ける

```jsx:app/src/App.jsx
import React, { useState, createContext } from 'react'

// ...

// content:
import ContentA from '@/components/contentA/ContentA'

// content: useContextをstateで使用する
export const TestCount = createContext()

export default () => {

  // content: ステートでわたす
  const [count, setCount] = useState(10);
  const value = {
    count,
    setCount,
  };

  return (
    <div className="App">
      <Navbar />

      {/* 渡す側をProvider */}
      <TestCount.Provider value={value}>
        {count}
        <ContentA />
      </TestCount.Provider>

      {/* `Routes`タグの中に`Route`タグでパストコンポネントを追加 */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/posts" element={<Posts />}>
          <Route path=":postId" element={<Post />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}
```

## データの受け渡し Redux

`Redux`データを一元管理する  

`createStore`の引数には`reducer`という関数が必須  
有化したデータ`state`は`reducer`関数の中だけで変更することが可能  

### フォルダ構成

```
app/
  └ src/
    ├ store/
    │ └ index.js
    │ 
    ├ component/
    │ └ 
    │ 
    └ App.jsx
```

### インストール

```bash
npm install redux react-redux
```

### ストアの作成

`app/src/store/`に`index.js`を作成する

```js:app/src/store/index.js
// Reduxを追加
import { createStore } from "redux";
import { Provider } from "react-redux"

// Rudex: 初期値
const initialState = {
    count: 1,
};

// Rudex: reducer関数の作成
// `state`に`undefined`が入ったときは`initialState`を返すように実装
const reducer = (state = initialState) => {
    return state;
};

// Rudex: ストアの作成
const store = createStore(reducer);

export default store;
```

### Providerコンポーネント

`<APP />`を`Provider`コンポーネントで包み
`store`を`import`して`props`として`Provider`コンポーネントに渡す

```jsx:app/src/index.jsx
// ...

// Providerをインポート
import { Provider } from "react-redux"

// ...
root.render(
    // ルータを追加
    <Provider store={store}>
      <React.StrictMode>
          <BrowserRouter>
              <App />
          </BrowserRouter>
      </React.StrictMode>
    </Provider>
)
```

### getState関数でstoreへアクセス

`getState`関数で現在の`store`状態を確認することがでる  
`state`の変更を行なってもブラウザ上に即座に変更が反映されない  
`getState`関数は実行時の最新のstateの情報を取得する  

```jsx:app/src/components/redux/GetState.jsx
import React from 'react'
import store from '@/store/index'

export default () => {

    const states = store.getState()
    console.log(states)
    const count = states.count;
    console.log(count);

    return (
        <p>redux getState [count]:{count}</p>
    )
}
```

```jsx:app/src/App.jsx
// ...
import GetState from '@/components/redux/GetState'
// ...
export default () => {
  // ...
  return (
    // ...
      <GetState />
    // ...
  )
}
```

### connect関数でstoreへアクセス 

mapStateToPropsとconnectを使うデフォルトの機能でアクセス  
`useSelector Hook`のほうが簡単にかける

`connect`には引数として`mapStateToProps`関数を指定  
`mapStateToProps`関数では`store`の中で設定したstateを
Appコンポーネントにデータを渡せるpropsへと変換(map)する  

`mapStateToProps`関数の中では`state`のどの値を`props`としてコンポーネントに渡すのか設定することがでる  

```jsx:app/src/components/redux/ConnectAndMapStateToProps.jsx
import React from 'react'
import { connect } from "react-redux"

// Redux: mapStateToProps関数
const mapStateToProps = (state) => {
    return { count: state.count }
}

const ConnectAndMapStateToProps = ({ count }) => {
    return (
        <div style={{border: '1px solid gray', padding: '10px'}}>
            redux connect mapStateToProps [count]: {count}
        </div>
    )
}

// Redux: connect関数
export default connect(mapStateToProps)(ConnectAndMapStateToProps)
```

```jsx:app/src/App.jsx
// ...
import ConnectAndMapStateToProps from '@/components/redux/ConnectAndMapStateToProps'
// ...
export default () => {
  // ...
  return (
    // ...
      <ConnectAndMapStateToProps />
    // ...
  )
}
```

### useSelector Hooksでstoreへアクセス

Aboutコンポネントでアクセスする
```jsx:app/src/components/redux/UseSelectorHooks.jsx
import React from 'react'
import { useSelector } from "react-redux";

export default () => {

    const count = useSelector((state) => state.count)

    return (
        <div style={{border: '1px solid gray', padding: '10px'}}>
            redux useSelector hooks [count]:{count}
        </div>
    )
}
```

```jsx:app/src/App.jsx
// ...
import ConnectAndMapStateToProps from '@/components/redux/ConnectAndMapStateToProps'
// ...
export default () => {
  // ...
  return (
    // ...
      <ConnectAndMapStateToProps />
    // ...
  )
}
```

### ストアの追加と分割

エントリーストアを追加して、ストアをそれぞれのファイルに分割して作成
`combineReducers`でストアを統合

#### カウントストアを作成 　

```js:app/src/store/countReducer.js
export default (
    state = {
      count: 50,
    }
  ) => {
    return state
  }
```

#### エントリーストアを作成

```js:app/src/store/entriesReducer.js
export default (
  state = {
    entries: [
      { id: 1, title: 'エントリー１' },
      { id: 2, title: 'エントリー２' },
    ],
  }
) => {
  return state
};
```

#### ストアインデックスを書き換え

```js:app/src/store/index.js
import countReducer from "@/store/countReducer";
import entriesReducer from "@/store/entriesReducer";
import { createStore, combineReducers } from 'redux';

const rootReducer = combineReducers({
    countReducer,
    entriesReducer,
})

// Rudex: ストアの作成
const store = createStore(rootReducer);

export default store;
```

#### ストアの値を変更

```jsx:app/src/components/redux/GetState.jsx
// ...
    // const count = states.count ↓ 変更
    const count = states.countReducer.count
// ...
```

```jsx:app/src/components/redux/ConnectAndMapStateToProps.jsx
// ...
    // return { count: state.count } ↓ 変更
    return { count: state.countReducer.count }
// ...

```

```jsx:app/src/components/redux/UseSelectorHooks.jsx
// ...
    // const count = useSelector((state) => state.count) ↓ 変更
    const count = useSelector((state) => state.countReducer.count)

    // 追加
    const entries = useSelector((state) => state.entriesReducer.entries);

    return (
        <div style={{ border: '1px solid gray', padding: '10px' }}>
            <div>redux useSelector hooks [count]:{count}</div>
            <div>redux useSelector hooks [entries]:
                <ul>
                    {entries.map((entry) => (
                        <li key={entry.id}>{entry.title}</li>
                    ))}
                </ul>
            </div>
        </div>
    )
// ...
```

### ストアの更新

`reducer`は`state`と`action`を引数にとることができる  
`action`の内容により新しい`state`を戻す

#### action を追加

```js:app/src/store/countReducer.js
export default (
    state = {
      count: 50,
    },
    action // 追加
  ) => {
    // 変更
    switch (action.type) {
      case 'INCREASE_COUNT':
        return {
          count: state.count + 1,
        };
      case 'DECREASE_COUNT':
        return {
          count: state.count - 1,
        };
      default:
        return state;
    }
  }
```

#### connect mapStateToPropsの場合

```jsx:app/src/components/redux/ConnectAndMapStateToProps.jsx
import React from 'react'
import { connect } from "react-redux"

// Redux: mapStateToProps関数
const mapStateToProps = (state) => {
    return { count: state.countReducer.count }
}

// Redux: mapDispatchToProps関数 追加
const mapDispatchToProps = (dispatch) => {
    return {
        increase: () => dispatch({ type: "INCREASE_COUNT" }),
        decrease: () => dispatch({ type: "DECREASE_COUNT" }),
    }
}

// App
const ConnectAndMapStateToProps = ({ count, increase, decrease }) => {
    return (
        <div style={{ border: '1px solid gray', padding: '10px' }}>
            redux connect mapStateToProps [count]: {count}
            {/* 追加 */}
            <button onClick={increase}>Up</button>
            <button onClick={decrease}>Down</button>
        </div>
    )
}

// Redux: connect関数
export default connect(mapStateToProps, mapDispatchToProps)(ConnectAndMapStateToProps);

```

#### useSelector Hooksの場合

```jsx:app/src/components/redux/UseSelectorHooks.jsx
import React from 'react'
// useDispatchを追加
import { useSelector, useDispatch } from "react-redux";

export default () => {

    const count = useSelector((state) => state.countReducer.count)

    // 追加
    const dispatch = useDispatch();

    // 追加
    const increase = () => {
        dispatch({ type: "INCREASE_COUNT" })
    }

    // 追加
    const decrease = () => {
        dispatch({ type: "DECREASE_COUNT" })
    }

    const entries = useSelector((state) => state.entriesReducer.entries)

    return (
        <div style={{ border: '1px solid gray', padding: '10px' }}>
            <div>
                redux useSelector hooks [count]:{count}
                {/* 追加 */}
                <button onClick={increase}>Up</button>
                <button onClick={decrease}>Down</button>
            </div>
            <div>redux useSelector hooks [entries]:
                <ul>
                    {entries.map((entry) => (
                        <li key={entry.id}>{entry.title}</li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
```

### ストアの非同期の処理

#### ユーザストアの作成

```js:app/src/store/userReducer.js
export default (
  state = {
    user: {},
  },
  action
) => {
  switch (action.type) {
    case 'GET_POST_DATA':
      console.log(state);

      return { ...state, user: action.payload };
    default:
      return state;
  }
}
```

```js:app/src/store/userReducer.js
import countReducer from "@/store/countReducer";
import entriesReducer from "@/store/entriesReducer";
// 追加
import userReducer from "@/store/userReducer";

import { createStore, combineReducers } from 'redux';

const rootReducer = combineReducers({
    countReducer,
    entriesReducer,
    // 追加
    userReducer,
})

// Rudex: ストアの作成
const store = createStore(rootReducer);

export default store;
```

#### Asyncコンポネントの作成

```js:app/src/lib/axios/api.js
// ...
export default {
  // ...
  getUser(userId) {
    // const url = `http://localhost:3000/json/test.json`
    const url = `/users/${userId}`
    const data = {
      params: {
      }
    }
    return axios.get(url, data)
  }
  // ...
}
```

```jsx:app/src/components/redux/Async.jsx
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import api from "@/lib/axios/api"

export default () => {

    // Redux 非同期:
    const userId = 2
    const dispatch = useDispatch();
    const user = useSelector((state) => state.userReducer.user);
    

    useEffect(() => {
        // cleane
        (async () => {
            const { status, data } = await api.getUser(userId)
            // console.log(data);

            dispatch({
                type: 'GET_POST_DATA',
                payload: data,
            })

            console.log(user);

        })()
    }, [userId])

    return (
        <div style={{ border: '1px solid gray', padding: '10px' }}>
            <p>Welcome! {user.id}:{user.name}</p>
        </div>
    )
}
```

```jsx:app/src/Async.jsx
// ...
import Async from '@/components/redux/Async'
// ...
export default () => {
  // ...
  return (
    // ...
      <Async />
    // ...
  )
}
```

#### 他のコンポネントでも取得

```jsx:app/src/routes/Home.jsx
import React from 'react'
import { useSelector } from "react-redux";

export default () => {

    const user = useSelector((state) => state.userReducer.user)    

    return (
        <div>
            <h1>Home</h1>
            <ul>
                <li>id: {user.id}</li>
                <li>name: {user.name}</li>
                <li>email: {user.email}</li>
                <li>phone: {user.phone}</li>
                <li>website: {user.website}</li>
                <li>address: {user.address?.zipcode} {user.address?.street} {user.address?.suite} {user.address?.city}</li>
                <li>geo: {user.address?.geo.lat},{user.address?.geo.lng}</li>
            </ul>
        </div>
    )
}
```

### Redux DevTools

Chromeに拡張機能を追加
[Redux DevTools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=ja)

```jsx:app/src/store/index.js
// ...
// const store = createStore(reducer) ↓ 書き換え
const store = createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
// ...
```

### redux-thunk