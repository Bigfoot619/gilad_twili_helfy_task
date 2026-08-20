function TaskItem({ task, onEdit, onDelete }) {
  return (
    <div className="task-item">
      <h3>{task.title}</h3>

      <p>{task.description}</p>

      <p>Priority: {task.priority}</p>

      <p>
        Status: {task.completed ? "Completed" : "Pending"}
      </p>

      <button onClick={() => onEdit(task)}>
        Edit
      </button>

      <button onClick={() => onDelete(task.id)}>
        Delete
      </button>
    </div>
  );
}

export default TaskItem;