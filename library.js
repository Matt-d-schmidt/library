/* setting variables */

let cardContainer = document.querySelector(".container");
let bookList = document.querySelector(".list");
let newBookButton = document.querySelector(".add");
let dialog = document.querySelector(".form");
let cancelButton = document.querySelector(".close");
let addBookButton = document.querySelector(".submit");
let titleInput = document.querySelector("#title");
let authorInput = document.querySelector("#author");
let pagesInput = document.querySelector("#pages");
let defaultRadio = document.querySelector("#not_read");

/* book object */

class Book {
    #id = crypto.randomUUID();
    #title = "";
    #author = "";
    #pages = 0;
    #read = "not read yet";
    #displayStatus = 0;

    constructor(title, author, pages, read, displayStatus) {
        this.#id = crypto.randomUUID();
        this.#title = title;
        this.#author = author;
        this.#pages = pages;
        this.#read = read;
        this.#displayStatus = displayStatus;
    }

    get title() {
        return this.#title;
    }

    get author() {
        return this.#author;
    }

    get pages() {
        return this.#pages;
    }

    get read() {
        return this.#read;
    }

    get displayStatus() {
        return this.#displayStatus;
    }

    set read(value) {
        this.#read = value;
    }

    set displayStatus(value) {
        this.#displayStatus = value;
    }

    toggleReadStatus() {
        if (this.#read === "read") {
            this.#read = "not read yet";
        } else {
            this.#read = "read";
        }
    }
}

class Library {
    #books = [];

    constructor() {
        if (!new.target) {
            throw Error("You must use the 'new' operator to call the constructor");
        }
    }

    get books() {
        return this.#books;
    }

    addBookToLibrary(title, author, pages, read, displayStatus) {
        this.#books.push(new Book(title, author, pages, read, displayStatus));
    }

    displayBooks() {
        // Remove old cards before displaying
        const oldCards = bookList.querySelectorAll('.card');
        oldCards.forEach(card => card.remove());

        this.#books.forEach((book, index) => {
            if (book.displayStatus !== 1) {
                let cardDiv = document.createElement("div");
                cardDiv.classList.add("card");
                let cardIcon = document.createElement("div");

                // Create a list to hold book info
                let cardList = document.createElement("ul");

                let titleText = document.createElement("p");
                titleText.textContent = book.title;
                let authorText = document.createElement("p");
                authorText.textContent = book.author;
                let pagesText = document.createElement("p");
                pagesText.textContent = book.pages;
                let readText = document.createElement("p");
                readText.textContent = book.read;

                let titleHeader = document.createElement("li");
                titleHeader.textContent = "Title: ";
                let authorHeader = document.createElement("li");
                authorHeader.textContent = "Author: ";
                let pagesHeader = document.createElement("li");
                pagesHeader.textContent = "Pages: ";
                let readHeader = document.createElement("li");
                readHeader.textContent = "Status: ";

                let butContainer = document.createElement("div");
                butContainer.classList.add("remove-but-container");
                let removeBookBut = document.createElement("button");
                removeBookBut.textContent = "Remove";
                removeBookBut.classList.add("remove-but");
                let toggleReadBut = document.createElement("button");

                if (book.read === "read") {
                    toggleReadBut.textContent = "not read";
                    toggleReadBut.classList.add("not-read-but");
                } else {
                    toggleReadBut.textContent = "read";
                    toggleReadBut.classList.add("read-but");
                }

                bookList.appendChild(cardDiv);
                cardDiv.appendChild(cardIcon);
                cardDiv.appendChild(cardList);
                cardList.appendChild(titleHeader);
                titleHeader.appendChild(titleText);
                cardList.appendChild(authorHeader);
                authorHeader.appendChild(authorText);
                cardList.appendChild(pagesHeader);
                pagesHeader.appendChild(pagesText);
                cardList.appendChild(readHeader);
                readHeader.appendChild(readText);
                cardDiv.appendChild(butContainer);
                butContainer.appendChild(removeBookBut);
                butContainer.appendChild(toggleReadBut);

                removeBookBut.addEventListener("click", () => {
                    myLibrary.#books.splice(index, 1);
                    cardContainer.removeChild(cardDiv);
                });

                toggleReadBut.addEventListener("click", () => {
                    book.toggleReadStatus();
                    readText.textContent = book.read;

                    if (book.read === "read") {
                        toggleReadBut.textContent = "not read";
                        toggleReadBut.classList.add("not-read-but");
                        toggleReadBut.classList.remove("read-but");
                    } else {
                        toggleReadBut.textContent = "read";
                        toggleReadBut.classList.add("read-but");
                        toggleReadBut.classList.remove("not-read-but");
                    }
                });
                book.displayStatus = 1;
            }
        });
    }

}



newBookButton.addEventListener("click", () => {
    dialog.classList.add("open");
    clearDialog();
});


cancelButton.addEventListener("click", () => {
    dialog.classList.remove("open");
});

function clearDialog() {
    titleInput.value = "";
    authorInput.value = "";
    pagesInput.value = "";
    defaultRadio.checked = true;
}

// Use form submit event for adding book
let bookForm = document.querySelector(".book-form");
bookForm.addEventListener("submit", function (e) {
    e.preventDefault();
    let statusRadio = document.querySelector("input[name='status']:checked");
    myLibrary.addBookToLibrary(titleInput.value, authorInput.value, pagesInput.value, statusRadio.value, 0);
    myLibrary.displayBooks();
    dialog.classList.remove("open");
});


let myLibrary = new Library();
myLibrary.addBookToLibrary("Mistborn", "Brandon Sanderson", 672, "not read yet", 0);
myLibrary.addBookToLibrary("The Tower of Swallows", "Andrzej Sapkwoski", 464, "read", 0);
myLibrary.addBookToLibrary("The Fellowship of the Ring", "JRR Tolkien", 531, "not read yet", 0);
myLibrary.addBookToLibrary("Shoedog", "Phil Knight", 400, "read", 0);
myLibrary.displayBooks();