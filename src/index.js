import "./style.css";
import { initializeLibrary } from "./loadLocalLibrary";
import { addBook } from "./bookCreation";
import { resetLibrary } from "./addBook&Functions";
import { handleSubmit } from "./bookCreation";
import { changeBook } from "./modifyBooks";
import { removeBook } from "./addBook&Functions";
import { changeRead } from "./addBook&Functions";
import { searchLibrary } from "./searchBar&Render";
import { closeModal } from "./searchBar&Render";
import { duoFunkDel } from "./searchBar&Render";
import { duoFunkMod } from "./searchBar&Render";
import { duoFunkRead } from "./searchBar&Render";

window.changeBook = changeBook;
window.handleSubmit = handleSubmit;
window.resetLibrary = resetLibrary;
window.removeBook = removeBook;
window.changeRead = changeRead;
window.searchLibrary = searchLibrary;
window.closeModal = closeModal;
window.duoFunkDel = duoFunkDel;
window.duoFunkMod = duoFunkMod;
window.duoFunkRead = duoFunkRead;

let addBookButton = document.getElementById("headerButton");
export let dialog = document.getElementById("dialog");
export let mainSection = document.querySelector(".main");
export let popUp = document.getElementById("searchDialog");
let deleteLibrary = document.getElementById("removeLibrary");

addBookButton.addEventListener("click", () => addBook());
deleteLibrary.addEventListener("click", () => resetLibrary());

initializeLibrary();
