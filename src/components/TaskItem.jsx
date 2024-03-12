/* eslint-disable react/prop-types */
// import { useState } from "react";

// styles
import styles from "./TaskItem.module.css";

// library imports
import { TrashIcon } from "@heroicons/react/24/outline";
import { PencilSquareIcon } from "@heroicons/react/24/outline";

export const TaskItem = ({ task }) => {
  return (
    <tr className={styles.task}>
      <td>{task.date}</td>
      <td>{task.startTime}</td>
      <td>{task.endTime}</td>
      <td>{task.name}</td>
      <td>{task.comment}</td>
      <td className="todo">
        <button
          className="btn"
          aria-label={`Update ${task.name} Task`}
          // onClick={}
        >
          <PencilSquareIcon strokeWidth={2} width={24} height={24} />
        </button>
        <button
          className={`btn ${styles.delete}`}
          aria-label={`Delete  ${task.name} Task`}
          // onClick={}
        >
          <TrashIcon strokeWidth={2} width={24} height={24} />
        </button>
      </td>
    </tr>
  );
};

export default TaskItem;
