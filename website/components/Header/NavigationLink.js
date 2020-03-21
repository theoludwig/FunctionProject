import Link from 'next/link';
import { useRouter } from 'next/router';
import './Header.css';

export default function NavigationLink(props) {

    const { pathname } = useRouter();

    return (
        <li className="navbar-item">
            <Link href={props.path}>
                <a className={`navbar-link ${pathname === props.path ? "navbar-link-active" : null}`}>
                    {props.name}
                </a>
            </Link>
        </li>
    );
}