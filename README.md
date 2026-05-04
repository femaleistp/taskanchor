# TaskAnchor

TaskAnchor is a personal task system focused on follow-through, visibility, and continuous task revisiting until completion.

## Purpose

The system ensures that tasks remain visible and actionable until they are completed, reducing the likelihood of forgotten or abandoned work.

Current working phase: post-MVP capstone validation, documentation alignment, Practical UX Review, Manual MVP Workflow Testing documentation, demo preparation, presentation/poster preparation, and work log completion.

Do not add new MVP features during this phase.

## Tech Stack

- ASP.NET Core API
- Angular (TaskAnchor.UI)
- SQL Server
- Entity Framework Core

---

## Project Structure

/docs
- SRS_v1.11_050426.pdf
- Test_Planning_Document_v1.13_050426.pdf
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

No new MVP features are being added. Out-of-scope items include subtasks, archiving/restoring, reactivation of completed tasks, categories/tags, multi-user features, notifications/reminders, AI features, payments, advanced prioritization, navbar/logout/session guard behavior, completed-task restore, completed-task undo behavior, time-specific due dates or due times, Progress Log edit/delete/revision-history workflows, CAPTCHA, rate limiting, lockouts, account verification, token/session enforcement beyond current MVP scope, and new authentication workflows.

Current work log status:
- 59.47 hours worked
- 40.53 hours remaining toward the 100-hour capstone requirement

Manual MVP Workflow Testing is documented in the Test Planning Document. Browser verification has confirmed Register, Login, Task List, Create Task, Edit Task, status transitions, confirmation before terminal Completed status, Completed task exclusion, NextAction display/edit behavior, PriorityLevel edit behavior, Progress Log save/display after refresh, blank Progress Log save close/clear behavior, Delete Task, deleted task removal after refresh, refresh behavior, Login/Register navigation links, Register success return to Login, duplicate Register error display, invalid Login error display, Login/Register blank-field validation, Create Task Title validation, and Task List clarity/access improvements.

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
- Existing-form validation for required fields
- Existing authentication input validation checks

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
- Time-specific due dates or due times
- Date/time deadline behavior
- Navbar/logout/session guard behavior
- UX redesign or polish beyond basic clarity and access
- Editing existing Progress Log entries
- Deleting existing Progress Log entries
- Progress Log correction/revision history in the current MVP
- CAPTCHA
- Rate limiting
- Lockouts
- Account verification
- Token/session enforcement beyond current MVP scope
- New authentication workflows

---

## Documentation Alignment Status

- [x] README reflects MVP feature completion
- [x] README separates remaining capstone work from MVP feature development
- [x] README documents Practical UX Review scope
- [x] README documents Manual MVP Workflow Testing
- [x] README documents Known Scope Boundaries
- [x] README documents Login/Register access and error-feedback corrections
- [x] README documents Login/Register blank-field validation
- [x] README documents authentication suspicious-input validation
- [x] README documents Completed status confirmation
- [x] README documents Task List clarity/access updates
- [x] README documents Description and Due Date display in Task List
- [x] README documents NextAction edit-mode support
- [x] README documents PriorityLevel display/edit support
- [x] README documents DueDate edit support
- [x] README documents DueDate date-only MVP boundary
- [x] README documents Progress Log blank-save behavior
- [x] README documents Create Task Description textarea support
- [x] README documents Create Task Title validation
- [x] README documents current frontend test result
- [x] README documents current backend test result
- [x] README documents current work log hour status
- [x] SRS reviewed against current README
  - [x] MVP completion status aligned
  - [x] Known Scope Boundaries checked
  - [x] Product requirements aligned
  - [x] DueDate date-only boundary aligned
  - [x] NextAction edit behavior aligned
  - [x] PriorityLevel edit behavior aligned
  - [x] Create Task validation aligned
  - [x] Login/Register validation aligned
- [x] Test Plan reviewed against current README
  - [x] Existing automated test coverage aligned
  - [x] Manual MVP Workflow Testing documented in Test Plan
  - [x] Practical UX Review/manual validation documented in Test Plan
  - [x] E2E coverage gaps documented in Test Plan
  - [x] Authentication access/error corrections documented in Test Plan
  - [x] Authentication validation/security handling documented in Test Plan
  - [x] Completed status confirmation documented in Test Plan
  - [x] DueDate date-only boundary documented in Test Plan
  - [x] NextAction edit-mode coverage documented in Test Plan
  - [x] PriorityLevel edit-mode coverage documented in Test Plan
  - [x] Create Task validation coverage documented in Test Plan

