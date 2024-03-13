// REST

import { useState, useEffect } from "react";
import axios from "axios"; // Import Axios for making HTTP requests

// Custom components
import UserForm from "./components/UserForm";
import CustomForm from "./components/CustomForm";
import TaskList from "./components/TaskList";

function App() {
  const [tasks, setTasks] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  // Fetch tasks from the API on component mount
  useEffect(() => {
    fetchTasks();
  }, []);

  // Function to fetch tasks from the API
  const fetchTasks = async () => {
    try {
      const response = await axios.get(
        "https://65f0ca30da8c6584131c6b45.mockapi.io/api/journal/journal"
      );
      setTasks(response.data); // Assuming the response data is an array of tasks
    } catch (error) {
      console.error("Error fetching tasks:", error);
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
        addUser={fetchTasks}
      />
      <header>
        <h1>Register new activity for the selected user</h1>
      </header>
      <CustomForm
        selectedUser={selectedUser}
        selectedDate={selectedDate}
        fetchTasks={fetchTasks}
      />{" "}
      {/* Pass fetchTasks function to CustomForm */}
      <header>
        <h1>List of activities</h1>
      </header>
      <TaskList tasks={tasks} />
    </div>
  );
}

export default App;
