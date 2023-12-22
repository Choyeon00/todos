// 버튼들에 함수 지정
const newTodoBtn = document.getElementById("newTodo");
const todoLists = document.getElementById("lists");
const newTodolist = document.getElementById("new-list");
const checkBoxBtn = document.getElementById("checkboxTodo");
const textBoxInput = document.getElementById("textboxTodo");
const buttons = document.getElementById("buttons");
const editTodoBtn = document.getElementById("editTodo");
const removeTodoBtn = document.getElementById("removeTodo");

let todos = [];

// 새 리스트 만드는 기능

newTodoBtn.addEventListener("click", createNewTodo)









function createNewTodo() {
    console.log("newTodoBtn clicked");

    // 새 객체 생성
    const todoValue = {
        id: new Date().getTime(),
        text : "",
        checkBox : false,
    
    };
    todos.push(todoValue);
    // 새 객체 생성 여기까지

    // 새 요소들 생성
    const listEl = document.createElement("div");
    listEl.classList.add("todo-list");
    listEl.setAttribute("id", "new-list");

    const checkboxEl = document.createElement("input");
    checkboxEl.setAttribute("id", "checkboxTodo");
    checkboxEl.setAttribute("type", "checkbox");
    checkboxEl.checked = todoValue.checkBox

    const textBoxEl = document.createElement("input");
    textBoxEl.setAttribute("id", "textboxTodo");
    textBoxEl.setAttribute("type", "text");
    textBoxEl.innerHTML = todoValue.text

    const buttonsEl = document.createElement("div");
    buttonsEl.classList.add("buttons");
    buttonsEl.setAttribute("id", "textboxTodo");

    const editTodoBtnEl = document.createElement("button");
    const editTodoImg = document.createElement("img");
    editTodoImg.src = "icons/icons8-스쿠버-컴퓨터-50.png";
    editTodoBtnEl.appendChild(editTodoImg)
    editTodoBtnEl.setAttribute("id", "editTodo");

    const removeTodoBtnEl = document.createElement("button");
    const removeTodoBtnImg = document.createElement("img");
    removeTodoBtnImg.src = "icons/icons850.png";
    removeTodoBtnEl.appendChild(removeTodoBtnImg)
    removeTodoBtnEl.setAttribute("id", "removeTodo");
    

    todoLists.prepend(listEl);
    listEl.appendChild(checkboxEl);
    listEl.appendChild(textBoxEl);
    listEl.appendChild(buttonsEl);
    buttonsEl.appendChild(editTodoBtnEl);
    buttonsEl.appendChild(removeTodoBtnEl);
    textBoxEl.focus();
    saveToLocalStorage();
    // 새 요소들 생성 여기까지

    // 이벤트 리스너
    editTodoBtnEl.addEventListener("click", () => {
        textBoxEl.removeAttribute("disabled");
        textBoxEl.focus();
    });
    
    checkboxEl.addEventListener("change", () => {
        if (checkboxEl.checked) {
            textBoxEl.classList.add("checked");
            todos.checkBox = true;
            listEl.style.opacity = "0.5";
        } else {
            textBoxEl.classList.remove("checked");
            todos.checkBox = false;
            listEl.style.opacity = "1";

        }
        saveToLocalStorage();

    });

    textBoxEl.addEventListener("input", () => {
        todos.text = textBoxEl.value;
        saveToLocalStorage();
    });

    textBoxEl.addEventListener("blur", () => {
        textBoxEl.setAttribute("disabled", "");
    });

    removeTodoBtnEl.addEventListener("click", () => {
        listEl.remove();
        saveToLocalStorage();
    });

    // 이벤트 리스너 여기까지
};

// 로컬스토리지
function saveToLocalStorage() {
    const data = JSON.stringify(todos);
    localStorage.setItem("todos", data);
    console.log(todos);
}
// 로컬스토리지 여기까지