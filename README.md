# TaskAnchor

TaskAnchor is a personal task system focused on follow-through, visibility, and continuous task revisiting until completion.

## Purpose

The system ensures that tasks remain visible and actionable until they are completed, reducing the likelihood of forgotten or abandoned work.

Current working phase: post-MVP capstone validation, documentation alignment, practical UX review, manual workflow testing, demo preparation, and presentation/poster preparation.

Do not add new MVP features during this phase.

## Tech Stack

- ASP.NET Core API
- Angular (TaskAnchor.UI)
- SQL Server
- Entity Framework Core

---

## Project Structure

/docs
- SRS_v1.7_042726.pdf
- TaskAnchor_Test_Planning_Document_v1.7_042726.pdf
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
Frontend MVP: Complete  
MVP feature development is complete.

Current capstone work remains focused on test normalization, test integrity enforcement, documentation alignment, MVP behavior validation, practical user experience review, demo preparation, presentation/poster preparation, and work log completion.

No new MVP features are being added. Out-of-scope items include subtasks, archiving/restoring, reactivation of completed tasks, categories/tags, multi-user features, notifications/reminders, AI features, payments, and advanced prioritization.

Manual MVP Workflow Testing is partially complete and documented in the Test Planning Document. Browser verification has confirmed Login, Task List, Create Task, Edit Task, status transitions, Completed task exclusion, NextAction display, Progress Log save/display after refresh, Delete Task, and refresh behavior.

Practical UX Review remains pending unless separately confirmed.

---

## Capstone Work Remaining

MVP feature development is complete, but capstone work is still ongoing.

Remaining work includes:
- Documentation alignment
- Practical UX Review
- Practical structure/access review for existing MVP screens
- Remaining Manual MVP Workflow Testing documentation cleanup
- Bug/limitation documentation
- Demo preparation
- Presentation/poster preparation
- Work log completion toward the 100-hour requirement
- Optional Playwright expansion for existing MVP flows only

---

## Known Scope Boundaries

Allowed remaining work:
- Test integrity review
- Expanded tests for existing MVP behavior
- Documentation alignment
- Practical UX Review
- Practical structure/access review for existing MVP screens
- Manual MVP Workflow Testing
- Bug fixes for implemented MVP behavior
- Demo, presentation, poster, and work log preparation

Not allowed:
- New MVP features
- New workflows
- Subtasks
- Archiving/restoring
- Reactivation of completed tasks
- Categories/tags
- Multi-user features
- Notifications/reminders
- AI features
- Payments
- Advanced prioritization
- UX redesign or polish beyond basic clarity and access

---

## Documentation Alignment Status

- [x] README reflects MVP feature completion
- [x] README separates remaining capstone work from MVP feature development
- [x] README documents Practical UX Review scope
- [x] README documents Manual MVP Workflow Testing
- [x] README documents Known Scope Boundaries
- [x] SRS reviewed against current README
  - [x] MVP completion status aligned
  - [x] Known Scope Boundaries checked
  - [x] Product requirements aligned
- [x] Test Plan reviewed against current README
  - [x] Existing automated test coverage aligned
  - [x] Manual MVP Workflow Testing documented in Test Plan
  - [x] Practical UX Review/manual validation documented in Test Plan
  - [x] E2E coverage gaps documented in Test Plan
- [ ] TaskAnchor Context reviewed against current README
  - [ ] MVP completion status aligned
  - [ ] Practical UX Review scope checked
  - [ ] Manual MVP Workflow Testing checked
  - [ ] Known Scope Boundaries checked
  - [ ] Remaining capstone work checked

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
  - Priority
  - NextAction (conditional)
  - Progress Logs (list per task)

#### Task Interactions

##### Status
- Active → InProgress
- InProgress → Completed
- Completed is terminal
- Uses exact status value `InProgress`
- Calls `updateTaskStatus()`
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
- Manual browser verification confirmed deleted tasks are removed after refresh

##### Progress Log
- Add Progress Log button per task
- Conditional input rendering
- Input bound via `ngModel`
- Save Progress Log button:
  - Calls `addProgressLog(taskId, text)`
  - Triggers `refreshTasks()`
  - Clears input + exits mode
- Existing Progress Log entries displayed per task:
  - `task.progressLogs[]`
  - Rendered as text entries
