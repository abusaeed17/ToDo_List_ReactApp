import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Task from "../containers/Task";
import "./Home.css";
import Input from "./Input";

const Home = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchAllTodos();
  }, []);

  const fetchAllTodos = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/readAll.php");

      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }

      const data = await response.json();

      if (Array.isArray(data)) {
        setTodos(data);
      } else {
        console.error("Invalid data format received from API:", data);
      }
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  const handleAdd = () => {

  };

  const handleTaskAdded = () => {
   
    fetchAllTodos();
  };

  const markAllAsDone = () => {
 
  };

  const groupByDate = (todos) => {
  
    return todos.reduce((grouped, todo) => {
      const dateAdded = new Date(todo.dateAdded).toDateString();

      if (!grouped[dateAdded]) {
        grouped[dateAdded] = [];
      }

      grouped[dateAdded].push(todo);

      return grouped;
    }, {});
  };

  const renderGroupedTasks = () => {
    const groupedTodos = groupByDate(todos);

    return Object.entries(groupedTodos).map(([date, tasks]) => (
      <div key={date} className="grouped-tasks">
        <h3>{date}</h3>
        <ul className="task-list">
          {tasks.map((todo) => (
            <Task key={todo.id} todo={todo} onRefresh={fetchAllTodos} />
          ))}
        </ul>
      </div>
    ));
  };

  return (
    <div className="home-container">
      <h1 className="home-title">My Task List</h1>
      <Input onAdd={handleAdd} onTaskAdded={handleTaskAdded} />
      <button onClick={markAllAsDone}>Mark All as Done</button>
      <Link to="/completed">View Completed Tasks</Link>
      {renderGroupedTasks()}
    </div>
  );
};

export default Home;
