import express from "express";
import cors from "cors";
import taskRouter from "./routes/taskRouter.js";
import { notFoundHandler } from "./middleware/notFoundHandler.js";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();
const PORT = process.env.BACKEND_PORT || 4000 ;

// Cors Policy and JSON Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/tasks", taskRouter);

// Not found route handler
app.use(notFoundHandler);

// Error handler
app.use(errorHandler);

app.listen(PORT, () => {console.log(`Task Manager Server is running on ${PORT}`)});