const myLibrary = [];
const bookDisplay = document.querySelector(".book-display");
const newBookFormPlaceholder = document.querySelector("#new-book");
const newBookButton = document.querySelector("#add-new-book");

const Book = (name, author, no_of_pages, read = false) => {
  return {
    name: name,
    author: author,
    no_of_pages: no_of_pages,
    read: read,
  };
};

const addBookToLibrary = (book) => {
  console.log(book)
  myLibrary.push(book);
  
  console.log(myLibrary[3])
  displayLibrary(myLibrary);
};
const changeReadStatus = (button) => {
  button.preventDefault
  const index = button.dataset.index
  myLibrary[index].read = !myLibrary[index].read
  displayLibrary(myLibrary)
}

const handleremoval = (button) => {
  button.preventDefault
  const index = button.dataset.index
  myLibrary.splice(index, 1)
  displayLibrary(myLibrary)
}

const displayLibrary = (library) => {
  if (!library) return;
  bookDisplay.innerHTML = "";
  library.forEach((book, i) => {
    console.log('inddd')
    console.log(library.findIndex(x => x === book))
    const card = document.createElement("div");
    card.classList.add("book-card");
    card.innerHTML = `
    <p>Name of the book: ${book.name}</p>
    <p>Author: ${book.author}</p>
    <p>No. of pages: ${book.no_of_pages}</p>
    <p>Read?: ${book.read}</p>
    <button class='remove' data-index=${i}>remove</button>
    <button class='read-status' data-index=${i}>read/unread</button>
    `;
    bookDisplay.appendChild(card);
    removeButtons = card.querySelectorAll('.remove')
    removeButtons.forEach(removeButton => removeButton.addEventListener('click', () => handleremoval(removeButton)))
    readButtons = card.querySelectorAll('.read-status')
    readButtons.forEach(readButton => readButton.addEventListener('click', () => changeReadStatus(readButton)))
    
  });
};

const createBook = () => {
  newBookFormPlaceholder.innerHTML = `<form id='new-book-form'>
  <label class='line' id='name-label'>Name: <input type='text' id='name'></label>
  <label class='line' id='author-label'>Author: <input type='text' id='author'></label>
  <label class='line' id='no-of-pages-label'>No. of pages: <input type='text' id='no-of-pages'></label>
  <label class='line' id='read-label'>Read: <input type='checkbox' id='read'></label>
  <button type='submit' id='submit'>Submit</submit>
  </form>`;

  const submitButton = document.querySelector("#submit");
  const getValues = () => {
    const name = document.querySelector("#name").value;
    const author = document.querySelector("#author").value;
    const noOfPages = document.querySelector("#no-of-pages").value;
    const read = document.querySelector("#read").checked;
    console.log([name, author, noOfPages, read]);
    return [name, author, noOfPages, read];
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    addBookToLibrary(Book(...getValues()));
    console.log(myLibrary)
    newBookFormPlaceholder.innerHTML = ''
  };

  submitButton.addEventListener("click", handleSubmit);
};

newBookButton.addEventListener("click", createBook);
