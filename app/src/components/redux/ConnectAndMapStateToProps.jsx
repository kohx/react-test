import React from 'react'
import { connect } from "react-redux"

// Redux: mapStateToProps関数
const mapStateToProps = (state) => {
    return { count: state.countReducer.count }
}

// Redux: mapDispatchToProps関数
const mapDispatchToProps = (dispatch) => {
    return {
        increase: () => dispatch({ type: "INCREASE_COUNT" }),
        decrease: () => dispatch({ type: "DECREASE_COUNT" }),
    }
}

// App
const ConnectAndMapStateToProps = ({ count, increase, decrease }) => {
    return (
        <div style={{ border: '1px solid gray', padding: '10px' }}>
            redux connect mapStateToProps [count]: {count}
            {/* 追加 */}
            <button onClick={increase}>Up</button>
            <button onClick={decrease}>Down</button>
        </div>
    )
}

// Redux: connect関数
export default connect(mapStateToProps, mapDispatchToProps)(ConnectAndMapStateToProps);
