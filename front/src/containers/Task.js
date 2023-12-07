import React from "react";
import "./Task.css";

const Task = ({ todo, onRefresh }) => {
  const apiUrl = "http://localhost:3000/api";

  const fetchAndUpdateTodos = async (url, options) => {
    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      onRefresh();
    } catch (error) {
      console.error("Error updating todos:", error);
    }
  };

  const markAsComplete = () => {
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: todo.id, done: true }),
    };

    const url = `${apiUrl}/update.php`;

    fetchAndUpdateTodos(url, options);
  };

  const deleteTodo = () => {
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: todo.id }),
    };

    const url = `${apiUrl}/delete.php`;

    fetchAndUpdateTodos(url, options);
  };

  const taskStyle = todo.completed ? "task completed" : "task";
  return (
    <div className={taskStyle}>
      <p>{todo.task}</p>
      <div>
        <button className="complete" onClick={markAsComplete}>
          Complete
        </button>
        <button className="delete" onClick={deleteTodo}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default Task;
