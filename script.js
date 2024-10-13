document.addEventListener("DOMContentLoaded", function(){
  const addButton = document.getElementById("add-task-btn");
  const taskInput = document.getElementById("task-input");
  const taskList = document.getElementById("task-list");

  function addTask(){
    const taskText = taskInput.value.trim();
    if (taskText === ""){
      taskInput.classList.add("error");
      alert("Please enter a task.");
      return;
    }else{
      taskInput.classList.remove("error");
    }

    const listItem = document.createElement("li");
    listItem.textContent=taskText;
    listItem.classList.add("tasl-item");

    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.className="remove-btn";
    removeButton.onclick = function (){
      taskList.removeChild(listItem);
    };

    listItem.appendChild(removeButton);
    taskList.appendChild(listItem);
    taskInput.value = "";

  }
  addButton.addEventListener("click", addTask);
  taskInput.addEventListener("keypress", function(event){
    if (event.key === "Enter"){
      addTask();
    }
  });


});
