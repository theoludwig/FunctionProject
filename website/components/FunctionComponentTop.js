import Link from 'next/link';

const FunctionComponentTop = (props) => (
    <div className="container-fluid">
        <div className="row justify-content-center text-center">
            <div className="FunctionComponent__top col-24">
                <img style={{ width: '150px' }} src={props.API_URL + props.image} alt={props.title} />
                <h1 className="FunctionComponent__title title-important">{props.title}</h1>
                <p className="FunctionComponent__description">{props.description}</p>
                <div className="FunctionCard__info">
                    <Link href={`/functions?categoryId=${props.categorieId}`}>
                        <a className="FunctionCard__category" style={{ backgroundColor: props.categorie.color, color: 'inherit' }}>{props.categorie.name}</a>
                    </Link>
                    <p className="FunctionCard__publication-date">{props.publicationDate}</p>
                </div>
            </div>
        </div>
    </div>
);

export default FunctionComponentTop;