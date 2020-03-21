import Link from 'next/link';
import { useState, forwardRef } from 'react';
import Loader from '../Loader';
import './FunctionCard.css';

const FunctionCard = forwardRef((props, ref) => {

    const [isLoading, setIsLoading] = useState(true);

    const handleLoad = () => {
        setIsLoading(false);
    }

    return (
        <Link href={`/functions/${props.slug}`}>
            {/* Elément à une hauteur pendant chargement */}
            <div ref={ref} style={isLoading ? { height: "360px", justifyContent: "center" } : null} className={"FunctionCard col-sm-24 col-md-10 col-xl-7"}>
                {isLoading && <Loader width="125px" height="125px" />} 
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
        </Link>
    );
}) 

export default FunctionCard;