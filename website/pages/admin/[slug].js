import { Fragment } from 'react';
import Cookies from "universal-cookie";
import HeadTag from '../../components/HeadTag';
import redirect from '../../utils/redirect';

const AdminFunctionComponent = (props) => {

    if (!props.user.isAdmin && typeof window != 'undefined') {
        return redirect({}, '/404');
    }

    return (
        <Fragment>
            <HeadTag />
            <p>{props.slug}</p>
        </Fragment>
    );
}

export async function getServerSideProps({ req, params }) {
    const cookies = new Cookies(req.headers.cookie);
    const { slug } = params;
    return {
        props: {
            user: { ...cookies.get('user') },
            slug
        }
    };
}

export default AdminFunctionComponent;