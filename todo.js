// Selecting All Elements
const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo");
const todoList = document.querySelector(".list-group");
const firsCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const filter = document.querySelector("#filter");
const clearButton = document.querySelector("#clear-todos");

eventListeners();

function eventListeners() {  //All event listeners
    form.addEventListener("submit", addTodo);
    document.addEventListener("DOMContentLoaded", loadAllTodosUI);
    secondCardBody.addEventListener("click", deleteTodo);
    filter.addEventListener("keyup", filterTodos);
    clearButton.addEventListener("click",clearAllTodos);
}

function clearAllTodos() {
    if (confirm("Are you sure you want to delete all todos?")) {
        // Clear todos from User Interface
        // todoList.innerHTML=""; // Slow
        while (todoList.firstElementChild != null) {
            todoList.removeChild(todoList.firstElementChild);
        }
        // Clear todos from Local Storage
        localStorage.removeItem("todos");
        
    }
}

function filterTodos(e) {
    const filterValue = e.target.value.toLowerCase();
    const listItems = document.querySelectorAll(".list-group-item")
    listItems.forEach(function (listItem) {
        const text = listItem.textContent.toLowerCase();
        if (text.indexOf(filterValue) === -1) {
            //Don't find
            listItem.setAttribute("style", "display : none !important");
        } else {
            listItem.setAttribute("style", "display : block");
        }
    });
}

function deleteTodo(e) {
    if (e.target.className === "fa fa-remove") {
        e.target.parentElement.parentElement.remove();
        deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);
        showAlert("success", "Todo succesfully deleted");
    }
}

function deleteTodoFromStorage(deleteTodo) {
    let todos = getTodosFromStorage();  //We take datas from storage as a array
    todos.forEach(function (deleteTodo) {
        if (todo === deleteTodo) {
            todos.splice(index, 1);  //Deleting item from array     
        }
    });
    localStorage.setItem("todos", JSON.stringify(todos));
}

function loadAllTodosUI() {
    let todos = getTodosFromStorage();
    todos.forEach(function (todo) {
        addTodoUI(todo);
    });
}

function addTodo(e) {
    const newTodo = todoInput.value.trim(); //Trim for deleting space area in text
    if (newTodo === "") {
        /*
        <div class="alert alert-danger" role="alert">
            This is a danger alert—check it out!
        </div>
        */
        showAlert("danger", "Please enter a todo...");
    }
    else {
        addTodoUI(newTodo);
        addTodoToStorage(newTodo);
        showAlert("success", "Todo succesfully added")
    }

    e.preventDefault(); //For page refresh (deleting submit default properties)
}

//Getting Todos from the Storage
function getTodosFromStorage() {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    return todos;
}

//Adding New Todo the Storage
function addTodoToStorage(newTodo) {
    let todos = getTodosFromStorage();
    todos.push(newTodo);
    localStorage.setItem("todos", JSON.stringify(todos));

}

function showAlert(type, message) {
    //Creating Alert
    const alert = document.createElement("div");
    alert.className = `alert alert-${type}`;
    alert.textContent = message;
    //Adding Alert to Page
    firsCardBody.appendChild(alert);
    // setTimeout - for delay
    setTimeout(function name(params) {
        alert.remove();
    }, 2000);
}

function addTodoUI(newTodo) {
    /* 
    <li class="list-group-item d-flex justify-content-between">
        Todo 1
        <a href = "#" class ="delete-item">
            <i class = "fa fa-remove"></i>
        </a>
    </li>
    */

    // Creating Dynamic Elements

    // Creating Link
    const link = document.createElement("a");
    link.href = "#";
    link.className = "delete-item";
    link.innerHTML = "<i class = 'fa fa-remove'></i>";

    // Creating List Items
    const listItem = document.createElement("li");
    listItem.className = "list-group-item d-flex justify-content-between";
    // Adding Text Node
    listItem.appendChild(document.createTextNode(newTodo));
    listItem.appendChild(link);

    //Adding List Item to Todo List
    todoList.appendChild(listItem);
    todoInput.value = "";
}