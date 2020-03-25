import { useState } from 'react';
import Link from 'next/link';
import NavigationLink from './NavigationLink';
import './Header.css';

export default function Header() {

    const [isActive, setIsActive] = useState(false);

    const toggleNavbar = () => {
        setIsActive(!isActive);
    }

    return (
        <header className="Header">
            <div className="container">

                {/* Brand */}
                <Link href={"/"}>
                    <a className="Header__brand-link">
                        <img id="brand-link__logo" src="/images/FunctionProject_brand-logo.png" alt="FunctionProject" />
                        <img id="brand-link__logo-small-screen" src="/images/FunctionProject_icon_small.png" alt="FunctionProject" />
                    </a>
                </Link>

                {/* Hamburger icon on Mobile */}
                <div onClick={toggleNavbar} className={`Header__hamburger ${(isActive) ? "Header__hamburger-active" : ""}`}>
                    <span></span>
                </div>

                {/* Navigation */}
                <nav className="Header__navbar">
                    <ul className={`navbar__list ${(isActive) ? "navbar__list-active" : ""}`}>
                        <NavigationLink name="Accueil" path="/" />
                        <NavigationLink name="Fonctions" path="/functions" />
                        <NavigationLink name="S'inscrire" path="/register" />
                        <NavigationLink name="Connexion" path="/login" />
                    </ul>
                </nav>

            </div>
        </header>
    );
}