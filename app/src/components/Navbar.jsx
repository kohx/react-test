import React, { Component } from 'react';
import { Link } from 'react-router-dom'

export default class Navbar extends Component {
    render() {
        return (
            <ul>
                <li>
                    <a href="/">Home</a>
                </li>
                <li>
                    <a href="/about">About</a>
                </li>
                <li>
                    <a href="/contact">Contact</a>
                </li>
            </ul>
        )
    }
}