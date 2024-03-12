/* eslint-disable react/prop-types */
// component import
import TaskItem from "./TaskItem";

// styles
import styles from "./TaskList.module.css";

const TaskList = ({ tasks }) => {
  return (
    <table className={styles.tasks}>
      <tbody>
        {tasks
          .sort((a, b) => b.id - a.id)
          .map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}
      </tbody>
    </table>
  );
};

export default TaskList;
