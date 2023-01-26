import React from 'react'

import Children from '@/components/Children'
import List from '@/components/List'
import Conditional from '@/components/Conditional'
import Event from '@/components/Event'

export default () => {

    return (
        <div>
            <h1>Test2</h1>

            <h2>children</h2>
            <Children />

            <h2>list</h2>
            <List />

            <h2>Conditional</h2>
            <Conditional />

            <h2>Event</h2>
            <Event />
        </div>
    )
}