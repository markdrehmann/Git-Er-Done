Things to do:

- I have a list hardcoded into html, need to create dynamically through index.js
- function to take data from fetch and populate into the list template


let l = new List(obj[0].title, obj[0].archived, obj[0].tasks)


FLOW:
- get data from server
- turn the data into instances of List
- use this array of list instances to create Cards of html

