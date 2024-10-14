document.addEventListener("DOMContentLoaded", function () {
  const addButton = document.getElementById("add-task-btn");
  const taskInput = document.getElementById("task-input");
  const taskList = document.getElementById("task-list");

  // Load tasks from Local Storage when the page loads
  function loadTasks() {
    const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]'); // Retrieve tasks from Local Storage
    storedTasks.forEach(taskText => addTask(taskText, false)); // Add each task to the DOM without saving again
  }

  // Function to add a new task (with optional Local Storage saving)
  function addTask(taskText, save = true) {
    const listItem = document.createElement("li");
    listItem.textContent = taskText;

    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.classList.add("remove-btn");

    // Remove task both from DOM and Local Storage
    removeButton.addEventListener("click", function () {
      taskList.removeChild(listItem); // Remove from the DOM
      removeTaskFromLocalStorage(taskText); // Remove from Local Storage
    });

    listItem.appendChild(removeButton); // Append remove button to list item
    taskList.appendChild(listItem); // Append list item to task list

    // Save to Local Storage if required
    if (save) {
      saveTaskToLocalStorage(taskText);
    }
  }

  // Save a new task to Local Storage
  function saveTaskToLocalStorage(taskText) {
    const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    storedTasks.push(taskText); // Add new task to the array
    localStorage.setItem('tasks', JSON.stringify(storedTasks)); // Save updated array to Local Storage
  }

  // Remove a task from Local Storage
  function removeTaskFromLocalStorage(taskText) {
    const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    const updatedTasks = storedTasks.filter(task => task !== taskText); // Remove the specific task
    localStorage.setItem('tasks', JSON.stringify(updatedTasks)); // Save updated array to Local Storage
  }

  // Add event listener to the 'Add Task' button
  addButton.addEventListener("click", function () {
    const taskText = taskInput.value.trim(); // Get input value

    if (taskText === "") {
      alert("Please enter a task."); // Alert if input is empty
      return;
    }

    addTask(taskText); // Add task to the DOM and Local Storage
    taskInput.value = ""; // Clear the input field
  });

  // Add event listener to allow task addition using the 'Enter' key
  taskInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      addButton.click(); // Trigger the add task button click
    }
  });

  // Load tasks from Local Storage when the page is loaded
  loadTasks();
});
