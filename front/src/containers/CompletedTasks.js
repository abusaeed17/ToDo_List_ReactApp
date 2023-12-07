
import React, { useEffect, useState } from "react";
import "./CompletedTasks.css";
import Task from "./Task";
const CompletedTasks = () => {
  const [completedTodos, setCompletedTodos] = useState([]);

  useEffect(() => {
    fetchCompletedTodos();
  }, []);

  const fetchCompletedTodos = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/completed.php");

      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }

      const data = await response.json();

      if (Array.isArray(data)) {
        setCompletedTodos(data);
      } else {
        console.error("Invalid data format received from API:", data);
      }
    } catch (error) {
      console.error("Error fetching completed todos:", error);
    }
  };

  return (
    <div>
      <h1>Completed Tasks</h1>
      <ul className="task-list">
        {completedTodos.map((todo) => (
          <Task key={todo.id} todo={todo} onRefresh={fetchCompletedTodos} />
        ))}
      </ul>
    </div>
  );
};

export default CompletedTasks;
