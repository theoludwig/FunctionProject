import Link from 'next/link';
import { Fragment, useState, useEffect } from 'react';
import Cookies from "universal-cookie";
import HeadTag from '../../components/HeadTag';
import FunctionsList from '../../components/FunctionsList/FunctionsList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import Modal from '../../components/Modal';
import redirect from '../../utils/redirect';
import htmlParser from 'html-react-parser';
import Loader from '../../components/Loader';
import useAPI from '../../hooks/useAPI';
import api from '../../utils/api';
import '../../public/css/pages/admin.css';

const Admin = (props) => {

    const [, categories]              = useAPI('/categories');
    const [isOpen, setIsOpen]         = useState(false);
    const [inputState, setInputState] = useState({ type: 'form' });
    const [message, setMessage]       = useState("");
    const [isLoading, setIsLoading]   = useState(false);

    useEffect(() => {
        if (categories.length > 0) {
            handleChange({
                target: {
                    name: "categorieId",
                    value: categories[0].id
                }
            });
        }
    }, [categories]);

    const toggleModal = () => setIsOpen(!isOpen);

    const handleChange = (event, isTypeCheck = false) => {
        const inputStateNew = { ...inputState };
        inputStateNew[event.target.name] = (event.target.files != undefined) ? event.target.files[0] : (isTypeCheck) ? event.target.checked : event.target.value;
        setInputState(inputStateNew);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setIsLoading(true);
        const formData = new FormData();
        formData.append('type', inputState.type);
        formData.append('categorieId', inputState.categorieId);
        formData.append('title', inputState.title);
        formData.append('slug', inputState.slug);
        formData.append('description', inputState.description);
        formData.append('image', inputState.image);

        api.post('/admin/functions', formData, { headers: { 'Authorization': props.user.token } })
            .then((response) => {
                setMessage(`<p class="form-success"><b>Succès:</b> ${response.data.message}</p>`);
                setIsLoading(false);
            })
            .catch((error) => {
                setMessage(`<p class="form-error"><b>Erreur:</b> ${error.response.data.message}</p>`);
                setIsLoading(false);
            });
    }

    if (!props.user.isAdmin && typeof window != 'undefined') {
        return redirect({}, '/404');
    }

    return (
        <Fragment>
            <HeadTag title="Admin - FunctionProject" description="Page d'administration de FunctionProject." />

            {/* Création d'une fonction */}
            {(isOpen) ?
                    <Modal toggleModal={toggleModal}>
                        <div className="Admin__Modal__container container-fluid">
                            <div className="Admin__Modal__row row">
                                <div className="col-24">
                                    <div className="Admin__Modal-top-container row">
                                        <div className="col-24">
                                            <span onClick={toggleModal} style={{ cursor: 'pointer', position: 'absolute', left: 0 }}>
                                                <FontAwesomeIcon icon={faTimes} style={{ width: '1.5rem', color: 'red' }} />
                                            </span>
                                            <h2 className="text-center">Crée une nouvelle fonction</h2>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-24">
                                    <form onSubmit={handleSubmit}>
                                        <div className="form-group">
                                            <label className="form-label" htmlFor="title">Titre :</label>
                                            <input value={inputState.title} onChange={handleChange} type="text" name="title" id="title" className="form-control" placeholder="(e.g : Nombre aléatoire)" />
                                        </div>

                                        <div className="form-group">
                                            <label className="form-label" htmlFor="slug">Slug :</label>
                                            <input value={inputState.slug} onChange={handleChange} type="text" name="slug" id="slug" className="form-control" placeholder="(e.g : randomNumber)" />
                                        </div>

                                        <div className="form-group">
                                            <label className="form-label" htmlFor="description">Description :</label>
                                            <textarea style={{ height: 'auto' }} value={inputState.biography} onChange={handleChange} name="description" id="description" className="form-control" rows="5"></textarea>
                                        </div>

                                        <div className="form-group">
                                            <label className="form-label" htmlFor="type">Type :</label>
                                            <select onChange={handleChange} name="type" id="type" className="form-control">
                                                <option value="form">Formulaire</option>
                                                <option value="article">Article</option>
                                                <option value="page">Page</option>
                                            </select>
                                        </div>

                                        <div className="form-group">
                                            <label className="form-label" htmlFor="categorieId">Catégorie :</label>
                                            <select onChange={handleChange} name="categorieId" id="categorieId" className="form-control">
                                                {categories.map((category) => (
                                                    <option key={category.id} value={category.id} className="Admin__Modal-select-option" style={{ backgroundColor: category.color }}>{category.name}</option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className="form-group">
                                            <label className="form-label" htmlFor="image">Image <em>(150x150 recommandé)</em> :</label>
                                            <br/>
                                            <input onChange={handleChange} accept="image/jpeg,image/jpg,image/png" type="file" name="image" id="image" />
                                        </div>

                                        <div className="form-group text-center">
                                            <button type="submit" className="btn btn-dark">Envoyer</button>
                                        </div>
                                    </form>
                                    <div className="form-result text-center">
                                        {
                                            (isLoading) ? 
                                                <Loader />
                                            :
                                                htmlParser(message)
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Modal>

                :

                    <FunctionsList isAdmin token={props.user.token}>
                        <div className="col-24">
                            <h1 className="Functions__title">Administration</h1>
                            <button onClick={toggleModal} style={{ margin: '0 0 40px 0' }} className="btn btn-dark">Crée une nouvelle fonction</button>
                            <Link href={"/admin/manageCategories"}>
                                <button style={{ margin: '0 0 0 20px' }} className="btn btn-dark">Gérer les catégories</button>
                            </Link>
                        </div>
                    </FunctionsList>
            }
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

export default Admin;