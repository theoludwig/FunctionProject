import { Fragment } from 'react';
import { useRouter } from 'next/router';
import HeadTag from '../../components/HeadTag';
import { API_URL } from '../../config/config';

const FunctionComponent = () => {

    const { slug } = useRouter().query;

    return (
        <Fragment>
            <HeadTag 
                title={slug}
                description={slug}
                image={`${API_URL}/images/functions/${slug}.png`} 
            />
            <div className="container text-center">
                <div className="row justify-content-center">
                    <h1>{slug}</h1>
                </div>
            </div>
        </Fragment>
    );
}

export default FunctionComponent;