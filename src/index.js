import { format } from "date-fns";
import parseISO from "date-fns/parseISO";

//UI
const addProjectButton = document.getElementById("add-project-button");
const addProjectInput = document.getElementById("add-project-input");
const projectInputButtons = document.querySelectorAll(".project-input-button");

const addTaskButton = document.getElementById("add-task-button");
const addTaskInput = document.getElementById("add-task-input");
const taskInputButtons = document.querySelectorAll(".task-input-button");

const projectTitle = document.getElementById("project-display-name");

const projectInput = document.getElementById("project-input");
const projects = document.getElementById("projects");
const addNewProject = document.getElementById("project-add-button");

const taskInput = document.getElementById("task-input");
const addNewTask = document.getElementById("task-add-button");
const projectTasks = document.getElementById("project-tasks");



//For smaller menu.
const hamburgerMenu = document.getElementById("hamburger-menu");
let displayMenu = true;
hamburgerMenu.addEventListener('click', () =>   {
    displayMenu = !displayMenu;
    sidebar.style.display = (displayMenu ? "flex" : "none")
})

//Edit and Delete Project Buttons
const activeProjectButtons = document.getElementById("active-project-buttons");
const editProject = document.getElementById("edit-project-button");
const deleteProjectButton = document.getElementById("delete-project-button");
const editProjectItems = document.getElementById("edit-project-info");
const editProjectNameInput = document.getElementById(
  "update-projectname-input"
);
const editProjectNameButton = document.getElementById(
  "update-projectname-button"
);

const allTasksButton = document.getElementById("all-tasks-button");
allTasksButton.addEventListener("click", () => {
  allTaskDisplay();
});

function allTaskDisplay() {
  activeProjectButtons.style.display = "none";
  projectTitle.textContent = "General To Dos";
  hideDisplayUpdateProject();
  projectTasks.innerHTML = "";
  let activeProject = projectTitle.textContent;
  let currentProject = generalTasks.find(
    (project) => project.title == activeProject
  );
  displayTask(currentProject);
}

//When Add project button is clicked, hide button and display project input.
addProjectButton.addEventListener("click", () => {
  displayProjectInput();
});

//When either button is clicked, hide project input and display button.
projectInputButtons.forEach((button) => {
  button.addEventListener("click", () => {
    displayProjectButton();
  });
});

//When Add task button is clicked, hide button and display task input.
addTaskButton.addEventListener("click", () => {
  displayTaskInput();
});

//When either button is clicked, hide task input and display button.
taskInputButtons.forEach((button) => {
  button.addEventListener("click", () => {
    displayTaskButton();
  });
});

editProject.addEventListener("click", () => {
  displayUpdateProject();
});

editProjectNameButton.addEventListener("click", () => {
  updateProjectName();
  clearInput();
});

deleteProjectButton.addEventListener("click", () => {
  deleteProject();
});

//Functions for display.
function displayProjectInput() {
  addProjectButton.style.display = "none";
  addProjectInput.style.display = "flex";
}
function displayProjectButton() {
  addProjectButton.style.display = "flex";
  addProjectInput.style.display = "none";
}
function displayTaskInput() {
  addTaskButton.style.display = "none";
  addTaskInput.style.display = "flex";
}
function displayTaskButton() {
  addTaskButton.style.display = "flex";
  addTaskInput.style.display = "none";
}

function displayUpdateProject() {
  editProjectItems.style.display = "flex";
  projectTitle.style.display = "none";
  addTaskButton.style.display = "none";
}

function hideDisplayUpdateProject() {
  editProjectItems.style.display = "none";
  projectTitle.style.display = "flex";
}

function clearInput() {
  projectInput.value = "";
  taskInput.value = "";
  editProjectNameInput.value = "";
}

/* --- Project creation --- */
const generalTasks = [];
const allProjects = [];

//Project creation on load.
class Project {
  constructor(title, tasks) {
    this.title = title;
    this.tasks = tasks;
  }
}

//On Load.
let project = new Project("Make To Dos", []);
allProjects.push(project);
project = new Project("General To Dos", []);
generalTasks.push(project);
console.log(generalTasks);
displayProject();

/* Reworking of project */
addNewProject.addEventListener("click", () => {
  let newProject = projectInput.value;
  makeNewProject(newProject);
});

function makeNewProject(newProject) {
  if (allProjects.find((project) => project.title === newProject || newProject == "")) {
    alert("The project name cannot be blank or in use. Try a new project name.");
    displayProjectInput();
    clearInput();
    return;
  }
  let project = new Project(newProject, []);
  allProjects.push(project);
  displayProject(newProject);
}

function displayProject() {
  projects.innerHTML = "";
  allProjects.forEach((project) => {
    let newButton = document.createElement("button");
    newButton.type = "submit";
    newButton.className = "project-button";
    newButton.textContent = "-" + "  " + project.title;
    newButton.addEventListener("click", () => {
      projectTitle.textContent = project.title;
      addTaskButton.style.display = "flex";
      projectTasks.innerHTML = "";
      displayTaskButton();
      setActiveProject();
      hideDisplayUpdateProject();
      activeProjectButtons.style.display = "flex";
    });
    projects.appendChild(newButton);
  });
  clearInput();
}

function setActiveProject() {
  let activeProject = projectTitle.textContent;
  let currentProject = allProjects.find(
    (project) => project.title == activeProject
  );
  displayTask(currentProject);
}

