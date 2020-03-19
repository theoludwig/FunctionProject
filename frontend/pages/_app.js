/* Libraries Imports */
import { Fragment } from 'react';

/* Components Imports */
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

/* CSS Imports */
import '../public/fonts/Montserrat/Montserrat.css';
import '../public/css/normalize.css';
import '../public/css/grid.css';
import '../public/css/general.css';

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