---

## Frontend (Angular)

### Implemented

#### Register UI
- Email + password capture via Angular binding
- Submit handling
- Calls `AuthService.register()` when fields are valid
- `/register` route exposed
- Navigates back to Login after successful registration
- Displays backend-provided duplicate-registration error text when available
- Displays required-field validation when email or password is blank/whitespace
- Does not call `AuthService.register()` when email or password is blank/whitespace
- Handles script-like or SQL-like input as plain text
- Provides Login link for users who already have an account
- Uses tested `.register-card` structure
- Uses black/white/gold styling aligned with Login, Create Task, and Task List

#### Login UI
- Email + password capture via Angular binding
- Submit handling
- Calls `AuthService.login()` when fields are valid
- Navigates to `/tasks` after successful login
- Displays visible error message after failed login
- Displays required-field validation when email or password is blank/whitespace
- Does not call `AuthService.login()` when email or password is blank/whitespace
- Handles script-like or SQL-like input as plain text
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
- Inline description editing via `ngModel`
- Inline PriorityLevel editing through select control
- Inline DueDate editing through date-only input
- Inline NextAction editing via `ngModel`
- Save button:
  - Calls `updateTask()`
  - Triggers `refreshTasks()`
  - Exits edit mode

Current edit support:
- Title edit support is implemented.
- Description edit support is implemented.
- PriorityLevel edit support is implemented.
- DueDate edit support is implemented as a date-only value.
- NextAction edit support is implemented.

##### Delete Task
- Calls `deleteTask()`
- Triggers `refreshTasks()`
- Manual browser verification confirmed deleted tasks are removed after refresh

##### Progress Log
- Add Progress Log button per task
- Conditional input rendering
- Input bound via `ngModel`
- Save Progress Log button:
  - Calls `addProgressLog(taskId, text)` when text is not blank
  - Triggers `refreshTasks()` after successful save
  - Clears input + exits mode after successful save
- Blank or whitespace Progress Log save:
  - Does not call `addProgressLog()`
  - Does not call `refreshTasks()`
  - Clears the input
  - Exits Progress Log input mode
- Existing Progress Log entries displayed per task:
  - `task.progressLogs[]`
  - Rendered as text entries
- Manual browser verification confirmed Progress Log entries display after refresh
- Manual browser verification confirmed blank Progress Log save closes/clears the input without creating an empty entry

Known Progress Log limitation:
- Existing Progress Log entries can be added and viewed.
- Existing Progress Log entries cannot be edited.
- Existing Progress Log entries cannot be deleted.
- Progress Log correction/revision history is not part of the current MVP.

---

#### Task Create UI
- Captures:
  - title
  - description
  - priorityLevel
  - dueDate
  - nextAction (`NextAction` in SRS/API terminology)
- Uses `ngModel`
- Uses Description textarea
- Uses DueDate date input
- Validates required Title
- Shows visible dark-red validation message when Title is blank/whitespace
- Does not call `createTask()` or `refreshTasks()` when Title is blank/whitespace
- Preserves entered values when validation fails so the user can correct the form
- Calls `createTask()` after valid input
- Sends backend-compatible create payload values:
  - Low = 0
  - Medium = 1
  - High = 2
  - Blank dueDate = null
- Treats dueDate as a date-only MVP value
- Does not send status from the frontend Create Task form
- Triggers `refreshTasks()` after successful create
- Clears inputs after success
- Resets priorityLevel to Medium after success
- Clears validation message after successful create
- Uses tested `.task-form-card` structure
- Uses black/white/gold styling aligned with Login, Register, and Task List

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
- Blank Progress Log save close/clear behavior
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
- Login/Register blank-field validation
- Login/Register suspicious-input handling as plain text
- Task List scanability labels
- Task detail row structure
- Task title structure
- Active/InProgress status classes
- Description display in Task List
- Due Date display in Task List
- Priority display in Task List
- Scoped edit-mode tests for title, description, PriorityLevel, DueDate, and NextAction
- PriorityLevel edit-mode rendering and binding through the existing edit/save flow
- DueDate date-only edit behavior
- NextAction edit-mode rendering and binding through the existing edit/save flow
- Create Task Description textarea support
- Create Task Description payload support
- Create Task field reset behavior after successful create
- Create Task required Title validation
- Create Task validation error styling
- DueDate date-only behavior documented as MVP scope boundary

