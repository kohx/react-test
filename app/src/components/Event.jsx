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
