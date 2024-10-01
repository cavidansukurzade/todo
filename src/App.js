import { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import { FaTrashRestore } from "react-icons/fa";
import "./App.css";
function App() {
  const getTodosFromLS = () => {
    const data = localStorage.getItem("Todos");
    if (data) {
      return JSON.parse(data);
    } else {
      return [];
    }
  };
  const [todoValue, setTodoValue] = useState("");
  const [todos, setTodos] = useState(getTodosFromLS());
  const handleSubmit = (e) => {
    if (todoValue.length < 21) {
      e.preventDefault();
      const date = new Date();
      const time = date.getTime();
      let todoObject = {
        ID: time,
        TodoValue: todoValue,
        completed: false,
      };
      setTodos([...todos, todoObject]);
      setTodoValue("");
    } else {
      alert("Max symbol size is 20");
    }
  };
  const handleDelete = (id) => {
    const filtered = todos.filter((todo) => {
      return todo.ID !== id;
    });
    setTodos(filtered);
  };
  const handleCheckbox = (id) => {
    let todoArray = [];
    todos.forEach((todo) => {
      if (todo.ID === id) {
        if (todo.completed === false) {
          todo.completed = true;
        } else if (todo.completed === true) {
          todo.completed = false;
        }
      }
      todoArray.push(todo);
      setTodos(todoArray);
    });
  };
  useEffect(() => {
    localStorage.setItem("Todos", JSON.stringify(todos));
  }, [todos]);
  return (
    <div className="App">
      <h1>Todo App</h1>
      <form onSubmit={handleSubmit}>
        <div className="todo-input">
          <input
            type="text"
            onChange={(e) => setTodoValue(e.target.value)}
            value={todoValue}
            placeholder={"Add an Item"}
            required
          />
          <button type="submit">
            <FaPlus />
          </button>
        </div>
      </form>
      <div className="todo-container">
        {todos.map((individualTodo) => (
          <div className="todo" key={individualTodo.ID}>
            <div>
              <input
                type="checkbox"
                checked={individualTodo.completed}
                onChange={() => handleCheckbox(individualTodo.ID)}
              />
              <span
                style={
                  individualTodo.completed === true
                    ? { textDecoration: "line-through", color: "gray" }
                    : { textDecoration: "none", color: "rgb(0, 140, 255)" }
                }
              >
                {individualTodo.TodoValue}
              </span>
            </div>
            <FaTrashRestore
              className="deleter"
              onClick={(e) => handleDelete(individualTodo.ID)}
            />
          </div>
        ))}
      </div>
      <div className="count_clear">
        <span>Item count : {todos.length}</span>
        <button className="clear" onClick={() => setTodos([])}>
          Delete all items
        </button>
      </div>
    </div>
  );
}

export default App;
