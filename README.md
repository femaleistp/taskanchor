# TaskAnchor

TaskAnchor is a personal task system focused on follow-through, visibility, and continuous task revisiting until completion.

## Purpose

The system ensures that tasks remain visible and actionable until they are completed, reducing the likelihood of forgotten or abandoned work.

Current working phase: post-MVP capstone validation, documentation alignment, Practical UX Review, Manual MVP Workflow Testing, demo preparation, presentation/poster preparation, and work log completion.

Do not add new MVP features during this phase.

## Tech Stack

- ASP.NET Core API
- Angular (TaskAnchor.UI)
- SQL Server
- Entity Framework Core

---

## Project Structure

/docs
- SRS_v1.9_050126.pdf
- Test_Planning_Document_v1.11_050126.pdf
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

Current capstone work remains focused on test normalization, test integrity enforcement, documentation alignment, MVP behavior validation, Practical UX Review, demo preparation, presentation/poster preparation, and work log completion.

No new MVP features are being added. Out-of-scope items include subtasks, archiving/restoring, reactivation of completed tasks, categories/tags, multi-user features, notifications/reminders, AI features, payments, advanced prioritization, navbar/logout/session guard behavior, completed-task restore, completed-task undo behavior, and Progress Log edit/delete/revision-history workflows.

Manual MVP Workflow Testing is documented in the Test Planning Document. Browser verification has confirmed Register, Login, Task List, Create Task, Edit Task, status transitions, confirmation before terminal Completed status, Completed task exclusion, NextAction display, Progress Log save/display after refresh, Delete Task, deleted task removal after refresh, refresh behavior, Login/Register navigation links, Register success return to Login, duplicate Register error display, invalid Login error display, and Task List clarity/access improvements.

Practical UX Review remains pending unless the full existing-screen checklist is explicitly confirmed.

---

## Capstone Work Remaining

MVP feature development is complete, but capstone work is still ongoing.

Remaining work includes:
- Documentation alignment
- Practical UX Review
- Practical structure/access review for existing MVP screens
- Remaining Manual MVP Workflow Testing documentation cleanup if needed
- Bug/limitation documentation
- Demo preparation
- Presentation/poster preparation
- Work log completion toward the 100-hour requirement
- Optional Playwright expansion for existing MVP flows only
- Optional TDD corrections for existing MVP field display/edit behavior

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
- Clarity/access corrections for existing MVP screens
- Demo, presentation, poster, and work log preparation
- Confirmation before Completed status selection
- Display corrections for existing Task object fields
- Edit corrections for existing Task object fields already supported by backend update behavior

Not allowed:
- New MVP features
- New workflows
- Subtasks
- Archiving/restoring
- Reactivation of completed tasks
- Completed-task undo
- Completed-task restore
- Completed-task archive/list
- Categories/tags
- Multi-user features
- Notifications/reminders
- AI features
- Payments
- Advanced prioritization
- Navbar/logout/session guard behavior
- UX redesign or polish beyond basic clarity and access
- Editing existing Progress Log entries
- Deleting existing Progress Log entries
- Progress Log correction/revision history in the current MVP

---

## Documentation Alignment Status

- [x] README reflects MVP feature completion
- [x] README separates remaining capstone work from MVP feature development
- [x] README documents Practical UX Review scope
- [x] README documents Manual MVP Workflow Testing
- [x] README documents Known Scope Boundaries
- [x] README documents Login/Register access and error-feedback corrections
- [x] README documents Completed status confirmation
- [x] README documents Task List clarity/access updates
- [x] README documents Description and Due Date display in Task List
- [x] README documents current frontend test result
- [x] SRS reviewed against current README
  - [x] MVP completion status aligned
  - [x] Known Scope Boundaries checked
  - [x] Product requirements aligned
- [x] Test Plan reviewed against current README
  - [x] Existing automated test coverage aligned
  - [x] Manual MVP Workflow Testing documented in Test Plan
  - [x] Practical UX Review/manual validation documented in Test Plan
  - [x] E2E coverage gaps documented in Test Plan
  - [x] Authentication access/error corrections documented in Test Plan
  - [x] Completed status confirmation documented in Test Plan
