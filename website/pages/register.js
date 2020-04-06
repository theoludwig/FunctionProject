import { Fragment, useState } from 'react';
import htmlParser from 'html-react-parser';
import Loader from '../components/Loader';
import HeadTag from '../components/HeadTag';
import '../public/css/pages/register-login.css';
import api from '../utils/api';

const Register = () => {
    
    const [inputState, setInputState] = useState({});
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    
    const handleChange = () => {
        const inputStateNew = { ...inputState };
        inputStateNew[event.target.name] = event.target.value;
        setInputState(inputStateNew);
    }

    const handleSubmit = (event) => {
        setIsLoading(true);
        event.preventDefault();
        api.post('/users/register', inputState)
            .then(({ data }) => {
                setMessage(`<p class="form-success"><b>Succès:</b> ${data.result}</p>`);
                setIsLoading(false);
                setInputState({});
            })
            .catch((error) => {
                setMessage(`<p class="form-error"><b>Erreur:</b> ${error.response.data.message}</p>`);
                setIsLoading(false);
            });
    }

    return (
        <Fragment>
            <HeadTag 
                title="S'inscrire" 
                description="Créer un compte." 
            />
            <div className="container Register-Login__container">
                <div className="row Register-Login__row justify-content-center">
                    <div className="col-20">
                        <h1 className="Register-Login__title">S'inscrire</h1>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label className="form-label" htmlFor="name">Nom :</label>
                                <input onChange={handleChange} type="text" name="name" id="name" className="form-control" placeholder="Divlo" />
                            </div>

                            <div className="form-group">
                                <label className="form-label" htmlFor="name">Email :</label>
                                <input onChange={handleChange} type="email" name="email" id="email" className="form-control" placeholder="email@gmail.com" />
                            </div>

                            <div className="form-group">
                                <label className="form-label" htmlFor="name">Mot de passe :</label>
                                <input onChange={handleChange} type="password" name="password" id="password" className="form-control" placeholder="******" />
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
        </Fragment>
    );
}
export default Register;