/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from "axios"; // Import Axios for making HTTP requests

// Custom components
import UserForm from "./components/UserForm";
import CustomForm from "./components/CustomForm";
import TaskList from "./components/TaskList";

function App() {
  const [tasks, setTasks] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [activities, setActivities] = useState([]);

  // Fetch tasks from the API on component mount
  useEffect(() => {
    if (selectedUser && selectedDate) {
      fetchTasks();
    }
  }, [selectedUser, selectedDate]);

  // Function to fetch tasks from the API
  const fetchTasks = async () => {
    if (selectedUser && selectedDate) {
      try {
        const response = await axios.get(
          `http://192.168.0.194:8080/RedGroupTask/api/journal/user-id/${selectedUser}/date/${selectedDate}`
        );
        setTasks(response.data); // Assuming the response data is an array of tasks
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    }
  };

  return (
    <div className="container">
      <h1>Select user and date to see the journal</h1>
      <UserForm
        selectedUser={selectedUser}
        selectedDate={selectedDate}
        setSelectedUser={setSelectedUser}
        setSelectedDate={setSelectedDate}
      />
      <header>
        <h1>Register new activity for the selected user</h1>
      </header>
      <CustomForm
        selectedUser={selectedUser}
        selectedDate={selectedDate}
        fetchTasks={fetchTasks}
        setSelectedUser={setSelectedUser} // Pass setSelectedUser to reset selected user after form submission
      />
      <header>
        <h1>List of activities</h1>
      </header>
      <TaskList tasks={tasks} activities={activities} />
    </div>
  );
}

export default App;
