function test() {
  console.log("test text")
}

function getLists() {
  fetch("http://localhost:3000/lists")
    .then(res => res.json())
    .then(data => data.forEach(list => console.log(list)))
}