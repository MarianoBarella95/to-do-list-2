const input = document.querySelector(".input-text");
const addForm = document.querySelector(".add-form");
const tasksList = document.querySelector(".tasks-list");
const deleteBtn = document.querySelector(".deleteAll-btn");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const saveOnLocalStorage = (tasksList) => {
    localStorage.setItem("tasks", JSON.stringify(tasksList));
}

const createTask = (task) => {
    return `<li>${task.name}<img src="./img/icons8-basura-llena.svg" alt="delete" class="delete-btn" data-name="${task.name}"> </li>`;
}

const renderTasksList = (todoList) => {
    tasksList.innerHTML = todoList.map((task) => createTask(task)).join("");
}

const hideDeleteAll = (tasksList) => {
    if(!tasksList.length) {
        deleteBtn.classList.add("hidden");
        return;
    }
    deleteBtn.classList.remove("hidden");
}

const addTask = (e) => {
    e.preventDefault();
    const taskName = input.value.trim();

    if(!taskName.length){
        alert("Por favor, ingrese una tarea")
        return
    } else if (
        tasks.some((task) => {
            return task.name.toLowerCase() === taskName.toLowerCase();
        })
    ) {
        alert("Ya existe una tarea con ese nombre")
        return
    }

    tasks = [...tasks, {name: taskName}];
    input.value = '';
    renderTasksList(tasks);
    saveOnLocalStorage(tasks);
    hideDeleteAll(tasks);
}

const removeTask  = (e) => {
    if(!e.target.classList.contains('delete-btn')) {
        return
    } 

    const filterName = e.target.dataset.name;
    tasks = tasks.filter ((task) => task.name !== filterName);
    renderTasksList (tasks);
    saveOnLocalStorage(tasks);
    hideDeleteAll(tasks);
} 

const removeAll = () => {
    tasks = [];
    renderTasksList(tasks);
    saveOnLocalStorage(tasks);
    hideDeleteAll(tasks);   
}

const init = () => {
    renderTasksList(tasks);     
    addForm.addEventListener("submit", addTask);
    tasksList.addEventListener("click", removeTask);
    deleteBtn.addEventListener("click", removeAll);
}

init();