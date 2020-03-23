import { Fragment } from 'react';
import Link from 'next/link';
import HeadTag from '../../components/HeadTag';
import FunctionTabs from '../../components/FunctionTabs/FunctionTabs';
import redirect from '../../utils/redirect';
import api from '../../config/api';
import { API_URL } from '../../config/config';
import '../../public/css/pages/FunctionComponent.css';

const FunctionComponent = (props) => {
    console.log(props);
    
    // Constantes
    const createdAt = new Date(props.createdAt);
    const publicationDate = `${('0'+createdAt.getDate()).slice(-2)}/${('0'+(createdAt.getMonth()+1)).slice(-2)}/${createdAt.getFullYear()}`;

    return (
        <Fragment>
            <HeadTag title={props.title} description={props.description} image={API_URL + props.image} />

            <div className="container-fluid">

                <div className="container-fluid">
                    <div className="row justify-content-center text-center">
                        <div className="FunctionComponent__top col-24">
                            <img src={API_URL + props.image} alt={props.title} />
                            <h1 className="FunctionComponent__title title-important">{props.title}</h1>
                            <p className="FunctionComponent__description">{props.description}</p>
                            <div className="FunctionCard__info">
                                <Link href={`/functions?categoryId=${props.categorieId}`}>
                                    <a className="FunctionCard__category" style={{ backgroundColor: props.categorie.color, color: 'inherit' }}>{props.categorie.name}</a>
                                </Link>
                                <p className="FunctionCard__publication-date">{publicationDate}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container-fluid">
                    <div className="row justify-content-center">
                        <FunctionTabs type={props.type}>
                            <div>Slide 1</div>
                            <div>Slide 2</div>
                            <div>Slide 3</div>
                        </FunctionTabs>
                    </div>
                </div>

            </div>
        </Fragment>
    );
}

export async function getServerSideProps(context) {
    const { slug } = context.params;
    return api.get(`/functions/${slug}`)
        .then((response) => ({ props: response.data }))
        .catch(() => redirect(context, '/404'));
}

export default FunctionComponent;