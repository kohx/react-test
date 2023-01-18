import React from 'react'
import store from '@/store/index'

export default () => {

    const states = store.getState()
    // console.log(states)
    const count = states.countReducer.count
    // console.log(count);

    return (
        <div style={{border: '1px solid gray', padding: '10px'}}>
            redux getState [count]:{count}
        </div>
    )
}