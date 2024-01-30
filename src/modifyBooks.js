import { updateLocalStorageAndRender } from "./loadLocalLibrary";

export async function changeBook(i) {
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
