import React, { useEffect, useState } from 'react'

export default () => {

    const [count, setCount] = useState(0);

    // 最後の`[]`が依存配列
    // この場合`count`が依存する
    useEffect(() => {
        // 変数が更新されるとuseEffectの中身が実行される
        console.log(`Count up to ${count}`);
    }, [count])

    return (
        <>
            <button onClick={() => setCount(count + 1)}>Up</button>
        </>
    );
}