- Manual browser verification confirmed Progress Log entries display after refresh

---

#### Task Create UI
- Captures:
  - title
  - priorityLevel
  - dueDate
  - nextAction (`NextAction` in SRS/API terminology)
- Uses `ngModel`
- Calls `createTask()`
- Sends backend-compatible create payload values:
  - Low = 0
  - Medium = 1
  - High = 2
  - Blank dueDate = null
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
- `updateTaskStatus()`
- `deleteTask()`
- `addProgressLog()`
- `refreshTasks()`
- `taskRefresh$`

---

## Frontend Architecture Notes

- Strict state-driven UI (`ngModel`)
- No direct DOM access
- Refresh signaling pattern enforced through `refreshTasks()`:
  - Create → `refreshTasks()`
  - Delete → `refreshTasks()`
  - Status update → `refreshTasks()`
  - Edit → `refreshTasks()`
  - Progress Log → `refreshTasks()`
- Components do NOT mutate shared state directly
- `Task` interface used across UI
- `Task` interface includes optional Progress Log support:
  - `progressLogs?: ProgressLog[]`
- `ProgressLog` interface is currently defined in `models/task.ts`

---

## Frontend Testing

### Unit Tests (Karma)
- RegisterComponent
- LoginComponent
- TaskListComponent
- TaskFormComponent
- AuthService
- TaskService
- Routing spec
- AppComponent

Coverage includes:
- UI rendering
- Angular binding behavior
- Service interaction
- Status transitions
- Edit/save flow
- Delete behavior
- Progress Log full flow
- Refresh signaling
- Task object shape normalization
- Create payload normalization for backend-compatible priorityLevel and dueDate values

Latest Angular Karma run:
- Date: 04/29/2026
- Command: `ng test --watch=false`
- Result: 108 of 108 tests passed
- Failed: 0
- Browser: Chrome 147.0.0.0 on Windows 10

### Test Normalization Completed
- `task-list.component.spec.ts`
  - Partial Task objects removed
  - Returned/rendered Task fixtures now use the full Task shape
  - Extra backend-only `userId` removed from frontend Task fixture
  - Progress Log test fixture typed without `as any`
  - TaskList template tests updated for embedded `TaskFormComponent`
  - Status tests normalized to use `updateTaskStatus()` and refresh behavior
- `task.service.spec.ts`
  - GET `/api/tasks` response fixtures normalized to full Task shape
  - POST `/api/tasks` create payload intentionally remains create-payload shaped
- `task-form.component.spec.ts`
  - Checked
  - Create payload expectations normalized to backend-compatible values:
    - `priorityLevel: 0 | 1 | 2`
    - `dueDate: null` when blank
- `app.component.spec.ts`
  - Checked
  - No Task objects
- `login.component.spec.ts`
  - Checked
  - No Task objects
- `register.component.spec.ts`
  - Checked
  - No Task objects
- `auth.service.spec.ts`
  - Checked
  - No Task objects
- Routing spec
  - Checked
  - No Task objects

### E2E (Playwright)
- Login page loads
- TaskList page load test added
- Register page load test skipped because RegisterComponent is implemented and unit-tested, but no `/register` route is currently exposed

Current Playwright results:
- Full run: 3 passed, 6 skipped across Chromium, Firefox, and WebKit
- Filtered active run excluding skipped Register test: 3 passed

Current E2E coverage is limited to routed page-load smoke tests. MVP feature behavior is covered by backend xUnit tests, Angular Karma unit/component tests, and manual browser workflow testing. Skipped Playwright checks are documented as E2E gaps and do not count as completed Manual MVP Workflow Testing.

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
- Frontend status changes persist through `TaskService.updateTaskStatus()` and then trigger `refreshTasks()`

### Progress Log
- POST `/api/tasks/{id}/progress`
- GET `/api/tasks/{id}/progress`
- Frontend uses `TaskService.addProgressLog(taskId, text)` to persist Progress Log entries
- Task list responses include Progress Log data for UI display

### Business Rules
- TaskRules
- Overdue is derived, not stored
- A task is overdue when:
  - Status is Active or InProgress
  - DueDate exists
  - DueDate is before the current date
- Completed tasks are terminal
- Completed tasks are excluded from the active task list
- Task sorting:
  1. Overdue tasks
  2. Due date ascending
  3. No due date → priority High → Low

