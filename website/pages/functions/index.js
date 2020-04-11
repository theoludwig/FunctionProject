import { Fragment } from 'react';
import HeadTag from '../../components/HeadTag';
import FunctionsList from '../../components/FunctionsList/FunctionsList';

const Functions = () => {

    return (
        <Fragment>
            <HeadTag 
                title="Fonctions" 
                description="Liste des fonctions." 
                image="/images/FunctionProject_icon_small.png" 
            />

            <FunctionsList>
                <h1 className="Functions__title">Fonctions</h1>
            </FunctionsList>
        </Fragment>
    );
}

export default Functions;