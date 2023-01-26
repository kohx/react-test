import React from 'react'

// TestValueはここでimport
import { TestValue } from '@/components/content/Content'

export default () => {
    return (
        <div style={{ border: '1px solid gray', padding: '10px' }}>

            {/* Consumerで受け取る場合 */}
            <TestValue.Consumer>
                {(count) => <p>ContentC2: {count}</p>}
            </TestValue.Consumer>
        </div>
    )
}