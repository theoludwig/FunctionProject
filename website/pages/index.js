import { Fragment, useEffect } from 'react';
import HeadTag from '../components/HeadTag';

const Home = () => {

    useEffect(() => {
        console.log(
            '%c ⚙️ FunctionProject', 
            'color: #ffd800; font-weight: bold; background-color: #181818;padding: 10px;border-radius: 10px;font-size: 20px'
        );
    }, []);

    return (
        <Fragment>
            <HeadTag 
                title="FunctionProject" 
                description="FunctionProject est un projet créé par Divlo qui a pour but de rassembler plein de mini-programme permettant de faire plusieurs choses comme savoir la météo, générer un nombre aléatoire, etc." 
                image="/images/FunctionProject_icon_small.png" 
            />
            <div>Home</div>
        </Fragment>
    );
}

export default Home;