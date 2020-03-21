import Link from 'next/link';
import { useState, Fragment } from 'react';
import Loader from '../Loader/Loader';
import './FunctionCard.css';

const FunctionCard = (props) => {

    const [isLoading, setIsLoading] = useState(true);

    const handleLoad = () => {
        setIsLoading(false);
    }

    return (
        <Link href={`/functions/${props.slug}`}>
            <Fragment>
                <div className={"FunctionCard col-sm-24 col-md-10 col-xl-7"}>
                    {isLoading && <Loader width="100px" height="100px" />} 
                    <div className={`FunctionCard__container ${isLoading ? "d-none" : ""}`}>
                        <div className="FunctionCard__top">
                            <img onLoad={handleLoad} className="FunctionCard__image" alt={props.title} src={props.image} />
                            <h2 className="FunctionCard__title">{props.title}</h2>
                            <p className="FunctionCard__description">{props.description}</p>
                        </div>
                        <div className="FunctionCard__info">
                            <p className="FunctionCard__category" style={{ backgroundColor: props.category.color }}>{props.category.name}</p>
                            <p className="FunctionCard__publication-date">{props.publicationDate}</p>
                        </div>
                    </div>
                </div>
            </Fragment>
        </Link>
    );
} 

export default FunctionCard;