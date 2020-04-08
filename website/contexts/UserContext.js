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
        const newUser = cookies.get('user');
        if (newUser != undefined) {
            setIsAuth(true);
            setUser(newUser);
        }
    }, []);

    useEffect(() => {
        if (isAuth) {
            setMessageLogin('<p class="form-error"><b>Erreur:</b> Vous devez être déconnecter avant de vous connecter.</p>');
        } else {
            setMessageLogin("");
        }
    }, [isAuth]);

    const logoutUser = () => {
        cookies.remove('user', { path: '/' });
        setUser(null);
        setIsAuth(false);
    } 
 
    const loginUser = ({ email, password }) => {
        setLoginLoading(true);
        return new Promise(async (next) => {
            try {
                const response = await api.post('/users/login', { email, password });
                const newUser = response.data;
                cookies.remove('user', { path: '/' });
                cookies.set('user', newUser, { path: '/', maxAge: newUser.expiresIn });
                setUser(newUser);
                setIsAuth(true);
                setMessageLogin('<p class="form-success"><b>Succès:</b> Connexion réussi!</p>');
                setLoginLoading(false);
                return next({ isSuccess: true, newUser });
            } catch (error) {
                setMessageLogin(`<p class="form-error"><b>Erreur:</b> ${error.response.data.message}</p>`);
                setLoginLoading(false);
                setIsAuth(false);
                setUser(null);
                return next({ isSuccess: false });
            }
        });
    }

    return (
        <UserContext.Provider value={{ user, loginUser, logoutUser, loginLoading, messageLogin, isAuth, setMessageLogin }}>
            {props.children}
        </UserContext.Provider>
    );
}

export default UserContextProvider;