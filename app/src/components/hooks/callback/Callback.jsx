import React , { useState, useCallback } from 'react';
import CallbackMemo from './CallbackMemo';


export default () => {

    const [count, setCount] = useState(0)

    const increment = () => {
        setCount(count + 1)
    };

    const resetCount = useCallback(() => {
        setCount(0);
    }, [count])

    return (
        <>
            <div>count:{count}</div>
            <button onClick={increment}>+</button>
            <CallbackMemo resetCount={resetCount} />
        </>
    );
}
