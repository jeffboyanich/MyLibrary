 function book(title, author, pages, haveRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.haveRead = haveRead;
    this.info = function() {
     return `${this.title}` + ' ' + 'by' + ' ' + `${this.author}` + ' ' +     
     `${this.pages}` + ' ' + `${this.haveRead}`;
    }
  };

let myLibrary = [];

function addToLibrary(book) {
    myLibrary.push(book);
};

const readyPlayerOne = new book('Ready Player One', 'Ernest Cline', 374, 'I have read this book');
addToLibrary(readyPlayerOne);

const fahrenheit = new book('Fahrenheit 451', 'Ray Bradbury', 237, 'I have read this book');
addToLibrary(fahrenheit);

const HarryPotterAndTheGobletOfFire = new book('Harry Potter and The Goblet of Fire', 'J.K. Rowling', 562, 'I have read this book');
addToLibrary(HarryPotterAndTheGobletOfFire);

console.table(myLibrary);

const deleteBtn = document.createElement('button');



function submitBookToLibrary(title, author, pages, haveRead) {
    const newBook = new book(title, author, pages, haveRead);
    addToLibrary(newBook);
}

const libraryDisplay = document.getElementById('libraryDisplay');
function displayBook(title, author, pages, haveRead) {
    let titleDisplay = document.createElement('div');
    let authorDisplay = document.createElement('div');
    let pagesDisplay = document.createElement('div');
    let readDisplay = document.createElement('div');
    let deleteBtn = document.createElement('button');
    titleDisplay.textContent = title;
    authorDisplay.textContent = author;
    pagesDisplay.textContent = pages;
    readDisplay.textContent = haveRead;
    deleteBtn.textContent = 'delete';
    readDisplay.append(deleteBtn);
    libraryDisplay.appendChild(titleDisplay);
    libraryDisplay.appendChild(authorDisplay);
    libraryDisplay.appendChild(pagesDisplay);
    libraryDisplay.appendChild(readDisplay);
}

const form = document.getElementById('form');
const submitBtn = document.getElementById('submitBtn');
submitBtn.addEventListener('click', function() {
    let title = form.title.value;
    let author = form.author.value;
    let pages = form.pages.value;
    let haveRead = form.readStatus.value;
    submitBookToLibrary(title, author, pages, haveRead);
    displayBook(title, author, pages, haveRead);
    console.table(myLibrary);
    form.reset();
    showLibraryDisplay();
    hideForm();
    console.log(form);
})

myLibrary.forEach(function(item) {
    displayBook(item.title,item.author,item.pages,item.haveRead);
})

function showForm() {
    form.style.display = 'block';
}

function hideForm() {
    form.style.display = 'none';
}

function hideLibraryDisplay() {
    libraryDisplay.style.display = 'none';
}

function showLibraryDisplay() {
    libraryDisplay.style.display = 'grid';
}

const newBookBtn = document.getElementById('newBookBtn');
newBookBtn.addEventListener('click', function() {
    showForm();
    hideLibraryDisplay();
})

const cancelBtn = document.getElementById('cancelBtn');
cancelBtn.addEventListener('click', function() {
    hideForm();
    showLibraryDisplay();
})

