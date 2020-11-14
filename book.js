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

/*const readyPlayerOne = new book('Ready Player One', 'Ernest Cline', 374, 'I have read this book');
addToLibrary(readyPlayerOne);

const fahrenheit = new book('Fahrenheit 451', 'Ray Bradbury', 237, 'I have read this book');
addToLibrary(fahrenheit);

const HarryPotterAndTheGobletOfFire = new book('Harry Potter and The Goblet of Fire', 'J.K. Rowling', 562, 'I have read this book');
addToLibrary(HarryPotterAndTheGobletOfFire);*/

console.table(myLibrary);


const form = document.getElementById('form');
const libraryDisplay = document.getElementById('libraryContainer');

function submitBookToLibrary(title, author, pages, haveRead) {
    let newBook = new book(title, author, pages, haveRead);
    addToLibrary(newBook);
}

function getLibraryFromLocalStorage() {
    for (i = 0; i <= window.localStorage.length - 1; i++) {
        myLibrary.push(JSON.parse(window.localStorage.getItem(`${i}`)));
    }
  window.localStorage.clear();
}
getLibraryFromLocalStorage();
window.localStorage.clear();

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
    if (haveRead == 'yes') {
        haveRead = true;
    } else if (haveRead == 'no') {
        haveRead = false;
    }
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

function removeBookFromLibrary(index) {
    myLibrary.splice(index, 1);
    window.localStorage.clear();
    render();
}

function changeReadStatus(index) {
    if (myLibrary[index].haveRead == false) {
        myLibrary[index].haveRead = true;
    }else if (myLibrary[index].haveRead == true) {
        myLibrary[index].haveRead = false;
    }
}
function render() {
    libraryDisplay.textContent = '';

    for (i = myLibrary.length - 1; i >= 0; i--) {
        let newCard = document.createElement('div');
            newCard.classList.add('bookCard');
        let newInfoWrapper = document.createElement('div');
            newInfoWrapper.classList.add('cardWrapper');
        libraryDisplay.appendChild(newCard);
        let cardTitle = document.createElement('div');
            cardTitle.classList.add('cardTitle');
            cardTitle.textContent = myLibrary[i].title;
        let cardInfo = document.createElement('ul');
            cardInfo.classList.add('cardInfo');
        let authorInfo = document.createElement('li');
            authorInfo.textContent = 'Author: ' + myLibrary[i].author;
            cardInfo.appendChild(authorInfo);
            let pagesInfo = document.createElement('li');
            pagesInfo.textContent = 'Pages: ' + myLibrary[i].pages;
            cardInfo.appendChild(pagesInfo);
        let readInfo = document.createElement('li');
            if (myLibrary[i].haveRead == true) {
                readInfo.textContent = 'Read'
            } else if (myLibrary[i].haveRead == false) {
                readInfo.textContent = 'Not read';
            }
            cardInfo.appendChild(readInfo);
            newInfoWrapper.appendChild(cardTitle);
            newInfoWrapper.appendChild(cardInfo);
            newCard.appendChild(newInfoWrapper);
        let deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.classList.add('deleteBtn');
            deleteBtn.setAttribute('data-index', `${i}`);
            newCard.appendChild(deleteBtn);
        let readButton = document.createElement('button');
            readButton.textContent = 'Read';
            readButton.classList.add('readButton');
            readButton.setAttribute('data-index', `${i}`);
            newCard.appendChild(readButton);
            window.localStorage.setItem(`${i}`, JSON.stringify(myLibrary[i]));
      }
      const deleteBtns = document.querySelectorAll('.deleteBtn');
      deleteBtns.forEach(function(button) {
          button.addEventListener('click', function(e) {
              removeBookFromLibrary(e.target.dataset.index);
          })
      });
      const readBtns = document.querySelectorAll('.readButton');
      readBtns.forEach(function(button) {
          button.addEventListener('click', function(e) {
              changeReadStatus(e.target.dataset.index);
              console.table(myLibrary)
              render();
          })
      }) 
    };

render();