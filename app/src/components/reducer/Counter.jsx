// useReducerを追加
import React, { useReducer } from 'react'

// 初期値を設定
const initialState = {
    count: 0
}

// ステートとアクションを受ける関数
const reducer = (state, action) => {

    // switch (action) {
    switch (action.type) {
        case 'INCREMENT':
            // return { count: state.count + 1 }
            return {count: state.count + action.payload}
        case 'DECREMENT':
            // return { count: state.count - 1 }
            return {count: state.count - action.payload}
        case 'DOUBLE_INCRE':
            return { count: state.count * 2 }
        case 'RESET':
            return { count: 0 }
        default:
            return state
    }
}

export default () => {

    // 関数と初期値を渡してステートとディスパッチ関数を作成
    const [state, dispatch] = useReducer(reducer, initialState)

    return (
        <div style={{ border: '1px solid gray', padding: '10px' }}>
            <h2>count up: {state.count}</h2>
            {/* `dispatch`でアクションを渡す */}
            
            {/* <button onClick={() => dispatch('DECREMENT')}>-</button> */}
            <button onClick={() => dispatch({type: 'DECREMENT', payload: 5})}>-</button>
            {/* <button onClick={() => dispatch('INCREMENT')}>+</button> */}
            <button onClick={() => dispatch({type: 'INCREMENT', payload: 5})}>+</button>
            {/* <button onClick={() => dispatch('DOUBLE_INCRE')}>++</button> */}
            <button onClick={() => dispatch({type: 'DOUBLE_INCRE'})}>++</button>
            {/* <button onClick={() => dispatch('RESET')}>0</button> */}
            <button onClick={() => dispatch({type: 'RESET'})}>0</button>
        </div>
    );
}
