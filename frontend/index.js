class List {
  constructor(id, title, archived, tasks = []) {
    this.id = id;
    this.title = title;
    this.archived = archived
    this.tasks = tasks;
  }
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
    .then(array => array.forEach(list => makeListCard(list)))
}

document.addEventListener('DOMContentLoaded', function() {
  getLists();
});

function makeListCard(list) {
  let card = document.createElement("div");
  card.classList.add("list");
  card.setAttribute("data-id", `${list.id}`);

  let h3 = document.createElement("h3");
  h3.innerText = `${list.title}`;
  let ul = document.createElement("ul");
  let taskForm = document.createElement("form");
  let tInput = document.createElement("input");
  tInput.type = "text";
  tInput.id = `task list ${list.id}`;
  tInput.placeholder = "Add to List";
  tInput.setAttribute("data-list-id", `${list.id}`);
  taskForm.appendChild(tInput)
  taskForm.addEventListener("submit", event => newTask(event));
  let btn = document.createElement("button");
  btn.innerText = "Delete List";
  btn.setAttribute("data-list-id", `${list.id}`)
  btn.addEventListener("click", event => deleteList(event));

  card.append(h3, ul, taskForm, btn);

  if (!list.tasks.empty) {
    list.tasks.forEach(task => {
      let li = document.createElement("li");
      let input = document.createElement("input");
      input.type = "checkbox";
      input.addEventListener("click", event => toggleCompleted(event));
      let btn = document.createElement("button");
      btn.classList = "li";
      btn.innerText = "x";
      btn.setAttribute("data-task-id", `${task.id}`);
      btn.addEventListener("click", event => deleteTask(event));
      li.innerText = `${task.description}`;
      li.prepend(input);
      li.appendChild(btn);
      ul.appendChild(li);
    });
  }

  let br = document.createElement("br");
  main.append(card, br);
};



const form = document.querySelector("form");
form.addEventListener("submit", event => newList(event));

function newList(event) {
  event.preventDefault();
  let title = document.getElementById("title").value;
  console.log(title);
  event.target.reset();
  fetch("http://localhost:3000/lists", {
  method: "POST",
  headers: { "Content-Type" : "application/json" },
  body: JSON.stringify({"title" : `${title}`})
  })
  .then(response => response.json())
  .then(list => new List(list.id, list.title, list.archived, list.tasks))
  .then(list => makeListCard(list))
}

// this will have fetch DELETE
function deleteTask(event) {
  event.preventDefault();
  console.log(event.target)
}
// this is fetch PATCH? updates if task is completed or not
function toggleCompleted(event) {
  event.preventDefault();
  console.log("this should toggle if task is completed")
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
}