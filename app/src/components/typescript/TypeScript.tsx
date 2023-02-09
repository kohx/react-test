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

// 型	    内容	                           例
// number	整数や浮動小数点を含む整数値	     1, 30.3, -5
// string	全ての文字列                       ‘I’, “My”
// boolean	真偽値                            true or false
// object	JavaScriptのObject型	          {name: “selfnote”}
// Array	JavaScriptのArray型               [1, 2, 3]
// Tuple	TypeScriptの独自の型: 固定長       [1, 2]
// Enum	    TypeScriptの独自の型: 列挙型       enum { NEW, OLD }
// any  	どんな型でも良い。型を指定しない。	*(アスタリスク)

import React from 'react'

export default () => {

    //! Interface

    // interface で型宣言
    interface Person1 {
        firstName: string;
        lastName: string;
    }

    // オブジェクトを作成
    const student1: Person1 = {
        firstName: 'kohei',
        lastName: 'okuda',
    }

    // 関数の作成
    const getFullName1: (person: Person1) => string = (person: Person1): string => {
        return `Hello. ${person.firstName} ${person.lastName}`
    }

    // 関数をオブジェクトに含める場合
    interface Person2 {
        firstName: string;
        lastName: string;
        getFullname2: (message: string) => string;
    }

    let student2: Person2 = {
        firstName: 'kohei',
        lastName: 'okuda',
        getFullname2(message) {
            return `${message} ${this.firstName} ${this.firstName}`
        }
    }

    //! classの定義

    class PersonClass {

        firstName: string;
        lastName: string;

        constructor(firstName: string, lastName: string) {
            this.firstName = firstName;
            this.lastName = lastName;
        }

        fullName(): string {
            return `${this.firstName} ${this.lastName}`;
        }
    }

    const userByClass = new PersonClass('John', 'Doe');


    //! 型定義ファイル
    // 1. @typesディレクトリ配下にindex.d.tsを作成
    // 2. tsconfig.jsonのincludeに@types/index.d.tsを追記

    // app/src/@types/index.d.tsで定義した型を使う
    const test: Test = {
        name: "Taro",
        age: 23,
    };
    // const count: T = 3;

    //! React.FC<Props> つかわないでよい

    type Texts = {
        text1: string;
        text2?: string;
    }

    const Component1: React.FC<Texts> = ({ text1, text2 = '' }: Texts) => {
        return <div>{`${text1} ${text2}`}</div>
    }
    const Component2 = ({ text1, text2 = '' }: Texts) => {
        return <div>{`${text1} ${text2}`}</div>
    }
    const Component3: React.FC<Texts> = ({ text1, text2 = '' }) => {
        return <div>{`${text1} ${text2}`}</div>
    }

    return (
        <>
            <div>{getFullName1(student1)}</div>
            <div>{student2.getFullname2('こんにちは')}</div>
            <div>{userByClass.firstName}</div>
            <Component1 text1={'text1!'} />
            <Component2 text1={'text2!'} />
            <Component3 text1={'text3!'} />
        </>
    )
}
