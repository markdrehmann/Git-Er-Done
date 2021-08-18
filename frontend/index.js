class List {
  constructor(id, title, archived, tasks = []) {
    this.id = id;
    this.title = title;
    this.archived = archived
    this.tasks = tasks;
  }

  makeListCard() {
    let card = document.createElement("div");
    card.classList.add("list");
    card.setAttribute("data-id", this.id);
  
    let h3 = document.createElement("h3");
    h3.innerText = this.title;
    let ul = document.createElement("ul");
    let taskForm = document.createElement("form");
    let tInput = document.createElement("input");
    tInput.type = "text";
    tInput.id = `task list ${this.id}`;
    tInput.placeholder = "Add to List";
    tInput.setAttribute("data-list-id", this.id);
    tInput.setAttribute("autocomplete", "off");

    taskForm.appendChild(tInput)
    taskForm.addEventListener("submit", event => newTask(event));
    let btn = document.createElement("button");
    btn.innerText = "Delete List";
    btn.setAttribute("data-list-id", this.id)
    btn.addEventListener("click", event => deleteList(event));
  
    card.append(h3, ul, taskForm, btn);
  
    if (!this.tasks.empty) {
      this.tasks.forEach(task => {
        let li = document.createElement("li");
        let input = document.createElement("input");
        input.type = "checkbox";
        input.setAttribute("data-task-id", task.id)
        if (task.completed == true) {
          input.checked = true;
          li.innerHTML = task.description.strike();
        } else {
          input.checked = false;
          li.innerText = task.description;
        };
        input.addEventListener("click", event => toggleCompleted(event));
        let btn = document.createElement("button");
        btn.classList = "li";
        btn.innerText = "x";
        btn.setAttribute("data-task-id", task.id);
        btn.addEventListener("click", event => deleteTask(event));
        li.prepend(input);
        li.appendChild(btn);
        ul.appendChild(li);
      });
    }
  
    let br = document.createElement("br");
    main.append(card, br);
  };
}

const main = document.querySelector("main");

function makeInstances(obj) {
  return obj.map(list => new List(list.id, list.title, list.archived, list.tasks))
}

function getLists() {
  main.innerHTML = "";
  fetch("http://localhost:3000/lists")
    .then(res => res.json())
    .then(lists => makeInstances(lists))
    .then(array => array.forEach(list => list.makeListCard()))
}

document.addEventListener('DOMContentLoaded', function() {
  getLists();
});

const form = document.querySelector("form");
form.addEventListener("submit", event => newList(event));

function newList(event) {
  event.preventDefault();
  let title = document.getElementById("title").value;
  if (title) {
    console.log(title);
    event.target.reset();
    fetch("http://localhost:3000/lists", {
    method: "POST",
    headers: { "Content-Type" : "application/json" },
    body: JSON.stringify({"title" : `${title}`})
    })
    .then(response => response.json())
    .then(list => new List(list.id, list.title, list.archived, list.tasks))
    .then(list => list.makeListCard())
  } else {
    alert("Title can't be blank!");
  }
}

function deleteTask(event) {
  event.preventDefault();
  let btn = event.target;
  let id = btn.getAttribute("data-task-id");
  btn.parentElement.remove();

  fetch("http://localhost:3000/tasks"+`/${id}`, {
    method: "DELETE"
  })
  .then(res => res.json())
  .then(data => console.log(data))
}

function toggleCompleted(event) {
  event.preventDefault();
  let input = event.target;
  let id = input.getAttribute("data-task-id");
  fetch("http://localhost:3000/tasks"+`/${id}`, {
    method: "PATCH"
  })
  .then(res => res.json())
  .then(() => console.log("Toggle Completed"))
  .then(() => getLists())
}

function deleteList(event) {
  event.preventDefault();
  let btn = event.target;
  let id = btn.getAttribute("data-list-id");
  btn.parentElement.remove();

  fetch("http://localhost:3000/lists"+`/${id}`, {
    method: "DELETE"
  })
  .then(res => res.json())
  .then(data => console.log(data))
}

function newTask(event) {
  event.preventDefault();
  let input = event.target.firstElementChild;
  let description = input.value;
  if (description) {
    let id = input.getAttribute("data-list-id");
    event.target.reset();
    fetch("http://localhost:3000/tasks", {
    method: "POST",
    headers: { "Content-Type" : "application/json" },
    body: JSON.stringify({"description" : `${description}`, "list_id" : `${id}`})
    })
    .then(response => response.json())
    .then(task => console.log(task))
    .then(() => getLists());
  } else {
    alert("Can't be blank!");
  }
}