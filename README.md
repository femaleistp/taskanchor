# TaskAnchor

TaskAnchor is a personal task system focused on follow-through, visibility, and continuous task revisiting until completion.

## Purpose
The system ensures that tasks remain visible and actionable until they are completed, reducing the likelihood of forgotten or abandoned work.

## Tech Stack
- ASP.NET Core API
- Angular (TaskAnchor.UI)
- SQL Server
- Entity Framework Core

---

## Project Structure

/docs
- SRS_v1.4_042226.pdf
- TaskAnchor_Test_Document.pdf
- TaskAnchor_Component_Diagram.pdf
- TaskAnchor_Class_Diagram.pdf
- TaskAnchor_Use_Case_Diagram.pdf

/TaskAnchor.API
- Controllers/
- Data/
- Models/
- Services/
- Migrations/

/TaskAnchor.Tests
- Unit tests for core logic and API

/TaskAnchor.UI
- src/app/
  - register/
  - login/
  - task-list/
  - task-form/
  - services/

---

## Current Status

Backend MVP: Complete  
Frontend MVP: In Progress  

---

## Frontend (Angular)

### Implemented

#### Register UI
- Email + password capture
- Submit handling
- Calls `AuthService.register()`

#### Login UI
- Email + password capture
- Submit handling
- Calls `AuthService.login()`
- Navigates to `/tasks` after successful login

#### Task List UI
- Displays active tasks
- Empty state handling
- Loads tasks from API via `TaskService`
- Renders task titles

#### Task Create UI
- TaskFormComponent implemented using TDD
- Captures task title
- Submits form
- Calls `TaskService.createTask()`
- Clears title after successful creation (component state)

#### Routing
- `/` → LoginComponent
- `/tasks` → TaskListComponent

#### Services
- `AuthService`
  - `register()`
  - `login()`
- `TaskService`
  - `getTasks()`
  - `createTask()`

---

## Frontend Testing

### Unit Tests (Karma)
- RegisterComponent
- LoginComponent
- TaskListComponent
- TaskFormComponent
- AuthService
- TaskService

### E2E (Playwright)
- Register page loads
- Login page loads

---

## Backend (Complete)

### Authentication
- POST `/api/auth/register`
- POST `/api/auth/login`

### Task Management
- POST `/api/tasks`
- GET `/api/tasks`
- PUT `/api/tasks/{id}`
- PUT `/api/tasks/{id}/status`
- DELETE `/api/tasks/{id}`

### Progress Log
- POST `/api/tasks/{id}/progress`
- GET `/api/tasks/{id}/progress`

### Business Rules
- TaskRules
- OverdueRules
- TaskSortRules
- TaskItemStatusService

---

## Behavior

- Tasks remain visible until completed
- Completed tasks are excluded from main list
- Overdue is derived (not stored)
- Tasks sorted by:
  1. Overdue
  2. Due date
  3. Priority

---

## User Flow (Current)

1. User opens app → Login page  
2. User submits credentials  
3. On success → navigates to `/tasks`  
4. Task list loads from API and renders  
5. User creates a task → request sent to API  
6. Task list does not yet refresh automatically (pending)

---

## Test Coverage

- Backend: full coverage of business rules and API behavior
- Frontend:
  - UI rendering
  - form submission
  - service integration
  - routing behavior (login → tasks)
  - task creation behavior

---

## Loose Ends

### Code / Consistency
- [ ] Ensure README stays synchronized with implementation

### Frontend Integration
- [ ] Refresh task list after creating a task (complete create → visible loop)
- [ ] Add navigation from Register → TaskList after successful registration
- [ ] Add Playwright test for login → task list navigation

### Frontend Typing
- [ ] Replace `any[]` in TaskListComponent with typed model
- [ ] Add return type for `TaskService.getTasks()`
- [ ] Add type for `createTask()` request
- [ ] Create shared Task interface

### Frontend Cleanup
- [ ] Replace `document.querySelector(...)` with Angular binding
- [ ] Change `LoginComponent` defaults from `'string'` → `''` (still present) :contentReference[oaicite:0]{index=0}
- [ ] Clear visible input field after task creation (currently only component state resets)
- [ ] Fix minor test typos

### MVP Features Remaining (Frontend)
- [ ] Edit Task UI
- [ ] Delete Task UI
- [ ] Status update UI (Active / InProgress / Completed)
- [ ] Progress Log UI
- [ ] NextAction UI
- [ ] DueDate UI
- [ ] PriorityLevel UI

### Testing
- [ ] Add Playwright test for TaskList page
- [ ] Add Playwright test for login → task list navigation
- [ ] Add Playwright test for task creation flow
- [ ] Add integration-style test for routed task loading

---

## Next Steps

1. Refresh task list after task creation  
2. Continue task lifecycle features:
   - Edit
   - Delete
   - Status updates  

---

## Notes

- Strict MVP scope enforced
- Single-user system
- No notifications, roles, or advanced features included

---

## Changelog

### v1.5 
- Implemented TaskFormComponent (task creation UI)
- Integrated TaskService.createTask()
- Added tests for form behavior, submission, and service call
- Implemented clearing title after successful creation

### v1.4 (04/22/2026)
- Implemented Login UI and AuthService login
- Implemented TaskService GET `/api/tasks`
- Added TaskListComponent tests

### v1.3 (04/18/2026)
- Angular project setup
- RegisterComponent implemented with TDD

### v1.2 (04/16/2026)
- Backend authentication
- Progress Log endpoints
- Status update endpoint

### v1.1
- Core backend logic and models