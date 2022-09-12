const addProjectButton = document.getElementById("add-project-button");
const addProjectInput = document.getElementById("add-project-input");
const projectInputButtons = document.querySelectorAll(".project-input-button");

const addTaskButton = document.getElementById("add-task-button");
const addTaskInput = document.getElementById("add-task-input");
const taskInputButtons = document.querySelectorAll(".task-input-button");


//When Add project button is clicked, hide button and display project input.
addProjectButton.addEventListener('click', () =>    {
    addProjectButton.style.display = 'none';
    addProjectInput.style.display = 'flex';

});

//When either button is clicked, hide project input and display button.
projectInputButtons.forEach(button  =>  {
    button.addEventListener('click', () => {
        addProjectButton.style.display = 'flex';
        addProjectInput.style.display = 'none';
    });
});

//When Add task button is clicked, hide button and display task input.
addTaskButton.addEventListener('click', () =>    {
    addTaskButton.style.display = 'none';
    addTaskInput.style.display = 'flex';

});

//When either button is clicked, hide task input and display button.
taskInputButtons.forEach(button  =>  {
    button.addEventListener('click', () => {
        addTaskButton.style.display = 'flex';
        addTaskInput.style.display = 'none';
    });
});
