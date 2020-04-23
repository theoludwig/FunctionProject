import { Fragment, useState, useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import Link from 'next/link';
import { useRouter } from 'next/router';
import NavigationLink from './NavigationLink';
import './Header.css';

export default function Header() {

    const { isAuth, logoutUser, user } = useContext(UserContext);
    const [isActive, setIsActive]      = useState(false);
    const { pathname }                 = useRouter();

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
                        {
                            (!isAuth) ? 
                                <Fragment>
                                    <NavigationLink name="S'inscrire" path="/users/register" />
                                    <NavigationLink name="Connexion" path="/users/login" />
                                </Fragment>
                            :
                                <Fragment>
                                    <li className="navbar-item">
                                        <Link href={"/users/[name]"} as={`/users/${user.name}`}>
                                            <a className={`navbar-link ${pathname === "/users/[name]" ? "navbar-link-active" : null}`}>Mon Profil</a>
                                        </Link>
                                    </li>
                                    <li className="navbar-item">
                                        <Link href={"/"}>
                                            <a onClick={logoutUser} className="navbar-link">Se déconnecter</a>
                                        </Link>
                                    </li>
                                </Fragment>
                        }
                        {
                            (isAuth && user.isAdmin) &&
                                <NavigationLink name="Admin" path="/admin" />
                        }
                    </ul>
                </nav>

            </div>
        </header>
    );
}