let library = [];
const bookContainer = document.querySelector(".book-container");

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
    bookContainer.appendChild(cover);
  });
}

function toggleForm() {
  const element = document.querySelector(".form");
  element.classList.toggle("form-toggle");
}

const bookA = new Book("Harry Pooter", "J Rowling", 290);
bookA.pushBookToLibrary();
const bookB = new Book("48 Loo", "Hora Hora", 1290, "yes");
bookB.pushBookToLibrary();
const bookC = new Book("House of Horrors", "Cowabunga", 392, "yes");
bookC.pushBookToLibrary();
loopLibrary();
const toggleBtn = document.querySelector("#toggle-btn");
toggleBtn.addEventListener("click", toggleForm);
