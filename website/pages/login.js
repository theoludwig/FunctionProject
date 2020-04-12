import { Fragment, useContext, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import htmlParser from 'html-react-parser';
import Loader from '../components/Loader';
import HeadTag from '../components/HeadTag';
import { UserContext } from '../contexts/UserContext';
import withoutAuth from '../hoc/withoutAuth';
import '../public/css/pages/register-login.css';

const Login = () => {

    const router                                            = useRouter();
    const [inputState, setInputState]                       = useState({});
    const { loginUser, messageLogin, loginLoading, isAuth } = useContext(UserContext);

    const handleChange = (event) => {
        const inputStateNew = { ...inputState };
        inputStateNew[event.target.name] = event.target.value;
        setInputState(inputStateNew);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!isAuth) {
            await loginUser(inputState); 
        }
    }

    return (
        <Fragment>
            <HeadTag 
                title="Se connecter - FunctionProject" 
                description="Connexion à FunctionProject." 
            />
            <div className="container Register-Login__container">
                <div className="row Register-Login__row justify-content-center">
                    <div className="col-20">
                        <h1 className="Register-Login__title">Se connecter</h1>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label className="form-label" htmlFor="email">Email :</label>
                                <input onChange={handleChange} type="email" name="email" id="email" className="form-control" placeholder="email@gmail.com" />
                            </div>

                            <div className="form-group">
                                <label className="form-label" htmlFor="password">Mot de passe :</label>
                                <input onChange={handleChange} type="password" name="password" id="password" className="form-control" placeholder="******" />
                                <p>
                                    <Link href={"/forgotPassword"}>
                                        <a className="Register-Login__Forgot-password">Mot de passe oublié ?</a>
                                    </Link>
                                </p>
                            </div>

                            <div className="form-group text-center">
                                <button type="submit" className="btn btn-dark">Envoyer</button>
                            </div>
                        </form>
                        <div className="form-result text-center">
                            {(router.query.isConfirmed !== undefined && messageLogin === "") && <p className="form-success"><b>Succès:</b> Votre compte a bien été confirmé, vous pouvez maintenant vous connectez!</p>}
                            {(router.query.isSuccessEdit !== undefined && messageLogin === "") && <p className="form-success"><b>Succès:</b> Votre profil a bien été modifié, vous pouvez maintenant vous connectez!</p>}
                            {
                                (loginLoading) ? 
                                    <Loader />
                                :
                                    htmlParser(messageLogin)
                            }
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default withoutAuth(Login);