Latest Angular Karma run:
- Date: 05/04/2026
- Command: `ng test`
- Result: 151 of 151 tests passed
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
  - Task List detail display tests added for Description, Priority, and Due Date
  - Edit-mode field tests normalized to scope selectors inside `.edit-task-fields`
  - PriorityLevel, DueDate, and NextAction edit-mode input coverage added
  - Blank Progress Log save behavior covered
- `task.service.spec.ts`
  - GET `/api/tasks` response fixtures normalized to full Task shape
  - POST `/api/tasks` create payload intentionally remains create-payload shaped
- `task-form.component.spec.ts`
  - Checked
  - Create payload expectations normalized to backend-compatible values:
    - `priorityLevel: 0 | 1 | 2`
    - `dueDate: null` when blank
  - Description textarea coverage added
  - Description create payload coverage added
  - Field reset coverage added
  - Title validation coverage added
  - Validation message styling coverage added
- `app.component.spec.ts`
  - Checked
  - No Task objects
- `login.component.spec.ts`
  - Checked
  - No Task objects
  - Includes Login/Register link and failed-login message coverage
  - Includes blank-field validation coverage
  - Includes suspicious-input plain-text coverage
- `register.component.spec.ts`
  - Checked
  - No Task objects
  - Includes Register route-related behavior, success navigation, failed-registration message, Login link, and `.register-card` structure coverage
  - Includes blank-field validation coverage
  - Includes suspicious-input plain-text coverage
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
- Blank Login/Register fields are blocked in the frontend before AuthService calls
- Suspicious/script-like login input does not bypass backend authentication
- Suspicious registration input stores email as trimmed text and password as a hash
- Raw password text is not stored

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
- Blank/whitespace Progress Log entries are blocked in frontend behavior
- Task list responses include Progress Log data for UI display

### Business Rules
- TaskRules
- Overdue is derived, not stored
- DueDate is treated as a date-only MVP field
- Time-specific due dates or due times are outside MVP scope
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
- Date: 05/04/2026
- Command: `dotnet test`
- Result: 27 of 27 tests passed
- Failed: 0
- Skipped: 0
- Build: succeeded
- Notes: 2 existing nullable-reference warnings remain in `ProgressLogTests.cs`

---

## Behavior

- Tasks persist until completed (Revisit Rule)
- Completed tasks excluded from active list
- Completed tasks are terminal
- Confirmation is required before setting a task to Completed
- Overdue is derived, not stored
- DueDate is date-only in the MVP
- Time-specific deadlines are outside MVP scope
- Sorting:
  1. Overdue
  2. Due date ascending
  3. No due date → priority High → Low
- All UI updates use refresh signaling
- Register success returns to Login
- Login success routes to Task List
- Register/Login failures display visible feedback
- Register/Login blank fields display visible feedback and block service calls
- Create Task blank Title displays visible feedback and blocks create calls
- Task List displays existing Task object details when present:
  - Description
  - Priority
  - Due Date
  - NextAction
  - Progress Log entries
- Existing task edit mode supports:
  - Title
  - Description
  - PriorityLevel
  - DueDate
  - NextAction
- Blank Progress Log save closes/clears input without creating an empty entry

---

## User Flow (Current)

1. User registers or logs in
2. Successful registration returns user to Login
3. User logs in
4. User navigates to `/tasks`
5. Task list loads

