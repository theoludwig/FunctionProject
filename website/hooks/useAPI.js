import { useEffect, useState } from 'react';
import api from '../utils/api';

/**
 * @param {String} url 
 * @param {*} defaultData 
 * @param {String} method 
 * @param {Object} options 
 */
function useAPI(url, defaultData = [], method = "get", options = {}) {

    const [isLoading, setIsLoading] = useState(true);
    const [data, setData]           = useState(defaultData);
    const [hasError, setHasError]   = useState(false);

    useEffect(() => {
        api[method](url, options)
            .then((result) => {
                setData(result.data);
                setIsLoading(false);
            })
            .catch((error) => {
                setHasError(true);
                console.error(error);
            });
    }, []);

    return [isLoading, data, hasError];
}

export default useAPI;