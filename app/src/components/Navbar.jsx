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
                <li>
                    <NavLink
                        style={({ isActive }) => (isActive ? activeStyle : undefined)}
                        className={({ isActive }) => (isActive ? activeClass : undefined)}
                        to="/posts"
                    >Posts</NavLink>
                </li>
                <li>
                    <NavLink
                        style={({ isActive }) => (isActive ? activeStyle : undefined)}
                        className={({ isActive }) => (isActive ? activeClass : undefined)}
                        to="/test1"
                    >Test1</NavLink>
                </li>
                <li>
                    <NavLink
                        style={({ isActive }) => (isActive ? activeStyle : undefined)}
                        className={({ isActive }) => (isActive ? activeClass : undefined)}
                        to="/test2"
                    >Test2</NavLink>
                </li>
                <li>
                    <NavLink
                        style={({ isActive }) => (isActive ? activeStyle : undefined)}
                        className={({ isActive }) => (isActive ? activeClass : undefined)}
                        to="/test3"
                    >Test3</NavLink>
                </li>
                <li>
                    <NavLink
                        style={({ isActive }) => (isActive ? activeStyle : undefined)}
                        className={({ isActive }) => (isActive ? activeClass : undefined)}
                        to="/test4"
                    >Test4</NavLink>
                </li>
                <li>
                    <NavLink
                        style={({ isActive }) => (isActive ? activeStyle : undefined)}
                        className={({ isActive }) => (isActive ? activeClass : undefined)}
                        to="/test5"
                    >Test5</NavLink>
                </li>
                <li>
                    <NavLink
                        style={({ isActive }) => (isActive ? activeStyle : undefined)}
                        className={({ isActive }) => (isActive ? activeClass : undefined)}
                        to="/test6"
                    >Test6</NavLink>
                </li>
                <li>
                    <NavLink
                        style={({ isActive }) => (isActive ? activeStyle : undefined)}
                        className={({ isActive }) => (isActive ? activeClass : undefined)}
                        to="/test7"
                    >Test7</NavLink>
                </li>
                <li>
                    <NavLink
                        style={({ isActive }) => (isActive ? activeStyle : undefined)}
                        className={({ isActive }) => (isActive ? activeClass : undefined)}
                        to="/test8"
                    >Test8</NavLink>
                </li>
                <li>
                    <NavLink
                        style={({ isActive }) => (isActive ? activeStyle : undefined)}
                        className={({ isActive }) => (isActive ? activeClass : undefined)}
                        to="/test9"
                    >Test9</NavLink>
                </li>
                <li>
                    <NavLink
                        style={({ isActive }) => (isActive ? activeStyle : undefined)}
                        className={({ isActive }) => (isActive ? activeClass : undefined)}
                        to="/test10"
                    >Test10</NavLink>
                </li>
                <li>
                    <NavLink
                        style={({ isActive }) => (isActive ? activeStyle : undefined)}
                        className={({ isActive }) => (isActive ? activeClass : undefined)}
                        to="/Test11"
                    >Test11</NavLink>
                </li>
                <li>
                    <NavLink
                        style={({ isActive }) => (isActive ? activeStyle : undefined)}
                        className={({ isActive }) => (isActive ? activeClass : undefined)}
                        to="/Test12"
                    >Test12</NavLink>
                </li>
            </ul>

            <button onClick={() => navigate('/')}>back to home</button>
        </div>
    )
}