import { useContext } from 'react';
import { FunctionTabsContext } from '../../contexts/FunctionTabsContext';
import SwipeableViews from 'react-swipeable-views';
import './FunctionTabs.css';

function FunctionTabs(props) {

    const { setSlideIndex, slideIndex } = useContext(FunctionTabsContext);

    return (
        <div className="container-fluid">
            <SwipeableViews onChangeIndex={(index) => setSlideIndex(index)} index={slideIndex} enableMouseEvents>
                {props.children}
            </SwipeableViews>
        </div>
    );
}

export default FunctionTabs;