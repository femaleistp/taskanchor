# TaskAnchor

TaskAnchor is a personal task system focused on follow-through, visibility, and continuous task revisiting until completion.

## Purpose
The system ensures that tasks remain visible and actionable until they are completed, reducing the likelihood of forgotten or abandoned work.

## Tech Stack
- ASP.NET Core API
- Angular (planned)
- SQL Server
- Entity Framework Core

## Project Structure

/docs
- SRS_v1.1.docx
- TaskAnchor_Test_Document.docx
- TaskAnchor_Class_Diagram.pdf
- TaskAnchor_Use_Case_Diagram.pdf

/TaskAnchor.API
- Controllers/
  - TasksController.cs
- Data/
  - TaskAnchorDbContext.cs
- Models/
  - TaskItem.cs
  - ProgressLogEntry.cs
  - UpdateTaskStatusRequest.cs
- Services/
  - TaskRules.cs
  - OverdueRules.cs
  - TaskSortRules.cs
  - TaskItemStatusService.cs
  - TaskTimestampRules.cs
- Migrations/
  - InitialCreate.cs
  - TaskAnchorDbContextModelSnapshot.cs
- Program.cs
- appsettings.json

/TaskAnchor.Tests
- TaskRulesTests.cs
- OverdueRulesTests.cs
- TaskSortRulesTests.cs
- TaskItemStatusTests.cs

## Current Status

Backend implementation in progress.

### Implemented
- Core domain models:
  - TaskItem
  - ProgressLogEntry
- Enums:
  - TaskStatus (Active, InProgress, Completed)
  - PriorityLevel (Low, Medium, High)
- Business rules:
  - TaskRules (status transitions)
  - OverdueRules (derived overdue logic)
  - TaskSortRules (sorting behavior)
  - TaskItemStatusService (controlled status updates)
  - TaskTimestampRules (LastUpdatedDate handling)
- Persistence:
  - Entity Framework Core DbContext
  - Initial migration and database schema
- API Endpoints:
  - POST /api/tasks (create task, defaults to Active)
  - GET /api/tasks (returns Active + InProgress only, excludes Completed)
  - PUT /api/tasks/{id} (update task details)
  - PUT /api/tasks/{id}/status (update status with validation)
  - DELETE /api/tasks/{id} (delete task)

### Behavior
- Tasks remain visible until marked Completed
- Completed tasks are excluded from the main task list
- Status transitions are validated through defined rules
- LastUpdatedDate is updated on create, edit, and status change
- Tasks are sorted by:
  1. Overdue
  2. Due date (earliest first)
  3. Priority (High to Low for tasks without due dates)

### Test Coverage
- TaskRules tests (status transitions)
- OverdueRules tests (overdue determination)
- TaskSortRules tests (sorting behavior)
- TaskItemStatusService tests (status updates)

## Next Steps
- Implement Progress Log endpoints:
  - POST /api/tasks/{id}/progress
  - GET /api/tasks/{id}/progress

## Notes
- This project follows a strict MVP scope focused on single-user task management.
- Advanced features such as notifications, tagging, and multi-user support are intentionally out of scope.