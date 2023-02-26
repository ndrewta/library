let library = [];

const bookContainer = document.querySelector(".book-container");
const formElem = document.querySelector("form");
const formDiv = document.querySelector(".form");
const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const pagesInput = document.getElementById("pages");
const readInput = document.getElementById("read");
const notReadInput = document.getElementById("not-read");
const submitBtn = document.getElementById("submit");
const addBookBtn = document.getElementById("add-book");
const cancelBtn = document.getElementById("cancel");

const formInputElem = [
  titleInput,
  authorInput,
  pagesInput,
  readInput,
  notReadInput,
  submitBtn,
  cancelBtn,
];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read === "yes" ? "Yes" : "No";
}

Book.prototype.pushBookToLibrary = function () {
  library.push(this);
};

function loopLibrary() {
  library.forEach((book) => {
    const cover = document.createElement("div");
    cover.setAttribute("class", "book-cover");
    cover.textContent = `Title: ${book.title}\n`;
    cover.textContent += `Author: ${book.author}\n`;
    cover.textContent += `Pages: ${book.pages}\n`;
    cover.textContent += `Read: ${book.read}`;
    const btn = document.createElement("button");
    btn.textContent = "Remove";
    btn.setAttribute("id", "cover-button");
    cover.appendChild(btn);
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
  const btn = document.createElement("button");
  btn.textContent = "Remove";
  btn.setAttribute("id", "cover-button");
  cover.appendChild(btn);
  bookContainer.appendChild(cover);
}

function toggleForm() {
  formDiv.classList.toggle("form-toggle");

  formInputElem.forEach((elem) => {
    if (elem.disabled === true) {
      elem.disabled = false;
    } else {
      elem.disabled = true;
    }
  });
}

function createBook(title, author, pages, read) {
  const book = new Book(title, author, pages, read);
  book.pushBookToLibrary();
  updateLibrary(book);
  toggleForm();
}

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

function removeCover(cover) {
  if (cover.id === "cover-button") {
    cover.parentElement.remove();
  }
}

const bookA = new Book("Harry Pooter", "J Rowling", 290);
bookA.pushBookToLibrary();
const bookB = new Book("48 Loo", "Hora Hora", 1290, "yes");
bookB.pushBookToLibrary();
const bookC = new Book("House of Horrors", "Cowabunga", 392, "yes");
bookC.pushBookToLibrary();
loopLibrary();

addBookBtn.addEventListener("click", toggleForm);
cancelBtn.addEventListener("click", toggleForm);
formElem.addEventListener("submit", (e) => submit(e));
document.addEventListener("click", (e) => removeCover(e.target));
