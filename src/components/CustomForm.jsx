import { useState, useEffect } from "react";
import axios from "axios";
import { PlusIcon } from "@heroicons/react/24/solid";

const CustomForm = ({ addTask }) => {
  const [task, setTask] = useState("");
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [comment, setComment] = useState("");
  const [activities, setActivities] = useState([]); // State to store activities

  // Fetch activities from the API on component mount
  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await axios.get(
          "http://192.168.0.194:8080/RedGroupTask/activities/"
        );
        setActivities(response.data); // Set activities state with fetched data
      } catch (error) {
        console.error("Error fetching activities:", error);
      }
    };
    fetchActivities();
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const newTask = {
      name: task,
      date: startDate,
      startTime: startTime,
      endTime: endTime,
      comment: comment,
      id: Date.now(),
    };
    addTask(newTask);
    setTask("");
    setStartDate("");
    setStartTime("");
    setEndTime("");
    setComment("");
  };

  return (
    <form className="todo" onSubmit={handleFormSubmit}>
      <div className="wrapper">
        <input
          type="date"
          id="startDate"
          className="input"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          required
        />
        <label htmlFor="startDate" className="label">
          Date
        </label>
      </div>
      <div className="wrapper">
        <input
          type="time"
          id="startTime"
          className="input"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          required
        />
        <label htmlFor="startTime" className="label">
          Start Time
        </label>
      </div>

      <div className="wrapper">
        <input
          type="time"
          id="endTime"
          className="input"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          required
        />
        <label htmlFor="endTime" className="label">
          End Time
        </label>
      </div>

      <div className="wrapper">
        <select
          value={task}
          onChange={(e) => setTask(e.target.value)}
          className="input"
          required
        >
          <option value="">Select Task</option>
          {activities.map((activity) => (
            <option key={activity.id} value={activity.name}>
              {activity.name}
            </option>
          ))}
        </select>
        <label htmlFor="activity" className="label">
          Activity
        </label>
      </div>

      <div className="wrapper">
        <input
          type="text"
          id="comment"
          className="input"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          maxLength={100}
          placeholder="Enter Comment (Optional)"
        />
        <label htmlFor="comment" className="label">
          Comment
        </label>
      </div>

      <button className="btn" aria-label="Add Task" type="submit">
        <PlusIcon className="h-6 w-6 text-blue-500" />
      </button>
    </form>
  );
};

export default CustomForm;
