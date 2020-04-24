import { useState, useEffect, useContext } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { UserContext } from '../../contexts/UserContext';
import redirect from '../../utils/redirect';
import FunctionPage from '../../components/FunctionPage/FunctionPage';
import FunctionTabs from '../../components/FunctionPage/FunctionTabs';
import FunctionArticle from '../../components/FunctionPage/FunctionArticle';
import FunctionComments from '../../components/FunctionPage/FunctionComments/FunctionComments';
import api from '../../utils/api';
import '../../public/css/pages/FunctionComponent.css';
import '../../public/css/pages/functions/toDoList.css';
import '../../components/FunctionCard/FunctionCard.css';

const ManageToDo = () => {

    const { isAuth, user }            = useContext(UserContext);
    const [inputState, setInputState] = useState({ task: "" });
    const [tasks, setTasks]           = useState([]);

    useEffect(() => {
        const getTasks = async () => {
            const { data } = await api.get('/tasks', { headers: { 'Authorization': user.token } });
            setTasks(data);
        }
        if (isAuth && user.token != undefined) {
            getTasks();
        }
    }, [isAuth]);

    const handleChange = (event) => {
        const inputStateNew = { ...inputState };
        inputStateNew[event.target.name] = event.target.value;
        setInputState(inputStateNew);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const { data } = await api.post('/tasks', inputState, { headers: { 'Authorization': user.token } });
            const newTasks = [...tasks];
            newTasks.push(data);
            setTasks(newTasks);
            setInputState({ task: "" });
        } catch {}
    }

    const handleRemoveTask = async (id, index) => {
        const newTasks = [...tasks];
        try {
            await api.delete(`/tasks/${id}`, { headers: { 'Authorization': user.token } });
            newTasks.splice(index, 1);
            setTasks(newTasks);
        } catch {}
    }

    const handleEditTask = async (id, index, isCompleted) => {
        try {
            await api.put(`/tasks/${id}`, { isCompleted: !isCompleted }, { headers: { 'Authorization': user.token } });
            const newTasks   = [...tasks];
            const taskObject = newTasks[index];
            taskObject.isCompleted = !isCompleted;
            setTasks(newTasks);
        } catch {}
    }

    if (!isAuth) {
        return (
            <p className="text-center">
                Vous devez être <Link href={'/users/login'}><a>connecté</a></Link> pour gérer des "tâches à faire".
            </p>
        );
    }

    return (
        <div className="container-fluid">
            <div className="row justify-content-center">
                <div className="col-24">
                    <form onSubmit={handleSubmit}>
                        <div className="text-center">
                            <label htmlFor="task" className="form-label">Ajouter une tâche à faire :</label>
                            <input value={inputState.task} onChange={handleChange} name="task" id="task" type="text" className="form-control" placeholder="(e.g : Apprendre à coder)" />
                        </div>

                        <div className="form-group text-center">
                            <button type="submit" className="btn btn-dark">Envoyer</button>
                        </div>
                    </form>
                </div>
            </div>

            {(tasks.length > 0) &&
                <div className="row justify-content-center">
                    <div className="col-24 ManageToDo__container">
                        <ul className="ManageToDo__list">
                            {tasks.map((task, index) => {
                               return (
                                    <li key={task.id} className={`ManageToDo__list-item ${(task.isCompleted) ? "isCompleted" : ""}`}>
                                        <span className="ManageToDo__list-item-span">{task.task}</span>
                                        <div>
                                            <button className="ManageToDo__task-btn" title="Supprimer de la liste" onClick={() => handleRemoveTask(task.id, index)}>
                                                <FontAwesomeIcon icon={faTrash} />
                                            </button>
                                            <button className="ManageToDo__task-btn" onClick={() => handleEditTask(task.id, index, task.isCompleted)}>
                                                <FontAwesomeIcon { ...(task.isCompleted) ? { icon: faTimes } : { icon: faCheck } } />
                                            </button>
                                        </div>
                                    </li>
                               );
                            })}
                        </ul>
                    </div>
                </div>
            }
        </div>
    );
}

const FunctionTabManager = (props) => {
    return (
        <FunctionTabs setSlideIndex={props.setSlideIndex} slideIndex={props.slideIndex}>
            <div className="FunctionComponent__slide">
                <ManageToDo />
            </div>
            <div className="FunctionComponent__slide">
                <FunctionArticle article={props.article} />
            </div>
            <div className="FunctionComponent__slide">
                <FunctionComments functionId={props.id} />
            </div>
        </FunctionTabs>
    );
}

const toDoList = (props) => (
    <FunctionPage 
        FunctionTabManager={FunctionTabManager}
        { ...props }
        tabNames={["⚙️ Utilisation", "📝 Article", "📬 Commentaires"]} 
    />
);

export async function getServerSideProps(context) {
    return api.get(`/functions/toDoList`)
        .then((response) => ({ props: response.data }))
        .catch(() => redirect(context, '/404'));
}

export default toDoList;