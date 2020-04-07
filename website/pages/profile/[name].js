import Link from 'next/link';
import { Fragment, useContext, useState } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTimes } from '@fortawesome/free-solid-svg-icons';
import date from 'date-and-time';
import HeadTag from '../../components/HeadTag';
import FunctionCard from '../../components/FunctionCard/FunctionCard';
import Modal from '../../components/Modal';
import redirect from '../../utils/redirect';
import htmlParser from 'html-react-parser';
import Loader from '../../components/Loader';
import api from '../../utils/api';
import { API_URL } from '../../utils/config';
import '../../public/css/pages/profile.css';

const Profile = (props) => {

    // Constantes
    const createdAt = new Date(props.createdAt);
    const publicationDate = `${('0'+createdAt.getDate()).slice(-2)}/${('0'+(createdAt.getMonth()+1)).slice(-2)}/${createdAt.getFullYear()}`;

    const { isAuth, user, logoutUser } = useContext(UserContext);
    const [isOpen, setIsOpen]               = useState(false);
    
    let defaultInputState = {};
    if (isAuth) {
        defaultInputState = { name: user.name, email: user.email, biography: user.biography, isPublicEmail: user.isPublicEmail };
    }
    const [inputState, setInputState] = useState(defaultInputState);
    
    const [message, setMessage]       = useState("");
    const [isLoading, setIsLoading]   = useState(false);

    const toggleModal = () => setIsOpen(!isOpen);

    const handleChange = (event, isTypeCheck = false) => {
        const inputStateNew = { ...inputState };
        inputStateNew[event.target.name] = (event.target.files != undefined) ? event.target.files[0] : (isTypeCheck) ? event.target.checked : event.target.value;
        setInputState(inputStateNew);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const token = user.token;
        if (isAuth && token != undefined) {
            setIsLoading(true);
            const formData = new FormData();
            formData.append('name', inputState.name);
            formData.append('email', inputState.email);
            formData.append('biography', inputState.biography);
            formData.append('isPublicEmail', inputState.isPublicEmail);
            formData.append('logo', inputState.logo);
    
            api.put('/users/', formData, { headers: { 'Authorization': user.token } })
                .then(() => {
                    setIsLoading(false);
                    logoutUser();
                    redirect({}, '/login?isSuccessEdit=true');
                })
                .catch((error) => {
                    setMessage(`<p class="form-error"><b>Erreur:</b> ${error.response.data.message}</p>`);
                    setIsLoading(false);
                });
        }
    }

    return (
        <Fragment>
            <HeadTag title={`${props.name} - FunctionProject`} description={`Profil utilisateur de ${props.name}. ${(props.biography != undefined) ? props.biography : ""}`} />

            {/* Édition du profil */}
            {(isOpen) &&
                <Modal toggleModal={toggleModal}>
                    <div className="container-fluid Profile__container">
                        <div className="row Profile__row">
                            <div className="col-24">
                                <div className="Profile__Modal-top-container row">
                                    <div className="col-24">
                                        <span onClick={toggleModal} style={{ cursor: 'pointer', position: 'absolute', left: 0 }}>
                                            <FontAwesomeIcon icon={faTimes} style={{ width: '1.5rem', color: 'red' }} />
                                        </span>
                                        <h2 className="text-center">Éditer le profil</h2>
                                        <p className="text-center"><em>(Vous devrez vous reconnecter après la sauvegarde) <br/> Si vous changez votre adresse email, vous devrez la confirmer (vérifier vos emails).</em></p>
                                    </div>
                                </div>
                            </div>

                            <div className="col-24">
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <label className="form-label" htmlFor="name">Nom :</label>
                                        <input value={inputState.name} onChange={handleChange} type="text" name="name" id="name" className="form-control" placeholder="Divlo" />
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label" htmlFor="email">Email :</label>
                                        <input value={inputState.email} onChange={handleChange} type="email" name="email" id="email" className="form-control" placeholder="email@gmail.com" />
                                    </div>

                                    <div className="form-group custom-control custom-switch">
                                        <input onChange={(event) => handleChange(event, true)} type="checkbox" name="isPublicEmail" checked={inputState.isPublicEmail} className="custom-control-input" id="isPublicEmail" />
                                        <label className="custom-control-label" htmlFor="isPublicEmail">Email Public</label>
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label" htmlFor="biography">Biographie :</label>
                                        <textarea style={{ height: 'auto' }} value={inputState.biography} onChange={handleChange} name="biography" id="biography" className="form-control" rows="5"></textarea>
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label" htmlFor="logo">Logo <em>(400x400 recommandé)</em> :</label>
                                        <br/>
                                        <input onChange={handleChange} accept="image/jpeg,image/jpg,image/png,image/gif" type="file" name="logo" id="logo" />
                                    </div>

                                    <div className="form-group text-center">
                                        <button type="submit" className="btn btn-dark">Sauvegarder</button>
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
            }

            <div className={`container-fluid Profile__container ${(isOpen) ? "d-none" : ""}`}>
                <div className="row Profile__row">
                    <div className="col-20">
                        <div className="text-center">
                            <h1>Profil de <span className="important">{props.name}</span></h1>
                        </div>
                        <div className="row justify-content-center">

                            <div className="col-24 text-center">
                                <img className="Profile__logo" src={API_URL + props.logo} alt={props.name} />
                            </div>

                            <div className="col-24 text-center">
                                {(props.biography != undefined) && <p>{props.biography}</p>}
                                {(props.email != undefined) && <p><span className="important">Email :</span> {props.email}</p>}
                                <p><span className="important">Date de création :</span> {publicationDate}</p>
                            </div>

                            {(isAuth && user.name === props.name) &&                            
                                <button onClick={toggleModal} style={{ marginBottom: '25px' }} className="btn btn-dark">
                                    <FontAwesomeIcon icon={faPen} style={{cursor: 'pointer', width: '1rem'}} /> 
                                    &nbsp; Éditez le profil
                                </button>
                            }
                        </div>
                    </div>
                </div>
                
                {(props.favoritesArray.length > 0) &&
                    <div className="row justify-content-center">
                        <div className="col-24 text-center">
                            <h2>Fonctions en <span className="important">favoris :</span></h2>
                        </div>
                        <div className="col-24">
                            <div className="row justify-content-center">
                                {props.favoritesArray.map((favorite) => {
                                    return (
                                        <FunctionCard key={favorite.id} slug={favorite.slug} image={favorite.image} title={favorite.title} description={favorite.description} type={favorite.type} category={favorite.categorie} publicationDate={date.format(new Date(favorite.createdAt), 'DD/MM/YYYY', true)} />
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                }

                {(props.commentsArray.length > 0) &&
                    <div className="row justify-content-center">
                        <div className="col-24 text-center">
                            <h2>Derniers <span className="important">commentaires :</span></h2>
                        </div>
                        <div className="col-24 text-center">
                            {props.commentsArray.map((comment) => (
                                <div key={comment.id} className="row Profile__row Profile__comment">
                                    <div className="col-20">
                                        <p>
                                            Posté sur la fonction&nbsp; 
                                            <Link href={(comment.function.type === 'form' || comment.function.type === 'article') ? "/functions/[slug]" : `/functions/${comment.function.slug}`} as={`/functions/${comment.function.slug}`}>
                                                <a>{comment.function.title}</a>
                                            </Link> 
                                            &nbsp;le {date.format(new Date(comment.createdAt), 'DD/MM/YYYY à HH:mm', true)}
                                        </p>
                                        <p>"{comment.message}"</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                }
            </div>
        </Fragment>
    );
}

export async function getServerSideProps(context) {
    const { name } = context.params;
    return api.get(`/users/${name}`)
        .then((response) => ({ props: response.data }))
        .catch(() => redirect(context, '/404'));
}

export default Profile;