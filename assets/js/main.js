// Initialize variables
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

// Add tasks to the list
function addTask() {
    taskInput.focus();
    const taskText = taskInput.value.trim();
    if (taskText === '') {
        alert('Please enter a task.');
    } else {
        const listItem = document.createElement('li');
        listItem.className = `list-group-item d-flex justify-content-between align-items-center task-item `;
        listItem.innerHTML = `
            <input type="checkbox" class="completed-checkbox">
            <input type="text" class="form-control task-input" value="${taskText}" readonly="true">
            <button class="btn btn-primary edit-btn" onclick="toggleEditSave(this)"><img src="assets/images/pencil.png" alt="Edit"></button>
            <button class="btn btn-warning save-btn" onclick="toggleEditSave(this)" style="display: none;"><img src="assets/images/save.png" alt="save"></button>
            <button class="btn btn-danger delete-btn"><img src="assets/images/delete.png" class="delete-icon" alt="Delete"></button>
        `;
        taskList.appendChild(listItem);
        save_task();
        taskInput.value = '';
        // Remove the no task message if it exists.
        checkAndDisplayNoTasks();
    }
    
}

//add task on enter
function addTaskOnEnter(event) {
    if (event.key === 'Enter') {
        addTask();
    }
}

// Toggle between Edit and Save buttons
taskList.addEventListener('click', function(event) {
    if (event.target.classList.contains('completed-checkbox')) {
        event.target.toggleAttribute("checked");
        event.target.parentNode.querySelector('.task-input').classList.toggle('completed');
        event.target.parentNode.querySelector('.edit-btn').toggleAttribute("disabled");
        save_task();
       
    } else if (event.target.classList.contains('edit-btn')) {
        toggleEditSave(event.target);
       
    } else if (event.target.classList.contains('save-btn')) {
        toggleEditSave(event.target);
       
    } else if (event.target.classList.contains('delete-btn') || event.target.classList.contains('delete-icon')) {
        if (event.target.classList.contains('delete-icon')) {
            event.target.parentNode.parentNode.remove();
        }
        event.target.parentNode.remove();
        save_task();
        // Remove the no task message after deleting tasks.
        checkAndDisplayNoTasks();
    }
});


// Delete all completed tasks or checked tasks
function deleteCompleted() {
    const checkedCheckboxes = document.querySelectorAll(".completed-checkbox:checked");
    checkedCheckboxes.forEach((checkbox) => {
        checkbox.parentNode.remove(); // Remove the entire list item
    });
    save_task();
    // Remove the no task message after deleting multiple tasks.
    checkAndDisplayNoTasks();
}


// Function to toggle between Edit and Save buttons
function toggleEditSave(index) {
    const inputField = index.parentElement.querySelector('.task-input');
    const editButton = index.parentElement.querySelector('.edit-btn');
    const saveButton = index.parentElement.querySelector('.save-btn');

    if (inputField.hasAttribute('readonly')) {
        // Switch to edit mode
        inputField.removeAttribute('readonly');
        inputField.focus();
        editButton.style.display = 'none';
        saveButton.style.display = 'block';
    } else {
        // Switch to save mode
        const edited_value = inputField.value
        inputField.setAttribute('readonly', 'true');
        index.parentElement.querySelector('.task-input').setAttribute('value', edited_value);
        editButton.style.display = 'block';
        saveButton.style.display = 'none';
        save_task();
    }
}

// Function to check if the task list is empty and display a message if it is.
function checkAndDisplayNoTasks() {
  const taskList = document.getElementById('taskList');
  // Find the first child list item with the class 'task-item'.
  const hasTasks = taskList.querySelector('.task-item');
  // Find the existing 'no-tasks' message element.
  const existingMessage = taskList.querySelector('.no-tasks-message');

  // If the list is empty and the message isn't already there, create and add it.
  if (!hasTasks && !existingMessage) {
    taskList.classList.add('justify-content-center');
    const noTasksMessage = document.createElement('div');
    noTasksMessage.className = 'no-tasks-message text-secondary'; // Added a class for easy selection
    noTasksMessage.innerHTML = '<div class="fs-2 fw-bold">No tasks to display yet.</div> <div class="fs-5">Start by adding one!</div>';
    
    taskList.appendChild(noTasksMessage);
  } 
  // If the list has tasks and the message is present, remove the message.
  else if (hasTasks && existingMessage) {
    taskList.classList.remove('justify-content-center');
    existingMessage.remove();
  }
}


// Save task to local storage
function save_task(){
    localStorage.setItem("tasks",taskList.innerHTML);
}
   
// Load task from local storage
taskList.innerHTML = localStorage.getItem("tasks");

// Check for tasks after the page loads.
checkAndDisplayNoTasks();




