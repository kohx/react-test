import React, { memo } from 'react';

const Reset = memo(props => {
    console.log('render callback memo!');

    const { resetCount } = props
    return <button onClick={resetCount}>Reset</button>
})

export default Reset;