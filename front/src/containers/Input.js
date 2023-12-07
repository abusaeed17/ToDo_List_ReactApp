import React, { useState } from "react";
import "./Input.css";

const Input = ({ onAdd, onTaskAdded }) => {
  const [task, setTask] = useState("");
  const apiUrl = "http://localhost:3000/api";

  const addNewTodo = async () => {
    try {
      if (task) {
        const options = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ task }),
        };

        const response = await fetch(`${apiUrl}/create.php`, options);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        setTask("");

        if (typeof onTaskAdded === 'function') {
          onTaskAdded();
        }

        if (typeof onAdd === 'function') {
          onAdd();
        } else {
          console.error("Error creating todo: onAdd is not a function");
        }
      }
    } catch (error) {
      console.error("Error creating todo:", error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button onClick={addNewTodo}>Add</button>
    </div>
  );
};

export default Input;
