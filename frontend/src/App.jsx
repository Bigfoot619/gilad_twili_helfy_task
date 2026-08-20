import { useEffect, useState } from "react";
import "./styles/App.css";
import TaskForm from "./components/TaskForm";
import TaskFilter from "./components/TaskFilter";
import {getTasks, createTask, updateTask, deleteTask, toggleTask} from "./services/taskService";
import TaskList from "./components/TaskList";
import TaskSort from "./components/TaskSort";

///////////////////////////////////////////////////////////////////////////

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [filter, setFilter] = useState("all");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [sort, setSort] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  ///////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    loadTasks();
  }, []);

  // Load tasks from the backend
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

  ///////////////////////////////////////////////////////////////////////////

  // Handle form submission for creating or editing a task
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
      setError(
        error.response?.data?.message || "Failed to save task");
    }
  };

  ///////////////////////////////////////////////////////////////////////////

  // Handle task deletion
  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this task?");

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
      setError(
        error.response?.data?.message || "Failed to delete task");
    }
  };
  
  ///////////////////////////////////////////////////////////////////////////

  // Handle toggling task completion status
  const handleToggle = async (id) => {
    try {
      setError("");

      const updatedTask = await toggleTask(id);

      setTasks((currentTasks) =>
        currentTasks.map((task) =>
          task.id === updatedTask.id ? updatedTask : task
        )
      );
    } catch (error) {
      setError(error.response?.data?.message || "Failed to update task status");
    }
  };

  ///////////////////////////////////////////////////////////////////////////

  // Filter tasks based on the selected filter
  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") {
      return task.completed;
    }

    if (filter === "pending") {
      return !task.completed;
    }

    return true;
  });

  ///////////////////////////////////////////////////////////////////////////

  //BONUS: Sort tasks based on the selected sort option
  const sortedTasks = [...filteredTasks].sort((a, b) => {

  // Sort by date
  if (sort === "date") {
    const timeDiff = new Date(b.createdAt) - new Date(a.createdAt);
    return timeDiff;
  }
  // Sort by priority
  if (sort === "priority") {
    const priorityOrder = {
      high: 1,
      medium: 2,
      low: 3,
    };

    const priorityDiff = priorityOrder[a.priority] - priorityOrder[b.priority];
    return priorityDiff;
  }

  // Sort by title
  if (sort === "title") {
    if (a.title > b.title) {
      return 1;
    }

    if (a.title < b.title) {
      return -1;
    }

    return 0;
  }
  });

  ///////////////////////////////////////////////////////////////////////////

  // Render the UI
  return (
    <main className={darkMode ? "dark-mode" : "light-mode"}>
      <h1>Task Manager</h1>
      
      <button onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? "Light Mode" : "Dark Mode"}
      </button>

      <TaskForm
        taskToEdit={taskToEdit}
        onSubmit={handleSubmit}
        onCancel={() => setTaskToEdit(null)}
      />

      <h2>Tasks</h2>

      <TaskFilter
        filter={filter}
        onFilterChange={setFilter}
      />
      
      <TaskSort onSortChange={setSort} />

      {loading ? (
        <p>Loading Tasks...</p>
      ) : (
        <TaskList
          tasks={sortedTasks}
          onEdit={setTaskToEdit}
          onDelete={handleDelete}
          onToggle={handleToggle}
        />
      )}

      {error && <p className="error">{error}</p>}
    </main>
  );
}

export default App;