let myLibrary = [];
function Book(title, author, pages, read){
  this.title = title
  this.author = author
  this.pages = pages
  this.read = read
}
Book.prototype.info = function(){
  return (`${this.title} by ${this.author}, ${this.pages} pages, ${ /^y$/i.test(this.read) ? 'has been read':'has not been read'}.`)
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

function render() {
  bookid = document.getElementById("books")
  bookid.innerHTML = "<div></div>"
  books = document.querySelector("#books div")
  for (let i = 0; i < myLibrary.length; i++){
    books.innerHTML += ("<p>" + myLibrary[i].info() + `<input type='button' value= 'delete?' onclick='deleteItem(${i})'><input type='button' value='Change read status' onclick='changeRead(${i})'></p>`)
  }
}

function deleteItem(int){
  myLibrary.splice(int, 1)
  render()
}
function changeRead(i){
  bool = /^y$/i.test(myLibrary[i].read);
  bool ? myLibrary[i].read = 'n': myLibrary[i].read = 'y';
  render();
}
let open = 0
function createBookForm() {
  e = document.getElementById('newbookform')
  open = Math.abs(open - 1)
  if (open != 0){
  e.innerHTML += "<p class='bookinput'>Title:     <input type='text'></p>"
  e.innerHTML += "<p class='bookinput'>Author:    <input type='text'></p>"
  e.innerHTML += "<p class= 'bookinput'>Pages:     <input type='text'></p>"
  e.innerHTML += `<p class= 'bookinput'>Read yet?: Y/N<input type='text'></p>`
  e.innerHTML += "<input type='button' value='Add' onclick='addBook()'>"
  }
  else {
    e.innerHTML = ""
  }
}
function addBook(){
  book = document.querySelectorAll('.bookinput > input')
  addBookToLibrary(new Book(book[0].value, book[1].value, book[2].value, book[3].value))
  render()
}
document.getElementById('newbook').addEventListener("click", createBookForm)

let book = 0
book1 = new Book("jim", "also jim", 200, 'y')
book2 = new Book("not Jim", 'also not Jim', 70, 'n')

addBookToLibrary(book1)
addBookToLibrary(book2)