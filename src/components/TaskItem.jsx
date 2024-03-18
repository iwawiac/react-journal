/* eslint-disable react/prop-types */
import React, { useState } from "react";
import axios from "axios";
import { TrashIcon, PencilSquareIcon } from "@heroicons/react/24/outline";

import styles from "./TaskItem.module.css";

const tasksArray = [
  {
    id: 1,
    name: "Q&A",
    description: "Discussion current activities",
  },
  {
    id: 2,
    name: "Learning",
    description: "Studying additional materials",
  },
  {
    id: 3,
    name: "Coffee-break",
    description: "Have some coffee",
  },
  {
    id: 4,
    name: "Coding",
    description: "Developing new functions",
  },
  {
    id: 5,
    name: "Testing",
    description: "Test the product",
  },
];

const TaskItem = ({ task, onDelete, selectedUser, fetchTasks }) => {
  const [editMode, setEditMode] = useState(false);
  const [editedTask, setEditedTask] = useState(task);

  const handleDelete = async () => {
    try {
      await axios.delete(
        `http://192.168.0.194:8080/RedGroupTask/api/journal/${task.id}`
      );
    } catch (error) {
      console.error("Error deleting task:", error);
    }
    fetchTasks();
  };

  const handleUpdate = async () => {
    try {
      const updatedTask = {
        userId: selectedUser,
        activityId: editedTask.activityId,
        comment: editedTask.comment,
        start: {
          date: {
            year: parseInt(editedTask.start.date.split("-")[0]),
            month: parseInt(editedTask.start.date.split("-")[1]),
            day: parseInt(editedTask.start.date.split("-")[2]),
          },
          time: {
            hour: parseInt(editedTask.start.time.split(":")[0]),
            minute: parseInt(editedTask.start.time.split(":")[1]),
            second: 0,
            nano: 0,
          },
        },
        end: {
          date: {
            year: parseInt(editedTask.start.date.split("-")[0]),
            month: parseInt(editedTask.start.date.split("-")[1]),
            day: parseInt(editedTask.start.date.split("-")[2]),
          },
          time: {
            hour: parseInt(editedTask.end.time.split(":")[0]),
            minute: parseInt(editedTask.end.time.split(":")[1]),
            second: 0,
            nano: 0,
          },
        },
      };

      await axios.put(
        `http://192.168.0.194:8080/RedGroupTask/api/journal/${task.id}`,
        updatedTask
      );

      console.log("Updated task:", updatedTask);
      // window.location.reload();
      setEditMode(false);
      fetchTasks();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const getTaskName = (taskId) => {
    const task = tasksArray.find((task) => task.id === taskId);
    return task ? task.name : "Unknown";
  };

  const handleEditClick = () => {
    // Set editedTask to a copy of task when edit mode is enabled
    setEditedTask({ ...task });
    setEditMode(true);
  };

  return (
    <tr className={styles.task}>
      <td>
        {editMode ? (
          <input
            className="input"
            type="date"
            value={editedTask.start.date}
            onChange={(e) =>
              setEditedTask({
                ...editedTask,
                start: { ...editedTask.start, date: e.target.value },
              })
            }
          />
        ) : (
          `${String(task.start.date.year)}-${String(
            task.start.date.month
          ).padStart(2, "0")}-${String(task.start.date.day).padStart(2, "0")}`
        )}
      </td>
      <td>
        {editMode ? (
          <input
            className="input"
            type="time"
            value={editedTask.start.time}
            onChange={(e) =>
              setEditedTask({
                ...editedTask,
                start: { ...editedTask.start, time: e.target.value },
              })
            }
          />
        ) : (
          `${String(task.start.time.hour).padStart(2, "0")}:${String(
            task.start.time.minute
          ).padStart(2, "0")}`
        )}
      </td>
      <td>
        {editMode ? (
          <input
            className="input"
            type="time"
            value={editedTask.end.time}
            onChange={(e) =>
              setEditedTask({
                ...editedTask,
                end: { ...editedTask.end, time: e.target.value },
              })
            }
          />
        ) : (
          `${String(task.end.time.hour).padStart(2, "0")}:${String(
            task.end.time.minute
          ).padStart(2, "0")}`
        )}
      </td>
      <td>
        {editMode ? (
          <select
            className="input"
            value={editedTask.activityId}
            onChange={(e) =>
              setEditedTask({ ...editedTask, activityId: e.target.value })
            }
          >
            {tasksArray.map((task) => (
              <option key={task.id} value={task.id}>
                {task.name}
              </option>
            ))}
          </select>
        ) : (
          `${getTaskName(task.activityId)}`
        )}
      </td>
      <td>
        {editMode ? (
          <input
            className="input"
            type="text"
            value={editedTask.comment}
            onChange={(e) =>
              setEditedTask({ ...editedTask, comment: e.target.value })
            }
          />
        ) : (
          `${task.comment}`
        )}
      </td>
      <td className="todo">
        {editMode ? (
          <button className="btn" onClick={handleUpdate}>
            Update
          </button>
        ) : (
          <button
            className="btn"
            aria-label={`Update ${task.name} Task`}
            onClick={handleEditClick}
          >
            <PencilSquareIcon strokeWidth={2} width={24} height={24} />
          </button>
        )}
        <button
          className={`btn ${styles.delete}`}
          aria-label={`Delete ${task.name} Task`}
          onClick={handleDelete}
        >
          <TrashIcon strokeWidth={2} width={24} height={24} />
        </button>
      </td>
    </tr>
  );
};

export default TaskItem;
