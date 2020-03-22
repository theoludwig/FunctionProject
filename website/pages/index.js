import { Fragment, useEffect } from 'react';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import Link from 'next/link';
import HeadTag from '../components/HeadTag';
import Loader from '../components/Loader';
import '../public/css/pages/index.css';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

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
             <div className="Home__container container-fluid text-center">

                <AutoPlaySwipeableViews enableMouseEvents interval={30000}>

                    {/* Slide 1 */}
                    <div className="row align-items-center justify-content-center">
                        <div className="col-24">
                            <h1 className="Home__title-important important">FunctionProject</h1>
                            <p className="Home__description">
                                Apprenez la programmation grâce à l'apprentissage par projet.<br/>
                                Découvrez la liste des fonctions disponibles : 
                            </p>
                        </div>
                        <div className="col-24 Home__logo-spin">
                            <Link href={"/functions"}>
                                <a><Loader width="100%" height="13em" speed="5s" /></a>
                            </Link>
                        </div>
                    </div>

                    {/* Slide 2 */}
                    <div className="row align-items-center justify-content-center">
                        <div className="col-24">
                            <h1 className="Home__title-important important">Code Source</h1>
                            <p className="Home__description">
                                Le partage est essentiel afin de progresser tous ensemble. <br/>
                                Par conséquent le code source du projet est disponible sur mon profil GitHub :
                            </p>
                        </div>
                        <div className="col-24">
                            <a target="_blank" rel="noopener noreferrer" href="https://github.com/Divlo/FunctionProject"> <img className="Home__image-width" src="/images/GitHub.png" alt="GitHub"/> </a>
                        </div>
                    </div>

                </AutoPlaySwipeableViews>

            </div>
        </Fragment>
    );
}

export default Home;