import { Fragment } from 'react';
import Cookies from "universal-cookie";
import date from 'date-and-time';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import HeadTag from '../../components/HeadTag';
import redirect from '../../utils/redirect';
import useAPI from '../../hooks/useAPI';
import '../../public/css/pages/admin.css';

const manageCategories = (props) => {

    const [, categories] = useAPI('/categories');

    if (!props.user.isAdmin && typeof window != 'undefined') {
        return redirect({}, '/404');
    }

    return (
        <Fragment>
            <HeadTag title="Admin - FunctionProject" description="Page d'administration de FunctionProject. Gérer les catégories." />

            <div className="container-fluid text-center">
                <div className="row justify-content-center">
                    <div className="col-24">
                        <h1>Gérer les catégories</h1>
                        <button style={{ margin: '0 0 40px 0' }} className="btn btn-dark">Ajouter une catégorie</button>
                    </div>
                </div>    
                <div className="row justify-content-center">
                    <div className="container-fluid">
                        <div className="col-24 Admin__table-column">
                            <table className="Admin__table">
                                <thead>
                                    <tr>
                                        <th className="Admin__table-row Admin__table-head-row" scope="col">id</th>
                                        <th className="Admin__table-row Admin__table-head-row" scope="col">name</th>
                                        <th className="Admin__table-row Admin__table-head-row" scope="col">color</th>
                                        <th className="Admin__table-row Admin__table-head-row" scope="col">createdAt</th>
                                        <th className="Admin__table-row Admin__table-head-row" scope="col">updatedAt</th>
                                        <th className="Admin__table-row Admin__table-head-row" scope="col">Modifier</th>
                                        <th className="Admin__table-row Admin__table-head-row" scope="col">Supprimer</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {categories.map((category) => {
                                        return (
                                            <tr key={category.id} style={{ backgroundColor: category.color }}>
                                                <td className="Admin__table-row">{category.id}</td>
                                                <td className="Admin__table-row">{category.name}</td>
                                                <td className="Admin__table-row">{category.color}</td>
                                                <td className="Admin__table-row">{date.format(new Date(category.createdAt), 'DD/MM/YYYY à HH:mm', true)}</td>
                                                <td className="Admin__table-row">{date.format(new Date(category.updatedAt), 'DD/MM/YYYY à HH:mm', true)}</td>
                                                <td style={{ cursor: 'pointer' }}>
                                                    <FontAwesomeIcon icon={faPen} style={{ width: '1.5rem' }} />
                                                </td>
                                                <td style={{ cursor: 'pointer' }}>
                                                    <FontAwesomeIcon icon={faTrash} style={{ width: '1.5rem' }} />
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
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

export default manageCategories;