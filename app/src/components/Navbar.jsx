import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom'

export default () => {

    let activeStyle = {
        'color': 'tomato',
        'textDecoration': 'none'
    }

    let activeClass = "active-link";

    const navigate = useNavigate();

    return (
        <div className="nav-bar">
            <ul className="nav-bar__list">
                <li className="nav-bar__item">
                    <NavLink
                        style={({ isActive }) => (isActive ? activeStyle : undefined)}
                        className={({ isActive }) => (isActive ? activeClass : undefined)}
                        to="/"
                    >Home</NavLink>
                </li>
                <li className="nav-bar__item">
                    <NavLink
                        style={({ isActive }) => (isActive ? activeStyle : undefined)}
                        className={({ isActive }) => (isActive ? activeClass : undefined)}
                        to="/about"
                    >About</NavLink>
                </li>
                <li className="nav-bar__item">
                    <NavLink
                        style={({ isActive }) => (isActive ? activeStyle : undefined)}
                        className={({ isActive }) => (isActive ? activeClass : undefined)}
                        to="/contact"
                    >Contact</NavLink>
                </li>
            </ul>

            <button onClick={() => navigate('/')}>back to home</button>
        </div>
    )
}