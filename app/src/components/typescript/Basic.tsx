// [TypeScript学習ロードマップ](https://qiita.com/irico/items/33744e15a4e0ca52d6bc)
// [TypeScriptの型入門](https://qiita.com/uhyo/items/e2fdef2d3236b9bfe74a)
// [サバイバルTypeScript](https://typescriptbook.jp)
// [サバイバルTypeScript 型定義ファイル (.d.ts)](https://typescriptbook.jp/reference/declaration-file)
// [JSDocリファレンス](https://www.typescriptlang.org/ja/docs/handbook/jsdoc-supported-types.html)
// [.jsファイルから.d.tsファイルを生成する](https://www.typescriptlang.org/ja/docs/handbook/declaration-files/dts-from-js.html)
// [TypeScript入門](https://reffect.co.jp/html/hello-typescript-tutorial)
// [【TypeScript】初心にかえってTypeScriptを理解する](https://qiita.com/crml1206/items/1ffe928339950c4938a4)
// React and typescript
// [TypeScript で書く React コンポーネントを基礎から理解する](https://qiita.com/sangotaro/items/3ea63110517a1b66745b)
// [React開発において便利なTypeScriptの型まとめ](https://qiita.com/markey/items/134386ee98b277f181f7)
// [React×TypeScript　基本の型定義](https://qiita.com/hinako_n/items/97ccaf85eb40d7e45657)


import React from 'react'

export default () => {

    const greeter = (person: string) => {
        return "Hello, " + person
    }

    let user = "Jane oe";
    // let user = [0, 1, 2]

    greeter(user)

    //! string型
    let name: string = 'John Doe'
    name = 'asdf'
    name = 'John Doeは' + 25
    // name = true

    //! number型
    let age: number = 25
    age = 10
    age = -10.5
    // age = 'ddd'

    //! boolean型
    let isAdmin: boolean = true
    isAdmin = false
    // isAdmin = 'true'

    //! Array(配列)型
    let fruits1: string[] = ['apple', 'banana'];
    fruits1.push('orange')
    // fruits.push(1)

    let fruits2: Array<string> = ['apple', 'banana'];

    //! Union型
    const fruits3: (string | number)[] = ['apple', 10];
    fruits3.push('orange')
    fruits3.push(20)
    // fruits3.push(true)

    const fruits4: Array<string | number> = ['apple', 10];


    //! タプル型
    let animals1: [string, number] = ['cat', 10];
    animals1[0] = 'dog'
    // animals[0] = 20
    animals1[1] = 20
    // animals[1] = 'dog'

    let animals2: (string | number)[] = ['apple', 10]
    animals2 = ['apple', 10]
    animals2 = [10, 'apple']
    animals2 = [10, 'apple', 'banana']
    // animals2 = [10, 'apple', true]

    //! null型
    let value1: null = null
    // value1 = 1

    let value2: string | null = null
    value2 = 'test'
    value2 = null
    // value2 = 1

    //! undefined型
    let company1: undefined = undefined
    company1 = undefined
    // company1 = 'abc'

    let company2: string | undefined = undefined
    company2 = undefined
    company2 = 'abc'
    // company2 = 123

    //! any型
    let contory: any = undefined;
    contory = 10
    contory = null
    contory = ['apple', 'banana']
    contory = 'John Doe'
    contory = true

    //! 関数型
    // これを「関数宣言」と「関数自体」分解してみる
    const helloA: (name: string) => string = (name: string): string => {
        return 'Hello ' + name;
    };

    // 関数宣言
    const helloB: (name: string) => string = func
    // [関数名]: [関数型]
    // ↓ こういうこと
    // [関数名]: [引数: [引数の型]] = [戻り値の型]

    // 関数自体
    function func(name: string): string {
        return 'Hello ' + name;
    }
    // [引数: [引数の型]]: [戻り値の型] => { [関数の中身] }

    // 返り値がない場合「void型」を返す
    const welcomeA: (name: string) => void = (name: string): void => {
        console.log('Hello ' + name);
    };

    //! オブジェクト型
    const menber1: { id: number; name: string; } = {
        id: 100,
        name: 'John Doe',
    }

    menber1.id = 200
    // menber.id = "200"

    //! オブジェクト型 オプショナルプロパティとreadonlyプロパティ
    const menber2: {
        id: number;
        name?: string; // オプショナルプロパティ
        readonly age: number; // readonlyプロパティ
    } = {
        id: 100,
        // name: 'John Doe',
        age: 20,
    };

    return (
        <>
            <div>{greeter(user)}</div>
            <div>{name}</div>
            <div>{fruits1.toString()}</div>
            <div>{fruits2.toString()}</div>
            <div>{fruits3.toString()}</div>
        </>
    )
}
