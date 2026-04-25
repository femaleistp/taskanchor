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
Frontend MVP: Core Loop + Status + Delete Complete  

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
- Status interaction:
  - Active → InProgress
  - InProgress → Completed
  - Completed is terminal
- Delete button:
  - Calls API
  - Triggers refresh
- Uses typed `Task[]`
- Subscribes to refresh events

#### Task Create UI
- Captures task title via Angular binding
- Calls `TaskService.createTask()`
- Emits refresh signal via `refreshTasks()`
- Clears input after success

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
  - `updateTask()`
  - `deleteTask()`
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
- Delete behavior
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
4. User actions:
   - Create → refresh → visible
   - Delete → refresh → removed
   - Status change → refresh → updated  
5. Tasks remain visible until completed  

---

## Test Coverage

- Backend: full rule coverage
- Frontend:
  - Rendering
  - Binding
  - Service calls
  - Refresh signaling
  - Status transitions
  - Delete flow

---

## Loose Ends (STRICT MVP)

### Frontend Features Remaining
- [ ] Edit Task (UI + API integration)
- [ ] Progress Log UI (add + view)
- [ ] DueDate input + display
- [ ] PriorityLevel input + display

---

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

---

## Next Steps (Execution Order)

1. Edit Task (TDD: RED → GREEN)
2. Progress Log UI
3. DueDate + PriorityLevel UI
4. Test object normalization pass

---

## Notes

- Strict MVP scope enforced (no expansion)
- Single-user system
- No notifications, roles, or advanced features
- Refresh pattern is mandatory for UI consistency
- Status logic enforced by backend rules (no UI overrides)

---

## Changelog

### v1.8 (04/25/2026)
- Implemented status update refresh behavior
- Ensured consistency across create/delete/status flows
- Updated TaskList UI to reflect status transitions
- Added unit test for refresh after status update
- Updated README to reflect current system state and remaining work

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