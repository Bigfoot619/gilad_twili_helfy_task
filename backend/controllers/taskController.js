let tasks = [];
let nextId = 1;
const validPriorities = ["low", "medium", "high"];

/////////////////////////////////////////////////////////////////////////////////////

// GET /api/tasks
export const getAllTasks = (req, res) => {
  res.status(200).json(tasks);
};

/////////////////////////////////////////////////////////////////////////////////////

// POST /api/tasks
export const createTask = (req, res) => {
  const { title, description, priority } = req.body;

  if (!title || typeof title !== "string" || title.trim() === "") {
    return res.status(400).json({
      message: "Title is required",
    });
  }

  if (!validPriorities.includes(priority)) {
    return res.status(400).json({
      message: "Priority must be low, medium, or high",
    });
  }

  // Check for duplicate title
  title.trim();
  const lowerCaseTitle = title.toLowerCase();
  const isTaskExists = tasks.some((task) => task.title.toLowerCase() === lowerCaseTitle);
    
    if (isTaskExists) {
        return res.status(409).json({
            message: "Task with same title already exists",
        });
    }

  // Task data validation passed, create new task
  description?.trim();
  const newTask = {
    id: nextId++,
    title: title,
    description: description || "",
    completed: false,
    createdAt: new Date(),
    priority,
  };

  tasks.push(newTask);

  res.status(201).json(newTask);
};

/////////////////////////////////////////////////////////////////////////////////////

// PUT /api/tasks/:id
export const updateTask = (req, res) => {
  const id = Number(req.params.id);
  const { title, description, completed, priority } = req.body;

  const task = tasks.find((task) => task.id === id);

  if (!task) {
    return res.status(404).json({
      message: "Task not found",
    });
  }

  if (!title || typeof title !== "string" || title.trim() === "") {
    return res.status(400).json({
      message: "Title is required",
    });
  }

  if (!validPriorities.includes(priority)) {
    return res.status(400).json({
      message: "Priority must be low, medium, or high",
    });
  }

  if (typeof completed !== "boolean") {
    return res.status(400).json({
      message: "Completed must be a boolean",
    });
  }

  task.title = title.trim();
  task.description = description?.trim() || "";
  task.completed = completed;
  task.priority = priority;

  res.status(200).json(task);
};

/////////////////////////////////////////////////////////////////////////////////////

// DELETE /api/tasks/:id
export const deleteTask = (req, res) => {

  const id = Number(req.params.id);

  const taskIndex = tasks.findIndex((task) => task.id === id);

  if (taskIndex === -1) {
    return res.status(404).json({
      message: "Task not found",
    });
  }

  // Remove the task and organize the array to maintain the order of tasks
  tasks.splice(taskIndex, 1);

  res.status(204).send();
};

/////////////////////////////////////////////////////////////////////////////////////

// PATCH /api/tasks/:id/toggle
export const toggleTask = (req, res) => {

  const id = Number(req.params.id);

  const task = tasks.find((task) => task.id === id);

  if (!task) {
    return res.status(404).json({
      message: "Task not found",
    });
  }

  task.completed = !task.completed;

  res.status(200).json(task);
};