- [ ] TaskAnchor Context reviewed against current README
  - [ ] MVP completion status aligned
  - [ ] Practical UX Review scope checked
  - [ ] Manual MVP Workflow Testing checked
  - [ ] Known Scope Boundaries checked
  - [ ] Remaining capstone work checked
  - [ ] Login/Register access and error-feedback corrections checked
  - [ ] Completed status confirmation checked
  - [ ] Task List clarity/access updates checked

---

## Frontend (Angular)

### Implemented

#### Register UI
- Email + password capture via Angular binding
- Submit handling
- Calls `AuthService.register()`
- `/register` route exposed
- Navigates back to Login after successful registration
- Displays backend-provided duplicate-registration error text when available
- Provides Login link for users who already have an account
- Uses tested `.register-card` structure
- Uses black/white/gold styling aligned with Login, Create Task, and Task List

#### Login UI
- Email + password capture via Angular binding
- Submit handling
- Calls `AuthService.login()`
- Navigates to `/tasks` after successful login
- Displays visible error message after failed login
- Provides Register link for users without an account
- Uses tested `.login-card` structure
- Uses black/white/gold styling aligned with Register, Create Task, and Task List

#### Task List UI
- Displays active tasks
- Empty state handling
- Loads tasks from API via `TaskService`
- Uses tested `.task-list-card` structure
- Renders:
  - Title
  - Status
  - Priority
  - Description when present
  - Due Date when present
  - NextAction when present
  - Progress Logs as a list per task
- Uses clearer labels for task details
- Uses consistent task detail row structure
- Uses task title structure for scanability
- Uses status-specific button classes:
  - Active status button
  - InProgress status button
- Active status button is styled green with darker green hover
- InProgress status button is styled gold with darker gold hover
- Completed status color is documented as a future CSS note only because Completed tasks are excluded from the active list

#### Task Interactions

##### Status
- Active → InProgress
- InProgress → Completed
- Completed is terminal
- Completed tasks are excluded from active list
- Uses exact status value `InProgress`
- Calls `updateTaskStatus()`
- Triggers `refreshTasks()`
- Confirmation is shown before moving a task to Completed
- Cancelling Completed confirmation does not call `updateTaskStatus()`
- Accepting Completed confirmation updates the task and refreshes the active list

Blocked status behavior:
- No undo
- No restore
- No reactivation
- No completed-task archive/list
- No new status workflow

##### Edit Task
- Enter edit mode
- Inline title editing via `ngModel`
- Save button:
  - Calls `updateTask()`
  - Triggers `refreshTasks()`
  - Exits edit mode

Known edit limitation:
- Current edit UI edits title only.
- Existing Task object fields include description, priorityLevel, dueDate, and nextAction.
- Expanding edit mode to update those existing Task fields is allowed as a correction to implemented MVP behavior.
- This should be done with TDD.

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

Known Progress Log limitation:
- Existing Progress Log entries can be added and viewed.
- Existing Progress Log entries cannot be edited.
- Existing Progress Log entries cannot be deleted.
- Progress Log correction/revision history is not part of the current MVP.

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
- Uses tested `.task-form-card` structure
- Uses black/white/gold styling aligned with Login, Register, and Task List

Known create limitation:
- The Task object includes description.
- Current Create Task UI does not capture description.
- Adding description to Create Task is allowed as a correction to existing Task field support.
- This should be done with TDD.

---

#### Routing
- `/` → LoginComponent
- `/register` → RegisterComponent
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
- Completed status confirmation behavior
- Edit/save flow
- Delete behavior
- Progress Log full flow
- Refresh signaling
- Task object shape normalization
- Create payload normalization for backend-compatible priorityLevel and dueDate values
- Tested structural containers for Login, Register, Create Task, and Task List
- Register route exposure
- Login page Register link
- Register page Login link
- Register success navigation back to Login
- Login failed-attempt error display
- Register failed/duplicate-email error display
- Task List scanability labels
- Task detail row structure
- Task title structure
- Active/InProgress status classes
- Description display in Task List
- Due Date display in Task List

Latest Angular Karma run:
- Date: 05/02/2026
- Command: `ng test`
- Result: 128 of 128 tests passed
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
  - Completed status confirmation behavior covered
  - Task List detail display tests added for Description and Due Date
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
  - Includes Login/Register link and failed-login message coverage