Latest backend xUnit run:
- Date: 04/29/2026
- Command: `dotnet test`
- Result: 25 of 25 tests passed
- Failed: 0
- Skipped: 0
- Build: succeeded

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

Tasks remain visible until completed.

---

## Manual MVP Workflow Testing

Manual MVP Workflow Testing is tracked in the Test Planning Document.

Current browser verification confirms:
- Login page loads and login succeeds
- Login navigates to Task List
- Task List displays active tasks
- Create Task form is visible on `/tasks`
- Create Task workflow succeeds after create payload normalization
- Created tasks appear after refresh
- Edit Task workflow succeeds
- Status Active → InProgress succeeds
- Status InProgress → Completed succeeds
- Completed task disappears from active task list
- NextAction displays when present
- Progress Log saves through backend
- Progress Log entries display in the browser after refresh
- Delete Task removes the selected task after refresh
- Refresh behavior works after create, edit, status change, Progress Log save, and delete

Manual MVP Workflow Testing is documented as partially complete until the Test Planning Document checklist is fully reconciled.

Practical UX Review remains pending unless separately confirmed.

---

## Test Coverage

- Backend:
  - Rule coverage
  - API behavior coverage
  - Progress Log persistence behavior
  - Status transition behavior
- Frontend:
  - Rendering
  - Binding
  - Service calls
  - Refresh signaling
  - Status transitions
  - Edit flow
  - Delete flow
  - Progress Log flow
  - Task object shape normalization
  - Backend-compatible create payload normalization

Latest test runs:
- Backend xUnit: 25 of 25 tests passed using `dotnet test`
- Frontend Angular Karma: 108 of 108 tests passed using `ng test --watch=false`
- Playwright active smoke tests: 3 passed
- Playwright full run: 3 passed, 6 skipped across Chromium, Firefox, and WebKit

Practical UX Review and Manual MVP Workflow Testing are defined in the Test Planning Document as manual validation activities for existing MVP flows only.

---

## Task Object Shape Rule

Returned or rendered frontend Task objects must use the full shape:

    {
      taskId: number;
      title: string;
      description: string;
      status: string;
      priorityLevel: string;
      dueDate: string | null;
      nextAction: string | null;
      lastUpdatedDate: string;
      progressLogs?: ProgressLog[];
    }

Create payload tests should not be forced into the full Task shape.

Valid frontend create payload source shape before backend mapping:

    {
      title: string;
      priorityLevel: string;
      dueDate: string;
      nextAction: string;
    }

Valid backend-compatible create payload sent by `TaskFormComponent`:

    {
      title: string;
      priorityLevel: number;
      dueDate: string | null;
      nextAction: string;
    }

PriorityLevel mapping:
- Low = 0
- Medium = 1
- High = 2

Blank dueDate is sent as `null`.

---

## Loose Ends (STRICT MVP)

### Test Integrity
- [x] Normalize Task object shape across frontend returned/rendered Task tests
  - Full returned/rendered Task structure:
    - taskId
    - title
    - description
    - status
    - priorityLevel
    - dueDate
    - nextAction
    - lastUpdatedDate
  - Partial create payload tests remain valid where they test request payload behavior only
- [x] Normalize create payload test expectations for backend-compatible priorityLevel and dueDate values
- [x] Normalize TaskList tests after rendering `TaskFormComponent` inside the Task List page
- [x] Normalize status tests to use `updateTaskStatus()` and `refreshTasks()`

---

### Manual Validation
- [x] Confirm Progress Log entries display after refresh
- [x] Confirm Delete Task removes task after refresh
- [ ] Reconcile remaining Manual MVP Workflow Testing checklist items in the Test Planning Document if not already checked
- [ ] Complete Practical UX Review only after manual screen review is confirmed

---

### Integration Gaps
- [ ] Register → navigate to `/tasks` after success

---

### E2E Coverage
- [x] TaskList page load test
- [ ] Login → TaskList navigation test
- [ ] Task creation flow test
- [ ] Status update flow test
- [ ] Progress Log flow test

---

## Next Steps (Execution Order)

