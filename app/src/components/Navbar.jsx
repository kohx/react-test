import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

export default class Navbar extends Component {
    render() {

        let activeStyle = {
            'color': 'tomato',
            'textDecoration': 'none'
        }

        let activeClass = "active-link";

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
            </div>
        )
    }
}