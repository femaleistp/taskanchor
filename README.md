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
- SRS_v1.2.pdf
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
  - register/ (RegisterComponent implemented)
  - services/ (AuthService - pending)

## Current Status

Backend MVP implementation complete.  
Frontend MVP in progress.

---

## Frontend (Angular)

### Implemented

#### Register UI
- RegisterComponent built using TDD
- Features:
  - Heading display
  - Email input (with name attribute)
  - Password input (with name attribute)
  - Submit button
  - Form wrapper
  - Submit event binding
  - onSubmit handler
  - Captures email and password values on submit

### Testing
- Angular Karma test runner configured and verified
- Step-by-step TDD used for:
  - UI structure
  - event handling
  - value capture

### Current Frontend Limitations
- No API integration yet
- No validation
- No navigation/routing
- No authentication state handling

---

## Backend (Complete)

### Authentication
- POST /api/auth/register
- POST /api/auth/login
- Password hashing using SHA256
- Basic authentication only (no token/session enforcement yet)

### Task Management
- POST /api/tasks (create task)
- GET /api/tasks (returns Active + InProgress only)
- PUT /api/tasks/{id} (update task details)
- PUT /api/tasks/{id}/status (validated status transitions)
- DELETE /api/tasks/{id} (delete task)

### Progress Log
- POST /api/tasks/{id}/progress (add entry)
- GET /api/tasks/{id}/progress (view entries)

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

- 25 passing backend tests:
  - TaskRules tests (status transitions)
  - OverdueRules tests (overdue determination)
  - TaskSortRules tests (sorting behavior)
  - TaskItemStatusService tests (status updates)
  - ProgressLog tests:
    - creation
    - ordering
    - LastUpdatedDate updates

- Frontend tests:
  - Register component TDD coverage:
    - render validation
    - input presence
    - form structure
    - submit behavior
    - value capture

---

## Next Steps

- Frontend API integration:
  - Create AuthService
  - Connect Register UI → POST /api/auth/register
- Implement Login UI
- Implement Task List UI
- Implement Task create/edit UI
- Implement Progress Log UI

---

## Notes

- This project follows a strict MVP scope focused on single-user task management
- Advanced features such as notifications, tagging, and multi-user support are intentionally out of scope
- Authentication is intentionally minimal for MVP and will be expanded in future iterations

---

## Changelog

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