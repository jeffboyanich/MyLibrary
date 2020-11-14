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
    return book;
};

const readyPlayerOne = new book('Ready Player One', 'Ernest Cline', 374, 'I have read this book');
addToLibrary(readyPlayerOne);

const fahrenheit = new book('Fahrenheit 451', 'Ray Bradbury', 237, 'I have read this book');
addToLibrary(fahrenheit);

const HarryPotterAndTheGobletOfFire = new book('Harry Potter and The Goblet of Fire', 'J.K. Rowling', 562, 'I have read this book');
addToLibrary(HarryPotterAndTheGobletOfFire);

console.table(myLibrary);

//const deleteBtn = document.createElement('button');

const form = document.getElementById('form');
const libraryDisplay = document.getElementById('libraryContainer');

function submitBookToLibrary(title, author, pages, haveRead) {
    let newBook = new book(title, author, pages, haveRead);
    addToLibrary(newBook);
}

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

function getFormValues() {
    let title = form.title.value;
    let author = form.author.value;
    let pages = form.pages.value;
    let haveRead = form.readStatus.value;
    submitBookToLibrary(title, author, pages, haveRead);
}
const submitBtn = document.getElementById('submitBtn');
submitBtn.addEventListener('click', function() {
    getFormValues();
    render();
    form.reset();
    hideForm();
    showLibraryDisplay();
})


document.querySelectorAll('.deleteBtn').forEach(function() {
    addEventListener('click', function(e) {
        newCard.remove();
    })
})

function removeBookFromLibrary(index) {
    myLibrary.splice(index, 1);
    render();
}
function render() {
    libraryDisplay.textContent = '';

    for (i = myLibrary.length - 1; i >= 0; i--) {
        let newCard = document.createElement('div');
        libraryDisplay.appendChild(newCard);
        let cardTitle = document.createElement('div');
        cardTitle.textContent = myLibrary[i].title;
        let cardInfo = document.createElement('ul');
        let authorInfo = document.createElement('li');
        authorInfo.textContent = myLibrary[i].author;
        cardInfo.appendChild(authorInfo);
        let pagesInfo = document.createElement('li');
        pagesInfo.textContent = myLibrary[i].pages;
        cardInfo.appendChild(pagesInfo);
        let readInfo = document.createElement('li');
        readInfo.textContent = myLibrary[i].haveRead;
        cardInfo.appendChild(readInfo);
        newCard.appendChild(cardTitle);
        newCard.appendChild(cardInfo);
        let deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.classList.add('deleteBtn');
        deleteBtn.setAttribute('data-index', `${i}`)
        newCard.appendChild(deleteBtn);
      }
      const deleteBtns = document.querySelectorAll('.deleteBtn');
      deleteBtns.forEach(function(button) {
          button.addEventListener('click', function(e) {
              removeBookFromLibrary(e.target.dataset.index);
          })
      })
    };

render();