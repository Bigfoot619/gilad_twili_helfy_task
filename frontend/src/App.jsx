import { useEffect, useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskItem from "./components/TaskItem";

import {getTasks, createTask, updateTask, deleteTask} from "./services/taskService";

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskToEdit, setTaskToEdit] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      setLoading(true);
      // await new Promise((resolve) => setTimeout(resolve, 500)); // simulating delay
      setError("");

      const data = await getTasks();

      setTasks(data);
    } catch (error) {
      setError("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (taskData) => {
    try {
      setError("");

      // Edit existing task
      if (taskToEdit) {
        const updatedTask = await updateTask(taskToEdit.id, {
          ...taskData,
          completed: taskToEdit.completed,
        });

        setTasks((currentTasks) =>
          currentTasks.map((task) =>
            task.id === updatedTask.id ? updatedTask : task
          )
        );

        setTaskToEdit(null);

        return;
      }

      // Create new task
      const newTask = await createTask(taskData);

      setTasks((currentTasks) => [
        ...currentTasks,
        newTask,
      ]);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to save task");}
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Press OK to confirm deletion");

    if (!confirmed) {
      return;
    }

    try {
      setError("");

      await deleteTask(id);

      setTasks((currentTasks) =>
        currentTasks.filter((task) => task.id !== id)
      );

      // If we deleted the task currently being edited
      if (taskToEdit?.id === id) {
        setTaskToEdit(null);
      }
    } catch (error) {
      setError(error.response?.data?.message || "Failed to delete task");
    }
  };

  return (
    <main>
      <h1>Task Manager</h1>

      <TaskForm
        taskToEdit={taskToEdit}
        onSubmit={handleSubmit}
        onCancel={() => setTaskToEdit(null)}
      />

      <h2>Tasks</h2>

      {loading ? (
        <p>Loading Tasks...</p>
      ) : tasks.length === 0 ? (
        <p>No Tasks yet</p>
      ) : (
        tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onEdit={setTaskToEdit}
            onDelete={handleDelete}
          />
        ))
      )}
    
    {error && <p className="error">{error}</p>}
    </main>
  );
}

export default App;