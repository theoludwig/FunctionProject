/* Variables séléction DOM */
const addTaskForm = document.getElementById('addTask');
const clear = document.querySelector(".clear");
const list = document.getElementById("list");
const input = document.getElementById("input");
const btnAddTask = document.getElementById('btnAddTask');

/* Variables */
const tasksListArray = JSON.parse(localStorage.getItem('tasks')) || [];
let id = tasksListArray.length;
// Classes CSS
const check = "fa-check-circle";
const unCheck = "fa-circle";
const lineThrough = "lineThrough";

/* Créer la tâche dans le DOM */
function addTask(task, id, done, trash) { 
    if(trash) { 
        return; 
    }
    const item = `<li class="item row" id=${id}>
                    <div class="col-2">
                        <i class="fa ${(done) ? check : unCheck} co" id="complete"></i>
                    </div>
                    <div class="col-8">
                        <p class="text text-center ${(done) ? lineThrough : ""}">${task}</p>
                    </div>
                    <div class="col-2">
                        <i class="fas fa-trash-alt de" id="removeTask"></i>
                    </div>
                  </li>
                `;
    list.insertAdjacentHTML("beforeend", item);
}

/* Ajoute un élément à la liste */
function addTaskElement(event) {
    event.preventDefault();
    const taskValue = document.getElementById('taskToAdd').value;
    addTask(taskValue, id, false, false);
    tasksListArray.push({
        name : taskValue,
        id : id,
        done : false,
        trash : false   
    });
    localStorage.setItem('tasks', JSON.stringify(tasksListArray));
    id++;
    addTaskForm.reset();
}
addTaskForm.addEventListener('submit', (event) => {addTaskElement(event)});
btnAddTask.addEventListener('click', (event) => {addTaskElement(event)});

/* Ajoute un élément à la liste */
list.addEventListener('click', (event) => {
    const element = event.target; 
    const elementJob = element.getAttribute('id');
    const elementId = element.parentNode.parentNode.getAttribute('id');

    /* Tâche compléter */
    if(elementJob == "complete") {
        element.classList.toggle(check);
        element.classList.toggle(unCheck);
        element.parentNode.parentNode.querySelector(".text").classList.toggle(lineThrough);
        tasksListArray[elementId].done = tasksListArray[elementId].done ? false : true;
    }

    /* Supprime une tâche */
    else if(elementJob == "removeTask") {
        element.parentNode.parentNode.remove();
        tasksListArray[elementId].trash = true;
    }
    localStorage.setItem("tasks", JSON.stringify(tasksListArray));
});

/* Affiche les tâches enregistrées */
tasksListArray.forEach((item) => {
    addTask(item.name, item.id, item.done, item.trash);
});

/* Supprime le localStorage */ 
clear.addEventListener("click", function(){
    localStorage.clear();
    location.reload();
});