// store all tasks in an array
let tasks = [];

// load tasks when page opens
document.addEventListener("DOMContentLoaded", () => {
  const storedTasks = JSON.parse(localStorage.getItem("tasks"));

  if (storedTasks) {
    tasks = storedTasks;
    updateTasksList();
    updateStats();
  }
});

// save tasks in localStorage so they remain after refresh
const saveTask = () => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

// add a new task
const addTask = () => {
  const taskInput = document.getElementById("taskInput");
  const text = taskInput.value.trim();

  if (text) {
    tasks.push({ text: text, complete: false });
    taskInput.value = "";
    updateTasksList();
    updateStats();
    saveTask();
  }
};

// mark task complete / incomplete
const toggleTaskComplete = (index) => {
  tasks[index].complete = !tasks[index].complete;
  updateTasksList();
  updateStats();
  saveTask();
};

// delete a task
const deleteTask = (index) => {
  tasks.splice(index, 1);
  updateTasksList();
  updateStats();
  saveTask();
};

// edit existing task
const editTask = (index) => {
  const taskInput = document.getElementById("taskInput");
  taskInput.value = tasks[index].text;

  tasks.splice(index, 1);
  updateTasksList();
  updateStats();
  saveTask();
};

// update progress bar and completed task count
const updateStats = () => {
  const completeTasks = tasks.filter((task) => task.complete).length;
  const totalTasks = tasks.length || 1;

  const progress = (completeTasks / totalTasks) * 100;

  const progressBar = document.getElementById("progress");
  progressBar.style.width = `${progress}%`;

  // small animation when tasks are completed
  if (completeTasks > 0) {
    progressBar.classList.add("animate-progress");
  } else {
    progressBar.classList.remove("animate-progress");
  }

  document.getElementById("number").innerText =
    `${completeTasks}/${totalTasks}`;
};

// render tasks in UI
const updateTasksList = () => {
  const taskList = document.querySelector(".task-list");
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const listItem = document.createElement("li");

    listItem.innerHTML = `
      <div class="taskItem">
        <div class="task ${task.complete ? "completed" : ""}">
          <input type="checkbox" class="checkbox" ${task.complete ? "checked" : ""} />
          <p>${task.text}</p>
        </div>
        <div class="icons">
          <img src="./images/edit.png" onclick="editTask(${index})"/>
          <img src="./images/bin.png" onclick="deleteTask(${index})"/>
        </div>
      </div>
    `;

    listItem
      .querySelector(".checkbox")
      .addEventListener("change", () => toggleTaskComplete(index));

    taskList.append(listItem);
  });
};

// button click to add task
document.getElementById("newTask").addEventListener("click", function (e) {
  e.preventDefault();
  addTask();
});
