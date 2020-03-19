import { Fragment } from 'react';
import HeadTag from '../components/HeadTag';
import FunctionCard from '../components/FunctionCard/FunctionCard';
import '../public/css/pages/functions.css';

const Functions = () => (
    <Fragment>
        <HeadTag 
            title="Fonctions" 
            description="Liste des fonctions." 
            image="/images/FunctionProject_icon_small.png" 
        />
        
        <div className="container-fluid text-center">


            <div className="row justify-content-center">
                <div className="col-16">
                    <h1 className="Functions__title">Fonctions</h1>
                </div>
            </div>

            <div className="row justify-content-center">
                {/* TODO: API Call to fetch data */}
                <FunctionCard slug="weatherRequest" image="/images/functions/weatherRequest.png" title="Météo" description="Affiche la météo et l'heure locale." category={{ name: "✨ Utilitaires", color: "#406880" }} publicationDate="18/03/2020" />
                <FunctionCard slug="weatherRequest" image="/images/functions/weatherRequest.png" title="Météo" description="Affiche la météo et l'heure locale." category={{ name: "✨ Utilitaires", color: "#406880" }} publicationDate="18/03/2020" />
                <FunctionCard slug="weatherRequest" image="/images/functions/weatherRequest.png" title="Météo" description="Affiche la météo et l'heure locale." category={{ name: "✨ Utilitaires", color: "#406880" }} publicationDate="18/03/2020" />
                <FunctionCard slug="weatherRequest" image="/images/functions/weatherRequest.png" title="Météo" description="Affiche la météo et l'heure locale." category={{ name: "✨ Utilitaires", color: "#406880" }} publicationDate="18/03/2020" />
                <FunctionCard slug="weatherRequest" image="/images/functions/weatherRequest.png" title="Météo" description="Affiche la météo et l'heure locale." category={{ name: "✨ Utilitaires", color: "#406880" }} publicationDate="18/03/2020" />
                <FunctionCard slug="weatherRequest" image="/images/functions/weatherRequest.png" title="Météo" description="Affiche la météo et l'heure locale." category={{ name: "✨ Utilitaires", color: "#406880" }} publicationDate="18/03/2020" />
                <FunctionCard slug="weatherRequest" image="/images/functions/weatherRequest.png" title="Météo" description="Affiche la météo et l'heure locale." category={{ name: "✨ Utilitaires", color: "#406880" }} publicationDate="18/03/2020" />
                <FunctionCard slug="weatherRequest" image="/images/functions/weatherRequest.png" title="Météo" description="Affiche la météo et l'heure locale." category={{ name: "✨ Utilitaires", color: "#406880" }} publicationDate="18/03/2020" />
                <FunctionCard slug="weatherRequest" image="/images/functions/weatherRequest.png" title="Météo" description="Affiche la météo et l'heure locale." category={{ name: "✨ Utilitaires", color: "#406880" }} publicationDate="18/03/2020" />
                <FunctionCard slug="weatherRequest" image="/images/functions/weatherRequest.png" title="Météo" description="Affiche la météo et l'heure locale." category={{ name: "✨ Utilitaires", color: "#406880" }} publicationDate="18/03/2020" />
                <FunctionCard slug="weatherRequest" image="/images/functions/weatherRequest.png" title="Météo" description="Affiche la météo et l'heure locale." category={{ name: "✨ Utilitaires", color: "#406880" }} publicationDate="18/03/2020" />
                <FunctionCard slug="weatherRequest" image="/images/functions/weatherRequest.png" title="Météo" description="Affiche la météo et l'heure locale." category={{ name: "✨ Utilitaires", color: "#406880" }} publicationDate="18/03/2020" />
            </div>
        </div>
    </Fragment>
);

export default Functions;