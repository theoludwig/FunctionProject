import { Fragment, useState, useEffect } from 'react';
import Loader from '../Loader';
import htmlParser from 'html-react-parser';
import dynamic from 'next/dynamic';
import api from '../../utils/api';
import fr from 'date-fns/locale/fr';
import { registerLocale } from  "react-datepicker";
import date from 'date-and-time';
import "react-datepicker/dist/react-datepicker.css";

registerLocale('fr', fr);

const FunctionForm = (props) => {

    const [inputState, setInputState]         = useState({});
    const [message, setMessage]               = useState("");
    const [isLoading, setIsLoading]           = useState(false);

    // inputState par défaut
    useEffect(() => {
        const inputStateNew = { ...inputState };
        props.inputsArray.forEach((input) => {
            if (input.type === "select" && input.options.length > 0) {
                inputStateNew[input.name] = input.options[0].value;
            }
        });
        setInputState(inputStateNew);
    }, []);

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

    if (props.inputsArray.length <= 0) {
        return (
            <div className="FunctionComponent__slide text-center">
                <p>La fonction n'est pas encore disponible.</p>
            </div>
        );
    }
    return (
        <Fragment>
            <form onSubmit={handleSubmit}>
                {props.inputsArray.map((input, index) => {
                    switch (input.type) {
                        case "text":
                            return (
                                <div key={index} className="form-group">
                                    <label className="form-label" htmlFor={input.name}>{input.label}</label>
                                    <input onChange={handleChange} type="text" name={input.name} id={input.name} placeholder={input.placeholder} className="form-control" />
                                </div>
                            );
                        case "integer":
                        case "float":
                            return (
                                <div key={index} className="form-group">
                                    <label className="form-label" htmlFor={input.name}>{input.label}</label>
                                    <input onChange={handleChange} type="number" step={(input.type === "integer") ? "1" : "0.01"} name={input.name} id={input.name} placeholder={input.placeholder} className="form-control" />
                                </div>
                            );
                        case "calendar":
                            // Permet au datepicker de prendre la hauteur
                            if (typeof window != 'undefined') {
                                const newScript = document.createElement("script");
                                newScript.src = "/js/extraHeightCSS.js";
                                document.body.appendChild(newScript);
                            }
                            const DatePicker = dynamic(
                                () => import('react-datepicker'),
                                { ssr: false }
                            );
                            return (
                                <div key={index} className="form-group">
                                    <label className="form-label"  htmlFor={input.name}>{input.label}</label>
                                    <br/>
                                    <DatePicker
                                        selected={(() => {
                                            try {
                                                if (inputState[input.name] != undefined) {
                                                    const dateArray = inputState[input.name].split('/');
                                                    const year      = dateArray[2];
                                                    const month     = dateArray[1];
                                                    const day       = dateArray[0];
                                                    return new Date(year, parseInt(month) - 1, parseInt(day) + 1);
                                                }
                                                throw "Not a valid date";
                                            } catch { 
                                                return new Date();
                                            }
                                        })()}
                                        locale="fr"
                                        dateFormat="dd/MM/yyyy"
                                        fixedHeight
                                        placeholderText={input.placeholder}
                                        onChange={(dateObject) => {
                                            try {
                                                const formattedDate = date.format(dateObject, 'DD/MM/YYYY', true);
                                                handleChange({
                                                    target: {
                                                        name: input.name,
                                                        value: formattedDate
                                                    }
                                                });
                                            } catch {}
                                        }}
                                    />
                                </div>
                            );
                        case "select":
                            return (
                                <div key={index} className="form-group">
                                    <label className="form-label" htmlFor={input.name}>{input.label}</label>
                                    <select onChange={handleChange} name={input.name} id={input.name} value={inputState[input.name] || input.options[0]} className="form-control">
                                        {input.options.map((option, optionIndex) => {
                                            return (
                                                <option key={optionIndex} value={option.value}>{option.name}</option>
                                            );
                                        })}
                                    </select>
                                </div>
                            );
                        default:
                            return (
                                <p>Erreur, l'input n'est pas valide...</p>
                            );
                    }
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