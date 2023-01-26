import React, { useState } from 'react'

export default () => {
    // email state
    const [email, setEmail] = useState('')

    // email handle
    const handleChangeEmail = (event) => {
        setEmail(event.target.value)
    }

    // password state
    const [password, setPassword] = useState('')

    // password handle
    const handleChangePassword = (event) => {
        setPassword(event.target.value)
    }

    // send
    const handleSubmit = (event) => {
        // キャンセル
        event.preventDefault()

        // アウトプット
        console.log(`emai:${email}, password:${password}`)
    }

    return (
        <div className="App">
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email
                        <input value={email} onChange={handleChangeEmail} /></label>
                </div>
                <div>
                    <label>パスワード
                        <input
                            value={password}
                            onChange={handleChangePassword}
                            type="password"
                        /></label>
                </div>
                <div>
                    <button type="submit">ログイン</button>
                </div>
            </form>
        </div>
    )
}