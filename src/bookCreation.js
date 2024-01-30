import { dialog } from "./index";
import { saveLibraryToLocalStorage } from "./loadLocalLibrary";
import { updateLocalStorageAndRender } from "./loadLocalLibrary";

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
}

window.library = [
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

export function handleSubmit(event) {
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

export function addBook() {
  dialog.showModal();
}