User actions:
- Register blank fields → visible validation message
- Register → success → return to Login
- Register duplicate email → visible error message
- Login blank fields → visible validation message
- Login invalid credentials → visible error message
- Login success → Task List
- Create with blank Title → visible validation message
- Create valid task → refresh → visible
- Edit title/description/PriorityLevel/DueDate/NextAction → save → refresh → updated
- Delete → refresh → removed
- Status change → refresh → updated
- Completed status selection → confirmation required
- Add Progress Log → save → refresh → visible
- Blank Progress Log save → input closes/clears and no empty entry is created

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
- Register blank-field validation displays visible red message and blocks submission
- Login page loads and login succeeds
- Login blank-field validation displays visible red message and blocks submission
- Invalid Login attempt displays visible error message
- Login navigates to Task List
- Task List displays active tasks
- Create Task form is visible on `/tasks`
- Create Task Title validation displays visible dark-red message
- Create Task valid submission clears the Title validation message
- Create Task workflow succeeds after create payload normalization
- Created tasks appear after refresh
- Edit Task workflow succeeds for title editing
- PriorityLevel edit/save persists
- NextAction edit/save updates and displays after save/refresh
- Status Active → InProgress succeeds
- Status InProgress → Completed succeeds after confirmation
- Completed task disappears from active task list
- NextAction displays when present
- Progress Log saves through backend
- Blank Progress Log save clears/closes input and does not create an empty entry
- Progress Log entries display in the browser after refresh
- Delete Task removes the selected task after refresh
- Refresh behavior works after create, edit, status change, Progress Log save, and delete
- Login, Register, Create Task, and Task List visual direction is consistent
- Task List clarity/access improvements support scanability and demo readiness

Manual MVP Workflow Testing is documented in the Test Planning Document.

Practical UX Review remains pending unless the full checklist is separately confirmed.

Manual browser verification still pending:
- Confirm Due Date edit/save persists after browser refresh if not already separately confirmed.
- Confirm Description display manually after task data includes description.
- Confirm Due Date display manually after task data includes dueDate.

---

## Test Coverage

- Backend:
  - Rule coverage
  - API behavior coverage
  - Progress Log persistence behavior
  - Status transition behavior
  - Authentication validation behavior
  - Authentication suspicious-input behavior
  - Password hashing behavior
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
  - Blank Progress Log save behavior
  - Register route coverage
  - Login/Register navigation links
  - Register success navigation
  - Login error display
  - Register error display
  - Login/Register blank-field validation
  - Login/Register suspicious-input handling
  - Task object shape normalization
  - Backend-compatible create payload normalization
  - Tested card structures for Login, Register, Create Task, and Task List
  - Task List clarity/access labels and structure
  - Description display in Task List
  - Priority display in Task List
  - Due Date display in Task List
  - Scoped edit-mode title, description, PriorityLevel, DueDate, and NextAction tests
  - Create Task Description textarea support
  - Create Task Title validation
  - Create Task validation message styling

Latest test runs:
- Backend xUnit: 27 of 27 tests passed using `dotnet test`
- Frontend Angular Karma: 151 of 151 tests passed using `ng test`
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
      description: string;
      priorityLevel: string;
      dueDate: string;
      nextAction: string;
    }

Valid backend-compatible create payload sent by `TaskFormComponent`:

    {
      title: string;
      description: string;
      priorityLevel: number;
      dueDate: string | null;
      nextAction: string;
    }

PriorityLevel mapping:
- Low = 0
- Medium = 1
- High = 2

Blank dueDate is sent as `null`.

DueDate is treated as a date-only MVP field.

Current Task field support:
- Description exists in the Task object and is captured by the Create Task UI.
- Edit mode supports title, description, PriorityLevel, DueDate, and NextAction.
- Status is not supplied by the frontend Create Task form; backend/default create behavior assigns initial task status.

---

## Future Enhancement Notes

### Time-Specific Due Dates

Current MVP behavior supports date-only DueDate values. A future version could support due times or full date/time deadlines, such as homework due at 5:00 PM on a specific date.

Possible future behavior:
- DueDate could become a date/time deadline.
- Overdue logic could compare the current date and time instead of date only.
- Task display could show both date and time.
- Sorting could account for time-specific deadlines.

This is not part of the current MVP and should not be implemented during the current post-MVP validation pass.

### Progress Log Correction History

Current MVP behavior supports adding and viewing Progress Log entries. A future version could support append-only corrections instead of direct editing. If a user makes an error or adds a Progress Log entry to the wrong task, the system could preserve the original entry and add a correction directly below it.

