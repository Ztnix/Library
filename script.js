const library = [{
    title:"Game Of Thrones",
    author:"George R. R. Martin",
    pages:"694",
    read:false
   },              
   {
    title:"Harry Potter",
    author:"J. K. Rowling",
    pages:"309",
    read:false
   }
];

let addBookButton = document.getElementById("headerButton")
let dialog = document.getElementById("dialog")
let mainSection = document.querySelector(".main")


addBookButton.addEventListener("click",()=> addBook());

function Book(title,author,pages,read){
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
}

function addBook(){
    dialog.showModal();
}

function handleSubmit(event) {
    event.preventDefault();
  
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const read = document.getElementById('read').checked;
  
    const newBook = new Book(title,author,pages,read);
     
    library.push(newBook);
    dialog.close()

    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('pages').value = '';
    document.getElementById('read').checked = false;

    console.log(library)
    addBookToLibrary()
}

function changeRead(i){
    console.log(i)
}


function addBookToLibrary(){
        mainSection.innerHTML = "";
    for (i=0;i<library.length;i++){
        const newCard = document.createElement("div");newCard.classList.add("card")
        const newTitle = document.createElement("p");newTitle.classList.add("title")
        const newAuthor = document.createElement("p");newAuthor.classList.add("author")
        const newPages = document.createElement("p");newPages.classList.add("numPages")
        const newRead = document.createElement("p");newRead.classList.add("completed")
        const newButtonRead=document.createElement("button");newButtonRead.classList.add("readButton");newButtonRead.textContent = `${i}`
        const newButtonDelete=document.createElement("button");newButtonDelete.classList.add("deleteButton");newButtonDelete.textContent = "Delete"

        library[i].dataID = i

        newTitle.textContent = library[i].title
        newAuthor.textContent =  `by ${library[i].author}`
        newPages.textContent = `${library[i].pages} Pages`
        if(library[i].read == true){
            newRead.textContent = "Completed"
        }else{
            newRead.textContent = "Not Completed"
        }   


        // newButtonRead.addEventListener('click', () => changeRead(i));



        mainSection.appendChild(newCard)
        newCard.appendChild(newTitle)
        newCard.appendChild(newAuthor)
        newCard.appendChild(newPages)
        newCard.appendChild(newButtonRead)
        newCard.appendChild(newButtonDelete)
        newCard.appendChild(newRead)

    }
}


function removeBook(i){
    library.splice(i,1);
    console.log(i)
    addBookToLibrary()
}