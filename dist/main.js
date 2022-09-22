
//UI
const addProjectButton = document.getElementById("add-project-button");
const addProjectInput = document.getElementById("add-project-input");
const projectInputButtons = document.querySelectorAll(".project-input-button");
const projectButton = document.querySelectorAll(".project-button")

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



//Edit and Delete Project Buttons
const activeProjectButtons = document.getElementById("active-project-buttons");
const editProject = document.getElementById("edit-project-button");
const deleteProject = document.getElementById("delete-project-button")
const editProjectItems = document.getElementById("edit-project-info")
const editProjectNameInput = document.getElementById("update-projectname-input")
const editProjectNameButton = document.getElementById("update-projectname-button")




const allTasksButton = document.getElementById("all-tasks-button");
allTasksButton.addEventListener('click', () =>  {
    addTaskButton.style.display = 'none';
    activeProjectButtons.style.display = "none";
    projectTitle.textContent = "All Tasks";
    hideDisplayUpdateProject();

})




//When Add project button is clicked, hide button and display project input.
addProjectButton.addEventListener('click', () =>    {
    displayProjectInput();
});

//When either button is clicked, hide project input and display button.
projectInputButtons.forEach(button  =>  {
    button.addEventListener('click', () => {
        displayProjectButton();
    });
});

//When Add task button is clicked, hide button and display task input.
addTaskButton.addEventListener('click', () =>    {
    displayTaskInput()
});

//When either button is clicked, hide task input and display button.
taskInputButtons.forEach(button  =>  {
    button.addEventListener('click', () => {
        displayTaskButton()
       
    });
});

editProject.addEventListener('click', () =>   {
    displayUpdateProject();
})

//Functions for display.
function displayProjectInput()  {
    addProjectButton.style.display = 'none';
    addProjectInput.style.display = 'flex';
}
function displayProjectButton()  {
    addProjectButton.style.display = 'flex';
    addProjectInput.style.display = 'none';
}
function displayTaskInput()  {
    addTaskButton.style.display = 'none';
    addTaskInput.style.display = 'flex';
}
function displayTaskButton()  {
    addTaskButton.style.display = 'flex';
    addTaskInput.style.display = 'none';
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

function clearInput()    {
    projectInput.value = "";
    taskInput.value = "";
}





/* --- Project creation --- */
const allProjects = [];

//Project creation on load.
class Project {
    constructor (title, tasks)   {
        this.title = title;
        this.tasks = tasks;
    }
}
const project = new Project("Make To Dos", []);
allProjects.push(project);
displayProject(project.title)

/* Reworking of project */
addNewProject.addEventListener('click', () =>   {
    let newProject = projectInput.value;
    makeNewProject(newProject);
})

function makeNewProject(newProject) {
    if  (allProjects.find(project => project.title === newProject || newProject == "")) {
        alert("The project name cannot be blank or in use. Try a new project name.");
        displayProjectInput();
        clearInput();
        return;
    };
    let project = new Project(newProject, []);
    allProjects.push(project);
    displayProject(newProject);
}

function displayProject(projectName) {
    let newButton = document.createElement('button');
    newButton.type="submit";
    newButton.className="project-button";
    console.log(allProjects)
    newButton.textContent = "-" + "  " + allProjects[allProjects.length - 1].title;
    newButton.addEventListener('click', () =>   {
        projectTitle.textContent = projectName;
        addTaskButton.style.display = 'flex';
        projectTasks.innerHTML="";
        displayTaskButton();
        setActiveProject();
        hideDisplayUpdateProject()
        activeProjectButtons.style.display = "flex";
    })

    projects.appendChild(newButton)
    clearInput();
}

function setActiveProject() {
    let activeProject = projectTitle.textContent;
    let currentProject =  allProjects.find(project => project.title == activeProject);
    displayTask(currentProject)
    console.log(currentProject)
}




 /*--- Task creation ---*/ 
class Task  {
    constructor (title, date, completed)   {
        this.title = title;
        this.date = date;
        completed = false;
    }
}

const task = new Task("Add more tasks", 9/17/2022, false);
addNewTask.addEventListener('click', () =>   {
    createTask();
})

function createTask()   {
        let activeProject = projectTitle.textContent;
        let currentProject =  allProjects.find(project => project.title == activeProject);
        console.log(currentProject);
        let newTask = taskInput.value;
        if  (currentProject.tasks.find(task => newTask == task.title)) {
            alert("The task name cannot be blank or in use. Try a new task name.");
            displayTaskInput();
            clearInput();
            return;
        };
        let task = new Task(newTask, "", false);
        currentProject.tasks.push(task)
        
        
        //dom creation of projects
        displayTask(currentProject);
        clearInput();
}

function displayTask(currentProject)  {
        projectTasks.innerHTML="";
        currentProject.tasks.forEach(task => {
                let newTaskDiv = document.createElement('div'); 
                newTaskDiv.className="fakeproject";
                let leftDiv = document.createElement('div');
                let checkBox = document.createElement('input');
                checkBox.setAttribute('type','checkbox');
                checkBox.id="taskcheckbox";
                let p = document.createElement('p');
                p.textContent = task.title;
                leftDiv.appendChild(checkBox);
                leftDiv.appendChild(p);
                leftDiv.className = "fakeproject-left";
                newTaskDiv.appendChild(leftDiv);
                let rightDiv = document.createElement('div');
                let date = document.createElement('input');
                date.setAttribute('type', 'date');
                date.id="taskdate";
                let removeTask = document.createElement('button');
                removeTask.type='submit';
                removeTask.className="taskremove";
                removeTask.textContent="X"
                rightDiv.appendChild(date);
                rightDiv.appendChild(removeTask);
                rightDiv.className = "fakeproject-right";
                newTaskDiv.appendChild(rightDiv);
                projectTasks.appendChild(newTaskDiv)
        })
}




