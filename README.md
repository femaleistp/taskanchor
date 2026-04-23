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
- SRS_v1.5_042326.pdf
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
  - models/
  - services/

---

## Current Status

Backend MVP: Complete  
Frontend MVP: Core Loop Complete (Create → Visible)  

---

## Frontend (Angular)

### Implemented

#### Register UI
- Email + password capture via Angular binding
- Submit handling
- Calls `AuthService.register()`

#### Login UI
- Email + password capture via Angular binding
- Submit handling
- Calls `AuthService.login()`
- Navigates to `/tasks` after successful login

#### Task List UI
- Displays active tasks
- Empty state handling
- Loads tasks from API via `TaskService`
- Renders task titles
- Uses typed `Task[]`
- Extracted reusable `loadTasks()` method
- Subscribes to refresh events to reload tasks

#### Task Create UI
- Captures task title via Angular binding
- Submits form
- Calls `TaskService.createTask()`
- Emits refresh signal via `TaskService.refreshTasks()`
- Clears title after successful creation
- No direct task reload calls

#### Routing
- `/` → LoginComponent
- `/tasks` → TaskListComponent

#### Services
- `AuthService`
  - `register()`
  - `login()`
- `TaskService`
  - `getTasks(): Observable<Task[]>`
  - `createTask()`
  - `refreshTasks()` (emits refresh signal)
  - `taskRefresh$` observable for component subscription

---

## Frontend Architecture Notes

- Form handling is state-driven using Angular `ngModel`
- Components do not directly query the DOM
- Task list updates are event-driven via `TaskService`
- Create → visible loop is handled through refresh signaling
- Shared `Task` interface enforces consistent typing

---

## Frontend Testing

### Unit Tests (Karma)
- RegisterComponent
- LoginComponent
- TaskListComponent
- TaskFormComponent
- AuthService
- TaskService

Coverage includes:
- UI rendering
- Angular form binding behavior
- service interaction
- refresh signaling between components
- routing behavior

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
- Newly created tasks immediately appear in the list

---

## User Flow (Current)

1. User opens app → Login page  
2. User submits credentials  
3. On success → navigates to `/tasks`  
4. Task list loads from API and renders  
5. User creates a task → request sent to API  
6. Task list refreshes via event signaling  
7. New task appears immediately  

---

## Test Coverage

- Backend: full coverage of business rules and API behavior
- Frontend:
  - UI rendering
  - Angular form binding
  - service integration
  - routing behavior (login → tasks)
  - task creation behavior
  - refresh signaling between components

---

## Loose Ends

### Frontend Integration
- [ ] Add navigation from Register → TaskList after successful registration

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

---

## Next Steps

1. Implement NextAction display in TaskList  
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

### v1.7 (04/23/2026)
- Removed direct DOM querying from all frontend components
- Implemented Angular `ngModel` binding for all forms
- Completed create → visible loop using refresh signaling
- Removed temporary direct task reload workaround
- Introduced shared `Task` interface and typed service responses
- Updated TaskListComponent to use typed data and event-driven refresh
- Cleaned up frontend tests to align with Angular binding behavior
- Updated documentation and removed outdated loose ends

### v1.6 (04/23/2026)
- Implemented create → visible loop using TaskService refresh signaling
- Added `taskRefresh$` observable and `refreshTasks()` method
- Updated TaskFormComponent to emit refresh event after successful task creation
- Refactored TaskListComponent:
  - Extracted `loadTasks()` method
  - Subscribed to refresh events to reload tasks
- Added and refined unit tests for:
  - refresh event emission
  - TaskForm → TaskService interaction
  - TaskList response to refresh events
- Resolved test lifecycle issues with Angular component initialization

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