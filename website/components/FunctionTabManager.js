import FunctionTabs from './FunctionTabs/FunctionTabs';
import FunctionForm from './FunctionForm';
import FunctionComments from './FunctionComments/FunctionComments';

const FunctionTabManager = (props) => {
    if (props.type === "form") {
        return (
            <FunctionTabs type={props.type}>
                <div className="FunctionComponent__slide">
                    <FunctionForm inputArray={ [...props.utilizationForm || []] } slug={props.slug} />
                </div>
                <div className="FunctionComponent__slide text-center">Article</div>
                <div className="FunctionComponent__slide">
                    <FunctionComments functionId={props.id} />
                </div>
            </FunctionTabs>
        );
    }

    return (
        <FunctionTabs type={props.type}>
            <div className="FunctionComponent__slide text-center">Article</div>
            <div className="FunctionComponent__slide">
                <FunctionComments functionId={props.id} />
            </div>
        </FunctionTabs>
    );
}

export default FunctionTabManager;