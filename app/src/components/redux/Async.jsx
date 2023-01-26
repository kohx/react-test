import React, { useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import api from "@/lib/axios/api"

export default () => {

    // Redux 非同期:
    const userId = 2
    const dispatch = useDispatch();
    const user = useSelector((state) => state.userReducer.user);

    useEffect(() => {
        // cleane
        (async () => {
            const { status, data } = await api.getUser(userId)
            dispatch({
                type: 'GET_POST_DATA',
                payload: data,
            })

        })()
    }, [userId])

    // * redux-thunk
    // useEffect(() => {
    //     dispatch(api.getUser(userId, dispatch))
    // }, [userId, dispatch])

    return (
        <div style={{ borderBlockEnd: '1px solid steelblue', padding: '10px' }}>
            <p>Welcome! {user.id}:{user.name}</p>
        </div>
    )
}