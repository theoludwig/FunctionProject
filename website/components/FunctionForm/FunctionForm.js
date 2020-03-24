import { useState } from 'react';
import Loader from '../Loader';
import './FunctionForm.css';
import htmlParser from 'html-react-parser';
import api from '../../utils/api';

const FunctionForm = (props) => {
    // console.log(props);

    const [inputState, setInputState] = useState({});
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        api.post(`/functions/${props.slug}`, inputState)
            .then((response) => {
                setMessage(response.data.resultHTML);
            })
            .catch((error) => {
                setMessage(error.response.data.message);
            });
            setIsLoading(false);
    }

    const handleChange = (event) => {
        const inputStateNew = { ...inputState };
        inputStateNew[event.target.name] = event.target.value;
        if (event.target.value !== "") {
            setIsLoading(true);
        } else {
            setIsLoading(false);
        }
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
        <div className="FunctionComponent__slide">
            <form onSubmit={handleSubmit}>
                {props.inputArray.map((input, index) => {
                    let inputResult;
                    switch(input.type) {
                        case "text" || "number":
                            inputResult = (<input onChange={handleChange} type={input.type} name={input.name} id={input.name} placeholder={input.placeholder} className="FunctionForm__control" />);
                            break;
                        default:
                            inputResult = (<p>Erreur, l'input n'est pas valide...</p>);
                    }
                    return (
                        <div key={index} className="FunctionForm__group">
                            <label className="FunctionForm__label"  htmlFor={input.name}>{input.label}</label>
                            {inputResult}
                        </div>
                    );
                })}
                
                <div className="FunctionForm__submit text-center">
                    <button type="submit" className="btn btn-dark">Envoyer</button>
                </div>
            </form>
            <div className="FunctionForm__result text-center">
                {
                    (isLoading) ? 
                        <Loader />
                    :
                        htmlParser(message)
                }
            </div>
        </div>
    );
}

export default FunctionForm;