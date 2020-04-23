import { Fragment, useState, useEffect } from 'react';
import htmlParser from 'html-react-parser';
import Loader from '../../components/Loader';
import useAPI from '../../hooks/useAPI';
import api from '../../utils/api';
import '../../public/css/pages/admin.css';

const AddEditFunction = (props) => {

    const [, categories]              = useAPI('/categories');
    const [inputState, setInputState] = useState(props.defaultInputState);
    const [message, setMessage]       = useState("");
    const [isLoading, setIsLoading]   = useState(false);

    useEffect(() => {
        if (categories.length > 0 && !props.isEditing) {
            handleChange({
                target: {
                    name: "categorieId",
                    value: categories[0].id
                }
            });
        }
    }, [categories]);

    const apiCallFunction = (formData) => {
        if (props.isEditing) return api.put(`/admin/functions/${inputState.id}`, formData, { headers: { 'Authorization': props.user.token } });
        return api.post('/admin/functions', formData, { headers: { 'Authorization': props.user.token } });
    }

    const handleChange = (event, isTypeCheck = false) => {
        const inputStateNew = { ...inputState };
        inputStateNew[event.target.name] = (event.target.files != undefined) ? event.target.files[0] : (isTypeCheck) ? event.target.checked : event.target.value;
        setInputState(inputStateNew);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setIsLoading(true);
        const formData = new FormData();
        formData.append('type', inputState.type);
        formData.append('categorieId', inputState.categorieId);
        formData.append('title', inputState.title);
        formData.append('slug', inputState.slug);
        formData.append('description', inputState.description);
        formData.append('image', inputState.image);

        if (props.isEditing) {
            formData.append('isOnline', inputState.isOnline);
        }

        apiCallFunction(formData)
            .then(() => {
                setIsLoading(false);
                window.location.reload(true);
            })
            .catch((error) => {
                setMessage(`<p class="form-error"><b>Erreur:</b> ${error.response.data.message}</p>`);
                setIsLoading(false);
            });
    }

    return (
        <Fragment>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="form-label" htmlFor="title">Titre :</label>
                    <input value={inputState.title} onChange={handleChange} type="text" name="title" id="title" className="form-control" placeholder="(e.g : Nombre aléatoire)" />
                </div>

                <div className="form-group">
                    <label className="form-label" htmlFor="slug">Slug :</label>
                    <input value={inputState.slug} onChange={handleChange} type="text" name="slug" id="slug" className="form-control" placeholder="(e.g : randomNumber)" />
                </div>

                <div className="form-group">
                    <label className="form-label" htmlFor="description">Description :</label>
                    <textarea style={{ height: 'auto' }} value={inputState.description} onChange={handleChange} name="description" id="description" className="form-control" rows="5"></textarea>
                </div>

                <div className="form-group">
                    <label className="form-label" htmlFor="type">Type :</label>
                    <select onChange={handleChange} name="type" id="type" className="form-control" { ...(props.isEditing) && { value: inputState.type } }>
                        <option value="form">Formulaire</option>
                        <option value="article">Article</option>
                        <option value="page">Page</option>
                    </select>
                </div>

                <div className="form-group">
                    <label className="form-label" htmlFor="categorieId">Catégorie :</label>
                    <select onChange={handleChange} name="categorieId" id="categorieId" className="form-control" { ...(props.isEditing) && { value: inputState.categorieId } }>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id} className="Admin__Modal-select-option" style={{ backgroundColor: category.color }}>{category.name}</option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label className="form-label" htmlFor="image">Image <em>(150x150 recommandé)</em> :</label>
                    <br/>
                    <input onChange={handleChange} accept="image/jpeg,image/jpg,image/png" type="file" name="image" id="image" />
                </div>

                {(props.isEditing) &&                 
                    <div className="form-group custom-control custom-switch">
                        <input onChange={(event) => handleChange(event, true)} type="checkbox" name="isOnline" checked={inputState.isOnline} className="custom-control-input" id="isOnline" />
                        <label className="custom-control-label" htmlFor="isOnline">isOnline</label>
                    </div>
                }

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

export default AddEditFunction;