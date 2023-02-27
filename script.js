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

Book.prototype.toggleReadState = function () {
  if (this.read === "Yes") {
    this.read = "No";
  } else {
    this.read = "Yes";
  }
};

function readText(book) {
  let toggleText = "";
  if (book.read === "Yes") {
    toggleText = "Unread";
  } else {
    toggleText = "Read";
  }
  return toggleText;
}

function createBookCover(book, index) {
  const cover = document.createElement("div");
  cover.setAttribute("class", "book-cover");
  cover.setAttribute("data-id", index);
  bookContainer.appendChild(cover);

  const title = document.createElement("p");
  title.textContent = `Title: ${book.title}`;
  cover.appendChild(title);

  const author = document.createElement("p");
  author.textContent = `Author: ${book.author}`;
  cover.appendChild(author);

  const pages = document.createElement("p");
  pages.textContent = `Pages: ${book.pages}`;
  cover.appendChild(pages);

  const read = document.createElement("p");
  read.textContent = `Read: ${book.read}`;
  cover.appendChild(read);

  const toggleBtn = document.createElement("button");
  toggleBtn.textContent = readText(book);
  toggleBtn.setAttribute("id", "read-toggle-btn");
  cover.appendChild(toggleBtn);

  const removeBtn = document.createElement("button");
  removeBtn.textContent = "Remove";
  removeBtn.setAttribute("id", "cover-remove-btn");
  cover.appendChild(removeBtn);
}

function toggleForm() {
  formDiv.classList.toggle("form-toggle");

  formInputElem.forEach((inputElem) => {
    const elem = inputElem;
    if (elem.disabled) {
      elem.disabled = false;
    } else {
      elem.disabled = true;
    }
  });
}

function updateLibrary() {
  while (bookContainer.hasChildNodes()) {
    bookContainer.removeChild(bookContainer.firstChild);
  }

  library.forEach((book, index) => {
    createBookCover(book, index);
  });
}

function createBook(title, author, pages, read) {
  let index = library.length;
  const book = new Book(title, author, pages, read);
  library.push(book);
  createBookCover(book, index);
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

function removeCover(e) {
  const index = e.parentElement.getAttribute("data-id");
  library.splice(index, 1);
  updateLibrary();
}

function toggleRead(e) {
  const index = e.parentElement.getAttribute("data-id");
  const book = library[index];
  book.toggleReadState();
  updateLibrary();
}

function buttonCheck(e) {
  if (e.id === "cover-remove-btn") {
    removeCover(e);
  }

  if (e.id === "read-toggle-btn") {
    toggleRead(e);
  }
}

const bookA = new Book("Harry Pooter", "J Rowling", 290);
const bookB = new Book("48 Loo", "Hora Hora", 1290, "yes");
const bookC = new Book("House of Horrors", "Cowabunga", 392, "yes");
const testBooks = [bookA, bookB, bookC];
testBooks.forEach((item) => {
  library.push(item);
});

updateLibrary();

addBookBtn.addEventListener("click", toggleForm);
cancelBtn.addEventListener("click", toggleForm);
formElem.addEventListener("submit", (e) => submit(e));
document.addEventListener("click", (e) => buttonCheck(e.target));

// * TO DO
// * Create new function to update individual covers rather than updating entire library