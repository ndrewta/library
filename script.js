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

  const titleDiv = document.createElement("div");
  const title = document.createElement("h2");
  title.textContent = "Title: ";
  const titleContent = document.createElement("p");
  titleContent.textContent = `${book.title}`;
  titleDiv.appendChild(title);
  titleDiv.appendChild(titleContent);
  cover.appendChild(titleDiv);

  const authorDiv = document.createElement("div");
  const author = document.createElement("h2");
  author.textContent = "Author: ";
  const authorContent = document.createElement("p");
  authorContent.textContent = `${book.author}`;
  authorDiv.appendChild(author);
  authorDiv.appendChild(authorContent);
  cover.appendChild(authorDiv);

  const pagesDiv = document.createElement("div");
  const pages = document.createElement("h2");
  pages.textContent = "Pages: ";
  const pagesContent = document.createElement("p");
  pagesContent.textContent = `${book.pages}`;
  pagesDiv.appendChild(pages);
  pagesDiv.appendChild(pagesContent);
  cover.appendChild(pagesDiv);

  const readDiv = document.createElement("div");
  const read = document.createElement("h2");
  read.textContent = "Read: ";
  const readContent = document.createElement("p");
  readContent.textContent = `${book.read}`;
  readDiv.appendChild(read);
  readDiv.appendChild(readContent);
  cover.appendChild(readDiv);

  const btnDiv = document.createElement("div");
  cover.appendChild(btnDiv);

  const toggleBtn = document.createElement("button");
  toggleBtn.textContent = readText(book);
  toggleBtn.setAttribute("id", "read-toggle-btn");
  btnDiv.appendChild(toggleBtn);

  const removeBtn = document.createElement("button");
  removeBtn.textContent = "Remove";
  removeBtn.setAttribute("id", "cover-remove-btn");
  btnDiv.appendChild(removeBtn);
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
}

function submit(e) {
  e.preventDefault();

  const data = new FormData(formElem);
  const title = data.get("title");
  const author = data.get("author");
  const pages = data.get("pages");
  const read = data.get("read");

  createBook(title, author, pages, read);
  toggleForm();
  formElem.reset();
}

function removeCover(e) {
  const index = e.parentElement.getAttribute("data-id");
  library.splice(index, 1);
  updateLibrary();
}

function toggleRead(e) {
  const parentElem = e.parentElement;
  const index = parentElem.parentElement.getAttribute("data-id");
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

addBookBtn.addEventListener("click", toggleForm);
cancelBtn.addEventListener("click", toggleForm);
formElem.addEventListener("submit", (e) => submit(e));
document.addEventListener("click", (e) => buttonCheck(e.target));
