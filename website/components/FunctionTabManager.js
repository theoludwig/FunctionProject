import FunctionTabs from './FunctionTabs/FunctionTabs';
import FunctionForm from './FunctionForm';
import FunctionArticle from './FunctionArticle';
import FunctionComments from './FunctionComments/FunctionComments';

const FunctionTabManager = (props) => {
    if (props.type === "form") {
        return (
            <FunctionTabs type={props.type}>
                <div className="FunctionComponent__slide">
                    <FunctionForm inputsArray={ [...props.utilizationForm || []] } slug={props.slug} />
                </div>
                <div className="FunctionComponent__slide">
                    <FunctionArticle article={props.article} />
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
                <FunctionArticle article={props.article} />
            </div>
            <div className="FunctionComponent__slide">
                <FunctionComments functionId={props.id} />
            </div>
        </FunctionTabs>
    );
}

export default FunctionTabManager;