- `register.component.spec.ts`
  - Checked
  - No Task objects
  - Includes Register route-related behavior, success navigation, failed-registration message, Login link, and `.register-card` structure coverage
- `auth.service.spec.ts`
  - Checked
  - No Task objects
- Routing spec
  - Checked
  - No Task objects
  - Includes `/register` route coverage

### E2E (Playwright)

- Login page loads
- TaskList page load test added
- Register page load test was previously skipped because RegisterComponent was implemented and unit-tested, but no `/register` route was exposed
- `/register` route is now exposed, so the skipped Register Playwright test should be revisited

Current Playwright results:
- Full run: 3 passed, 6 skipped across Chromium, Firefox, and WebKit
- Filtered active run excluding skipped Register test: 3 passed

Current E2E coverage is limited to routed page-load smoke tests. MVP feature behavior is covered by backend xUnit tests, Angular Karma unit/component tests, and manual browser workflow testing. Skipped Playwright checks are documented as E2E gaps and do not count as completed Manual MVP Workflow Testing.

---

## Backend (Complete)

### Authentication
- POST `/api/auth/register`
- POST `/api/auth/login`
- Duplicate registration returns backend error text such as `Email is already registered.`
- Frontend Register error display reads backend-provided error text from `HttpErrorResponse.error`
- Invalid login is rejected and frontend displays a visible login failure message

### Task Management
- POST `/api/tasks`
- GET `/api/tasks`
- PUT `/api/tasks/{id}`
- PUT `/api/tasks/{id}/status`
- DELETE `/api/tasks/{id}`
- Frontend status changes persist through `TaskService.updateTaskStatus()` and then trigger `refreshTasks()`
- Frontend task updates persist through `TaskService.updateTask()` and then trigger `refreshTasks()`

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
- Completed tasks are terminal
- Confirmation is required before setting a task to Completed
- Overdue is derived (not stored)
- Sorting:
  1. Overdue
  2. Due date ascending
  3. No due date → priority High → Low
- All UI updates use refresh signaling
- Register success returns to Login
- Login success routes to Task List
- Register/Login failures display visible feedback
- Task List displays existing Task object details when present:
  - Description
  - Due Date
  - NextAction
  - Progress Log entries

---

## User Flow (Current)

1. User registers or logs in
2. Successful registration returns user to Login
3. User logs in
4. User navigates to `/tasks`
5. Task list loads

User actions:
- Register → success → return to Login
- Register duplicate email → visible error message
- Login invalid credentials → visible error message
- Login success → Task List
- Create → refresh → visible
- Edit title → save → refresh → updated
- Delete → refresh → removed
- Status change → refresh → updated
- Completed status selection → confirmation required
- Add Progress Log → save → refresh → visible

Tasks remain visible until completed.

---

## Manual MVP Workflow Testing

Manual MVP Workflow Testing is tracked in the Test Planning Document.

Current browser verification confirms:
- Register page is accessible from Login
- Register page can return to Login
- Register user workflow succeeds
- Successful Register returns to Login
- Duplicate Register attempt displays visible backend-provided error message
- Login page loads and login succeeds
- Invalid Login attempt displays visible error message
- Login navigates to Task List
- Task List displays active tasks
- Create Task form is visible on `/tasks`
- Create Task workflow succeeds after create payload normalization
- Created tasks appear after refresh
- Edit Task workflow succeeds for title editing
- Status Active → InProgress succeeds
- Status InProgress → Completed succeeds after confirmation
- Completed task disappears from active task list
- NextAction displays when present
- Progress Log saves through backend
- Progress Log entries display in the browser after refresh
- Delete Task removes the selected task after refresh
- Refresh behavior works after create, edit, status change, Progress Log save, and delete
- Login, Register, Create Task, and Task List visual direction is consistent
- Task List clarity/access improvements support scanability and demo readiness

Manual MVP Workflow Testing is documented in the Test Planning Document.

Practical UX Review remains pending unless the full checklist is separately confirmed.

---

## Test Coverage

- Backend:
  - Rule coverage
  - API behavior coverage
  - Progress Log persistence behavior
  - Status transition behavior
  - Authentication validation behavior
