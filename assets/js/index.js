const titleBookInput = document.getElementById('title-input');
const authorBookInput = document.getElementById('author-input');
const bookForm = document.getElementsByTagName('form')[0];
const bookList = document.getElementById('book-container');
const addBtn = document.getElementById('add-btn');
const dateTime = document.getElementById('dateTime');
const bookCounter = document.getElementById('counter');

let counter = 0;

titleBookInput.addEventListener('input', () => {
  bookCounter.style.animation = '';
  console.log(bookCounter.style.animation);
}
);


// date format
function myDate() {
  const today = new Date();
  dateTime.innerHTML = today.toLocaleString();
}
setInterval(myDate, 1000);

// navigation
const links = document.querySelectorAll('.nav-a');

// Prevent Form from Submit
bookForm.addEventListener('submit', (event) => {
  event.preventDefault();
});

// Class
class Book {
  constructor(id, title, author) {
    this.id = id;
    this.title = title;
    this.author = author;
  }

  static booksArr = [];

  // Remove a Book
  static remove() {
    Book.booksArr = Book.booksArr.filter(
      (book) => +book.id !== +this.parentElement.id,
    );
    this.parentElement.remove();

    Book.booksArr.forEach((book, i) => {
      book.id = i;
      bookList.children[i].id = i;
    });

    localStorage.setItem('Books', JSON.stringify(Book.booksArr));
  }

  // create a Book
  create(id = this.id, title = this.title, author = this.author) {
    const bookElement = `
    <div id="${id}" class="book">
        <div class="book-details">
          <p class="book-title">${title}</p>
          <span class="by">&nbsp;by&nbsp;</span>
          <p class="book-author">${author}</p>
        </div>
        <button class="btn remove-btn" type="button">Remove</button>
    </div`;

    bookList.insertAdjacentHTML('beforeend', bookElement);

    const removeBtn = document.getElementsByClassName('remove-btn');

    removeBtn[removeBtn.length - 1].addEventListener('click', Book.remove);
  }

  // Add a Book
  Add() {
    const newBook = new Book(this.id, this.title, this.author);
    newBook.create();
    Book.booksArr.push(newBook);
    localStorage.setItem('Books', JSON.stringify(Book.booksArr));
  }

  // Clear Fields
  static clearField() {
    titleBookInput.value = '';
    authorBookInput.value = '';
  }

  static load(bookData = JSON.parse(localStorage.getItem('Books'))) {
    if (bookData !== null) {
      bookData.forEach((book) => {
        const newBook = new Book(book.id, book.title, book.author);
        newBook.create();
      });
      Book.booksArr = bookData;
    }
    document.getElementById('list-link').click();
  }
}

/* Single Page Application */
function showThisSection(link) {
  links.forEach((lk) => {
    if (
      link.getAttribute('href') === lk.getAttribute('href')
      && !link.classList.contains('highlight-link')
    ) {
      document
        .getElementById(lk.getAttribute('href').replace('#', ''))
        .classList.toggle('show-section');
      lk.classList.toggle('highlight-link');
    } else if (
      link.getAttribute('href') !== lk.getAttribute('href')
      && lk.classList.contains('highlight-link')
    ) {
      document
        .getElementById(lk.getAttribute('href').replace('#', ''))
        .classList.toggle('show-section');
      lk.classList.toggle('highlight-link');
    }
  });
}

// Book counter
function showCounter() {
  counter = counter + 1;
  bookCounter.innerHTML = counter;
  bookCounter.style.display = 'initial';
  bookCounter.style.animation = 'highLightEffect 1s ease-in';
}

function hideCounter() {
  bookCounter.style.display = 'none';
  counter = 0;
}

// Event Listeners
addBtn.addEventListener('click', () => {
  if (titleBookInput.value !== '' && authorBookInput.value !== '') {
    const newBook = new Book(
      Book.booksArr.length,
      titleBookInput.value,
      authorBookInput.value,
    );
    newBook.Add();
    showCounter();
    Book.clearField();
  }
});

links.forEach((link, i) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    showThisSection(link);
    if(i === 0) hideCounter();
    if (i === 1) titleBookInput.focus();
  });
});

// Method to load Content
Book.load();
