/* eslint-disable react/prop-types */
// TaskList.js
import React from "react";
import TaskItem from "./TaskItem";

import styles from "./TaskList.module.css";

const TaskList = ({ tasks, selectedUser, fetchTasks }) => {
  return (
    <table className={styles.tasks}>
      <tbody>
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            selectedUser={selectedUser}
            fetchTasks={fetchTasks}
          />
        ))}
      </tbody>
    </table>
  );
};

export default TaskList;
