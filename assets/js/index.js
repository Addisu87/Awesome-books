const titleBookInput = document.getElementById('title-input');
const authorBookInput = document.getElementById('author-input');
const bookForm = document.getElementsByTagName('form')[0];
const bookList = document.getElementById('book-list');
const addBtn = document.getElementById('add-btn');

let booksArr = loadBooks();

bookForm.addEventListener('submit', (event) => {
  event.preventDefault();
});

function removeBook() {
  booksArr = booksArr.filter((book) => +book.id !== +this.parentElement.id);

  this.parentElement.remove();

  booksArr.forEach((book, i) => {
      book.id = i;
      bookList.children[i].id = i;
  });

  localStorage.setItem('Books', JSON.stringify(booksArr));
  console.log(booksArr);
}

function createBook(id, title, author) {
    const bookElement = `
    <div id="${id}" class="book">
        <p class="book-title">${title}</p>
        <p class="book-author">${author}</p>
        <button class="remove-btn" type="button">Remove</button>
    </div>`;

  bookList.insertAdjacentHTML('beforeend', bookElement);

  const removeBtn = document.getElementsByClassName('remove-btn');

  removeBtn[removeBtn.length - 1].addEventListener('click', removeBook);  
}


function AddBook(id =  booksArr.length, title = titleBookInput, author = authorBookInput) {
    createBook(id, title.value, author.value);

  booksArr.push({ id: id, title: title.value, author: author.value });
  localStorage.setItem('Books', JSON.stringify(booksArr));
}

function clearField() {
    titleBookInput.value = '';
    authorBookInput.value = '';

    titleBookInput.focus();
}

addBtn.addEventListener('click', () => {
   AddBook();
   clearField();
  console.log(booksArr);
});


function loadBooks(bookData = JSON.parse(localStorage.getItem('Books'))) {

    if(bookData !== null) {
        bookData.forEach((book) => {
            createBook(book.id, book.title, book.author);
        });
        return bookData;
    } else {
        bookData = [];
        localStorage.setItem('Books', JSON.stringify(bookData));
        return bookData;
    }
}
