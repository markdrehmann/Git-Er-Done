class List {
  constructor(title, archived, tasks = []) {
    this.title = title;
    this.archived = archived
    this.tasks = tasks;
  }
}

const main = document.querySelector("main")

function makeListCard(list) {
  let card = document.createElement("div");
  card.classList.add("list");
  card.setAttribute("data-id", `${list.id}`);

  let h3 = document.createElement("h3");
  h3.innerText = `${list.title}`;
  // let btn = document.createElement("button");
  // btn.setAttribute("data-trainer-id", `${trainer.id}`);
  // btn.innerText = "Add Pokemon";
  // btn.addEventListener("click", event => addPokemon(event));
  let ul = document.createElement("ul");

  card.append(h3, ul);

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

function getLists() {
  fetch("http://localhost:3000/lists")
    .then(res => res.json())
    // .then(data => lists = data)
    .then(lists => lists.forEach(list => makeListCard(list)))
    // .then(() => lists.forEach(list => makeListCard(list)))
}

document.addEventListener("DOMContentLoaded", 
  getLists()
  )