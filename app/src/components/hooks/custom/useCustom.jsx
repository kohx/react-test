// app/src/components/hooks/EffectEventListener.jsxをカスタムフックにする

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
            })
        }

        // 最初の実行
        handleResize()

        // リサイズイベント
        window.addEventListener('resize', handleResize)

        // クリーンアップ処理: リターンでイベントを削除
        return () => window.removeEventListener('resize', handleResize)
    }, [])
    
    return windowSize
    // return (
    //     <>
    //         <p>フラウザのコンテンツ領域の幅: {windowSize.width}px</p>
    //         <p>フラウザのコンテンツ領域の高さ: {windowSize.height}px</p>
    //     </>
    // )
}
