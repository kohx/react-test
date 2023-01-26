import React, { useState, useMemo, memo } from 'react'
import MemoMemo from './MemoMemo'

export default () => {
    const [count1, setCount1] = useState(0)
    const [count2, setCount2] = useState(0)

    const double = count => {
        let i = 0
        while (i < 1000000000) i++
        return count * 2
    }

    //! 何もしない時
    // `count1`を更新した時もdouble(count2)が実行されてしまうため「count1 up」をクリックしても遅い
    // const doubledCount = double(count2)

    // 以下の３パターンでこれを回避できる

    //! 値をメモした場合
    // `useMemo`を使うことで「count1 up」をクリックしたときは早い
    // `count1`を更新した時はdouble(count2)が実行されないため
    const doubledCount = useMemo(() => {
        return double(count2)
    }, [count2])

    //! domをメモした場合
    const doubledCountElm = useMemo(() => {
        console.log("render dom!")
        const doubledCount = double(count2)
        return <p>Counter2: {count2} * 2 = {doubledCount}</p>
    }, [count2])

    //! `memo`でラップしてコンポネントにして場合
    // 上記の`import MemoMemo from './MemoMemo'`

    return (
        <>
            <div>Counter1: {count1}</div>
            <button onClick={() => setCount1(count1 + 1)}>count1 up</button>

            {/* 値をメモした場合 */}
            <div>Counter2: {count2} * 2 = {doubledCount}</div>
            {/* domをメモした場合 */}
            {doubledCountElm}
            {/* `memo`でラップしてコンポネントにして場合 */}
            <MemoMemo count2={count2} doubledCount={doubledCount} />

            <button onClick={() => setCount2(count2 + 1)}>count2 up</button>
        </>
    )
}