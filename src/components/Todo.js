import React from "react";
import { useState, useEffect } from "react";

function Todo() {
  const [todo, setTodo] = useState("");
  const [todoList, setTodoList] = useState([]);

  useEffect(() => {
    const todoListLocalStorage = localStorage.getItem("todoList");
    if (todoListLocalStorage) {
      setTodoList(JSON.parse(todoListLocalStorage));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(todoList));
  }, [todoList]);

  const inputHandler = (e) => {
    setTodo(e.target.value);
  };

  const addItem = (e) => {
    e.preventDefault();
    setTodoList([
      ...todoList,
      {
        id: todoList.length,
        value: todo,
      },
    ]);
    setTodo("");
  };

  const completeItem = (index, event) => {
    event.preventDefault();
    const newTodoList = [...todoList];
    newTodoList[index].completed = true;
    setTodoList(newTodoList);
  };

  const deleteItem = (index, event) => {
    event.preventDefault();
    const newTodoList = [...todoList];
    newTodoList.splice(index, 1);
    setTodoList(newTodoList);
  };

  return (
    <div>
      <h1>To Do list</h1>
      <form action="">
        <input type="text" value={todo} onChange={inputHandler} />
        <button type="submit" onClick={addItem}>
          Add Item
        </button>
        <ul>
          {todoList.map((item) => (
            <li
              key={item.id}
              style={{
                textDecoration: item.completed ? "line-through" : "none",
              }}
            >
              {item.value}
              <button
                type="submit"
                onClick={(event) => completeItem(item.id, event)}
              >
                Selesai
              </button>
              <button onClick={(event) => deleteItem(item, event)}>
                Hapus
              </button>
            </li>
          ))}
        </ul>
      </form>
    </div>
  );
}

export default Todo;
