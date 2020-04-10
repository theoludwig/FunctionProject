import { Fragment, useState } from 'react';
import Loader from './Loader';
import htmlParser from 'html-react-parser';
import api from '../utils/api';

const FunctionForm = (props) => {
    // console.log(props);

    const [inputState, setInputState] = useState({});
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (event) => {
        setIsLoading(true);
        event.preventDefault();
        api.post(`/functions/${props.slug}`, inputState)
            .then((response) => {
                setMessage(response.data.resultHTML);
                setIsLoading(false);
            })
            .catch((error) => {
                setMessage(error.response.data.message);
                setIsLoading(false);
            });
    }

    const handleChange = (event) => {
        const inputStateNew = { ...inputState };
        inputStateNew[event.target.name] = event.target.value;
        setInputState(inputStateNew);
    }

    if (props.inputArray.length <= 0) {
        return (
            <div className="FunctionComponent__slide text-center">
                <p>La fonction n'est pas encore disponible.</p>
            </div>
        );
    }
    return (
        <Fragment>
            <form onSubmit={handleSubmit}>
                {props.inputArray.map((input, index) => {
                    let inputResult;
                    switch(input.type) {
                        case "text" || "number":
                            inputResult = (<input onChange={handleChange} type={input.type} name={input.name} id={input.name} placeholder={input.placeholder} className="form-control" />);
                            break;
                        default:
                            inputResult = (<p>Erreur, l'input n'est pas valide...</p>);
                    }
                    return (
                        <div key={index} className="form-group">
                            <label className="form-label"  htmlFor={input.name}>{input.label}</label>
                            {inputResult}
                        </div>
                    );
                })}
                
                <div className="form-group text-center">
                    <button type="submit" className="btn btn-dark">Envoyer</button>
                </div>
            </form>
            <div className="form-result text-center">
                {
                    (isLoading) ? 
                        <Loader />
                    :
                        htmlParser(message)
                }
            </div>
        </Fragment>
    );
}

export default FunctionForm;