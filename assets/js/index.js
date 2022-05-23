const titleBookInput = document.getElementById('title-input');
const authorBookInput = document.getElementById('author-input');
const bookList = document.getElementById('book-list');

const bookForm = document.getElementsByTagName('form')[0];

const addBtn = document.getElementById('add-btn');

let booksArr = [];

bookForm.addEventListener('submit', (event) => {
    event.preventDefault();
});

function AddBook(title = titleBookInput, author = authorBookInput) {
    booksArr.push({title: title.value, author: author.value});

    const bookElement = `
    <div class="book">
        <p class="book-title">${title.value}</p>
        <p class="book-author">${author.value}</p>
        <button class="remove-btn">Remove</button>
    </div>`;

    bookList.insertAdjacentHTML("beforeend", bookElement);

    console.log(booksArr);
}

addBtn.addEventListener('click', () => {
    AddBook();
});