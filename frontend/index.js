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
  // taskForm may need an ID to attach it to it's list
  taskForm.innerHTML = '<input type="text" name="task[description]" placeholder="Add to List"><input type="submit" style="display: none">';
  taskForm.addEventListener("submit", event => newTask(event));
  let btn = document.createElement("button");
  btn.innerText = "Delete List";
  btn.setAttribute("data-list-id", `${list.id}`)
  btn.addEventListener("click", event => deleteList(event));

  card.append(h3, ul, taskForm, btn);

  list.tasks.forEach(task => {
    let li = document.createElement("li");
    let input = document.createElement("input");
    input.type = "checkbox";
    input.addEventListener("click", event => toggleCompleted(event));
    let btn = document.createElement("button");
    btn.classList = "li";
    btn.innerText = "x";
    btn.addEventListener("click", event => deleteTask(event));
    li.innerText = `${task.description}`;
    li.prepend(input);
    li.appendChild(btn);
    ul.appendChild(li);
  });

  let br = document.createElement("br");
  main.append(card, br);
};

const form = document.querySelector("form");
form.addEventListener("submit", event => newList(event));

// this function will get a fetch POST inside of it
function newList(event) {
  event.preventDefault();
  console.log("form submitted");
  // event.target.reset??
}
// this will have fetch DELETE
function deleteTask(event) {
  event.preventDefault();
  console.log("delete this task, yo!")
}
// this is fetch PATCH? updates if task is completed or not
function toggleCompleted(event) {
  event.preventDefault();
  console.log("this should toggle if task is completed")
}
// fetch DELETE entire list
function deleteList(event) {
  event.preventDefault();
  console.log("this will delete the whole list")
}
// fetch POST
function newTask(event) {
  event.preventDefault();
  console.log("adding new task!");
  // event.target.reset??
}