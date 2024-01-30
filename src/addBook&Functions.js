import { mainSection } from "./index";
import { updateLocalStorageAndRender } from "./loadLocalLibrary";

export function addBookToLibrary() {
  mainSection.innerHTML = "";
  for (let i = 0; i < library.length; i++) {
    let newCard = document.createElement("div");
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

export function removeBook(i) {
  library.splice(i, 1);
  updateLocalStorageAndRender();
}

export function changeRead(i) {
  library[i].read = !library[i].read;
  updateLocalStorageAndRender();
}

export function resetLibrary() {
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
