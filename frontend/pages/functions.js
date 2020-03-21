import { Fragment, useState, useEffect } from 'react';
import HeadTag from '../components/HeadTag';
import FunctionCard from '../components/FunctionCard/FunctionCard';
import Loader from '../components/Loader/Loader';
import '../public/css/pages/functions.css';
import { API_URL } from '../config/config';
import api from '../config/api';
import useAPI from '../hooks/useAPI';

const Functions = () => {

    // State de recherche et de catégories
    const [, categories]                = useAPI('/categories');
    const [inputSearch, setInputSearch] = useState({ search: "", selectedCategory: "0" });

    // State pour afficher les fonctions
    const [functionsData, setFunctionsData]         = useState({ hasMore: true, rows: [] });
    const [isLoadingFunctions, setLoadingFunctions] = useState(true);
    const [pageFunctions, setPageFunctions]         = useState(1);

    const getFunctionsData = () => {
        setLoadingFunctions(true);
        return new Promise(async (next) => {
            const result = await api.get(`/functions?page=${pageFunctions}&limit=10&categoryId=${inputSearch.selectedCategory}&search=${inputSearch.search}`);
            setLoadingFunctions(false);
            next(result.data);
        });
    }
    
    // Récupère les fonctions si la page change
    useEffect(() => {
        getFunctionsData().then((data) => setFunctionsData({ 
            hasMore: data.hasMore, 
            rows: [...functionsData.rows, ...data.rows] 
        }));
    }, [pageFunctions]);

    // Récupère les fonctions si la catégorie/recherche change
    useEffect(() => {
        getFunctionsData().then((data) => setFunctionsData(data));
    }, [inputSearch.selectedCategory, inputSearch.search]);

    const loadMore = () => {
        setPageFunctions(pageFunctions + 1);
    }

    const handleChange = (event) => {
        const inputSearchNew = { ...inputSearch };
        inputSearchNew[event.target.name] = event.target.value;
        setInputSearch(inputSearchNew);
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
                    <select name="selectedCategory" value={inputSearch.selectedCategory} onChange={handleChange} className="Functions__select form-control">
                        <option value="0">Toutes catégories</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id} className="Functions__select-option" style={{ backgroundColor: category.color }}>{category.name}</option>
                        ))}
                    </select>
                    <input value={inputSearch.search} onChange={handleChange} type="search" className="form-control Functions__search-input" name="search" id="search" placeholder="🔎 Rechercher..."></input>
                </div>
    
                <div className="row justify-content-center">
                    {functionsData.rows.map((f) => (
                        <FunctionCard key={f.id} slug={f.slug} image={API_URL + f.image} title={f.title} description={f.description} category={f.categorie} publicationDate={new Date(f.createdAt).toLocaleDateString('fr-FR')} />   
                    ))}
                </div>
                {    
                    isLoadingFunctions ?
                        <Loader width="100px" height="100px" />
                    : functionsData.hasMore ?
                        <div className="row justify-content-center">
                            <button className="btn btn-dark" style={{marginBottom: "50px"}} onClick={loadMore}>Charger plus de fonctions ?</button> 
                        </div>
                    :
                        null
                }
            </div>
        </Fragment>
    );
}

export default Functions;