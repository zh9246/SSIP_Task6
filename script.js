document.addEventListener("DOMContentLoaded", function () {
    loadTasks();
});

function addTask() {
    const taskInput = document.getElementById("taskInput");
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    const task = {
        id: new Date().getTime(),
        text: taskText,
        completed: false,
        date: new Date().toLocaleString(),
    };

    let tasks = getTasks();
    tasks.push(task);
    saveTasks(tasks);

    taskInput.value = "";
    displayTasks();
}

function displayTasks() {
    const pendingTasksContainer = document.getElementById("pendingTasks");
    const completedTasksContainer = document.getElementById("completedTasks");

    pendingTasksContainer.innerHTML = "";
    completedTasksContainer.innerHTML = "";

    const tasks = getTasks();

    tasks.forEach(function (task) {
        const li = document.createElement("li");
        li.innerHTML = `
            <span class="${task.completed ? 'completed' : ''}">${task.text}</span>
            <span>${task.date}</span>
            <button onclick="toggleTask(${task.id})">${task.completed ? 'Undo' : 'Complete'}</button>
            <button class="delete-btn" onclick="deleteTask(${task.id})">Delete</button>
        `;

        if (task.completed) {
            completedTasksContainer.appendChild(li);
        } else {
            pendingTasksContainer.appendChild(li);
        }
    });
}

function toggleTask(taskId) {
    let tasks = getTasks();
    tasks = tasks.map(task => {
        if (task.id === taskId) {
            task.completed = !task.completed;
        }
        return task;
    });
    saveTasks(tasks);
    displayTasks();
}

function deleteTask(taskId) {
    let tasks = getTasks();
    tasks = tasks.filter(task => task.id !== taskId);
    saveTasks(tasks);
    displayTasks();
}

function getTasks() {
    const tasksString = localStorage.getItem("tasks");
    return JSON.parse(tasksString) || [];
}

function saveTasks(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    displayTasks();
}
