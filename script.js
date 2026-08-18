const taskInput = document.getElementById("taskInput");
const addButton = document.getElementById("addButton");
const taskList = document.getElementById("taskList");
const taskCounter = document.getElementById("taskCounter");
const clearButton = document.getElementById("clearButton");
const priorityInput = document.getElementById("priorityInput");
const searchInput = document.getElementById("searchInput");


let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function displayTasks() {
    taskList.innerHTML = "";

    tasks.forEach(function (task, index) {
    if (!task.text.toLowerCase().includes(searchInput.value.toLowerCase())) {
        return;
    }
        const li = document.createElement("li");

        const taskSpan = document.createElement("span");

taskSpan.innerHTML = `
    <strong>${task.text}</strong>
    <br>
    <small>Added: ${task.date || "Unknown"}</small>
    <br>
    <small class="priority ${task.priority || "Medium"}">
    Priority: ${task.priority || "Medium"}
</small>
`;

        if (task.completed) {
            taskSpan.style.textDecoration = "line-through";
        }

        const completeButton = document.createElement("button");

if (task.completed) {
    completeButton.textContent = "Undo";
} else {
    completeButton.textContent = "Complete";
}

        completeButton.addEventListener("click", function () {
            tasks[index].completed = !tasks[index].completed;

            localStorage.setItem("tasks", JSON.stringify(tasks));

            displayTasks();
            
        });
        const remainingTasks = tasks.filter(function (task) {
    return !task.completed;
}).length;

taskCounter.textContent = remainingTasks + " tasks remaining";

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";

        deleteButton.addEventListener("click", function () {
            tasks.splice(index, 1);

            localStorage.setItem("tasks", JSON.stringify(tasks));

            displayTasks();
        });

        li.appendChild(taskSpan);
        li.appendChild(completeButton);
        li.appendChild(deleteButton);

        taskList.appendChild(li);
    });
}

function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }
const newTask = {
    text: taskText,
    completed: false,
    date: new Date().toLocaleString(),
    priority: priorityInput.value
};
    

    tasks.push(newTask);

    localStorage.setItem("tasks", JSON.stringify(tasks));

    taskInput.value = "";

    displayTasks();
}

addButton.addEventListener("click", addTask);

taskInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        addTask();
    }
});

displayTasks();
clearButton.addEventListener("click", function () {
    if (tasks.length === 0) {
        alert("There are no tasks to clear!");
        return;
    }

    const confirmClear = confirm("Are you sure you want to delete all tasks?");

    if (confirmClear) {
        tasks = [];

        localStorage.removeItem("tasks");

        displayTasks();
    }
    searchInput.addEventListener("input", function () {
    displayTasks();
});

});
