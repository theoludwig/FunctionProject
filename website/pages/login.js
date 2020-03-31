import { Fragment } from 'react';
import HeadTag from '../components/HeadTag';
import '../public/css/pages/register-login.css';

const Login = () => {

    return (
        <Fragment>
            <HeadTag 
                title="Se connecter" 
                description="Connexion à FunctionProject." 
            />
            <div className="container Register-Login__container">
                <div className="row Register-Login__row justify-content-center">
                    <div className="col-20">
                        <h1 className="Register-Login__title">Se connecter</h1>
                        <form>
                            <div className="form-group">
                                <label className="form-label" htmlFor="name">Email :</label>
                                <input type="email" name="email" id="email" className="form-control" placeholder="email@gmail.com" />
                            </div>

                            <div className="form-group">
                                <label className="form-label" htmlFor="name">Mot de passe :</label>
                                <input type="password" name="password" id="password" className="form-control" placeholder="******" />
                            </div>

                            <div className="form-group text-center">
                                <button type="submit" className="btn btn-dark">Envoyer</button>
                            </div>
                        </form>
                        <div className="form-result text-center"></div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}
export default Login;