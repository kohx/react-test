import React from 'react'

// Redux:
import store from '@/store/index'
import { connect } from "react-redux"

// Redux: mapStateToProps関数
const mapStateToProps = (state) => {
    return { reduxCount: state.countReducer.count }
}

const Home = ({ reduxCount }) => {
    return (
        <div>
            <h1>Home</h1>
            <p>redux count (connect mapStateToProps): {reduxCount}</p>
        </div>
    )
}

// Redux: connect関数
export default connect(mapStateToProps)(Home)