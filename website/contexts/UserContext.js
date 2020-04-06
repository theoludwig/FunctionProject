import { createContext, useState, useEffect } from 'react';
import Cookies from "universal-cookie";
import api from '../utils/api';

const cookies = new Cookies();

export const UserContext = createContext();

function UserContextProvider(props) {

    const [user, setUser]                 = useState(null);
    const [isAuth, setIsAuth]             = useState(false);
    const [loginLoading, setLoginLoading] = useState(false);
    const [messageLogin, setMessageLogin] = useState("");

    useEffect(() => {
        const user = cookies.get('user');
        setUser(user);
        if (user != undefined) {
            setIsAuth(true);
        }
    }, []);

    const loginUser = ({ email, password }) => {
        setLoginLoading(true);
        api.post('/users/login', { email, password })
            .then((response) => {
                const user = response.data;
                cookies.set('user', user);
                setUser(user);
                setIsAuth(true);
                setMessageLogin('<p class="form-success"><b>Succès:</b> Connexion réussi!</p>');
                setLoginLoading(false);
            })
            .catch((error) => {
                setMessageLogin(`<p class="form-error"><b>Erreur:</b> ${error.response.data.message}</p>`);
                setLoginLoading(false);
                setIsAuth(false);
                setUser(null);
            });
    }

    const logoutUser = () => {
        setUser(null);
        setIsAuth(false);
        cookies.remove('user');
    } 

    return (
        <UserContext.Provider value={{ user, loginUser, logoutUser, loginLoading, messageLogin, isAuth }}>
            {props.children}
        </UserContext.Provider>
    );
}

export default UserContextProvider;