Possible future behavior:
- Original Progress Log entry remains visible.
- Edited entries are shown in a muted or crossed-out style with an Edited notation.
- Corrected entry appears directly below the original entry.
- Deleted entries remain visible in a muted or crossed-out style with a Deleted notation.
- The Progress Log behaves like a task history/changelog instead of a directly editable note list.

This is not part of the current MVP and should not be implemented during the current post-MVP validation pass.

### Production Authentication Hardening

Current MVP behavior supports basic Register/Login behavior, password hashing, visible validation feedback, and suspicious-input validation tests.

Possible future behavior:
- Token/session enforcement
- Account verification
- Rate limiting
- Account lockout
- CAPTCHA
- Role-based access control

These are not part of the current MVP and should not be implemented during the current post-MVP validation pass.

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
- [x] Add tested Login and Register blank-field validation
- [x] Add tested Login and Register suspicious-input handling
- [x] Add backend authentication suspicious-input tests
- [x] Add tested confirmation before Completed status selection
- [x] Add tested Task List clarity/access labels and structure
- [x] Add tested Description display in Task List
- [x] Add tested Priority display in Task List
- [x] Add tested Due Date display in Task List
- [x] Add scoped edit-mode tests for title, description, PriorityLevel, DueDate, and NextAction
- [x] Add tested NextAction edit-mode input rendering and binding
- [x] Add tested PriorityLevel edit-mode support
- [x] Add tested DueDate edit-mode support
- [x] Add tested blank Progress Log save behavior
- [x] Add tested Create Task Description textarea support
- [x] Add tested Create Task Title validation
- [x] Document DueDate date-only MVP boundary

---

### Manual Validation
- [x] Confirm Register user workflow
- [x] Confirm Login page provides access to Register
- [x] Confirm Register page provides access back to Login
- [x] Confirm successful Register returns to Login
- [x] Confirm duplicate Register error message displays
- [x] Confirm invalid Login error message displays
- [x] Confirm Login blank-field validation displays and blocks submission
- [x] Confirm Register blank-field validation displays and blocks submission
- [x] Confirm Progress Log entries display after refresh
- [x] Confirm blank Progress Log save closes/clears input without creating an empty entry
- [x] Confirm Delete Task removes task after refresh
- [x] Confirm Completed status confirmation manually
- [x] Confirm NextAction edit/save behavior manually after task creation
- [x] Confirm PriorityLevel edit/save persists
- [x] Confirm Create Task Title validation displays and clears after valid create
- [ ] Confirm DueDate edit/save persists after browser refresh if not already separately confirmed
- [ ] Confirm Description display manually after task data includes description
- [ ] Confirm Due Date display manually after task data includes dueDate
- [ ] Complete Practical UX Review only after full manual screen review is confirmed

---

### Documentation Alignment
- [x] Update SRS to v1.11
  - DueDate date-only boundary documented
  - NextAction edit behavior documented
  - PriorityLevel edit behavior documented
  - Create Task validation documented
  - Login/Register validation documented
  - Authentication suspicious-input behavior documented
  - `/register` routing reflected
  - SRS kept limited to product requirements
- [x] Update Test Plan to v1.13
  - Latest Angular Karma result updated to 151 of 151
  - Latest backend xUnit result updated to 27 of 27
  - DueDate date-only boundary documented
  - NextAction edit-mode coverage documented
  - PriorityLevel edit-mode coverage documented
  - Create Task validation documented
  - Login/Register validation documented
  - Authentication suspicious-input tests documented
  - Practical UX Review remains pending
- [x] Update README to v3.0
  - Latest Angular Karma result updated to 151 of 151
  - Latest backend xUnit result updated to 27 of 27
  - Work log status documented as 59.47 hours worked / 40.53 remaining
  - DueDate date-only boundary documented
  - NextAction edit-mode support documented
  - PriorityLevel edit support documented
  - DueDate edit support documented
  - Create Task Description textarea support documented
  - Create Task Title validation documented
  - Login/Register validation documented
  - Authentication suspicious-input tests documented

---

### Practical UX Review
- [ ] Complete Practical UX Review checklist only after explicit full manual screen review confirmation
- [ ] Decide whether current manual checks are enough to mark:
  - Login flow understandable
  - Register flow understandable
  - Existing MVP screen access understandable
  - Existing MVP screen structure supports task follow-through
  - Task List details are clear enough for demo use
  - Create Task validation is understandable
  - Login/Register validation is understandable
