function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
  document.getElementById("main").style.marginLeft = "250px";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  document.getElementById("main").style.marginLeft = "0";
}

let form = document.getElementById("form");
let textInput = document.getElementById("textinput");
let msg = document.getElementById("msg");
let textarea = document.getElementById("textarea");
let tasks = document.getElementById("tasks");
let navTasks = document.getElementById("navTasks");
let add = document.getElementById("add");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  formValidation();
});

let formValidation = () => {
  if (textInput.value === "") {
    console.log("failure");
    msg.innerHTML = "Task cannot be blank.";
  } else {
    console.log("success");
    acceptData();
    add.setAttribute("data-bs-dismiss", "modal");
    add.click();
    console.log("object");
    (() => {
      add.setAttribute("data-bs-dismiss", "");
    })();
  }
};

let data = [];
let acceptData = () => {
  data.push({
    text: textInput.value,
    desc: textarea.value,
  });

  localStorage.setItem("data", JSON.stringify(data));

  createTasks();
  createTasksNav();
  resetForm();
};

let createTasks = () => {
  tasks.innerHTML = "";
  data.map((x, y) => {
    return (tasks.innerHTML += `<div id=${y}>
    <p>${x.text}</p> 
    <span class="mb-2">${x.desc}</span>
    <span
      ><i onclick="editTask(this)" data-bs-toggle="modal" data-bs-target="#form" class="fa-solid fa-pen-to-square"></i>
      <i onclick="deleteTask(this)" class="fa-solid fa-trash"></i
    ></span>
  </div>`);
  });
};

let createTasksNav = () => {
  navTasks.innerHTML = "";
  data.map((x, y) => {
    return (navTasks.innerHTML += `<div id=${y}>
    <p>${x.text}</p>
  </div>`);
  });
};

let resetForm = () => {
  textInput.value = "";
  textarea.value = "";
  msg.innerHTML = "";
};

let deleteTask = (e) => {
  e.parentElement.parentElement.remove();
  data.splice(e.parentElement.parentElement.id, 1);
  localStorage.setItem("data", JSON.stringify(data));
};

let editTask = (e) => {
  let selectedTask = e.parentElement.parentElement;

  textInput.value = selectedTask.children[0].innerHTML;
  textarea.value = selectedTask.children[1].innerHTML;
  deleteTask(e);
};

(() => {
  data = JSON.parse(localStorage.getItem("data")) || [];
  createTasks();
  createTasksNav();
  console.log(data);
})();
