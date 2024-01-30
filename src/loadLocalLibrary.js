import { addBookToLibrary } from "./addBook&Functions.js";

export async function loadLibraryFromLocalStorage() {
  return new Promise((resolve) => {
    let storedLibrary = localStorage.getItem("library");
    if (storedLibrary) {
      library = JSON.parse(storedLibrary);
    }
    resolve();
  });
}

export async function initializeLibrary() {
  await loadLibraryFromLocalStorage();
  addBookToLibrary();
}

export function saveLibraryToLocalStorage() {
  localStorage.setItem("library", JSON.stringify(library));
}

export function updateLocalStorageAndRender() {
  saveLibraryToLocalStorage();

  addBookToLibrary();
}
