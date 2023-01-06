import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'

export default class Navbar extends Component {
    render() {
        return (
            <ul>
                <li>
                    <NavLink
                        style={({ isActive }) => (isActive ? { color: 'tomato' } : undefined)}
                        to="/"
                    >Home</NavLink>
                </li>
                <li>
                    <NavLink
                        style={({ isActive }) => (isActive ? { color: 'tomato' } : undefined)}
                        to="/about"
                    >About</NavLink>
                </li>
                <li>
                    <NavLink
                        style={({ isActive }) => (isActive ? { color: 'tomato' } : undefined)}
                        to="/contact"
                    >Contact</NavLink>
                </li>
            </ul>
        )
    }
}