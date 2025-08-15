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

    constructor(title, author, pages, read) {
        this.#id = crypto.randomUUID();
        this.#title = title;
        this.#author = author;
        this.#pages = pages;
        this.#read = read;
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

    set read(value) {
        this.#read = value;
    }

    setStatus(status) {
        if (["read", "not read yet", "currently reading"].includes(status)) {
            this.#read = status;
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

    addBookToLibrary(title, author, pages, read) {
        this.#books.push(new Book(title, author, pages, read));
    }

    displayBooks() {
        // Remove old cards before displaying
        const oldCards = bookList.querySelectorAll('.card');
        const oldCardsRead = bookList.querySelectorAll('.card-read');
        oldCards.forEach(card => card.remove());
        oldCardsRead.forEach(card => cardRead.remove());

        this.#books.forEach((book, index) => {

            let cardDiv = document.createElement("div");
            let cardRead = document.createElement("div");
            cardDiv.classList.add("card");
            cardRead.classList.add("card-read");
            // Add book icon at the top
            let cardIcon = document.createElement("img");
            cardIcon.src = "images/book-open-page-variant.svg";
            cardIcon.alt = "Book icon";
            cardIcon.classList.add("card-icon");
            // Append everything in the correct order so all content is inside the card
            // 1. Add book icon
            // 2. Add close button
            // 3. Add info list
            // 4. Add toggle button

            // Book icon
            if (book.read === "read") {
                cardRead.appendChild(cardIcon);
            } else {
                cardDiv.appendChild(cardIcon);
            }

            // Close button (top right, with SVG icon)
            let closeBtn = document.createElement("button");
            closeBtn.classList.add("close");
            closeBtn.setAttribute("aria-label", "Close");
            let closeIcon = document.createElement("img");
            closeIcon.src = "images/remove.svg";
            closeIcon.alt = "close";
            closeIcon.classList.add("close-icon");
            closeBtn.appendChild(closeIcon);

            if (book.read === "read") {
                cardRead.appendChild(closeBtn);
            } else {
                cardDiv.appendChild(closeBtn);
            }

            if (book.read === "read") {
                closeBtn.addEventListener("click", () => {
                    myLibrary.#books.splice(index, 1);
                    bookList.removeChild(cardRead);
                });
            } else {
                closeBtn.addEventListener("click", () => {
                    myLibrary.#books.splice(index, 1);
                    bookList.removeChild(cardDiv);
                });
            }

            if (book.read === "read") {
                cardRead.appendChild(closeBtn);
            } else {
                cardDiv.appendChild(closeBtn);
            }

            closeBtn.addEventListener("click", () => {
                myLibrary.#books.splice(index, 1);
                bookList.removeChild(cardDiv);
            });

            // Info list
            let cardList1 = document.createElement("ul");
            let titleText = document.createElement("p");
            titleText.textContent = book.title;
            let authorText = document.createElement("p");
            authorText.textContent = book.author;
            let cardList2 = document.createElement("ul");
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

            if (book.read === "read") {
                cardRead.appendChild(cardList1);
                cardList1.appendChild(titleHeader);
                titleHeader.appendChild(titleText);
                cardList1.appendChild(authorHeader);
                authorHeader.appendChild(authorText);
                cardRead.appendChild(cardList2);
                cardList2.appendChild(pagesHeader);
                pagesHeader.appendChild(pagesText);
                cardList2.appendChild(readHeader);
                readHeader.appendChild(readText);
            } else {
                cardDiv.appendChild(cardList1);
                cardList1.appendChild(titleHeader);
                titleHeader.appendChild(titleText);
                cardList1.appendChild(authorHeader);
                authorHeader.appendChild(authorText);
                cardDiv.appendChild(cardList2);
                cardList2.appendChild(pagesHeader);
                pagesHeader.appendChild(pagesText);
                cardList2.appendChild(readHeader);
                readHeader.appendChild(readText);
            }


            // Status buttons
            let butContainer = document.createElement("div");
            butContainer.classList.add("remove-but-container");

            let readBut = document.createElement("button");
            readBut.textContent = "Read";
            readBut.classList.add("read-but");
            let notReadBut = document.createElement("button");
            notReadBut.textContent = "Not Read";
            notReadBut.classList.add("not-read-but");
            let currentlyReadingBut = document.createElement("button");
            currentlyReadingBut.textContent = "Currently Reading";
            currentlyReadingBut.classList.add("currently-reading-but");

            // Set active button style
            function updateStatusButtons() {
                readBut.classList.toggle("active", book.read === "read");
                notReadBut.classList.toggle("active", book.read === "not read yet");
                currentlyReadingBut.classList.toggle("active", book.read === "currently reading");
            }
            updateStatusButtons();

            readBut.addEventListener("click", () => {
                book.setStatus("read");
                readText.textContent = book.read;
                updateStatusButtons();
                myLibrary.displayBooks(); // Refresh the display to show the book in the read section
            });
            notReadBut.addEventListener("click", () => {
                book.setStatus("not read yet");
                readText.textContent = book.read;
                updateStatusButtons();
                myLibrary.displayBooks(); // Refresh the display to show the book in the not read section
            });
            currentlyReadingBut.addEventListener("click", () => {
                book.setStatus("currently reading");
                readText.textContent = book.read;
                updateStatusButtons();
                myLibrary.displayBooks(); // Refresh the display to show the book in the currently reading section
            });

            if (book.read === "read") {
                cardRead.appendChild(butContainer);
                butContainer.appendChild(readBut);
                butContainer.appendChild(notReadBut);
                butContainer.appendChild(currentlyReadingBut);
            } else {
                cardDiv.appendChild(butContainer);
                butContainer.appendChild(readBut);
                butContainer.appendChild(notReadBut);
                butContainer.appendChild(currentlyReadingBut);
            }

            // Finally, append the card to the list
            if (book.read === "read") {
                bookList.appendChild(cardRead);
            } else {
                bookList.appendChild(cardDiv);
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
    myLibrary.addBookToLibrary(titleInput.value, authorInput.value, pagesInput.value, statusRadio.value);
    myLibrary.displayBooks();
    dialog.classList.remove("open");
});


let myLibrary = new Library();
myLibrary.addBookToLibrary("Mistborn", "Brandon Sanderson", 672, "not read yet");
myLibrary.addBookToLibrary("The Tower of Swallows", "Andrzej Sapkwoski", 464, "read");
myLibrary.addBookToLibrary("The Fellowship of the Ring", "JRR Tolkien", 531, "not read yet");
myLibrary.addBookToLibrary("Shoedog", "Phil Knight", 400, "read");
myLibrary.displayBooks();