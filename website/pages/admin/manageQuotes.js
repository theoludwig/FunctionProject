import { Fragment, useState, useEffect, useRef, useCallback } from 'react';
import Cookies from "universal-cookie";
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTrash } from '@fortawesome/free-solid-svg-icons';
import redirect from '../../utils/redirect';
import HeadTag from '../../components/HeadTag';
import api from '../../utils/api';
import '../../public/css/pages/admin.css';

const manageQuotes = (props) => {

    const [quotesData, setQuotesData]         = useState({ hasMore: true, rows: [], totalItems: 0 });
    const [isLoadingQuotes, setLoadingQuotes] = useState(true);
    const [pageQuotes, setPageQuotes]         = useState(1);

    // Récupère les citations si la page change
    useEffect(() => {
        getQuotesData();
    }, [pageQuotes]);

    const getQuotesData = async () => {
        setLoadingQuotes(true);
        const { data } = await api.get(`/admin/quotes?limit=20page=${pageQuotes}`, { headers: { 'Authorization': props.user.token } });
        setQuotesData({
            hasMore: data.hasMore,
            rows: [...quotesData.rows, ...data.rows],
            totalItems: data.totalItems
        });
        setLoadingQuotes(false);
    }

    // Permet la pagination au scroll
    const observer = useRef();
    const lastQuoteRef = useCallback((node) => {
        if (isLoadingQuotes) return;
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && quotesData.hasMore) {
                setPageQuotes(pageQuotes + 1);
            }
        }, { threshold: 1 });
        if (node) observer.current.observe(node);
    }, [isLoadingQuotes, quotesData.hasMore]);

    if (!props.user.isAdmin && typeof window != 'undefined') {
        return redirect({}, '/404');
    }

    const handleValidationQuote = async (id, isValid) => {
        try {
            await api.put(`/admin/quotes/${id}`, { isValid }, { headers: { 'Authorization': props.user.token } });
            window.location.reload(true);
        } catch {}
    }

    return (
        <Fragment>
            <HeadTag title="Admin - FunctionProject" description="Page d'administration de FunctionProject. Gérer les citations." />

            <div className="container-fluid">
                <div className="row justify-content-center">
                    <div className="col-24 text-center">
                        <h2>Liste des citations (non validées) : </h2>
                        <p style={{ marginTop: '5px' }}>Total de {quotesData.totalItems} citations.</p>
                    </div>
                </div>

                <div className="row" style={{ marginBottom: '30px' }}>
                    <div className="col-24 Admin__table-column">
                        <table className="Admin__table">
                            <thead>
                                <tr>
                                    <th className="Admin__table-row" scope="col">Citation/Proverbe</th>
                                    <th className="Admin__table-row" scope="col">Auteur</th>
                                    <th className="Admin__table-row" scope="col">Proposée par</th>
                                    <th className="Admin__table-row" scope="col">Valider</th>
                                    <th className="Admin__table-row" scope="col">Supprimer</th>
                                </tr>
                            </thead>
                            <tbody>
                                {quotesData.rows.map((currentQuote, index) => {
                                    const quoteJSX = (
                                        <Fragment>
                                                <td className="Admin__table-row text-center">{currentQuote.quote}</td>
                                                <td className="Admin__table-row text-center">{currentQuote.author}</td>
                                                <td className="Admin__table-row text-center">
                                                    <Link href={"/profile/[name]"} as={`/profile/${currentQuote.user.name}`}>
                                                        <a>{currentQuote.user.name}</a>
                                                    </Link>
                                                </td>
                                                <td onClick={() => handleValidationQuote(currentQuote.id, true)} className="Admin__table-row text-center" style={{ cursor: 'pointer' }}>
                                                    <FontAwesomeIcon icon={faCheck} style={{ width: '1.5rem' }} />
                                                </td>
                                                <td onClick={() => handleValidationQuote(currentQuote.id, false)} className="Admin__table-row text-center" style={{ cursor: 'pointer' }}>
                                                    <FontAwesomeIcon icon={faTrash} style={{ width: '1.5rem' }} />
                                                </td>
                                        </Fragment>
                                    );
                                    // Si c'est le dernier élément
                                    if (quotesData.rows.length === index + 1) {
                                        return <tr key={index} ref={lastQuoteRef}>{quoteJSX}</tr>
                                    }
                                    return <tr key={index}>{quoteJSX}</tr>
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export async function getServerSideProps({ req }) {
    const cookies = new Cookies(req.headers.cookie);
    return {
        props: { 
            user: { ...cookies.get('user') }
        }
    };
}

export default manageQuotes;