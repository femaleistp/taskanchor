# TaskAnchor

TaskAnchor is a personal task system focused on follow-through, visibility, and continuous task revisiting until completion.

## Purpose
The system ensures that tasks remain visible and actionable until they are completed, reducing the likelihood of forgotten or abandoned work.

## Tech Stack
- ASP.NET Core API
- Angular (TaskAnchor.UI - in progress)
- SQL Server
- Entity Framework Core

## Project Structure

/docs
- SRS_v1.3_041826.pdf
- TaskAnchor_Test_Document.pdf
- TaskAnchor_Component_Diagram.pdf
- TaskAnchor_Class_Diagram.pdf
- TaskAnchor_Use_Case_Diagram.pdf

/TaskAnchor.API
- Controllers/
  - TasksController.cs
  - AuthController.cs
- Data/
  - TaskAnchorDbContext.cs
- Models/
  - TaskItem.cs
  - ProgressLogEntry.cs
  - AppUser.cs
  - RegisterRequest.cs
  - LoginRequest.cs
  - UpdateTaskStatusRequest.cs
  - CreateProgressLogEntryRequest.cs
- Services/
  - TaskRules.cs
  - OverdueRules.cs
  - TaskSortRules.cs
  - TaskItemStatusService.cs
  - TaskTimestampRules.cs
  - PasswordHasherService.cs
- Migrations/
  - InitialCreate.cs
  - AddUsers.cs
  - TaskAnchorDbContextModelSnapshot.cs
- Program.cs
- appsettings.json

/TaskAnchor.Tests
- TaskRulesTests.cs
- OverdueRulesTests.cs
- TaskSortRulesTests.cs
- TaskItemStatusTests.cs
- ProgressLogTests.cs

/TaskAnchor.UI
- src/app/
  - register/
  - login/
  - task-list/
  - services/

## Current Status

Backend MVP implementation complete.  
Frontend MVP in progress.

---

## Frontend (Angular)

### Implemented

#### Register UI
- RegisterComponent built using TDD
- Heading, inputs, form, submit button, submit binding
- Captures email and password
- Calls `AuthService.register()`

#### Login UI
- LoginComponent built using TDD
- Heading, inputs, form, submit button, submit binding
- Captures email and password
- Calls `AuthService.login()`

#### Task List UI
- TaskListComponent built incrementally with TDD
- Renders heading
- Renders list container
- Renders empty state when no tasks exist
- Hides empty state when tasks exist
- Renders task titles from component state
- Loads tasks from `TaskService` in `ngOnInit()`
- Renders tasks returned from `/api/tasks`

#### Frontend Services
- `AuthService`
  - `register()`
  - `login()`
- `TaskService`
  - `getTasks()`

### Frontend Testing
- Angular Karma test runner configured and verified
- Playwright installed
- Passing Playwright page-load tests for:
  - Register page
  - Login page
- Current frontend work has been implemented with strict incremental TDD

---

## Backend (Complete)

### Authentication
- POST `/api/auth/register`
- POST `/api/auth/login`
- Password hashing using SHA256
- Basic authentication only (no token/session enforcement yet)

### Task Management
- POST `/api/tasks` (create task)
- GET `/api/tasks` (returns Active + InProgress only)
- PUT `/api/tasks/{id}` (update task details)
- PUT `/api/tasks/{id}/status` (validated status transitions)
- DELETE `/api/tasks/{id}` (delete task)

### Progress Log
- POST `/api/tasks/{id}/progress` (add entry)
- GET `/api/tasks/{id}/progress` (view entries)

### Core Domain Models
- TaskItem
- ProgressLogEntry
- AppUser

### Enums
- TaskStatus (Active, InProgress, Completed)
- PriorityLevel (Low, Medium, High)

### Business Rules
- TaskRules (status transitions)
- OverdueRules (derived overdue logic)
- TaskSortRules (sorting behavior)
- TaskItemStatusService (controlled status updates)
- TaskTimestampRules (LastUpdatedDate handling)

### Persistence
- Entity Framework Core DbContext
- SQL Server database
- Migrations:
  - InitialCreate
  - AddUsers

---

## Behavior

- Tasks remain visible until marked Completed
- Completed tasks are excluded from the main task list
- Status transitions are validated through defined rules
- LastUpdatedDate is updated on:
  - create
  - edit
  - status change
  - Progress Log entry
