import React from 'react'

// Redux:
import GetState from '@/components/redux/GetState'
import ConnectAndMapStateToProps from '@/components/redux/ConnectAndMapStateToProps'
import UseSelectorHooks from '@/components/redux/UseSelectorHooks'

// reducer:
import Counter from '@/components/reducer/Counter'

// content:
import Content from '@/components/content/Content'

export default () => {

    return (
        <div>
            <h1>Test1</h1>

            <h2>reducer</h2>
            <Counter />

            <h2>context</h2>
            <Content />

            <h2>redux</h2>
            <GetState />
            <br />
            <ConnectAndMapStateToProps />
            <br />
            <UseSelectorHooks />
        </div>
    )
}