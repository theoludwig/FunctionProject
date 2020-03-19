import Link from 'next/link';
import './FunctionCard.css';

const FunctionCard = (props) =>  (
    <Link href={`/functions/${props.slug}`}>
        <div className="FunctionCard col-sm-16 col-md-7 col-xl-5">
            <img className="FunctionCard__image" alt={props.title} src={props.image} />
            <h2 className="FunctionCard__title">{props.title}</h2>
            <p className="FunctionCard__description">{props.description}</p>
            <div className="FunctionCard__info">
                <p className="FunctionCard__category" style={{ backgroundColor: props.category.color }}>{props.category.name}</p>
                <p className="FunctionCard__publication-date">{props.publicationDate}</p>
            </div>
        </div>
    </Link>
);

export default FunctionCard;