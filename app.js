let form = document.getElementById("form");
let textInput = document.getElementById("textInput");
let dateInput = document.getElementById("dateInput");
let textarea = document.getElementById("textarea");
let msg = document.getElementById("msg");
let tasks = document.getElementById("tasks");
let add = document.getElementById("add");
let addForm = document.getElementById("add-form");
let close = document.getElementById("close");
let bcgColor = document.getElementById("bcg-color");
let overlay = document.getElementById("overlay")



close.addEventListener("click", () => {
  form.classList.add("no-show");
  console.log('remove')
  overlay.classList.add("show")
});
addForm.addEventListener("click", () => {
  form.classList.remove("no-show");
  overlay.classList.remove("show");
});
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
          form.classList.add("no-show");
          overlay.classList.add("show");
        })();
       
       
    }

 }


 //collecting data 

 let data = []; //empty array this time
 
 let acceptData = () => {
  let i = bcgColor.selectedIndex;
    data.push ({
        text: textInput.value,
        date: dateInput.value,
        description: textarea.value,
        color: bcgColor.options[i].value
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



   
      /*  data.map((x, color) => {
          return(tasks.innerHTML += `
          <div class="tasks-card">
            <div class="header ${color}-header">
              <label class="header-mobile-container"for="body-toggle">
                <h3 class="header-mobile">${x.title}</h3>
              </label>
              <div>
              <span id="edit" onClick= "editTask(this)"><p class="edit-desktab">Edit</p><span class="edit-mobile">e</span></span>
              
              <span id="delete" onClick ="deleteTask(this);createTasks()"><p class="delete-desktab">Delete</p><span class="delete-mobile">d</span></span>
              </div>
            </div>
            <input id="body-toggle" type="checkbox"/>
            <div class="body ${color}-body" id="body">
              <div class="title" id="title">
                <h3 class="header-desktab">${x.title}</h3>
              </div>
              <div class="description" id="description">
                <h5>Description</h5>
                <p id="description">
                ${x.description}
                </p>
              </div>
              <div class="date">
                <h4 id="date">March 1st 2021</h4>
              </div>
            </div>
          </div>
          `)
        })
      }
  */

  









    data.map((x,y) => {
        return (tasks.innerHTML += `
        <div class="tasks-card" id=${y}>
            <div class="header ${x.color}-header">
              <label class="header-mobile-container"for="body-toggle" id="header-mobile" onClick="expandBody(this)">
                <h3 class="header-mobile">${x.text}</h3>
              </label>
              <span id="edit" onClick= "editTask(this)"><img class="edit-desktab" src="img/bx-edit-alt.svg"><span class="edit-mobile"><img src="img/bx-edit-alt.svg"></span></span>
              
              <span id="delete" onClick ="deleteTask(this);createTasks()"><img class="delete-desktab" src="img/bx-comment-x.svg"><span class="delete-mobile"><img src="img/bx-comment-x.svg"></span></span>
            </div>
            <div class="body ${x.color}-body" id="body">
              <div class="title" id="title">
                <h3 class="header-desktab">${x.text}</h3>
              </div>
              <div class="description" id="description">
                <h5>Description</h5>
                <p id="description">${x.description}</p>
              </div>
              <div class="date">
                <h4 id="date">${x.date}</h4>
              </div>
            </div>
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
    form.classList.remove("no-show");
    overlay.classList.remove("show");
    let selectedTask = e.parentElement.parentElement; //target task to edit
  
    textInput.value = selectedTask.children[1].children[0].children[0].innerHTML;
     
    dateInput.value = selectedTask.children[1].children[2].children[0].innerHTML;
    textarea.value = selectedTask.children[1].children[1].children[1].innerHTML; //target values of task to edit

    console.log(textInput.value, dateInput.value, textarea.value)
  
    deleteTask(e); //remove data from local storage, screen and array
  };


  //to get data from local storage

  //run a IIFE immediately invoked function expression to retrieve data

  (() => {
    data = JSON.parse(localStorage.getItem("data")) || [];
    createTasks();
  })();




  //expand mobile body//
let expandBody = (e) => {
  let selectedHead = e.parentElement.parentElement;
  let height = selectedHead.children[1].style.height;
   console.log(height)
  if(height == "" || height == "0px") { 
    console.log('height')
    selectedHead.children[1].style.height="auto";
    selectedHead.children[1].style.padding= "8px 12px";
  }else {
    selectedHead.children[1].style.height="0px";
    selectedHead.children[1].style.padding="0px";
  }
  

}


//for dark mode//
let body = document.getElementById("body");
let container = document.getElementById("container");
let colorMode = document.getElementById("color-mode");
let toggle = document.getElementById("toggle");


colorMode.addEventListener('click', () => {
  toggle.classList.toggle("shift");
  body.classList.toggle("dark-mode");
  container.classList.toggle("dark-mode-text");
})