function updateProjectName() {
  let newProjectName = editProjectNameInput.value;
  if (allProjects.find((project) => project.title === newProjectName || newProjectName == ""))  {
    alert("The project name cannot be blank or in use. Try a new project name.");
    return
  }
  allProjects.forEach((project) => {
    if (project.title === projectTitle.textContent) {
      project.title = newProjectName;
      projectTitle.textContent = newProjectName;
    }
  });
  console.log(allProjects);
  hideDisplayUpdateProject();
  addTaskButton.style.display = "flex";
  displayProject();
}

function deleteProject() {
  let projectStatus = confirm(
    "Are you sure you want to delete the current project?"
  );
  if (projectStatus == true) {
    let projectIndex = allProjects.findIndex(
      (project) => project.title === projectTitle.textContent
    );
    allProjects.splice(projectIndex, 1);
    displayProject();
    allTaskDisplay();
  } else return;
}

/*--- Task creation ---*/
class Task {
  constructor(title, date, complete) {
    this.title = title;
    this.date = date;
    this.complete = complete;
  }
}

const task = new Task("Add more tasks", 9 / 17 / 2022, false);
addNewTask.addEventListener("click", () => {
  createTask();
});

function createTask() {
  let activeProject = projectTitle.textContent;
  let currentProject;
  if (activeProject == "General To Dos") {
    currentProject = generalTasks[0];
  } else {
    currentProject = allProjects.find(
      (project) => project.title == activeProject
    );
  }
  console.log(currentProject);
  let newTask = taskInput.value;
  if (newTask === "") {
    alert("The task name cannot be blank. Try a new task name.");
    return;
  } else if (currentProject.tasks.find((task) => newTask == task.title)) {
    alert("The task name cannot in use. Try a new task name.");
    displayTaskInput();
    clearInput();
    return;
  }
  let task = new Task(newTask, "", false);
  currentProject.tasks.push(task);
  //dom creation of projects
  displayTask(currentProject);
  clearInput();
}

function displayTask(currentProject) {
  projectTasks.innerHTML = "";
  currentProject.tasks.forEach((task) => {
    let newTaskDiv = document.createElement("div");
    newTaskDiv.className = "fakeproject";
    let leftDiv = document.createElement("div");
    let checkBox = document.createElement("input");
    checkBox.setAttribute("type", "checkbox");
    checkBox.id = "taskcheckbox";
    let p = document.createElement("p");
    let updateTaskName = document.createElement("input");
    p.textContent = task.title;
    let rightDiv = document.createElement("div");
    let date = document.createElement("input");
    let dateText = document.createElement("p");
    dateText.className = "datetext";
    date.setAttribute("type", "date");
    date.min = new Date().toLocaleDateString("en-ca");
    date.id = "taskdate";
    let removeTask = document.createElement("button");
    removeTask.type = "submit";
    removeTask.className = "taskremove";
    removeTask.textContent = "X";

    //Handles task completion.
    if (task.complete === true) {
      checkBox.disabled = true;
      p.innerHTML = `<del>` + task.title + `</del>`;
      date.disabled = true;
    }

    if (task.date !== "") {
      dateText.textContent = task.date;
      date.style.display = "none";
      dateText.style.display = "flex";
    }

    p.addEventListener("click", () => {
      p.style.display = "none";
      updateTaskName.setAttribute("type", "text");
      updateTaskName.id = "task-name-input";
      updateTaskName.placeholder = "New Task Name";
      updateTaskName.style.display = "flex";
      leftDiv.appendChild(updateTaskName);
      p.style.display = "none";
    });

    checkBox.addEventListener("click", () => {
      if (task.complete == true) {
        task.complete = false;
      } else task.complete = true;
      console.log(task.complete);
      displayTask(currentProject);
    });

    updateTaskName.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        let newTaskName = updateTaskName.value;
        if (newTaskName === "") {
          alert("The task name cannot be blank. Try a new task name.");
          return;
        } else if (
          currentProject.tasks.find((task) => newTaskName == task.title)
        ) {
          alert("The task name cannot in use. Try a new task name.");
          clearInput();
          return;
        }
        task.title = newTaskName;
        displayTask(currentProject);
      }
    });

    date.addEventListener("change", () => {
      let dateResult = parseISO(date.value);
      let dateDisplay = format(
        new Date(dateResult.toLocaleDateString()),
        "MM/dd/yyyy"
      );
      task.date = dateDisplay;
      console.log(task);
      dateText.textContent = dateDisplay;
      date.style.display = "none";
      dateText.style.display = "flex";
    });

    dateText.addEventListener("click", () => {
      date.style.display = "flex";
      dateText.style.display = "none";
    });

    removeTask.addEventListener("click", () => {
      let taskIndex = currentProject.tasks.findIndex(
        (task) => task.title == p.textContent
      );
      currentProject.tasks.splice(taskIndex, 1);
      console.log(currentProject.tasks);
      displayTask(currentProject);
    });

    leftDiv.appendChild(checkBox);
    leftDiv.appendChild(p);
    leftDiv.className = "fakeproject-left";
    newTaskDiv.appendChild(leftDiv);
    rightDiv.appendChild(dateText);
    rightDiv.appendChild(date);
    rightDiv.appendChild(removeTask);
    rightDiv.className = "fakeproject-right";
    newTaskDiv.appendChild(rightDiv);
    projectTasks.appendChild(newTaskDiv);
  });
}
