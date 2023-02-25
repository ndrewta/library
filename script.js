let library = [];

const bookContainer = document.querySelector(".book-container");
const formElem = document.querySelector("form");
const formDiv = document.querySelector(".form");

formElem.addEventListener("submit", (e) => submit(e));

const addBookBtn = document.querySelector("#add-book");
addBookBtn.addEventListener("click", toggleForm);
const cancelBtn = document.querySelector("#cancel");
cancelBtn.addEventListener("click", toggleForm);

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read === "yes" ? "Yes" : "No";
}

Book.prototype.pushBookToLibrary = function () {
  library.push(this);
};

function submit(e) {
  e.preventDefault();

  const data = new FormData(formElem);
  const title = data.get("title");
  const author = data.get("author");
  const pages = data.get("pages");
  const read = data.get("read");

  createBook(title, author, pages, read);
  formElem.reset();
}

function createBook(title, author, pages, read) {
  const book = new Book(title, author, pages, read);
  book.pushBookToLibrary();
  updateLibrary(book);
  toggleForm();
}

function loopLibrary() {
  library.forEach((book) => {
    const cover = document.createElement("div");
    cover.setAttribute("class", "book-cover");
    cover.textContent = `Title: ${book.title}\n`;
    cover.textContent += `Author: ${book.author}\n`;
    cover.textContent += `Pages: ${book.pages}\n`;
    cover.textContent += `Read: ${book.read}`;
    bookContainer.appendChild(cover);
  });
}

function updateLibrary(book) {
  const cover = document.createElement("div");
  cover.setAttribute("class", "book-cover");
  cover.textContent = `Title: ${book.title}\n`;
  cover.textContent += `Author: ${book.author}\n`;
  cover.textContent += `Pages: ${book.pages}\n`;
  cover.textContent += `Read: ${book.read}`;
  bookContainer.appendChild(cover);
}

function toggleForm() {
  formDiv.classList.toggle("form-toggle");
}

const bookA = new Book("Harry Pooter", "J Rowling", 290);
bookA.pushBookToLibrary();
const bookB = new Book("48 Loo", "Hora Hora", 1290, "yes");
bookB.pushBookToLibrary();
const bookC = new Book("House of Horrors", "Cowabunga", 392, "yes");
bookC.pushBookToLibrary();
loopLibrary();
