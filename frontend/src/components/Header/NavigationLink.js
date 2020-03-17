import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

export default function NavigationLink(props) {

    const location = useLocation();

    return (
        <li className="navbar-item">
            <Link 
                className=
                {
                    `navbar-link ${location.pathname === props.path ? "navbar-link-active" : null}`
                } 
                to={props.path}
            >
                {props.name}
            </Link>
        </li>
    );
}