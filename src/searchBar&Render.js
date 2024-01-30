import { popUp } from "./index";
import { changeBook } from "./modifyBooks";

export function searchLibrary() {
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

function renderSearchResults(results, index) {
  const searchResultsContainer = document.getElementById("searchResults");
  searchResultsContainer.innerHTML = "";

  if (results.length === 0) {
    searchResultsContainer.innerHTML = "No matching results.";
  }

  for (let i = 0; i < results.length; i++) {
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
      <p class="completed">${
        results[i].read ? "Completado" : "No Completado"
      }</p>
      </div>`;
    searchResultsContainer.appendChild(resultCard);
  }
  openModal();
}

export function duoFunkDel(i) {
  removeBook(i);
  searchLibrary();
}

export function duoFunkRead(i) {
  changeRead(i);
  searchLibrary();
}

export async function duoFunkMod(i) {
  await changeBook(i);
  searchLibrary();
}

function openModal() {
  popUp.showModal();
}

export function closeModal() {
  popUp.close();
}
