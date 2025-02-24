import TaskItem from "./Taskitem";

const TaskList = ({ tasks, onDelete, onEdit }) => {
  return (
    <div className="grid gap-4">
      {tasks.map((task) => (
        <TaskItem key={task._id} task={task} onDelete={onDelete} onEdit={onEdit} />
      ))}
    </div>
  );
};

export default TaskList;

