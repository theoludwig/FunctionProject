import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import NavigationLink from './NavigationLink';
import BrandLogo from '../../assets/images/FunctionProject_brand-logo.png';
import BrandIcon from '../../assets/images/FunctionProject_icon.png';
import './Header.css';

export default function Header() {

    const [hamburgerIcon, setHamburgerIcon] = useState("");
    const [navbarList, setNavbarList] = useState("");

    const toggleNavbar = () => {
        if (hamburgerIcon) {
            setHamburgerIcon("");
            setNavbarList("");
        } else {
            setHamburgerIcon("Header__hamburger-active");
            setNavbarList("navbar__list-active");
        }
    }

    return (
        <header className="Header">
            <div className="container">

                {/* Brand */}
                <Link className="Header__brand-link" to={{ pathname: "/" }}>
                    <img id="brand-link__logo" src={BrandLogo} alt="FunctionProject" />
                    <img id="brand-link__logo-small-screen" src={BrandIcon} alt="FunctionProject" />
                </Link>

                {/* Hamburger icon on Mobile */}
                <div onClick={toggleNavbar} className={"Header__hamburger " + hamburgerIcon}>
                    <span></span>
                </div>

                {/* Navigation */}
                <nav className="Header__navbar">
                    <ul className={"navbar__list " + navbarList}>
                        <NavigationLink name="Accueil" path="/" />
                    </ul>
                </nav>

            </div>
        </header>
    );
}