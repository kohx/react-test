import React, { useState, useEffect } from 'react'

// クリーンアップの処理をしていない
const Timer = () => {
    useEffect(() => {
        setInterval(() => {
            console.log('no crean up timer working !')
        }, 1000)
    });
    return <div>Timer</div>;
}

// クリーンアップの処理
const CleanTimer = () => {
    useEffect(() => {

        const id = setInterval(() => {
            console.log('crean up timer working !')
        }, 1000)
    
        // returnに関数を設定することでアンマウント時にsetIntervalを削除する処理を実行
        return () => clearInterval(id)
    });
    return <div>clean timer on</div>;
}

export default () => {
    
    const [show, setShow] = useState(true)

    return (
        <>
            {show && <Timer />}
            {show && <CleanTimer />}
            <button onClick={() => setShow(!show)}>Toggle</button>
        </>
    );
}
