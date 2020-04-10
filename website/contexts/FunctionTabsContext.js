import React, { createContext, useState } from 'react';

export const FunctionTabsContext = createContext();

function FunctionTabsContextProvider(props) {

    const [slideIndex, setSlideIndex] = useState(0);

    return (
        <FunctionTabsContext.Provider value={{ slideIndex, setSlideIndex }}>
            {props.children}
        </FunctionTabsContext.Provider>
    );
}

export default FunctionTabsContextProvider;