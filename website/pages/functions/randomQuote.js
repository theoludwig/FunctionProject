import { Fragment, useState, useEffect, useContext, useRef, useCallback } from 'react';
import HeadTag from '../../components/HeadTag';
import Link from 'next/link';
import { UserContext } from '../../contexts/UserContext';
import FunctionComponentTop from '../../components/FunctionComponentTop';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import SwipeableViews from 'react-swipeable-views';
import redirect from '../../utils/redirect';
import FunctionArticle from '../../components/FunctionArticle';
import FunctionComments from '../../components/FunctionComments/FunctionComments';
import htmlParser from 'html-react-parser';
import Loader from '../../components/Loader';
import api from '../../utils/api';
import copyToClipboard from '../../utils/copyToClipboard';
import { API_URL } from '../../utils/config';
import '../../public/css/pages/FunctionComponent.css';
import '../../components/FunctionTabs/FunctionTabs.css';
import '../../components/FunctionCard/FunctionCard.css';
import 'notyf/notyf.min.css';

const FunctionTabsTop = (props) => {
    return (
        <div className="container">
            <div className="row justify-content-center">
                <ul className="FunctionTabs__nav">
                    <li className="FunctionTabs__nav-item">
                        <a 
                            className={`FunctionTabs__nav-link ${(props.slideIndex === 0) ? "FunctionTabs__nav-link-active" : ""}`} 
                            onClick={() => props.setSlideIndex(0)}
                        >
                            ⚙️ Utilisation
                        </a>
                    </li>
                    <li className="FunctionTabs__nav-item">
                        <a 
                            className={`FunctionTabs__nav-link ${(props.slideIndex === 1) ? "FunctionTabs__nav-link-active" : ""}`} 
                            onClick={() => props.setSlideIndex(1)}
                        >
                            📜 Liste
                        </a>
                    </li>
                    <li className="FunctionTabs__nav-item">
                        <a 
                            className={`FunctionTabs__nav-link ${(props.slideIndex === 2) ? "FunctionTabs__nav-link-active" : ""}`} 
                            onClick={() => props.setSlideIndex(2)}
                        >
                            ✒️ Proposer
                        </a>
                    </li>
                    <li className="FunctionTabs__nav-item">
                        <a 
                            className={`FunctionTabs__nav-link ${(props.slideIndex === 3) ? "FunctionTabs__nav-link-active" : ""}`} 
                            onClick={() => props.setSlideIndex(3)}
                        >
                            📝 Article
                        </a>
                    </li>
                    <li className="FunctionTabs__nav-item">
                        <a 
                            className={`FunctionTabs__nav-link ${(props.slideIndex === 4) ? "FunctionTabs__nav-link-active" : ""}`} 
                            onClick={() => props.setSlideIndex(4)}
                        >
                            📬 Commentaires
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
}

const FunctionTabs = (props) => {
    return (
        <div className="container-fluid">
            <SwipeableViews onChangeIndex={(index) => props.setSlideIndex(index)} index={props.slideIndex} enableMouseEvents>
                {props.children}
            </SwipeableViews>
        </div>
    );
}

const GenerateQuote = () => {

    const [quote, setQuote] = useState({ quote: "", author: "" });

    useEffect(() => {
        getRandomQuote();
    }, []);

    const getRandomQuote = async () => {
        const { data } = await api.post("/functions/randomQuote");
        setQuote(data);
    }

    const handleCopyQuote = () => {
        let Notyf;
        if (typeof window != 'undefined') {
            Notyf = require('notyf');
        }
        const notyf = new Notyf.Notyf({
            duration: 5000
        });
        copyToClipboard(`"${quote.quote}" - ${quote.author}`);
        notyf.success('Citation copiée dans le presse-papier!');
    }

    return (
        <div className="container-fluid">
            <div className="row justify-content-center">
                <div className="col-24 text-center">
                    <button onClick={getRandomQuote} className="btn btn-dark">Générer une nouvelle citation</button>
                    <button style={{ marginLeft: '15px' }} onClick={handleCopyQuote} className="btn btn-dark">Copier la citation</button>
                </div>
            </div>
            <div style={{ marginTop: '20px' }} className="row justify-content-center">
                <div className="col-24 text-center">
                    <p>" {quote.quote} "</p>
                    <p>- {quote.author}</p>
                </div>
            </div>
            <div style={{ marginBottom: '20px' }} className="row justify-content-center">
                <a 
                    target="_blank"
                    rel="noopener noreferrer"
                    href={`https://twitter.com/intent/tweet?text="${quote.quote}" - ${quote.author}&via=Divlo_FR&hashtags=citation,FunctionProject&url=https://function.divlo.fr/functions/randomQuote`}
                    className="btn btn-lg btn-primary"
                >
                    <FontAwesomeIcon icon={faTwitter} style={{ width: '1em' }} /> Twitter
                </a>
            </div>
        </div>
    );
}

const QuoteList = () => {

    const [quotesData, setQuotesData]         = useState({ hasMore: true, rows: [], totalItems: 0 });
    const [isLoadingQuotes, setLoadingQuotes] = useState(true);
    const [pageQuotes, setPageQuotes]         = useState(1);

    // Récupère les citations si la page change
    useEffect(() => {
        getQuotesData();
    }, [pageQuotes]);

    const getQuotesData = async () => {
        setLoadingQuotes(true);
        const { data } = await api.get(`/quotes?limit=20page=${pageQuotes}`);
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

    return (
        <div className="container-fluid">
            <div className="row justify-content-center">
                <div className="col-24 text-center">
                    <h2 style={{ margin: 0 }}>Liste des citations : </h2>
                    <p style={{ marginTop: '5px' }}>Total de {quotesData.totalItems} citations.</p>
                </div>
            </div>

            <div className="row" style={{ marginBottom: '30px' }}>
                <div className="col-24 table-column">
                    <table>
                        <thead>
                            <tr>
                                <th className="table-row" scope="col">Citation/Proverbe</th>
                                <th className="table-row" scope="col">Auteur</th>
                                <th className="table-row" scope="col">Proposée par</th>
                            </tr>
                        </thead>
                        <tbody>
                            {quotesData.rows.map((currentQuote, index) => {
                                const quoteJSX = (
                                    <Fragment>
                                            <td className="table-row text-center">{currentQuote.quote}</td>
                                            <td className="table-row text-center">{currentQuote.author}</td>
                                            <td className="table-row text-center">
                                                <Link href={"/profile/[name]"} as={`/profile/${currentQuote.user.name}`}>
                                                    <a>{currentQuote.user.name}</a>
                                                </Link>
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
    );
}

const SuggestQuote = () => {

    const { isAuth, user }            = useContext(UserContext);
    const [inputState, setInputState] = useState({ quote: "", author: "" });
    const [message, setMessage]       = useState("");
    const [isLoading, setIsLoading]   = useState(false);

    const handleChange = (event) => {
        const inputStateNew = { ...inputState };
        inputStateNew[event.target.name] = event.target.value;
        setInputState(inputStateNew);
    }

    const handleSubmit = (event) => {
        setIsLoading(true);
        event.preventDefault();
        const token = user.token;
        if (isAuth && token != undefined) {
            api.post('/quotes', inputState, { headers: { 'Authorization': token } })
            .then(({ data }) => {
                    setInputState({ quote: "", author: "" });
                    setMessage(`<p class="form-success"><b>Succès:</b> ${data.message}</p>`);
                    setIsLoading(false);
                })
                .catch((error) => {
                    setMessage(`<p class="form-error"><b>Erreur:</b> ${error.response.data.message}</p>`);
                    setIsLoading(false);
                });
        }
    }

    return (
        <div className="container-fluid">
            {
                (isAuth) ?
                    <Fragment>                        
                        <div className="row justify-content-center">
                            <div className="col-24 text-center">
                                <h2 style={{ margin: 0 }}>Proposer une citation : </h2>
                                <p style={{ marginTop: '5px' }}>Vous pouvez proposer des citations, et une fois validé elles seront rajoutés à la liste des citations.</p>
                            </div>
                        </div>
                        <div style={{ marginBottom: '40px' }} className="row">
                            <div className="col-24">
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="quote" className="form-label">Citation :</label>
                                        <textarea value={inputState.quote} onChange={handleChange} style={{ height: 'auto' }} id="quote" name="quote" type="text" className="form-control" rows="4" placeholder="La citation..." />
                                    </div>
                                    
                                    <div className="form-group">
                                        <label htmlFor="author" className="form-label">Auteur :</label>
                                        <input value={inputState.author} onChange={handleChange} name="author" id="author" type="text" className="form-control" placeholder="L'auteur de la citation..." />
                                    </div>

                                    <div className="form-group text-center">
                                        <button type="submit" className="btn btn-dark">Envoyer</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="form-result text-center">
                            {
                                (isLoading) ? 
                                    <Loader />
                                :
                                    htmlParser(message)
                            }
                        </div>
                    </Fragment>
                :
                <p className="text-center">
                    Vous devez être <Link href={'/login'}><a>connecté</a></Link> pour proposer une citation.
                </p>
            }
        </div>
    );
}

const FunctionTabManager = (props) => {
    return (
        <FunctionTabs setSlideIndex={props.setSlideIndex} slideIndex={props.slideIndex}>
            <div className="FunctionComponent__slide">
                <GenerateQuote />
            </div>
            <div className="FunctionComponent__slide">
                <QuoteList />
            </div>
            <div className="FunctionComponent__slide">
                <SuggestQuote />
            </div>
            <div className="FunctionComponent__slide">
                <FunctionArticle article={props.article} />
            </div>
            <div className="FunctionComponent__slide">
                <FunctionComments functionId={props.id} />
            </div>
        </FunctionTabs>
    );
}

const randomQuote = (props) => {

    const [slideIndex, setSlideIndex] = useState(0);

    return (
        <Fragment>
            <HeadTag title={props.title} description={props.description} image={API_URL + props.image} />

            <div className="container-fluid">
                <FunctionTabsTop slideIndex={slideIndex} setSlideIndex={setSlideIndex} />
                <FunctionComponentTop { ...props } />
                <FunctionTabManager { ...props } slideIndex={slideIndex} setSlideIndex={setSlideIndex} />
            </div>
        </Fragment>
    );
}

export async function getServerSideProps(context) {
    return api.get(`/functions/randomQuote`)
        .then((response) => ({ props: response.data }))
        .catch(() => redirect(context, '/404'));
}

export default randomQuote;