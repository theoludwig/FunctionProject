/* Libraries Imports */
import { Fragment } from 'react';
import Router from 'next/router'
import NProgress from 'nprogress';

/* Components Imports */
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

/* CSS Imports */
import '../public/fonts/Montserrat/Montserrat.css';
import '../public/css/normalize.css';
import '../public/css/grid.css';
import '../public/css/general.css';
import '../public/css/nprogress.css';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());
  
const App = ({ Component, pageProps }) => (
    <Fragment>
        <Header />
            <div className="content container-fluid">
                <Component {...pageProps} />
            </div>
        <Footer />
    </Fragment>
);

export default App;