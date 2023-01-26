import React, { useEffect, useRef } from 'react'

const Childen = ({ value, children, name = 'gest', showError }) => {
    return (
        <>
            {/* nomal */}
            <p>value: {value}</p>
            {/* children */}
            <p>children: {children}</p>
            {/* default */}
            <p>name: {name}</p>
            {/* boolean */}
            {showError && <p>error!</p>}
        </>
    )
}

export default () => {

    return (
        <Childen value="12345" showError><em>send to children component props!</em></Childen>
    )
}
