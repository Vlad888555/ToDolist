const todoValue =  document.getElementById("todoText"),
    listItems = document.getElementById("list-items"),
    addUpdateClikc = document.getElementById("AddUpdateClick");
let updateText;
let todoData = JSON.parse(localStorage.getItem("todoData"));
if(!todoData){
    todoData=[];
}
ReadToDoItems();
function ReadToDoItems(){
    console.log(todoData);
    todoData.forEach(element => {
        let li = document.createElement("li");
        let style = "";
        if (element.status){
            style = "style='text-decoration: line-through'";
        }
        const todoItems = ` <div ${style} ondblclick="CompleteTodoItem(this)>${element.item}</div>`;
        li.innerHTML=todoItems;
        listItems.appendChild(li);
    });
}    
    
function CreateToDoDate(){
    console.log(todoValue.value);
    if (todoValue.value ===""){
        alert("Введите хоть чтонибудь");
        todoValue.focus();
    }
    let li = document.createElement("li");
    const todoItems = `<div ondblclick="CompleteTodoItem(this)">${todoValue.value}</div><div><button class ="edit todo-control" onclick ="Updete(this)">Изменить</button><button calss ="delete todo-control" onclick="Delet(this)">Удалить</button></div>`;
    
    li.innerHTML = todoItems;
    listItems.appendChild(li);
    todoValue.value = "";

    if(!todoData){
        todoData=[];
    }

    let dataItem = {item: todoData.value, status: false};
    todoData.push(dataItem);
}
function UpdateOnSelectionitems(){
    todoValue.value = updateText.innerText;
    addUpdateClikc.setAttribute("onclick", "UpdateOnSelectionitems()");
    todoValue.value = "";
}
function CompleteTodoItem(e){
    if(e.parentElement.querySelector("div").style.textDecoration===""){
        e.parentElement.querySelector("div").style.textDecoration = "line-through";
        todoData.forEach((element)=>{
            if(e.parentElement.querySelector("div").innerText.trim() == element.item){
                element.status = true;
            }
        })
    }
}

function Updete(e){
    if(e.parentElement.parentElement.querySelector("div").style.textDecoration === ""){
    todoValue.value = (e.parentElement.parentElement.querySelector("div").textContent);
    addUpdateClikc.setAttribute("onclick", "UpdateOnSelectionitems()");
    }
}
function Delet(e){
    let deleteValue = e.parentElement.parentElement.querySelector("div").innerText;
    if(confirm("Точно хотите удалить")){
        e.parentElement.parentElement.parentElement.querySelector("li").remove();
    }
}
    