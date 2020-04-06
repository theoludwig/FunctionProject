import Link from 'next/link';
import { Fragment } from 'react';
import date from 'date-and-time';
import HeadTag from '../../components/HeadTag';
import FunctionCard from '../../components/FunctionCard/FunctionCard';
import redirect from '../../utils/redirect';
import api from '../../utils/api';
import { API_URL } from '../../utils/config';
import '../../public/css/pages/profile.css';

const Profile = (props) => {

    // Constantes
    const createdAt = new Date(props.createdAt);
    const publicationDate = `${('0'+createdAt.getDate()).slice(-2)}/${('0'+(createdAt.getMonth()+1)).slice(-2)}/${createdAt.getFullYear()}`;

    return (
        <Fragment>
            <HeadTag title={`${props.name} - FunctionProject`} description={`Profil utilisateur de ${props.name}. ${(props.biography != undefined) ? props.biography : ""}`} />

            <div className="container-fluid Profile__container">
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
                        <div className="col-18 text-center">
                            {props.commentsArray.map((comment) => (
                                <div key={comment.id} className="row Profile__row Profile__comment">
                                    <div className="col-20">
                                        <p>
                                            Posté sur la fonction&nbsp; 
                                            <Link href={(comment.function.type === 'form' || comment.function.type === 'article') ? "/functions/[slug]" : `/functions/${props.slug}`} as={`/functions/${comment.function.slug}`}>
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