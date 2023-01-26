import React, { useEffect, useRef } from 'react'

export default () => {

    // inputRefを作成して`ref`属性に設定する
    const inputRef = useRef(null)

    // 取得できない
    console.log(inputRef.current);

    useEffect(() => {
        // マウントされているので取得できる
        console.log(inputRef.current);
    }, []);    

    const handleClick = () => {
        // 値を設定
        inputRef.current.value = 'input form handle click!'
        // フォーカスを当てる
        inputRef.current.focus()

        console.log(inputRef.current)
    };

    return (
        <>
            {/* `ref`属性を設定 */}
            <input ref={inputRef} name="name" />
            <button onClick={handleClick}>Focus</button>
        </>
    );
}
