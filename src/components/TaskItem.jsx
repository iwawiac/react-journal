/* eslint-disable react/prop-types */
import React from "react";

import styles from "./TaskItem.module.css";

import { TrashIcon, PencilSquareIcon } from "@heroicons/react/24/outline";

const TaskItem = ({ task }) => {
  return (
    <tr className={styles.task}>
      <td>{task.date}</td>
      <td>{task.startTime}</td>
      <td>{task.endTime}</td>
      <td>{task.task}</td>
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
          // onClick={}
        >
          <TrashIcon strokeWidth={2} width={24} height={24} />
        </button>
      </td>
    </tr>
  );
};

export default TaskItem;
