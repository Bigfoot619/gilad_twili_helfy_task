# Task Manager App

Task Manager application
Stack: React + Express.js + Node.js

### Backend

cd backend
npm install
npm start

Backend runs on `http://localhost:4000`.

Time required ~ 70 mins

### Frontend

cd frontend
npm install
npm start

Frontend runs on `http://localhost:3000`.

Time required ~ 140 mins


## API

| Method | Endpoint                | Description            |
| ------ | ----------------------- | ---------------------- |
| GET    | `/api/tasks`            | Get all tasks          |
| POST   | `/api/tasks`            | Create a task          |
| PUT    | `/api/tasks/:id`        | Update a task          |
| DELETE | `/api/tasks/:id`        | Delete a task          |
| PATCH  | `/api/tasks/:id/toggle` | Toggle task completion |

## Design

* Tasks are stored in memory as required, so data resets when the backend restarts.
* Task titles must be unique.
* Task priority can be `low`, `medium`, or `high`.

Stylin & Polish ~ 30 mins

Bonus:
- Sorting
- Dark & Light Theme