- Frontend:
  - Rendering
  - Binding
  - Service calls
  - Refresh signaling
  - Status transitions
  - Completed status confirmation
  - Edit flow
  - Delete flow
  - Progress Log flow
  - Register route coverage
  - Login/Register navigation links
  - Register success navigation
  - Login error display
  - Register error display
  - Task object shape normalization
  - Backend-compatible create payload normalization
  - Tested card structures for Login, Register, Create Task, and Task List
  - Task List clarity/access labels and structure
  - Description display in Task List
  - Due Date display in Task List

Latest test runs:
- Backend xUnit: 25 of 25 tests passed using `dotnet test`
- Frontend Angular Karma: 128 of 128 tests passed using `ng test`
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

Known Task field support gaps:
- `description` exists in the Task object but is not captured by the current Create Task UI.
- Edit mode currently updates title only.
- Updating Create/Edit support for existing Task fields should be handled with TDD.

---

## Future Enhancement Notes

### Progress Log Correction History

Current MVP behavior supports adding and viewing Progress Log entries. A future version could support append-only corrections instead of direct editing. If a user makes an error or adds a Progress Log entry to the wrong task, the system could preserve the original entry and add a correction directly below it.

Possible future behavior:
- Original Progress Log entry remains visible.
- Edited entries are shown in a muted or crossed-out style with an Edited notation.
- Corrected entry appears directly below the original entry.
- Deleted entries remain visible in a muted or crossed-out style with a Deleted notation.
- The Progress Log behaves like a task history/changelog instead of a directly editable note list.

This is not part of the current MVP and should not be implemented during the current post-MVP validation pass.

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
- [x] Normalize create payload test expectations for backend-compatible priorityLevel and dueDate values
- [x] Normalize TaskList tests after rendering `TaskFormComponent` inside the Task List page
- [x] Normalize status tests to use `updateTaskStatus()` and `refreshTasks()`
- [x] Add tested Register route access
- [x] Add tested Login/Register navigation links
- [x] Add tested Login and Register error display behavior
- [x] Add tested confirmation before Completed status selection
- [x] Add tested Task List clarity/access labels and structure
- [x] Add tested Description display in Task List
- [x] Add tested Due Date display in Task List

---

### Manual Validation
- [x] Confirm Register user workflow
- [x] Confirm Login page provides access to Register
- [x] Confirm Register page provides access back to Login
- [x] Confirm successful Register returns to Login
- [x] Confirm duplicate Register error message displays
- [x] Confirm invalid Login error message displays
- [x] Confirm Progress Log entries display after refresh
- [x] Confirm Delete Task removes task after refresh
- [x] Confirm Completed status confirmation manually
- [ ] Confirm Description display manually after task data includes description
- [ ] Confirm Due Date display manually after task data includes dueDate
- [ ] Complete Practical UX Review only after full manual screen review is confirmed

---

### Documentation / Context Alignment
- [ ] Update TaskAnchor Context to reflect:
  - `/register` route exposed
  - Login page Register link added
  - Register page Login link added
  - Register success returns to Login
  - Login/Register error messages added
  - Completed status confirmation added
  - Task List clarity/access updates added
  - Description and Due Date display added to Task List
  - Angular Karma result updated to 128 of 128 tests passed
  - Register manual workflow verification completed
  - Completed status confirmation manually verified
  - Progress Log correction history documented as future enhancement only

---

### Practical UX Review
- [ ] Complete Practical UX Review checklist only after explicit full manual screen review confirmation
- [ ] Decide whether current manual checks are enough to mark:
  - Login flow understandable
  - Register flow understandable
  - Existing MVP screen access understandable
  - Existing MVP screen structure supports task follow-through
  - Task List details are clear enough for demo use
- [ ] Keep Practical UX Review unchecked until full checklist is confirmed

---

### Integration Gaps
- [x] Register → navigate back to Login after success
- [x] Login → navigate to `/tasks` after success
- [x] Login page links to Register
- [x] Register page links to Login
- [ ] Authentication/session route protection is not implemented and remains out of scope for MVP

---

### E2E Coverage
- [x] TaskList page load test
- [ ] Revisit skipped Register page load test now that `/register` route exists
- [ ] Add Login → TaskList Playwright flow test
- [ ] Add task creation Playwright flow test
- [ ] Add status update Playwright flow test
- [ ] Add Progress Log Playwright flow test

