import { Fragment } from 'react';
import Link from 'next/link';
import Cookies from "universal-cookie";
import HeadTag from '../../components/HeadTag';
import FunctionsList from '../../components/FunctionsList/FunctionsList';
import redirect from '../../utils/redirect';

const Admin = (props) => {

    if (!props.user.isAdmin && typeof window != 'undefined') {
        return redirect({}, '/404');
    }

    return (
        <Fragment>
            <HeadTag title="Admin - FunctionProject" description="Page d'administration de FunctionProject." />

            <FunctionsList isAdmin>
                <div className="col-24">
                    <h1 className="Functions__title">Administration</h1>
                    <Link href={"/admin/addFunction"}>
                        <button style={{ margin: '0 0 40px 0' }} className="btn btn-dark">Crée une nouvelle fonction</button>
                    </Link>
                </div>
            </FunctionsList>
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