1. Check Known Scope Boundaries before continuing work
2. Reconcile TaskAnchor Context documentation against the current README and Test Planning Document
3. Complete Practical UX Review for clarity, access, and usability of existing MVP flows only after manual screen review is confirmed
4. Reconcile remaining Manual MVP Workflow Testing checklist items in the Test Planning Document
5. Document remaining bugs, limitations, and known gaps
6. Prepare demo notes for the implemented MVP
7. Prepare capstone presentation and poster materials
8. Continue work logging toward the 100-hour capstone requirement
9. Optionally expand Playwright coverage for existing MVP flows only

---

## Notes

- Strict MVP scope enforced (no expansion)
- Single-user system
- Practical UX Review is allowed for clarity, access, and usability of existing MVP flows
- Manual MVP Workflow Testing is required for existing MVP flows
- Detailed Practical UX Review and Manual MVP Workflow Testing checklists are maintained in the Test Planning Document
- UX polish, redesign, and new workflows are not part of the current scope
- No notifications, roles, or advanced features
- Refresh pattern is mandatory for UI consistency
- Status logic enforced by backend rules (no UI overrides)
- PriorityLevel changes after creation are not documented as a current MVP edit workflow unless already implemented and tested
- Create payloads are intentionally smaller than full returned Task objects
- Returned/rendered Task test fixtures must use the full frontend Task shape
- Continue work logging toward the 100-hour capstone requirement

---

## Changelog

### v2.4 (04/29/2026)
- Updated README with final 04/29 regression test results
- Recorded backend xUnit result: 25 of 25 tests passed using `dotnet test`
- Recorded Angular Karma result: 108 of 108 tests passed using `ng test --watch=false`
- Documented Manual MVP Workflow Testing confirmations for Progress Log display after refresh and Delete Task removal after refresh
- Updated frontend status behavior wording from `updateTask()` to `updateTaskStatus()`
- Documented backend-compatible create payload mapping for `priorityLevel` and blank `dueDate`
- Added note that Practical UX Review remains pending unless separately confirmed
- Updated remaining work and next steps for post-MVP validation and documentation alignment

### v2.3 (04/27/2026)
- Updated README testing status to match latest Test Plan validation results
- Recorded backend xUnit result: 25 of 25 tests passed
- Recorded Angular Karma result: 108 of 108 tests passed
- Recorded Playwright active smoke result: 3 passed
- Recorded Playwright full run result: 3 passed and 6 skipped across Chromium, Firefox, and WebKit
- Documented skipped Register page Playwright test as an E2E routing/coverage gap
- Marked TaskList page load E2E coverage complete

### v2.2 (04/27/2026)
- Moved detailed Practical UX Review and Manual MVP Workflow Testing checklist tracking to the Test Planning Document
- Simplified README to keep only summary references to Practical UX Review and Manual MVP Workflow Testing
- Marked SRS alignment complete for MVP completion status, known scope boundaries, and product requirements
- Marked Test Plan alignment complete for automated coverage, manual validation, practical UX review, and E2E gap tracking

### v2.1 (04/27/2026)
- Added Current Working Phase and early scope-control wording
- Added Capstone Work Remaining section to clarify ongoing work after MVP feature completion
- Added Known Scope Boundaries section to separate allowed remaining work from blocked feature expansion
- Added Documentation Alignment Status for README, SRS, Test Plan, and TaskAnchor Context tracking
- Clarified that Practical UX Review is in scope for existing MVP flows only
- Added Practical UX Review checklist for clarity, access, and usability validation
- Added Manual MVP Workflow Testing checklist for end-to-end manual validation
- Updated Next Steps to keep remaining work aligned with MVP scope

### v2.0 (04/27/2026)
- Normalized frontend Task object shapes across checked Angular unit tests
- Replaced partial returned/rendered Task fixtures in `task-list.component.spec.ts`
- Normalized GET `/api/tasks` response fixtures in `task.service.spec.ts`
- Confirmed `task-form.component.spec.ts` uses create payloads and does not require full Task shape
- Confirmed `app.component.spec.ts`, `login.component.spec.ts`, `register.component.spec.ts`, `auth.service.spec.ts`, and routing spec do not contain Task object fixtures
- Removed backend-only `userId` from frontend Task test fixture
- Added optional `progressLogs` support to the frontend `Task` interface
- Added `ProgressLog` interface in `models/task.ts`
- Removed unnecessary Task fixture `as any` from Progress Log rendering test
- Confirmed full Angular unit test suite is green after normalization

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