---

### Practical UX / Access Issues
- [x] Login had no visible Register access
- [x] Register had no visible Login return link
- [x] Register duplicate email failure had no visible message
- [x] Login invalid credential failure had no visible message
- [x] Login/Register links had inconsistent styling
- [x] Accidental Completed status selection risk addressed with confirmation
- [x] Task List details needed clearer labels and structure
- [x] Task List display was missing Description when present
- [x] Task List display was missing Due Date when present
- [ ] Create Task UI does not capture Description
- [ ] Edit Task UI only edits Title
- [ ] Edit Task UI does not edit Description, PriorityLevel, DueDate, or NextAction

Allowed future corrections:
- Add Description to Create Task.
- Expand Edit Task to update existing Task fields:
  - title
  - description
  - priorityLevel
  - dueDate
  - nextAction

Blocked fixes:
- Do not add undo
- Do not add restore
- Do not reactivate Completed tasks
- Do not add a Completed archive/list
- Do not add a new status workflow
- Do not edit existing Progress Log entries in the current MVP
- Do not delete existing Progress Log entries in the current MVP
- Do not add Progress Log correction history in the current MVP

---

### Demo / Presentation Prep
- [ ] Prepare demo script for:
  - Register
  - Login
  - Create Task
  - NextAction
  - Progress Log
  - Status change
  - Completed confirmation
  - Completed exclusion
  - Delete Task
- [ ] Prepare poster/presentation wording around:
  - Follow-through problem
  - Tasks persist until completed
  - Overdue is derived
  - Completed is terminal
  - Progress Log supports resuming work
  - NextAction supports concrete next steps
  - Practical UX Review improved clarity/access without adding new workflows

---

### Work Log / Git
- [x] Add 2026-04-30 work log entry
- [x] Add 2026-05-01 Completed confirmation work log entry
- [x] Add 2026-05-01 Task List clarity/access work log entry
- [ ] Add 2026-05-02 Task List Description/Due Date display work log entry
- [ ] Commit/sync latest Task List display, styling, and documentation updates

---

## Next Steps (Execution Order)

1. Check Known Scope Boundaries before continuing work
2. Commit/sync latest Task List status button styling, Description display, Due Date display, and README updates
3. Add 2026-05-02 work log entry
4. Reconcile TaskAnchor Context documentation against the current README and Test Planning Document
5. Use TDD to add Description capture to Create Task
6. Use TDD to expand Edit Task for existing Task fields only:
   - title
   - description
   - priorityLevel
   - dueDate
   - nextAction
7. Complete Practical UX Review for clarity, access, and usability of existing MVP flows only after manual screen review is confirmed
8. Document remaining bugs, limitations, and known gaps
9. Prepare demo notes for the implemented MVP
10. Prepare capstone presentation and poster materials
11. Continue work logging toward the 100-hour capstone requirement
12. Optionally expand Playwright coverage for existing MVP flows only

---

## Notes

- Strict MVP scope enforced
- Single-user system
- Practical UX Review is allowed for clarity, access, and usability of existing MVP flows
- Manual MVP Workflow Testing is required for existing MVP flows
- Detailed Practical UX Review and Manual MVP Workflow Testing checklists are maintained in the Test Planning Document
- UX polish, redesign, and new workflows are not part of the current scope
- No notifications, roles, or advanced features
- No navbar/logout/session guard behavior in current MVP scope
- Refresh pattern is mandatory for UI consistency
- Status logic enforced by backend rules
- Completed tasks are terminal and cannot be reactivated in MVP
- Confirmation before Completed protects against accidental terminal status selection
- Create payloads are intentionally smaller than full returned Task objects
- Returned/rendered Task test fixtures must use the full frontend Task shape
- Existing Progress Log entries are add/view only in the current MVP
- Progress Log correction history is documented as a future enhancement only
- Continue work logging toward the 100-hour capstone requirement

---

## Changelog

