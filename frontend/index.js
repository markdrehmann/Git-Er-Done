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
  let btn = document.createElement("button");
  btn.innerText = "Delete List";
  btn.setAttribute("data-list-id", `${list.id}`)
  // btn.addEventListener("click", event => addPokemon(event));

  card.append(h3, ul, taskForm, btn);

  // THIS SECTION IS GOING TO BE ADDING li TASKS TO EACH LIST
  // trainer.pokemons.forEach(pokemon => {
  //   let li = document.createElement("li");
  //   li.innerText = `${pokemon.nickname} (${pokemon.species})`;
  //   let releaseButton = document.createElement("button");
  //   releaseButton.classList.add("release");
  //   releaseButton.setAttribute("data-pokemon-id", `${pokemon.id}`);
  //   releaseButton.innerText = "Release";
  //   releaseButton.addEventListener("click", event => releasePokemon(event));
  //   li.appendChild(releaseButton);
  //   ul.appendChild(li);
  // });

  let br = document.createElement("br");
  main.append(card, br);
}