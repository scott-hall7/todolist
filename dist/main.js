
//UI
const addProjectButton = document.getElementById("add-project-button");
const addProjectInput = document.getElementById("add-project-input");
const projectInputButtons = document.querySelectorAll(".project-input-button");

const addTaskButton = document.getElementById("add-task-button");
const addTaskInput = document.getElementById("add-task-input");
const taskInputButtons = document.querySelectorAll(".task-input-button");

const projectInput = document.getElementById("project-input");

const projects = document.getElementById("projects");

const addNewProject = document.getElementById("project-add-button");

//When Add project button is clicked, hide button and display project input.
addProjectButton.addEventListener('click', () =>    {
    displayProjectInput();
});

//When either button is clicked, hide project input and display button.
projectInputButtons.forEach(button  =>  {
    button.addEventListener('click', () => {
        displayProjectButton() 
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


//Project creation
const projectArray = [];

addNewProject.addEventListener('click', createProject());

function createProject()    {
    let projectValue = projectInput.value;
    let newProject = document.createElement("p");
    newProject.innerText = projectValue;
    projects.appendChild(newProject);
}




