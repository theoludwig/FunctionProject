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
        
        <div className="container text-center">

            <div className="row justify-content-center">
                <h1 className="Functions__title">Fonctions</h1>
            </div>

            <div className="Functions__search-container row justify-content-center">
                <select className="Functions__select form-control">
                    {/* TODO: API Call to fetch categories */}
                    <option>Toutes catégories</option>
                    <option className="Functions__select-option" style={{ backgroundColor: "#406880" }}>✨ Utilitaires</option>
                </select>
                <input type="search" className="form-control Functions__search-input" name="search" id="search" placeholder="🔎 Rechercher..."></input>
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