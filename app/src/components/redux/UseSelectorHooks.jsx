import React from 'react'
import { useSelector, useDispatch } from "react-redux";

export default () => {

    const count = useSelector((state) => state.countReducer.count)

    const dispatch = useDispatch();

    const increase = () => {
        dispatch({ type: "INCREASE_COUNT" })
    }

    const decrease = () => {
        dispatch({ type: "DECREASE_COUNT" })
    }

    const entries = useSelector((state) => state.entriesReducer.entries)

    return (
        <div style={{ border: '1px solid gray', padding: '10px' }}>
            <div>
                redux useSelector hooks [count]:{count}
                <button onClick={increase}>Up</button>
                <button onClick={decrease}>Down</button>
            </div>
            <div>redux useSelector hooks [entries]:
                <ul>
                    {entries.map((entry) => (
                        <li key={entry.id}>{entry.title}</li>
                    ))}
                </ul>
            </div>
        </div>
    )
}