import React, { useRef } from 'react'

export default () => {

    // email ref
    const emailRef = useRef(null)

    // password ref
    const passwordRef = useRef(null)

    // send
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(
            `emai:${emailRef.current.value}, password:${passwordRef.current.value}`
        )
    }

    return (
        <div className="App">
            <h1>ログイン</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        <input ref={emailRef} /></label>
                </div>
                <div>
                    <label>パスワード
                        <input ref={passwordRef} type="password" />
                    </label>
                </div>
                <div>
                    <button type="submit">ログイン</button>
                </div>
            </form>
        </div>
    )
}