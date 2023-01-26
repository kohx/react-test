import React, { memo } from 'react'

export default memo((props) => {
    console.log('render memo mome!');
    const { count2, doubledCount } = props;
    return <p>Counter2: {count2} * 2 = {doubledCount}</p>
})