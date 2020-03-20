import { Fragment, useState, useEffect } from 'react';
import HeadTag from '../components/HeadTag';
import FunctionCard from '../components/FunctionCard/FunctionCard';
import '../public/css/pages/functions.css';
import { API_URL } from '../config/config';
import api from '../config/api';

const Functions = () => {

    const [categories, setCategories] = useState([]);

    const [functions, setFunctions]                 = useState([]);
    const [isLoadingFunctions, setLoadingFunctions] = useState(true);
    const [pageFunctions, setPageFunctions]         = useState(1);
    const [hasMoreFunctions, sethasMoreFunctions]   = useState(false);

    // Récupère les catégories
    useEffect(() => {
        api.get('/categories')
            .then((result) => {
                setCategories(result.data);
            })
            .catch((error) => console.error(error));
        }, []);
        
    // Récupère les fonctions
    useEffect(() => {
        api.get(`/functions?page=${pageFunctions}&limit=10`)
            .then((result) => {
                setLoadingFunctions(false);
                sethasMoreFunctions(result.data.hasMore);
                setFunctions([...functions, ...result.data.rows]);
            })
            .catch((error) => console.error(error));
    }, [pageFunctions]);

    const loadMore = () => {
        setLoadingFunctions(true);
        setPageFunctions(pageFunctions + 1);
    }

    return (
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
                        <option value="0">Toutes catégories</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id} className="Functions__select-option" style={{ backgroundColor: category.color }}>{category.name}</option>
                        ))}
                    </select>
                    <input type="search" className="form-control Functions__search-input" name="search" id="search" placeholder="🔎 Rechercher..."></input>
                </div>
    
                <div className="row justify-content-center">

                    {functions.map((f) => (
                        <FunctionCard key={f.id} slug={f.slug} image={API_URL + f.image} title={f.title} description={f.description} category={f.categorie} publicationDate={new Date(f.createdAt).toLocaleDateString('fr-FR')} />   
                    ))}

                    {
                        !isLoadingFunctions && hasMoreFunctions 
                        ? 
                            <button className="btn btn-dark" onClick={loadMore}>Charger plus de fonctions ?</button> 
                        : !hasMoreFunctions ?
                            null
                        :
                        <p>Chargement...</p>
                    }
                </div>
            </div>
        </Fragment>
    );
}

export default Functions;