/* Libraries Imports */
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

/* Components Imports */
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

/* Pages Imports */
import Home from './pages/Home/Home';

/* Contexts Imports */

/* CSS Imports */
import 'typeface-montserrat';
import 'normalize.css';
import './assets/css/grid.css';
import './assets/css/general.css';

function App() {
    return (
        <BrowserRouter>
            <Header />
                <div className="content container-fluid">
                    <Switch>
                        <Route exact path="/" component={Home} />
                    </Switch>
                </div>
            <Footer />
        </BrowserRouter>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));