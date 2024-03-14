/* eslint-disable react/prop-types */
import React from "react";
import axios from "axios";
import { TrashIcon, PencilSquareIcon } from "@heroicons/react/24/outline";

import styles from "./TaskItem.module.css";

const TaskItem = ({ task, onDelete }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(
        `http://192.168.0.194:8080/RedGroupTask/api/journal/${task.id}`
      );
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <tr className={styles.task}>
      <td>
        {task.start.date.year}-{task.start.date.month}-{task.start.date.day}
      </td>
      <td>{`${task.start.time.hour}:${task.start.time.minute}`}</td>
      <td>{`${task.end.time.hour}:${task.end.time.minute}`}</td>
      <td>{task.activityId}</td>
      <td>{task.comment}</td>
      <td className="todo">
        <button
          className="btn"
          aria-label={`Update ${task.task} Task`}
          // onClick={}
        >
          <PencilSquareIcon strokeWidth={2} width={24} height={24} />
        </button>
        <button
          className={`btn ${styles.delete}`}
          aria-label={`Delete  ${task.task} Task`}
          onClick={handleDelete}
        >
          <TrashIcon strokeWidth={2} width={24} height={24} />
        </button>
      </td>
    </tr>
  );
};

export default TaskItem;
