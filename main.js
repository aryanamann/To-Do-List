function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
  document.getElementById("main").style.marginLeft = "250px";
  document.getElementById("hamburger").style.display = "none";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  document.getElementById("hamburger").style.display = "block";
  document.getElementById("main").style.marginLeft = "0";
}

let modal = document.getElementById("myModal");
let span = document.getElementsByClassName("close")[0];

span.onclick = function () {
  modal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

let form = document.getElementById("form");
let textInput = document.getElementById("textinput");
let msg = document.getElementById("msg");
let textarea = document.getElementById("textarea");
let tasks = document.getElementById("tasks");
let navTasks = document.getElementById("navTasks");
let add = document.getElementById("add");
let date = document.getElementById("date");
let detailsText = document.getElementById("detailInput");

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
  }
};

let data = [];
let acceptData = () => {
  data.push({
    text: textInput.value,
    desc: textarea.value,
    date: date.value,
    details: detailsText.value,
  });

  localStorage.setItem("data", JSON.stringify(data));

  createTasks();
  createTasksNav();
  resetForm();
};

let createTasks = () => {
  tasks.innerHTML = "";
  data.map((x, y) => {
    return (tasks.innerHTML += `<div id=${y} class="box">
    <p>${x.text}</p> 
    <p class="mb-2 fw-semibold">${x.desc}</p>
    <p class="mb-2 fw-semibold">${x.date}</p>
    <span
      ><i onclick="editTask(this)"  class="fa-solid fa-pen-to-square"></i>
      <i onclick="deleteTask(this)" class="fa-solid fa-trash"></i
    ><i onclick="flagTask(this)" class="fa-solid fa-flag-checkered"></i></span>
  </div>`);
  });
};

let createTasksNav = () => {
  navTasks.innerHTML = "";
  data.map((x, y) => {
    return (navTasks.innerHTML += `<div id=${y}>
    <p onClick="desc(this)">${x.text}</p>
    <p class="mb-2 d-none fw-semibold">${x.desc}</p>
    <p class="mb-2 d-none fw-semibold">${x.date}</p>
  </div>`);
  });
};

let desc = (e) => {
  selected = e.innerHTML;
  detailsText.value = selected;
  modal.style.display = "block";
  console.log(detailsText.value);
};

let resetForm = () => {
  textInput.value = "";
  textarea.value = "";
  date.value = "";
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
  date.value = selectedTask.children[2].innerHTML;
  deleteTask(e);
};

let flagTask = (e) => {
  e.parentElement.parentElement.classList.toggle("completed");
};

(() => {
  data = JSON.parse(localStorage.getItem("data")) || [];
  createTasks();
  createTasksNav();
  console.log(data);
})();

let navupate = (e) => {
  alert("Updated Succesfully..");
  modal.style.display = "none";
};
