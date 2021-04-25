class List {
  constructor(title, archived, tasks = []) {
    this.title = title;
    this.archived = archived
    this.tasks = tasks;
  }
}

function getLists() {
  fetch("http://localhost:3000/lists")
    .then(res => res.json())
    .then(data => data.forEach(list => console.log(list)))
}

document.addEventListener("DOMContentLoaded", 
  getLists()
  )