- Tasks are sorted by:
  1. Overdue
  2. Due date (earliest first)
  3. Priority (High to Low for tasks without due dates)

---

## User Scoping (MVP)

- Tasks are associated with a UserId
- Current implementation uses a temporary single-user approach (`UserId = 1`)
- Full authentication enforcement is not yet implemented

---

## Test Coverage

- Backend tests passing:
  - TaskRules tests
  - OverdueRules tests
  - TaskSortRules tests
  - TaskItemStatusService tests
  - ProgressLog tests

- Frontend tests passing:
  - RegisterComponent tests
  - LoginComponent tests
  - AuthService tests
  - TaskService tests
  - TaskListComponent tests

- Playwright tests passing:
  - `tests/register.spec.ts`
  - `tests/login.spec.ts`

---

## Loose Ends

### Code / Consistency
- [ ] Update `task-list.component.ts` metadata from `styleUrl` to `styleUrls` for Angular consistency
- [ ] Update README sections that still describe older frontend status so documentation matches current implementation
- [ ] Remove outdated README statements such as `AuthService - pending`, `No API integration yet`, `No navigation/routing`, and older next-step items that are now complete
- [ ] Correct `/docs` listing to reference the current SRS version (`SRS_v1.3_041826.pdf`) instead of older SRS naming if needed

### Frontend Integration
- [ ] Route the app to `TaskListComponent` as part of actual active-task viewing flow
- [ ] Decide post-login navigation target so the user can reach the active task list through the UI
- [ ] Add a Playwright page-load/navigation test once TaskList routing is in place

### Frontend Typing / Structure
- [ ] Replace `any[]` in `TaskListComponent` with a typed frontend task model
- [ ] Add a typed return type for `TaskService.getTasks()`
- [ ] Add a shared frontend task interface/model aligned with backend task fields used in MVP

### Frontend Cleanup
- [ ] Replace direct `document.querySelector(...)` usage in Register/Login components with Angular form/input binding approach
- [ ] Review `LoginComponent` initial property values (`email = 'string'`, `password = 'string'`) and replace with empty strings for consistency
- [ ] Fix minor test naming typo in `task-list.component.spec.ts` (`taks` → `task`)
- [ ] Review duplicate `app.component.html` content and keep only router-based rendering version if stray old markup still exists in project files

### MVP Features Still Not Yet Implemented in Frontend
- [ ] Task create UI
- [ ] Task edit UI
- [ ] Task delete UI
- [ ] Status update UI for Active / InProgress / Completed
- [ ] Progress Log UI for add/view entries
- [ ] NextAction display/edit UI
- [ ] DueDate display/edit UI
- [ ] PriorityLevel display/edit UI

### Testing Follow-ups
- [ ] Add frontend tests for TaskList route once routed
- [ ] Add Playwright coverage for task list page after routing is added
- [ ] Add integration coverage for task-loading behavior through the routed UI

---

## Next Steps

- Route the app to TaskListComponent
- Continue frontend MVP implementation:
  - Task create UI
  - Task edit UI
  - Task delete UI
  - Progress Log UI

---

## Notes

- This project follows a strict MVP scope focused on single-user task management
- Advanced features such as notifications, tagging, and multi-user support are intentionally out of scope
- Authentication is intentionally minimal for MVP and will be expanded in future iterations

---

## Changelog

v1.4 (04/22/2026)
- Implemented LoginComponent UI and AuthService login integration
- Implemented TaskService with GET `/api/tasks`
- Integrated TaskListComponent with TaskService
- Added TaskListComponent tests for init loading, loaded rendering, and empty-state behavior
- Added Playwright page-load test for Login page
- Updated README to reflect current frontend implementation status

v1.3 (04/18/2026)
- Implemented Angular frontend project (TaskAnchor.UI)
- Built RegisterComponent using TDD
- Added frontend test coverage for UI and behavior
- Created frontend-backend component diagram
- Updated README to reflect frontend progress and current integration phase

v1.2 (04/16/2026)
- Added authentication endpoints (register and login)
- Implemented Progress Log create and retrieval endpoints
- Added status update endpoint to API
- Introduced AppUser model and Users table
- Added password hashing service
- Implemented user-scoped task filtering (MVP single-user approach)
- Added ProgressLog tests
- Updated README to reflect completed backend MVP

v1.1
- Initial backend structure
- Core task management features
- Sorting, overdue logic, and status rules implemented