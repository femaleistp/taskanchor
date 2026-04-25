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
- SRS_v1.8_042526.pdf
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
Frontend MVP: COMPLETE (All core features implemented)

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
- Renders:
  - Title
  - Status
  - NextAction (conditional)
  - Progress Logs (list per task)

#### Task Interactions

##### Status
- Active → InProgress
- InProgress → Completed
- Completed is terminal
- Calls `updateTask()`
- Triggers `refreshTasks()`

##### Edit Task
- Enter edit mode
- Inline title editing via `ngModel`
- Save button:
  - Calls `updateTask()`
  - Triggers `refreshTasks()`
  - Exits edit mode

##### Delete Task
- Calls `deleteTask()`
- Triggers `refreshTasks()`

##### Progress Log
- Add Progress Log button per task
- Conditional input rendering
- Input bound via `ngModel`
- Save Progress Log button:
  - Calls `addProgressLog(taskId, text)`
  - Triggers `refreshTasks()`
  - Clears input + exits mode
- Existing logs displayed per task:
  - `task.progressLogs[]`
  - Rendered as text entries

---

#### Task Create UI
- Captures:
  - title
  - priorityLevel
  - dueDate
  - nextAction
- Uses `ngModel`
- Calls `createTask()`
- Triggers `refreshTasks()`
- Clears inputs after success

---

#### Routing
- `/` → LoginComponent
- `/tasks` → TaskListComponent

---

#### Services

**AuthService**
- `register()`
- `login()`

**TaskService**
- `getTasks()`
- `createTask()`
- `updateTask()`
- `deleteTask()`
- `addProgressLog()`
- `refreshTasks()`
- `taskRefresh$`

---

## Frontend Architecture Notes

- Strict state-driven UI (`ngModel`)
- No direct DOM access
- Refresh signaling pattern enforced:
  - Create → refresh
  - Delete → refresh
  - Status update → refresh
  - Edit → refresh
  - Progress Log → refresh
- Components do NOT mutate shared state directly
- `Task` interface used across UI

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
- Angular binding behavior
- Service interaction
- Status transitions
- Edit/save flow
- Delete behavior
- Progress Log full flow
- Refresh signaling

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

- Tasks persist until completed (Revisit Rule)
- Completed tasks excluded from active list
- Overdue is derived (not stored)
- Sorting:
  1. Overdue
  2. Due date ascending
  3. No due date → priority High → Low
- All UI updates use refresh signaling

---

## User Flow (Current)

1. User logs in  
2. Navigates to `/tasks`  
3. Task list loads  

User actions:
- Create → refresh → visible
- Edit → save → refresh → updated
- Delete → refresh → removed
- Status change → refresh → updated  
- Add Progress Log → save → refresh → visible  

Tasks remain visible until completed  

---

## Test Coverage

- Backend: full rule coverage
- Frontend:
  - Rendering
  - Binding
  - Service calls
  - Refresh signaling
  - Status transitions
  - Edit flow
  - Delete flow
  - Progress Log flow (full)

---

## Loose Ends (STRICT MVP)

### Test Integrity (CRITICAL)
- [ ] Normalize Task object shape across ALL tests  
  - Must match full structure:
    - taskId
    - title
    - description
    - status
    - priorityLevel
    - dueDate
    - nextAction
    - lastUpdatedDate
  - Remove partial `{ title }` test objects

---

### Integration Gaps
- [ ] Register → navigate to `/tasks` after success

---

### E2E Coverage
- [ ] TaskList page load test
- [ ] Login → TaskList navigation test
- [ ] Task creation flow test
- [ ] Status update flow test
- [ ] Progress Log flow test

---

## Next Steps (Execution Order)

1. Normalize Task object shapes across all tests (TDD enforcement)
2. Expand Playwright coverage for core flows
3. Final documentation alignment (SRS, Test Plan, Context)

---

## Notes

- Strict MVP scope enforced (no expansion)
- Single-user system
- No notifications, roles, or advanced features
- Refresh pattern is mandatory for UI consistency
- Status logic enforced by backend rules (no UI overrides)

---

## Changelog

### v1.9 (04/25/2026)
- Implemented full Progress Log feature (UI + API + display)
- Added Progress Log input binding and save flow
- Integrated `addProgressLog()` into TaskService
- Implemented rendering of existing progress logs per task
- Completed task edit flow with inline editing and save behavior
- Added Save button interaction tests for edit and progress log
- Ensured all update flows trigger `refreshTasks()`
- Updated README to reflect full MVP completion
- Identified test object shape inconsistency for next phase

### v1.8 (04/25/2026)
- Implemented status update refresh behavior
- Ensured consistency across create/delete/status flows
- Updated TaskList UI to reflect status transitions
- Added unit test for refresh after status update

### v1.7 (04/23/2026)
- Removed direct DOM querying
- Implemented ngModel binding
- Completed create → visible loop
- Introduced refresh signaling architecture

### v1.6 (04/23/2026)
- Implemented TaskService refresh system
- Connected TaskForm → TaskList via observable

### v1.5
- Task creation UI complete

### v1.4
- Login + Task list integration

### v1.3
- Angular setup + Register UI

### v1.2
- Backend auth + progress log

### v1.1
- Core backend logic