- [ ] Keep Practical UX Review unchecked until full checklist is confirmed

---

### Integration Gaps
- [x] Register → navigate back to Login after success
- [x] Login → navigate to `/tasks` after success
- [x] Login page links to Register
- [x] Register page links to Login
- [x] Login/Register blank fields are blocked before service calls
- [ ] Authentication/session route protection is not implemented and remains out of scope for MVP

---

### E2E Coverage
- [x] TaskList page load test
- [ ] Revisit skipped Register page load test now that `/register` route exists
- [ ] Add Login → TaskList Playwright flow test
- [ ] Add task creation Playwright flow test
- [ ] Add status update Playwright flow test
- [ ] Add Progress Log Playwright flow test
- [ ] Add validation-message Playwright checks only if needed for demo confidence

---

### Practical UX / Access Issues
- [x] Login had no visible Register access
- [x] Register had no visible Login return link
- [x] Register duplicate email failure had no visible message
- [x] Login invalid credential failure had no visible message
- [x] Login/Register blank fields had no frontend validation
- [x] Login/Register links had inconsistent styling
- [x] Accidental Completed status selection risk addressed with confirmation
- [x] Task List details needed clearer labels and structure
- [x] Task List display was missing Description when present
- [x] Task List display was missing Priority when present
- [x] Task List display was missing Due Date when present
- [x] Edit Task UI did not expose NextAction
- [x] Edit Task UI did not expose PriorityLevel
- [x] Edit Task UI did not expose DueDate
- [x] Create Task UI did not capture Description
- [x] Create Task UI allowed blank/whitespace Title submission

Blocked fixes:
- Do not add undo
- Do not add restore
- Do not reactivate Completed tasks
- Do not add a Completed archive/list
- Do not add a new status workflow
- Do not add time-specific due dates or due times
- Do not add date/time deadline behavior
- Do not edit existing Progress Log entries in the current MVP
- Do not delete existing Progress Log entries in the current MVP
- Do not add Progress Log correction history in the current MVP
- Do not add token/session enforcement in the current MVP
- Do not add CAPTCHA, rate limiting, lockouts, or account verification in the current MVP

---

### Demo / Presentation Prep
- [ ] Prepare demo script for:
  - Register
  - Login
  - Login/Register required-field validation
  - Create Task
  - Create Task required Title validation
  - Description
  - PriorityLevel
  - DueDate
  - NextAction
  - Progress Log
  - Blank Progress Log save behavior
  - Status change
  - Completed confirmation
  - Completed exclusion
  - Delete Task
- [ ] Prepare poster/presentation wording around:
  - Follow-through problem
  - Tasks persist until completed
  - Overdue is derived
  - DueDate is date-only in the MVP
  - Completed is terminal
  - Progress Log supports resuming work
  - NextAction supports concrete next steps
  - Practical UX Review improved clarity/access without adding new workflows
  - Authentication validation/security checks remained within MVP scope

---

### Work Log / Git
- [x] Add 2026-04-30 work log entry
- [x] Add 2026-05-01 Completed confirmation work log entry
- [x] Add 2026-05-01 Task List clarity/access work log entry
- [x] Add 2026-05-02 Task List Description/Due Date display work log entry
- [x] Add 2026-05-03 frontend validation/documentation alignment work log entry
- [x] Add 2026-05-04 Create Task form usability work log entry
- [x] Add 2026-05-04 authentication validation work log entry
- [ ] Commit/sync latest SRS, Test Plan, README, validation, and authentication test updates if not already committed

---

## Next Steps (Execution Order)

