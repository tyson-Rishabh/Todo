//Selectors

const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');
//Event Listner 
document.addEventListener('DOMContentLoaded',getTodos);
todoButton.addEventListener('click',addTodo);
todoList.addEventListener('click',deleteCheck);
filterOption.addEventListener('click',filterTodo);

//Functions
function addTodo(event){
    //Prevent Page from submitting
    event.preventDefault();
    //TODO DIV
    //Will create a div elemnet
    const tododiv = document.createElement('div');
    //Adding todo classList to div element
    tododiv.classList.add("todo");
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    //Style using CSS
    newTodo.classList.add('todo-item');
    tododiv.appendChild(newTodo);
    saveLocalTodos(todoInput.value);
    //Check mark button
    const completedButton = document.createElement('button');
    //I tag is a icon tag
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    tododiv.appendChild(completedButton);

    //trash button
    const trashdButton = document.createElement('button');
    //I tag is a icon tag
    trashdButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashdButton.classList.add("trash-btn");
    tododiv.appendChild(trashdButton);

    //Append to list
    todoList.appendChild(tododiv)
    //Clear 
    todoInput.value="";
}

function deleteCheck(event){
    const item = event.target;
    if(item.classList[0] === 'trash-btn'){
        const todo = item.parentElement;
        todo.classList.add('fall');
        removeLocalTodo(todo);
        todo.addEventListener('transitionend',function (){
            todo.remove();
        });

        
    }

    //checkMark
    if(item.classList[0] === 'complete-btn'){
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }
}

function filterTodo(event){
    const todos = todoList.childNodes;
    todos.forEach(function(todo){
        
        switch(event.target.value){
            case 'all':
                todo.style.display = "flex";
                break;
            case 'completed':
                if(todo.classList.contains('completed')){
                    todo.style.display = 'flex';
                }else{
                    todo.style.display = 'none';
                }
                break;
            case 'uncompleted':
                if(!todo.classList.contains('completed')){
                    todo.style.display = 'flex';
                }else{
                    todo.style.display = 'none';
                }
                break;
        }
    });  
}
//Saving in local Storage
function saveLocalTodos(todo){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.push(todo);
    localStorage.setItem('todos',JSON.stringify(todos));
}

function getTodos(){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function(todo){
        const tododiv = document.createElement('div');
        //Adding todo classList to div element
        tododiv.classList.add("todo");
        const newTodo = document.createElement('li');
        newTodo.innerText = todo;
        //Style using CSS
        newTodo.classList.add('todo-item');
        tododiv.appendChild(newTodo);
        
        //Check mark button
        const completedButton = document.createElement('button');
        //I tag is a icon tag
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add("complete-btn");
        tododiv.appendChild(completedButton);

        //trash button
        const trashdButton = document.createElement('button');
        //I tag is a icon tag
        trashdButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashdButton.classList.add("trash-btn");
        tododiv.appendChild(trashdButton);

        //Append to list
        todoList.appendChild(tododiv)
    });
}

function removeLocalTodo(todo){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex),1);
    localStorage.setItem('todos',JSON.stringify(todos));
}