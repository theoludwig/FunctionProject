import { Fragment } from 'react';
import HeadTag from '../components/HeadTag';

const Home = () => (
    <Fragment>
        <HeadTag 
            title="FunctionProject" 
            description="FunctionProject est un projet créé par Divlo qui a pour but de rassembler plein de mini-programme permettant de faire plusieurs choses comme savoir la météo, générer un nombre aléatoire, etc." 
            image="/images/FunctionProject_icon_small.png" 
        />
        <div>Home</div>
    </Fragment>
);

export default Home;