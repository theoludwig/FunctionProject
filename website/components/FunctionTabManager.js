import htmlParser from 'html-react-parser';
import FunctionTabs from './FunctionTabs/FunctionTabs';
import FunctionForm from './FunctionForm';
import FunctionComments from './FunctionComments/FunctionComments';

const Article = ({ article }) => {
    return (
        <div className="container-fluid">
            {(article != undefined) && htmlParser(article)}
        </div>
    );
}

const FunctionTabManager = (props) => {
    if (props.type === "form") {
        return (
            <FunctionTabs type={props.type}>
                <div className="FunctionComponent__slide">
                    <FunctionForm inputArray={ [...props.utilizationForm || []] } slug={props.slug} />
                </div>
                <div className="FunctionComponent__slide">
                    <Article article={props.article} />
                </div>
                <div className="FunctionComponent__slide">
                    <FunctionComments functionId={props.id} />
                </div>
            </FunctionTabs>
        );
    }

    return (
        <FunctionTabs type={props.type}>
            <div className="FunctionComponent__slide">
                <Article article={props.article} />
            </div>
            <div className="FunctionComponent__slide">
                <FunctionComments functionId={props.id} />
            </div>
        </FunctionTabs>
    );
}

export default FunctionTabManager;