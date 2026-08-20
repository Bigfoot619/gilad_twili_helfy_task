function TaskItem({ task, onEdit, onDelete, onToggle }) {
  return (
    <div className="task-item">
      <h3>{task.title}</h3>

      <p>{task.description}</p>

      <p>
        Priority: <span className={`priority-${task.priority}`}>
          {task.priority}
        </span>
      </p>

      <p>
        Status: {task.completed ? "Completed" : "Pending"}
      </p>

      <button onClick={() => onToggle(task.id)}>
        {task.completed ? "Mark as Pending" : "Mark as Completed"}
      </button>

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