### v2.8 (05/02/2026)
- Updated README after Task List Description and Due Date display work.
- Recorded latest Angular Karma result: 128 of 128 tests passed using `ng test`.
- Documented that Task List now renders Description when present.
- Documented that Task List now renders Due Date when present.
- Updated Task List UI implemented section to include Description and Due Date.
- Updated frontend test coverage to include Description and Due Date display tests.
- Updated Test Integrity loose ends to mark Description and Due Date display tests complete.
- Added manual validation loose ends for confirming Description and Due Date display in browser data.
- Documented current Create Task limitation: description is not captured.
- Documented current Edit Task limitation: edit mode updates title only.
- Clarified that adding Description to Create Task is an allowed correction to existing Task field support.
- Clarified that expanding Edit Task for title, description, priorityLevel, dueDate, and nextAction is an allowed correction to existing Task field support.
- Added Progress Log correction history as a future enhancement note only.
- Clarified that editing/deleting existing Progress Log entries and Progress Log revision history are out of current MVP scope.
- Updated Next Steps to prioritize TDD for Description create support and expanded edit support for existing Task fields only.

### v2.7 (05/01/2026)
- Updated README after Task List clarity/access work.
- Recorded latest Angular Karma result: 126 of 126 tests passed.
- Documented Task List scanability improvements.
- Documented visible labels for NextAction and Progress Log.
- Documented normalized task detail rows.
- Documented task title structure.
- Documented Active/InProgress status classes.
- Documented status button styling direction for Active and InProgress.
- Documented that Completed status color remains a future CSS note only because Completed tasks are excluded from the active list.
- Updated frontend testing coverage to include Task List labels, task detail rows, task title structure, and status classes.
- Updated Practical UX/access issues to mark Task List detail clarity improvements complete.
- Added remaining limitation that Create/Edit support for all existing Task fields still needs review.

### v2.6 (05/01/2026)
- Updated README after Completed status confirmation work.
- Recorded latest Angular Karma result: 120 of 120 tests passed.
- Documented confirmation before moving a task to Completed.
- Documented that cancelling Completed confirmation does not call `updateTaskStatus()`.
- Documented that accepting Completed confirmation updates the task and refreshes the active list.
- Updated status behavior notes to remove accidental Completed status risk as a pending issue.
- Updated Manual MVP Workflow Testing summary to include manual verification of Completed confirmation.
- Updated Known Scope Boundaries to keep undo, restore, reactivation, completed-task archive/list, and new status workflows out of scope.
- Updated Practical UX/access issues to mark accidental Completed status selection risk addressed.

### v2.5 (04/30/2026)
- Updated README to align with Test Planning Document v1.10.
- Updated latest frontend Angular Karma result to 117 of 117 tests passed using `ng test` watch-mode.
- Documented `/register` route exposure for existing RegisterComponent.
- Documented Login page Register link.
- Documented Register page Login link.
- Documented Register success navigation back to Login.
- Documented visible Login error message for failed login attempts.
- Documented visible Register error message for duplicate/failed registration attempts.
- Documented that duplicate Register error text comes from backend `HttpErrorResponse.error`.
- Added Register styling status using tested `.register-card` structure.
- Updated styling status to include Login, Register, Create Task, and Task List as visually consistent.
- Updated frontend implemented section for Register UI and Login UI behavior.
- Updated routing section to include `/register`.
- Updated frontend testing coverage to include Register route exposure, Login/Register navigation links, Register success navigation, Login error display, and Register error display.
- Updated E2E notes to state that the previously skipped Register Playwright test should be revisited now that `/register` exists.
- Updated Manual MVP Workflow Testing summary to include Register access, Register success return to Login, duplicate Register error display, invalid Login error display, and Login/Register visual consistency.
- Updated Loose Ends to mark Register user workflow and authentication access corrections complete.
- Added Documentation / Context Alignment loose ends.
- Added Practical UX Review loose ends.
- Added Demo / Presentation Prep loose ends.
- Added Work Log / Git loose ends.
- Updated Practical UX/access issues to document resolved Login/Register clarity problems.
- Added pending accidental Completed status selection risk.
- Clarified that confirmation before Completed is allowed as a future TDD safety fix, but undo, restore, reactivation, completed-task archive/list, and new status workflows are out of scope.
- Clarified that navbar/logout/session guard behavior remains out of scope.
- Updated Next Steps to include optional TDD confirmation before setting task status to Completed.
- Updated Next Steps to include commit/sync of latest Register/Login access, error handling, styling, documentation, and work log updates.

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