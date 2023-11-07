const todoValue = document.getElementById("todoText");
const listItems = document.getElementById("list-items");
const addUpdateClick = document.getElementById("AddUpdateClick");
let updateText;
let todoData = JSON.parse(localStorage.getItem("todoData")) || [];

const itemsPerPage = 5;
let currentPage = 1;

function SearchToDoItems() {
    const searchValue = document.getElementById("searchText").value.toLowerCase();
  
    const filteredItems = todoData.filter((item) =>
      item.item.toLowerCase().includes(searchValue)
    );
  
    listItems.innerHTML = "";
  
    filteredItems.forEach((element, index) => {
      let li = document.createElement("li");
      const todoItem = document.createElement("div");
      todoItem.innerText = element.item;
  
      const editButton = document.createElement("button");
      editButton.innerText = "Изменить";
      editButton.addEventListener("click", () => EditToDoItem(index));
  
      const deleteButton = document.createElement("button");
      deleteButton.innerText = "Удалить";
      deleteButton.addEventListener("click", () => DeleteToDoItem(index));
  
      li.appendChild(todoItem);
      li.appendChild(editButton);
      li.appendChild(deleteButton);
  
      if (element.status) {
        todoItem.style.textDecoration = "line-through";
      }
  
      listItems.appendChild(li);
    });
  }
  
  function EnableAddMode() {
    todoValue.value = "";
    addUpdateClick.innerText = "+";
    addUpdateClick.removeEventListener("click", UpdateToDoItem);
    addUpdateClick.addEventListener("click", CreateToDoItem);
  }

ReadToDoItems();

function ReadToDoItems() {
  listItems.innerHTML = "";

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const itemsToDisplay = todoData.slice(startIndex, endIndex);

  itemsToDisplay.forEach((element, index) => {
    let li = document.createElement("li");
    const todoItem = document.createElement("div");
    todoItem.innerText = element.item; // добавляем текст из массива

    const editButton = document.createElement("button");
    editButton.innerText = "Изменить";
    editButton.addEventListener("click", () => EditToDoItem(index));

    const deleteButton = document.createElement("button");
    deleteButton.innerText = "Удалить";
    deleteButton.addEventListener("click", () => DeleteToDoItem(index));

    li.appendChild(todoItem);
    li.appendChild(editButton);
    li.appendChild(deleteButton);

    if (element.status) {
      todoItem.style.textDecoration = "line-through";
    }

    listItems.appendChild(li);
  });
  document.getElementById(
    "currentPage"
  ).textContent = `Страница ${currentPage}`;
  document.getElementById("searchText").addEventListener("input", SearchToDoItems);
}

document.getElementById("prevPage").addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    ReadToDoItems();
  }
});

document.getElementById("nextPage").addEventListener("click", () => {
  const maxPage = Math.ceil(todoData.length / itemsPerPage);
  if (currentPage < maxPage) {
    currentPage++;
    ReadToDoItems();
  }
});

function CreateToDoItem() {
  if (todoValue.value === "") {
    alert("Введите хоть что-нибудь");
    todoValue.focus();
    return;
  }

  let dataItem = { item: todoValue.value, status: false };
  todoData.push(dataItem);
  saveTodoData();
  ReadToDoItems();
  todoValue.value = "";
}

function EditToDoItem(index) {
  updateText = todoData[index];
  todoValue.value = updateText.item;
  addUpdateClick.innerText = "Изменить";
  addUpdateClick.removeEventListener("click", CreateToDoItem);
  addUpdateClick.addEventListener("click", () => UpdateToDoItem(index));
}

function UpdateToDoItem(index) {
    if (todoValue.value === "") {
    alert("Введите хоть что-нибудь");
    todoValue.focus();
    return;
  }
    
  todoData[index].item = todoValue.value;
  saveTodoData();
  addUpdateClick.innerText = "+";
  addUpdateClick.removeEventListener("click", UpdateToDoItem);
  addUpdateClick.addEventListener("click", CreateToDoItem);
  todoValue.value = "";
  ReadToDoItems();
}

function DeleteToDoItem(index) {
  todoData.splice(index, 1);
  saveTodoData();
  ReadToDoItems();
}

function saveTodoData() {
  localStorage.setItem("todoData", JSON.stringify(todoData));
}

addUpdateClick.addEventListener("click", CreateToDoItem);