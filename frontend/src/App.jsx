import { useEffect, useState } from "react";

import TaskForm from "./components/TaskForm";
import { getTasks, createTask } from "./services/taskService";

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      setLoading(true);

      const data = await getTasks();
      setTasks(data);
    } catch (error) {
      setError("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async (task) => {
    try {
      setError("");

      const newTask = await createTask(task);

      setTasks((currentTasks) => [...currentTasks, newTask]);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to create task");
    }
  };

  return (
    <main>
      <h1>Task Manager</h1>

      {error && <p>{error}</p>}

      <TaskForm
        taskToEdit={null}
        onSubmit={handleCreateTask}
        onCancel={() => {}}
      />

      <h2>Tasks</h2>

      {loading ? (
        <p>Loading tasks...</p>
      ) : tasks.length === 0 ? (
        <p>No tasks yet.</p>
      ) : (
        tasks.map((task) => (
          <div key={task.id}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>Priority: {task.priority}</p>
            <p>Status: {task.completed ? "Completed" : "Pending"}</p>
            <p>Created At: {new Date(task.createdAt).toLocaleString()}</p>
          </div>
        ))
      )}
    </main>
  );
}

export default App;