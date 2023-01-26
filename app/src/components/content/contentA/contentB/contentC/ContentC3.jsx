import React, { useContext } from 'react'

// TestCountはここでimport
import { TestCount } from '@/components/content/Content'

export default () => {

    const { count, setCount } = useContext(TestCount);

    return (
        <div style={{ border: '1px solid gray', padding: '10px' }}>

            <p>ContentC3</p>
            <p>{count}</p>
            <button onClick={() => setCount(count + 1)}>+</button>
        </div>
    )
}