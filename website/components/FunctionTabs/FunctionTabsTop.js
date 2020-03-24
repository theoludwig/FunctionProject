import { useContext } from 'react';
import { FunctionTabsContext } from '../../contexts/FunctionTabsContext';
import '../FunctionCard/FunctionCard.css';

const FunctionTabsTop = (props) => {

    const { setSlideIndex, slideIndex } = useContext(FunctionTabsContext);

    return (
        <div className="container">
            <div className="row justify-content-center">
                <ul className="FunctionTabs__nav">
                    {(props.type !== 'article') &&
                        <li className="FunctionTabs__nav-item">
                            <a 
                                className={`FunctionTabs__nav-link ${(slideIndex === 0) ? "FunctionTabs__nav-link-active" : ""}`}
                                onClick={() => setSlideIndex(0)}
                            >
                                ⚙️ Utilisation
                            </a>
                        </li>
                    }
                    <li className="FunctionTabs__nav-item">
                        <a 
                            className={`FunctionTabs__nav-link ${((slideIndex === 1 && props.type !== 'article') || (props.type === 'article' && slideIndex === 0)) ? "FunctionTabs__nav-link-active" : ""}`}
                            onClick={() => setSlideIndex((props.type === 'article') ? 0 : 1)}
                        >
                            📝 Article
                        </a>
                    </li>
                    <li className="FunctionTabs__nav-item">
                        <a 
                            className={`FunctionTabs__nav-link ${((slideIndex === 2 && props.type !== 'article') || (props.type === 'article' && slideIndex === 1)) ? "FunctionTabs__nav-link-active" : ""}`}
                            onClick={() => setSlideIndex((props.type === 'article') ? 1 : 2)}
                        >
                            📬 Commentaires
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default FunctionTabsTop;