import { Fragment } from 'react';
import { useRouter } from 'next/router';
import HeadTag from '../../components/HeadTag';
import { API_URL } from '../../config/config';

const FunctionComponent = () => {

    const router = useRouter();

    return (
        <Fragment>
            <HeadTag 
                title={router.query.slug}
                description={router.query.slug}
                image={`${API_URL}/images/functions/${router.query.slug}.png`} 
            />
            <div className="container text-center">
                <div className="row justify-content-center">
                    <h1>{router.query.slug}</h1>
                </div>
            </div>
        </Fragment>
    );
}

export default FunctionComponent;