/* Libraries Imports */
import { Fragment } from 'react';

/* Components Imports */
import Header from './Header/Header';
import Footer from './Footer/Footer';

/* CSS Imports */
import '../public/fonts/Montserrat/Montserrat.css';
import '../public/css/normalize.css';
import '../public/css/grid.css';
import '../public/css/general.css';

const Layout = (props) => (
    <Fragment>
        <Header />
            <div className="content container-fluid">{props.children}</div>
        <Footer />
    </Fragment>
);
  
export default Layout;