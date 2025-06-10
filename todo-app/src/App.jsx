import "./App.css";
import React, { useState } from "react";
import TodoContainer from "./components/TodoContainer";
import InputContainer from "./components/inputContainer";

function App() {
  const [inputVal, setInputval] = useState("");
  const [todos, setTodos] = useState([]);

  function writeTodo(e) {
    setInputval(e.target.value);
  }

  function addTodo() {
    if (inputVal != "") {
      setTodos((prevTodos) => [...prevTodos, inputVal]);
      setInputval("");
    }
  }

  function delTodo(todoIndex) {
    setTodos((prevTodos) =>
      prevTodos.filter((prevTodos, prevTodosIndex) => {
        return prevTodosIndex != todoIndex;
      })
    );
  }

  return (
    <main>
      <h1>To Do List</h1>
      <InputContainer
        inputVal={inputVal}
        writeTodo={writeTodo}
        addTodo={addTodo}
      />
      <TodoContainer todos={todos} delTodo={delTodo} />
    </main>
  );
}

export default App;
