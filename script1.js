const list = document.getElementById("list");
const createBtn = document.getElementById("create-btn");

let todos = [];

createBtn.addEventListener("click", createNewTodo);

function createNewTodo() {

    const item = {
        id: new Date().getTime(),
        text: "",
        complete: false
    }

    todos.unshift(item);

    // itemEl, inputEl의 역할이 뭐지?
    // => inputEl는 itemEl에 속해있는데 왜 반환이 안될까?
    // => => inputEl은 itemEl의 자식요소이긴 하지만 별개의 요소이다
    //       나머지 셋은 itemEl의 자식요소로 추가되고 이후에 추가적인 작업을
    //       하지 않아도 되기 때문에 반환할 필요가 없다.
    const { itemEl, inputEl } = createTodoElement(item);

    list.prepend(itemEl);

	inputEl.removeAttribute("disabled");

	inputEl.focus();
    saveToLocalStorage();

};

function createTodoElement(item) {
    const itemEl = document.createElement("div");
    itemEl.classList.add("item");

        const checkboxEl = document.createElement("input");
        checkboxEl.type = "checkbox";
        checkboxEl.checked = item.complete;

            checkboxEl.addEventListener("change", () => {
                item.complete = checkboxEl.checked;
                if (item.complete){
                    itemEl.classList.add("complete");
                } else {
                    itemEl.classList.remove("complete")
                }
                
                saveToLocalStorage();
            });

        const inputEl = document.createElement("input");
        inputEl.type = "text";
        inputEl.value = item.text;
        // "" 문자열의 의미는 뭐지?
        // => disabled 이랑 세트로 사용
        inputEl.setAttribute("disabled", "");

        if (item.complete) {
            itemEl.classList.add("complete");
        }
            
            inputEl.addEventListener("input", () => {
                item.text = inputEl.value;
                saveToLocalStorage();
            });
            inputEl.addEventListener("blur", () => {
                inputEl.setAttribute("disabled", "")
                saveToLocalStorage();
            });

        const actionsEl = document.createElement("div");
        actionsEl.classList.add("actions");

            const editBtnEl = document.createElement("button");
            editBtnEl.classList.add("material-icons");
            editBtnEl.innerHTML = "edit";

                editBtnEl.addEventListener("click", () => {
                    inputEl.removeAttribute("disabled");
                    inputEl.focus();
                });

            const removeBtnEl = document.createElement("button");
            removeBtnEl.classList.add("material-icons", "remove-btn");
            removeBtnEl.innerHTML = "remove_circle";
            
                
                // 무슨 역할인지 잘 모르겠음
                removeBtnEl.addEventListener("click", () => {
                    todos = todos.filter(t =>t.id != item.id);

                    itemEl.remove();
                    saveToLocalStorage();
                });

    itemEl.appendChild(checkboxEl);
    itemEl.appendChild(inputEl);
    itemEl.appendChild(actionsEl);

    actionsEl.appendChild(editBtnEl);
    actionsEl.appendChild(removeBtnEl);

    // 리턴은 왜 넣어야하지? 
    // => 리턴을 넣지 않으면 만든 요소들이 반환되지 않음
    //    근데 저번에는 안넣었던거같은데
    return {itemEl, inputEl, editBtnEl, removeBtnEl}
}

function saveToLocalStorage() {
    const data = JSON.stringify(todos);

    localStorage.setItem("mytodos", data)
}

function loadStorage() {
    const data = localStorage.getItem("mytodos");
    if (data) { 
        todos = JSON.parse(data);
    }
}

function displayTodos() {
    loadStorage();
    

    for (let i = 0; i < todos.length; i++) {
        const item = todos[i];
        const { itemEl, inputEl} = createTodoElement(item);
        list.append(itemEl );
    }
}

displayTodos();