const titleBookInput = document.getElementById('title-input');
const authorBookInput = document.getElementById('author-input');
const bookList = document.getElementById('book-list');

const bookForm = document.getElementsByTagName('form')[0];

const addBtn = document.getElementById('add-btn');

let booksArr = [];

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

  console.log(booksArr);
}

function AddBook(title = titleBookInput, author = authorBookInput) {
  booksArr.push({ id: booksArr.length, title: title.value, author: author.value });

  const bookElement = `
    <div id="${booksArr.length -1}" class="book">
        <p class="book-title">${title.value}</p>
        <p class="book-author">${author.value}</p>
        <button class="remove-btn" type="button">Remove</button>
    </div>`;

  bookList.insertAdjacentHTML('beforeend', bookElement);

  const removeBtn = document.getElementsByClassName('remove-btn');

  removeBtn[removeBtn.length - 1].addEventListener('click', removeBook);

  console.log(booksArr);
}

addBtn.addEventListener('click', () => {
  AddBook();
});
