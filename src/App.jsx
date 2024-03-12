import { useState } from "react";

//Custom components
import CustomForm from "./components/CustomForm";
import TaskList from "./components/TaskList";

function App() {
  const [tasks, setTasks] = useState([]);

  const addTask = (task) => {
    setTasks((prevState) => [...prevState, task]);
  };

  return (
    <div className="container">
      <header>
        <h1>Register new activity</h1>
      </header>
      <CustomForm addTask={addTask} />

      <header>
        <h1>List of activities</h1>
      </header>
      {tasks && <TaskList tasks={tasks} />}
    </div>
  );
}

export default App;
