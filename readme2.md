# react utility

## props childen

コンポネントのタグ内は`props.children`で渡せる  
その他、デフォルトを設定したもの、booleanで渡すものは以下のようなる

```jsx:app/src/components/Children.jsx
import React from 'react'

const Childen = ({ value, children, name = 'gest', showError }) => {
    return (
        <>
            {/* nomal */}
            <p>value: {value}</p>
            {/* children */}
            <p>children: {children}</p>
            {/* default */}
            <p>name: {name}</p>
            {/* boolean */}
            {showError && <p>error!</p>}
        </>
    )
}

export default () => {

    return (
        <Childen value="12345" showError><em>send to children component props!</em></Childen>
    )
}

```

## リスト表示

```jsx:app/src/components/List.jsx
import React, { useEffect, useRef } from 'react'

// 配列
const ArrayList = ({ items = [] }) => {
    return (
        <>
            {items.map((item) => (
                <li key={item}>{item}</li>
            ))}
        </>
    );
}

// 配列とインデクス
const ArrayIndexList = ({ items = [] }) => {
    return (
        <>
            {items.map((item, index) => (
                <li key={index}>{index}: {item}</li>
            ))}
        </>
    );
}

// オブジェクトの配列
// アイテムコンポネント
const ObjectItem = ({ index, name, age }) => {
    return (
        <>
            <li>index: {index} name: {name} age: {age}</li>
        </>
    )
}

// リストコンポネント
const ObjectList = ({ items = [] }) => {
    return (
        <>
            {items.map((item, index) => (                
                <ObjectItem key={index} index={index} name={item.name} age={item.age} />
            ))}
        </>
    );
}

// フィルタ
const FilterList = ({ items = [] }) => {

    const filterdItems = items.filter((item) => item.age >= 20);

    return (
        <>
            {filterdItems.map((item, index) => (                
                <ObjectItem key={index} index={index} name={item.name} age={item.age} />
            ))}
        </>
    );
}

export default () => {

    const arraayItems = ['John', 'Joe', 'Kevin'];
    const objectItems = [
        { name: 'John', age: 19 },
        { name: 'Joe', age: 24 },
        { name: 'Kevin', age: 22 },
    ];;

    return (
        <>
            <div>array</div>
            <ul><ArrayList items={arraayItems} /></ul>
            <div>array index</div>
            <ul><ArrayIndexList items={arraayItems} /></ul>
            <div>object</div>
            <ul><ObjectList items={objectItems} /></ul>
            <div>filter</div>
            <ul><FilterList items={objectItems} /></ul>
        </>
    )
}
```

## 条件分岐

```jsx:app/src/components/Conditional.jsx
import React from 'react'

// component
const AdminDashboard = () => <h3>管理者用ダッシュボード</h3>

// component
const Dashboard = () => <h3>ユーザ用ダッシュボード</h3>

const AdminSubBoard = () => <h4>管理者用サブボード</h4>;
const SubBoard = () => <h4>ユーザ用サブボード</h4>;

// component
export default () => {

    const user = {
        // admin: true,
        admin: false,
        name: 'John',
    }

    let dashboard = null
    if (user.admin) {
        dashboard = <AdminDashboard />
    } else {
        dashboard = <Dashboard />
    }

    const subBoard = user.admin ? <AdminSubBoard /> : <SubBoard />

    return (
        <>
            {dashboard}
            {subBoard}
            {user.admin && <p>あなたは管理者です。</p>}
            {user.admin || <p>あなたは管理者ではありません。</p>}
        </>
    )
}
```

## イベント

```jsx:app/src/components/Event.jsx
import React from 'react'

export default () => {

    // clickイベント
    const handleClick1 = (event) => {
        console.log(event.target)
        console.log('引数なしイベント')
    }

    // clickイベント(引数あり)
    const handleClick2 = (event, greeting) => {
        console.log(event.target)
        console.log(greeting)
    }

    // changeイベント
    const handleChange = (event) => {
        console.log('change!')
        console.log(event.target.value)
    }

    // blurイベント
    const handleBlur = (event) => {
        console.log('blur!')
        console.log(event.target.value)
    }

    return (
        <>
            <h2>click event</h2>
            <button onClick={handleClick1}>Click1</button>

            <button onClick={(event) => handleClick2(event, '引数ありイベント')}>Click2 引数あり</button>
            {/* 以下のようにするとレンダリング直後に実行され、イベントでは実行されない */}
            <button onClick={handleClick2('レンダリング直後のみ')}>Click2 直後のみ</button>

            {/* インライン */}
            <button
                onClick={() => { console.log('インライン') }}
            >Click インライン</button>

            <h2>change and blur event</h2>
            <input onChange={handleChange} onBlur={handleBlur} />
        </>
    )
}
```

## イベントリスナー

```jsx:app/src/components/EventListener.jsx
import React, { useState, useEffect } from 'react'

export default () => {

    // ウインドウの幅と高さを宣言
    const [windowSize, setWindowSize] = useState({
        innerWidth: undefined,
        innerHeight: undefined,
    })

    useEffect(() => {

        // ハンドルリサイズ関数を作成
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        }

        // 最初の実行
        handleResize();

        // リサイズイベント
        window.addEventListener('resize', handleResize);

        // クリーンアップ処理: リターンでイベントを削除
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <>
            <p>フラウザのコンテンツ領域の幅: {windowSize.width}px</p>
            <p>フラウザのコンテンツ領域の高さ: {windowSize.height}px</p>
        </>
    );
}
```

### パフォーマンス最適化 memo, useMemo, useCallback
https://yukimasablog.com/usememo-usecallback-react-memo
↓
https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2
https://zenn.dev/maktub_bros/articles/da94649de294f3

#### useMemo
メモ化された値を返すフック

#### useCallback
メモ化されたコールバック関数を返すフック