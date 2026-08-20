import TaskItem from "./TaskItem";

function TaskList({ tasks, onEdit, onDelete, onToggle }) {
  if (tasks.length === 0) {
    return <p>No Tasks found</p>;
  }

  return (
    <div className="carousel">
      <div className="carousel-track">
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onEdit={onEdit}
            onDelete={onDelete}
            onToggle={onToggle}
          />
        ))}
      </div>
    </div>
  );
}

export default TaskList;