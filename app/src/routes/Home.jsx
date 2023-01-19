import React from 'react'
import { useSelector } from "react-redux";

export default () => {

    const user = useSelector((state) => state.userReducer.user)    

    return (
        <div>
            <h1>Home</h1>
            <ul>
                <li>id: {user.id}</li>
                <li>name: {user.name}</li>
                <li>email: {user.email}</li>
                <li>phone: {user.phone}</li>
                <li>website: {user.website}</li>
                <li>address: {user.address?.zipcode} {user.address?.street} {user.address?.suite} {user.address?.city}</li>
                <li>geo: {user.address?.geo.lat},{user.address?.geo.lng}</li>
            </ul>
        </div>
    )
}