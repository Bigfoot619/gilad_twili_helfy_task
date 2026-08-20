import { useEffect, useState } from "react";

function TaskForm({ taskToEdit, onSubmit, onCancel }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("low");

  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title);
      setDescription(taskToEdit.description);
      setPriority(taskToEdit.priority);
    } else {
      setTitle("");
      setDescription("");
      setPriority("low");
    }
  }, [taskToEdit]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const task = {
      title,
      description,
      priority,
    };

    onSubmit(task);
  };

  return (
  <form onSubmit={handleSubmit}>
    <h2>{taskToEdit ? "Edit Task" : "Add Task"}</h2>

    <div className="form-fields">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        required
      />

      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
      />

      <select
        value={priority}
        onChange={(event) => setPriority(event.target.value)}
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      <button type="submit">
        {taskToEdit ? "Update Task" : "Add Task"}
      </button>

      {taskToEdit && (
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      )}
    </div>
  </form>
  );
}

export default TaskForm;