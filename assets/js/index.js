const titleBookInput = document.getElementById('title-input');
const authorBookInput = document.getElementById('author-input');
const bookForm = document.getElementsByTagName('form')[0];
const bookList = document.getElementById('book-list');
const addBtn = document.getElementById('add-btn');

let booksArr = [];

// Prevent Form from Submit
bookForm.addEventListener('submit', (event) => {
    event.preventDefault();
  });

class Book {
  constructor(id, title, author) {
    this.id = id;
    this.title = title;
    this.author = author;
  }

  // Remove a Book
  static remove() {
    booksArr = booksArr.filter((book) => +book.id !== +this.parentElement.id);
    this.parentElement.remove();

    booksArr.forEach((book, i) => {
      book.id = i;
      bookList.children[i].id = i;
    });

    localStorage.setItem('Books', JSON.stringify(booksArr));
  }

  //creat a Book
  create(id = this.id, title = this.title, author = this.author) {
    const bookElement = `
    <div id="${id}" class="book">
        <div class="book-details">
          <p class="book-title">${title}</p>
          <span class="by">&nbsp;by&nbsp;</span>
          <p class="book-author">${author}</p>
        </div>
        <button class="remove-btn" type="button">Remove</button>
    </div`;

    bookList.insertAdjacentHTML('beforeend', bookElement);

    const removeBtn = document.getElementsByClassName('remove-btn');

    removeBtn[removeBtn.length - 1].addEventListener('click', Book.remove);
  }

  // Add a Book
  Add() {
    const newBook = new Book(this.id, this.title, this.author);
    newBook.create();
    booksArr.push(newBook);
    localStorage.setItem('Books', JSON.stringify(booksArr));
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
    }
    booksArr = bookData;
  }
}

// Event Listeners
addBtn.addEventListener('click', () => {
  if (titleBookInput.value !== '' && authorBookInput.value !== '') {
      const newBook = new Book(booksArr.length, titleBookInput.value, authorBookInput.value);
      newBook.Add();
      Book.clearField();
  }
});

Book.load();