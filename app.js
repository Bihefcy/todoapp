let form = document.getElementById("form");
let textInput = document.getElementById("textInput");
let dateInput = document.getElementById("dateInput");
let textarea = document.getElementById("textarea");
let msg = document.getElementById("msg");
let tasks = document.getElementById("tasks");
let add = document.getElementById("add");


//no blank fields

form.addEventListener("submit", (e) =>
 {
    e.preventDefault();
    formValidation()
 });

 let formValidation = () => {
    if (textInput.value === "") {
        console.log("failure");
        console.log("failure")
        msg.innerHTML= "Task cannot be blank"
    } else {
        console.log("success");
        msg.innerHTML = ""; //love this attention to detail to remove error message

        acceptData();
        add.setAttribute("data-bs-dismiss", "modal");
        add.click();

        (() => {
            add.setAttribute("data-bs-dismiss", "");

        })();
    }
 }


 //collecting data 

 let data = []; //empty array this time
 
 let acceptData = () => {
    data.push ({
        text: textInput.value,
        date: dateInput.value,
        description: textarea.value,
    });

    localStorage.setItem("data", JSON.stringify(data)); //used stringfy cuz to send data to a web server, it has to be a string
    /*localStorage objects allows one to save key/value pairs in the browser 
    
    data isnt deleted when browser is closed.
    
    to save data to local storage
    localStorage.setItem(key, value)
    
    to read data
    let lastname = localStorage.getItem(key)
    
    
    to remove data from local storage
    localStorage.removeItem(key)
    
    
    to remove all
    localStorage.clear()
    */

    console.log(data)
    createTasks();
 };

 //create new tasks 
 let createTasks = () => {
    tasks.innerHTML = "";
    data.map((x,y) => {
        return (tasks.innerHTML += `
        <div id=${y}>
            <span class="fw-bold">${x.text}</span>
            <span class="small text-secondary">${x.date}</span>
            <p>${x.description}</p>

            <span class="options">
            <i onClick= "editTask(this)" data-bs-toggle="modal" data-bs-target="#form" class="fas fa-edit"></i>
            <i onClick ="deleteTask(this);createTasks()" class="fas fa-trash-alt"></i>
          </span>
        </div>
        `
        );
    });

    resetForm();
 };


 //after we collect and accept data, we need to clear input fields

 let resetForm= () => {
    textInput.value = "";
    dateInput.value = "";
    textarea.value = "";
 }
 //delete a task 
 let deleteTask = (e) => {
    e.parentElement.parentElement.remove(); //delete data from screen
  
    data.splice(e.parentElement.parentElement.id, 1); //remove targetted task from data array
  
    localStorage.setItem("data", JSON.stringify(data)); //update local storage with new data
  
    console.log(data);
  };


  //edit task

  let editTask = (e) => {
    let selectedTask = e.parentElement.parentElement; //target task to edit
  
    textInput.value = selectedTask.children[0].innerHTML; 
    dateInput.value = selectedTask.children[1].innerHTML;
    textarea.value = selectedTask.children[2].innerHTML; //target values of task to edit
  
    deleteTask(e); //remove data from local storage, screen and array
  };


  //to get data from local storage

  //run a IIFE immediately invoked function expression to retrieve data

  (() => {
    data = JSON.parse(localStorage.getItem("data")) || [];
    createTasks();
  })();