1. Check Known Scope Boundaries before continuing work
2. Commit/sync latest SRS, Test Plan, README, validation, and authentication test updates if not already committed
3. Confirm whether DueDate edit/save persists after browser refresh
4. Confirm Description display manually after task data includes description
5. Confirm Due Date display manually after task data includes dueDate
6. Complete Practical UX Review for clarity, access, and usability of existing MVP flows only after manual screen review is confirmed
7. Document remaining bugs, limitations, and known gaps
8. Prepare demo notes for the implemented MVP
9. Prepare capstone presentation and poster materials
10. Continue work logging toward the 100-hour capstone requirement
11. Optionally expand Playwright coverage for existing MVP flows only

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
- No time-specific DueDate behavior in current MVP scope
- No production authentication hardening beyond current MVP validation checks
- Refresh pattern is mandatory for UI consistency
- Status logic enforced by backend rules
- Completed tasks are terminal and cannot be reactivated in MVP
- Confirmation before Completed protects against accidental terminal status selection
- Create payloads are intentionally smaller than full returned Task objects
- Returned/rendered Task test fixtures must use the full frontend Task shape
- Existing Progress Log entries are add/view only in the current MVP
- Progress Log correction history is documented as a future enhancement only
- Continue work logging toward the 100-hour capstone requirement
- Current work log status: 59.47 hours worked / 40.53 hours remaining

---

## Changelog

### v3.0 (05/04/2026)
- Updated README to align with SRS v1.11 and Test Planning Document v1.13.
- Removed references to separate project context documentation.
- Recorded latest Angular Karma result: 151 of 151 tests passed using `ng test`.
- Recorded latest backend xUnit result: 27 of 27 tests passed using `dotnet test`.
- Documented work log status: 59.47 hours worked and 40.53 hours remaining toward the 100-hour capstone requirement.
- Documented Login/Register blank-field validation.
- Documented Login/Register suspicious-input handling.
- Documented backend authentication suspicious-input tests.
- Documented password hashing validation for suspicious registration input.
- Documented Create Task Description textarea support.
- Documented Create Task Description payload support.
- Documented Create Task required Title validation.
- Documented Create Task validation error styling.
- Documented Create Task field reset behavior after successful create.
- Documented PriorityLevel read-only display and edit-mode support.
- Documented DueDate edit-mode support while preserving the date-only MVP boundary.
- Documented blank Progress Log save close/clear behavior.
- Updated Manual MVP Workflow Testing summary with latest browser confirmations.
- Updated Test Coverage section with frontend 151/151 and backend 27/27 results.
- Updated Task Object Shape Rule to include description in create payloads.
- Updated known field support gaps to show Description create support, PriorityLevel edit support, and DueDate edit support are implemented.
- Updated Future Enhancement Notes with production authentication hardening items outside MVP scope.
- Updated Loose Ends, Documentation Alignment, Practical UX / Access Issues, Demo / Presentation Prep, Work Log / Git, and Next Steps sections.
- Kept Practical UX Review pending until full manual screen checklist is explicitly confirmed.

### v2.9 (05/03/2026)
- Updated README after NextAction edit-mode work and documentation alignment.
- Recorded latest Angular Karma result: 135 of 135 tests passed using `ng test`.
- Documented work log status: 52 hours logged and 48 hours remaining toward the 100-hour capstone requirement.
- Updated documentation references to SRS v1.10 and Test Planning Document v1.12.
- Documented DueDate as a date-only MVP field.
- Added time-specific due dates, due times, and date/time deadline behavior to out-of-scope items.
- Added Time-Specific Due Dates as a future enhancement note only.
- Documented NextAction edit-mode support through existing task edit flow.
- Updated Edit Task section to show title, description, and NextAction edit support as implemented.
- Updated known edit limitation to only priorityLevel and dueDate.
- Updated frontend test coverage to include scoped edit-mode tests for title, description, and NextAction.
- Updated Test Normalization Completed section to include edit-mode selector scoping and NextAction edit-mode input coverage.
- Updated Manual MVP Workflow Testing section to list NextAction edit/save browser verification as pending.
- Updated Task Object Shape Rule notes to show edit mode currently supports title, description, and NextAction.
- Updated Loose Ends to mark NextAction edit-mode support complete.
- Updated Documentation Alignment section to mark SRS v1.10, Test Plan v1.12, and README v2.9 updates complete.
- Updated Practical UX / Access Issues to mark missing NextAction edit support complete.
- Updated Next Steps to prioritize work log entries, manual NextAction edit/save verification, Practical UX Review, demo/poster/presentation prep, and optional Playwright expansion.

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
- Added Documentation Alignment loose ends.
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
- Added Documentation Alignment Status for README, SRS, and Test Plan tracking
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