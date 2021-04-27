class List {
  constructor(title, archived, tasks = []) {
    this.title = title;
    this.archived = archived
    this.tasks = tasks;
  }
}

let main = document.querySelector("main")

function getLists() {
  fetch("http://localhost:3000/lists")
    .then(res => res.json())
    .then(data => obj = data)
    .then(() => console.log(obj))
}

document.addEventListener("DOMContentLoaded", 
  getLists()
  )