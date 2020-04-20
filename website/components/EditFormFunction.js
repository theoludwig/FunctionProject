import { useState } from 'react';
import api from '../utils/api';
import 'notyf/notyf.min.css';

const EditFormFunction = (props) => {

    const [inputsArray, setInputsArray] = useState(props.functionInfo.utilizationForm || []);

    const addInput = () => {
        const newInputsArray = [...inputsArray];
        newInputsArray.push({ name: "", label: "", placeholder: "", type: "text" });
        setInputsArray(newInputsArray);
    }

    const handleChangeInput = (event) => {
        const newInputsArray = [...inputsArray];
        const index = event.target.id.split('-')[1];
        const inputObject = newInputsArray[index];
        inputObject[event.target.name] = event.target.value;
        setInputsArray(newInputsArray);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        let Notyf;
        if (typeof window != 'undefined') {
            Notyf = require('notyf');
        }
        const notyf = new Notyf.Notyf({
            duration: 5000
        });
        try {
            await api.put(`/admin/functions/form/${props.functionInfo.id}`, { form: inputsArray }, { headers: { 'Authorization': props.user.token } });
            notyf.success('Sauvegardé!');
        } catch (error) {
            notyf.error('Erreur!');
        }
    }

    const handleRemoveInput = (event) => {
        const newInputsArray = [...inputsArray];
        const index = event.target.id.split('-')[1];
        newInputsArray.splice(index, 1);
        setInputsArray(newInputsArray);
    }

    return (
        <div className="container-fluid">

            <form onSubmit={handleSubmit}>

                {(inputsArray.length > 0) &&                
                    <div className="form-group text-center">
                        <button type="submit" className="btn btn-dark">Sauvegarder</button>
                    </div>
                }

                {inputsArray.map((input, index) => {
                    return (
                        <div key={index} className="form-group Admin__Input-group">
                            <label className="form-label" htmlFor="nameInput1">Nom de l'input :</label>
                            <input value={input.name} onChange={handleChangeInput} type="text" name="name" id={`name-${index}`} className="form-control" placeholder="(e.g : cityName)" />
                            <br/>

                            <label className="form-label" htmlFor="labelInput1">Label :</label>
                            <input value={input.label} onChange={handleChangeInput} type="text" name="label" id={`label-${index}`} className="form-control" placeholder="(e.g : Entrez le nom d'une ville :)" />
                            <br/>
                            
                            <label className="form-label" htmlFor="placeholderInput1">Placeholder :</label>
                            <input value={input.placeholder} onChange={handleChangeInput} type="text" name="placeholder" id={`placeholder-${index}`} className="form-control" placeholder="(e.g : Paris, FR)" />
                            <br/>

                            <label className="form-label" htmlFor="typeInput1">Type :</label>
                            <select value={input.type} onChange={handleChangeInput} name="type" id={`type-${index}`} className="form-control">
                                <option value="text">text</option>
                                <option value="number">number</option>
                                <option value="calendar">calendar</option>
                            </select>

                            <div className="form-group text-center">
                                <button type="button" onClick={handleRemoveInput} id={`remove-${index}`} className="btn btn-dark">Supprimer l'input</button>
                            </div>
                        </div>
                    );
                })}

            </form>

            <div style={{ marginBottom: '30px' }} className="form-group text-center">
                <button type="button" onClick={addInput} className="btn btn-dark">Ajouter un input</button>
            </div>
        </div>
    );
}

export default EditFormFunction;