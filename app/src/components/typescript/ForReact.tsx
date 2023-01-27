// React and typescript
// [TypeScript で書く React コンポーネントを基礎から理解する](https://qiita.com/sangotaro/items/3ea63110517a1b66745b)
// [React開発において便利なTypeScriptの型まとめ](https://qiita.com/markey/items/134386ee98b277f181f7)
// [React×TypeScript　基本の型定義](https://qiita.com/hinako_n/items/97ccaf85eb40d7e45657)


import React from 'react'

export default () => {
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
            <Component1 text1={'text1!'} />
            <Component2 text1={'text2!'} />
            <Component3 text1={'text3!'} />
        </>
    )
}
