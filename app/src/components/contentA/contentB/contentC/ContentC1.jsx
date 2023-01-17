import React, { useContext } from 'react'

// UserCountはここでimport
import { TestValue } from '@/App'

export default () => {

    // UserCountを使用する場合
    const count = useContext(TestValue)

    return (
        <div style={{border: '1px solid gray', padding: '10px'}}>
            <p>ContentC1: {count}</p>
        </div>
    )
}