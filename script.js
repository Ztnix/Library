let library = [
  {
    title: "Game Of Thrones",
    author: "George R. R. Martin",
    pages: "694",
    read: false,
  },
  {
    title: "Harry Potter",
    author: "J. K. Rowling",
    pages: "309",
    read: false,
  },
];

let addBookButton = document.getElementById("headerButton");
let dialog = document.getElementById("dialog");
let mainSection = document.querySelector(".main");
let mod = document.getElementById("changeButton");
let popUp = document.getElementById("searchDialog");
let deleteLibrary = document.getElementById("removeLibrary");

addBookButton.addEventListener("click", () => addBook());
deleteLibrary.addEventListener("click", () => resetLibrary());

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
}

function addBook() {
  dialog.showModal();
}

async function loadLibraryFromLocalStorage() {
  return new Promise((resolve) => {
    let storedLibrary = localStorage.getItem("library");
    if (storedLibrary) {
      library = JSON.parse(storedLibrary);
    }
    resolve();
  });
}

async function initializeLibrary() {
  await loadLibraryFromLocalStorage();
  addBookToLibrary();
}

function resetLibrary() {
  library = [
    {
      title: "Game Of Thrones",
      author: "George R. R. Martin",
      pages: "694",
      read: false,
    },
    {
      title: "Harry Potter",
      author: "J. K. Rowling",
      pages: "309",
      read: false,
    },
  ];
  updateLocalStorageAndRender();
}

function handleSubmit(event) {
  event.preventDefault();

  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const read = document.getElementById("read").checked;

  const newBook = new Book(title, author, pages, read);

  library.push(newBook);
  saveLibraryToLocalStorage();
  dialog.close();

  document.getElementById("title").value = "";
  document.getElementById("author").value = "";
  document.getElementById("pages").value = "";
  document.getElementById("read").checked = false;

  console.log(library);
  updateLocalStorageAndRender();
}

function changeRead(i) {
  library[i].read = !library[i].read;
  updateLocalStorageAndRender();
}

function addBookToLibrary() {
  mainSection.innerHTML = "";
  for (i = 0; i < library.length; i++) {
    newCard = document.createElement("div");
    newCard.innerHTML = `
        <div class="card">
        <p class="title">${library[i].title}</p>
        <p class="author">by ${library[i].author}</p>
        <p class="numPages">${library[i].pages} Pages</p>
        <button class="readButton" id="readButton" onclick="changeRead(${i})">Read</button><button class="deleteButton" id="deleteButton" onclick="removeBook(${i})">Delete</button> <button class="changeButton" id="changeButton" onclick="changeBook(${i})">
        Modify
      </button>
        <p class="completed">${
          library[i].read ? "Completado" : "No Completado"
        }</p>
        </div>`;

    mainSection.append(newCard);
  }
}

function removeBook(i) {
  library.splice(i, 1);
  updateLocalStorageAndRender();
}

async function changeBook(i) {
  return new Promise((resolve) => {
    dialogChange.showModal();
    document.getElementById("titleChange").value = library[i].title;
    document.getElementById("authorChange").value = library[i].author;
    document.getElementById("pagesChange").value = library[i].pages;
    document.getElementById("readChange").checked = library[i].read;

    dialogChange.querySelector("form").onsubmit = (event) => {
      handleChange(event, i);
      resolve();
    };
  });
}

function handleChange(event, i) {
  event.preventDefault();

  library[i].title = document.getElementById("titleChange").value;
  library[i].author = document.getElementById("authorChange").value;
  library[i].pages = document.getElementById("pagesChange").value;
  library[i].read = document.getElementById("readChange").checked;
  dialogChange.close();

  document.getElementById("titleChange").value = "";
  document.getElementById("authorChange").value = "";
  document.getElementById("pagesChange").value = "";
  document.getElementById("readChange").checked = false;

  console.log(library);
  updateLocalStorageAndRender();
}

function searchLibrary() {
  const searchTerm = document.getElementById("searchBar").value.toLowerCase();
  let searchResults = [];
  let originalIndex = [];

  for (let i = 0; i < library.length; i++) {
    if (
      library[i].title.toLowerCase().includes(searchTerm) &&
      searchTerm != ""
    ) {
      searchResults.push(library[i]);
      originalIndex.push(i);
    }
  }
  renderSearchResults(searchResults, originalIndex);
}

function updateLocalStorageAndRender() {
  saveLibraryToLocalStorage();

  addBookToLibrary();
}

function openModal() {
  popUp.showModal();
}

function closeModal() {
  popUp.close();
}

function duoFunkDel(i) {
  removeBook(i);
  searchLibrary();
}

function duoFunkRead(i) {
  changeRead(i);
  searchLibrary();
}

async function duoFunkMod(i) {
  await changeBook(i);
  searchLibrary();
}

function renderSearchResults(results, index) {
  const searchResultsContainer = document.getElementById("searchResults");
  searchResultsContainer.innerHTML = "";

  if (results.length === 0) {
    searchResultsContainer.innerHTML = "No matching results.";
  }

  for (i = 0; i < results.length; i++) {
    const resultCard = document.createElement("div");
    resultCard.innerHTML = `
    <div class="card">
    <p class="title">${results[i].title}</p>
    <p class="author">by ${results[i].author}</p>
    <p class="numPages">${results[i].pages} Pages</p>
    <button class="readButton" id="readButton" onclick="duoFunkRead(${
      index[i]
    })">Read</button><button class="deleteButton" id="deleteButton" onclick="duoFunkDel(${
      index[i]
    })">Delete</button> <button class="changeButton" id="changeButton" onclick="duoFunkMod(${
      index[i]
    })">
    Modify
  </button>
    <p class="completed">${results[i].read ? "Completado" : "No Completado"}</p>
    </div>`;
    searchResultsContainer.appendChild(resultCard);
  }
  openModal();
}

function saveLibraryToLocalStorage() {
  localStorage.setItem("library", JSON.stringify(library));
}

initializeLibrary();
