import { Fragment, useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/router';
import HeadTag from '../../components/HeadTag';
import FunctionCard from '../../components/FunctionCard/FunctionCard';
import Loader from '../../components/Loader';
import api from '../../utils/api';
import useAPI from '../../hooks/useAPI';
import '../../public/css/pages/functions.css';

const Functions = () => {

    const { categoryId } = useRouter().query;

    // State de recherche et de catégories
    const [, categories]                = useAPI('/categories');
    const [inputSearch, setInputSearch] = useState({ search: "", selectedCategory: categoryId || "0" });

    // State pour afficher les fonctions
    const [functionsData, setFunctionsData]         = useState({ hasMore: true, rows: [] });
    const [isLoadingFunctions, setLoadingFunctions] = useState(true);
    const [pageFunctions, setPageFunctions]         = useState(1);

    // Récupère la catégorie avec la query categoryId
    useEffect(() => {
        if (categoryId) {
            handleChange({ target: { name: "selectedCategory", value: categoryId } });
        }
    }, [categoryId]);

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

    // Permet la pagination au scroll
    const observer = useRef();
    const lastFunctionCardRef = useCallback((node) => {
        if (isLoadingFunctions) return;
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && functionsData.hasMore) {
                setPageFunctions(pageFunctions + 1);
            }
        }, { threshold: 1 });
        if (node) observer.current.observe(node);
    }, [isLoadingFunctions, functionsData.hasMore]);

    const getFunctionsData = () => {
        setLoadingFunctions(true);
        return new Promise(async (next) => {
            const result = await api.get(`/functions?page=${pageFunctions}&limit=10&categoryId=${inputSearch.selectedCategory}&search=${inputSearch.search}`);
            setLoadingFunctions(false);
            next(result.data);
        });
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
                    <select name="selectedCategory" value={inputSearch.selectedCategory} onChange={handleChange} className="Functions__select Functions__form-control">
                        <option value="0">Toutes catégories</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id} className="Functions__select-option" style={{ backgroundColor: category.color }}>{category.name}</option>
                        ))}
                    </select>
                    <input value={inputSearch.search} onChange={handleChange} type="search" className="Functions__form-control Functions__search-input" name="search" id="search" placeholder="🔎 Rechercher..."></input>
                </div>
    
                <div className="row justify-content-center">
                    {functionsData.rows.map((f, index) => {
                        // Si c'est le dernier élément
                        if (functionsData.rows.length === index + 1) {
                            return <FunctionCard ref={lastFunctionCardRef} key={f.id} slug={f.slug} image={f.image} title={f.title} description={f.description} category={f.categorie} publicationDate={new Date(f.createdAt).toLocaleDateString('fr-FR')} type={f.type} />;
                        }
                        return <FunctionCard key={f.id} slug={f.slug} image={f.image} title={f.title} description={f.description} category={f.categorie} publicationDate={new Date(f.createdAt).toLocaleDateString('fr-FR')} type={f.type} />;
                    })}
                </div>
                {isLoadingFunctions && <Loader />}
            </div>
        </Fragment>
    );
}

export default Functions;