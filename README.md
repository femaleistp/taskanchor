# TaskAnchor

TaskAnchor is a personal task system focused on follow-through, visibility, and continuous task revisiting until completion.

## Purpose

The system ensures that tasks remain visible and actionable until they are completed, reducing the likelihood of forgotten or abandoned work.

Current working phase: post-MVP capstone validation, documentation alignment, Practical UX Review documentation, Manual MVP Workflow Testing documentation, security review documentation, future hardening backlog documentation, demo preparation, presentation/poster preparation, and work log completion.

Do not add new MVP features during this phase.

## Tech Stack

- ASP.NET Core API
- Angular (TaskAnchor.UI)
- SQL Server
- Entity Framework Core

---

## Project Structure

/docs
- SRS_v1.13_050626.pdf
- Test_Planning_Document_v1.15_050626.pdf
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
- tests/
  - Playwright tests for existing MVP browser flows

---

## Current Status

Backend MVP: Complete  
Frontend MVP: Complete  
MVP feature development is complete.

Current capstone work remains focused on documentation alignment, MVP behavior validation, Practical UX Review documentation, security review documentation, future hardening backlog documentation, demo preparation, presentation/poster preparation, and work log completion.

No new MVP features are being added. Out-of-scope items include subtasks, archiving/restoring, reactivation of completed tasks, categories/tags, multi-user features, notifications/reminders, AI features, payments, advanced prioritization, navbar/logout/session guard behavior, completed-task restore, completed-task undo behavior, time-specific due dates or due times, Progress Log edit/delete/revision-history workflows, CAPTCHA, rate limiting, lockouts, account verification, token/session enforcement beyond current MVP scope, multi-user authorization or ownership enforcement beyond current MVP scope, CSRF protection for future browser-session authentication, new authentication workflows, production deployment security hardening, and broad DRY refactoring during post-MVP validation.

Current work log status:
- 66.48 hours worked
- 33.52 hours remaining toward the 100-hour capstone requirement

Manual MVP Workflow Testing is documented in the Test Planning Document. Browser verification has confirmed Register, Login, Task List, Create Task, Edit Task, status transitions, confirmation before terminal Completed status, Completed task exclusion, NextAction display/edit behavior, PriorityLevel edit behavior, DueDate edit/save after browser refresh, Description display with task data, Due Date display with task data, Progress Log save/display after refresh, blank Progress Log save close/clear behavior, Delete Task confirmation, deleted task removal after accepted delete and refresh, refresh behavior, Login/Register navigation links, Register success return to Login, duplicate Register error display, invalid Login error display, Login/Register blank-field validation, Create Task Title validation, and Task List clarity/access improvements.

Practical UX Review full existing-screen review was confirmed on 05/05/2026. Remaining Practical UX Review findings are documented as known limitations.

Security review documentation was added on 05/06/2026. The review covered Injection and Broken Access Control study topics, documented current MVP security limitations, and created future hardening backlog items. These future hardening items are not implemented MVP features.

---

## Capstone Work Remaining

MVP feature development is complete, but capstone work is still ongoing.

Remaining work includes:
- Documentation alignment
- Bug/limitation documentation
- Security review documentation
- Future hardening backlog documentation
- Demo preparation
- Presentation/poster preparation
- Work log completion toward the 100-hour requirement
- Final validation checks if needed
- Optional corrections only for defects or small existing-screen clarity/access issues

---

## Known Scope Boundaries

Allowed remaining work:
- Test integrity review
- Expanded tests for existing MVP behavior
- Documentation alignment
- Security review documentation
- Future security hardening backlog documentation
- Practical UX Review documentation
- Practical structure/access review documentation for existing MVP screens
- Manual MVP Workflow Testing documentation
- Bug fixes for implemented MVP behavior
- Clarity/access corrections for existing MVP screens
- Demo, presentation, poster, and work log preparation
- Confirmation before Completed status selection
- Confirmation before destructive Delete Task action
- Display corrections for existing Task object fields
- Edit corrections for existing Task object fields already supported by backend update behavior
- Existing-form validation for required fields
- Existing authentication input validation checks
- Existing status display readability corrections

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
- Multi-user authorization or ownership enforcement beyond current MVP scope
- Role-based access control
- CSRF protection for future browser-session authentication
- New authentication workflows
- Production deployment security hardening
- Broad DRY refactoring or architecture cleanup during post-MVP validation

Security scope boundary:
- The MVP includes basic authentication, password hashing, required-field validation for current auth forms, and suspicious-input validation for existing authentication behavior.
- The MVP does not claim production-grade authentication or authorization.
- Token/session enforcement, multi-user ownership checks, rate limiting, lockouts, CAPTCHA, account verification, CSRF protection, logout/session guards, and role-based access control are future hardening items.
- Security review findings should be documented as known limitations or future enhancements unless a small existing-behavior defect is explicitly selected for correction.

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
- [x] README documents Delete Task confirmation
- [x] README documents user-facing "In Progress" status readability
- [x] README documents Task List clarity/access updates
- [x] README documents Description and Due Date display in Task List
- [x] README documents DueDate edit/save after browser refresh
- [x] README documents NextAction edit-mode support
- [x] README documents PriorityLevel display/edit support
- [x] README documents DueDate edit support
- [x] README documents DueDate date-only MVP boundary
- [x] README documents Progress Log blank-save behavior
- [x] README documents Create Task Description textarea support
- [x] README documents Create Task Title validation
- [x] README documents security review scope and future hardening backlog status
- [x] README documents current frontend test result
- [x] README documents current backend test result
- [x] README documents current Playwright result
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
  - [x] Delete confirmation aligned
  - [x] Status display readability aligned
  - [x] Security scope boundary aligned
  - [x] Future hardening backlog boundary aligned
- [x] Test Plan reviewed against current README
  - [x] Existing automated test coverage aligned
  - [x] Manual MVP Workflow Testing documented in Test Plan
  - [x] Practical UX Review/manual validation documented in Test Plan
  - [x] E2E coverage gaps documented as completed
  - [x] Authentication access/error corrections documented in Test Plan
  - [x] Authentication validation/security handling documented in Test Plan
  - [x] Completed status confirmation documented in Test Plan
  - [x] Delete confirmation documented in Test Plan
  - [x] Status display readability documented in Test Plan
  - [x] DueDate date-only boundary documented in Test Plan
  - [x] NextAction edit-mode coverage documented in Test Plan
  - [x] PriorityLevel edit-mode coverage documented in Test Plan
  - [x] Create Task validation coverage documented in Test Plan
  - [x] Security review documentation added to Test Plan
  - [x] Future hardening backlog documentation added to Test Plan

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
- User-facing InProgress status text displays as "In Progress"
- Completed status color is documented as a future CSS note only because Completed tasks are excluded from the active list

#### Task Interactions

##### Status
- Active → InProgress
- InProgress → Completed
- Completed is terminal
- Completed tasks are excluded from active list
- Uses exact backend/status value `InProgress`
- Displays user-facing status text as `In Progress`
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
- DueDate edit/save persists after browser refresh.
- NextAction edit support is implemented.

##### Delete Task
- Delete action shows a browser confirmation before deleting
- Confirmation message includes the clicked task title:
  - `Delete task "Task Title"? This action cannot be undone.`
- Cancelling Delete:
  - Does not call `deleteTask()`
  - Does not call `refreshTasks()`
  - Keeps the task visible
- Accepting Delete:
  - Calls `deleteTask()`
  - Triggers `refreshTasks()`
  - Removes the task after refresh
- Manual browser verification confirmed deleted tasks are removed after accepted delete and refresh

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
- Internal/backend status value remains `InProgress`; visible UI display uses `In Progress`

Security architecture note:
- Current MVP uses basic authentication and simplified single-user behavior.
- Current MVP does not include token/session enforcement.
- Current MVP does not include multi-user authorization or record ownership enforcement.
- Future production-ready versions should enforce authenticated API access, record ownership, and deny-by-default authorization.

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
- User-facing `In Progress` status display
- Completed status confirmation behavior
- Edit/save flow
- Delete behavior
- Delete confirmation cancel/accept behavior
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
- Date: 05/05/2026
- Command: `ng test`
- Result: 155 of 155 tests passed
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
  - Delete confirmation cancel/accept behavior covered
  - User-facing `In Progress` status readability covered
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

Playwright coverage is limited to existing MVP flows only.

Current Playwright coverage:
- Login page loads
- Register page loads
- Task List page loads
- Register blank-field validation
- Login blank-field validation
- Login → Task List navigation
- Create Task blank-title validation
- Valid Create Task flow
- Status update flow
- Progress Log add/display flow
- Delete confirmation cancel flow
- Delete confirmation accept flow

Latest Playwright results:
- Date: 05/05/2026
- Command: `npx playwright test`
- Result: 36 passed, 0 skipped, 0 failed

Previously documented E2E gaps are now complete:
- Register page load revalidation
- Login → Task List navigation
- Task creation flow
- Status update flow
- Progress Log flow
- Login/Register blank validation flow
- Create Task validation flow
- Delete confirmation browser flow after safety correction

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
- Frontend delete requests are protected by title-specific confirmation before `deleteTask()` is called

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

## Security Review Summary

Security review was documented on 05/06/2026 after studying Injection and Broken Access Control risk areas.

Implemented MVP security validation:
- Login rejects invalid credentials.
- Duplicate registration is rejected.
- Passwords are hashed during registration.
- Blank Login/Register fields are blocked in the frontend before service calls.
- Suspicious/script-like Login input is passed as plain text on the frontend and does not bypass backend authentication.
- Suspicious/script-like Register input is passed as plain text on the frontend.
- Suspicious registration password input is hashed and not stored raw.
- Create Task blank Title is blocked in the frontend before `createTask()` and `refreshTasks()` calls.

Current security assessment:
- No confirmed SQL injection or command injection vulnerability was identified in the reviewed code snippets.
- Reviewed backend behavior appears to use Entity Framework Core/LINQ rather than string-concatenated dynamic SQL.
- Angular text interpolation should remain preferred for displaying user-entered text.
- Unsafe dynamic HTML patterns, direct DOM manipulation, and dynamic command/query construction should be avoided in future changes.
- The main security limitation is MVP-level access control/authentication enforcement.
- Current MVP uses basic authentication and simplified single-user behavior.
- Current MVP does not include token/session enforcement.
- Current MVP does not include multi-user record ownership enforcement.
- Current MVP should not be described as production-grade security.

Security limitations intentionally outside MVP scope:
- Token/session enforcement
- Logout/session guard behavior
- Multi-user authorization
- Per-user task ownership enforcement
- Role-based access control
- CAPTCHA
- Rate limiting
- Lockouts
- Account verification
- CSRF protection for future browser-session authentication
- Production-grade dependency vulnerability remediation process
- Production deployment hardening

Future security backlog:
- Backend Title validation parity with frontend Create Task validation
- Backend length limits for text fields
- Progress Log input normalization review
- Stored XSS regression tests for task display fields
- Unsafe dynamic execution pattern review
- Direct API tests for suspicious task input
- Backend authentication/session hardening
- Duplicate and invalid email validation review
- Dependency vulnerability review before future release/deployment
- Backend authentication enforcement for Task APIs
- Authenticated user ownership checks
- Progress Log ownership checks
- Force browsing protection tests
- Frontend unauthorized-response handling
- CSRF review for future browser-based authentication
- CORS review before deployment
- Deny-by-default authorization policy
- Access-control logging for rejected protected requests
- Rate limiting for authentication and protected APIs
- Secure session/token lifetime review

Current decision:
- Security backlog items are future hardening items unless explicitly selected later.
- Security hardening should not interrupt final capstone documentation, demo preparation, poster preparation, presentation preparation, or work log completion unless a small existing-behavior defect is explicitly selected.

---

## Behavior

- Tasks persist until completed (Revisit Rule)
- Completed tasks excluded from active list
- Completed tasks are terminal
- Confirmation is required before setting a task to Completed
- Delete Task requires title-specific confirmation before deletion
- Overdue is derived, not stored
- DueDate is date-only in the MVP
- Time-specific deadlines are outside MVP scope
- Internal/backend status value remains `InProgress`
- User-facing status display uses `In Progress`
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
- Authentication suspicious-input behavior is validated for the MVP
- Passwords are stored as hashes, not raw password text

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
- Delete → confirmation → cancel keeps task
- Delete → confirmation → accept deletes → refresh → removed
- Status Active → In Progress → refresh → updated
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
- Description displays when task data includes description
- Due Date displays when task data includes DueDate
- Edit Task workflow succeeds for title editing
- PriorityLevel edit/save persists
- DueDate edit/save persists after browser refresh
- NextAction edit/save updates and displays after save/refresh
- Status Active → InProgress succeeds
- User-facing InProgress status displays as "In Progress"
- Status InProgress → Completed succeeds after confirmation
- Completed task disappears from active task list
- NextAction displays when present
- Progress Log saves through backend
- Blank Progress Log save clears/closes input and does not create an empty entry
- Progress Log entries display in the browser after refresh
- Delete Task shows confirmation before deleting
- Cancelling Delete keeps the task visible
- Accepting Delete removes the selected task after refresh
- Refresh behavior works after create, edit, status change, Progress Log save, and delete
- Login, Register, Create Task, and Task List visual direction is consistent
- Task List clarity/access improvements support scanability and demo readiness
- Full Practical UX Review existing-screen review is confirmed

Manual MVP Workflow Testing is documented in the Test Planning Document.

Practical UX Review findings and known limitations are documented in the Test Planning Document.

Manual browser verification still pending:
- None currently identified for core MVP workflow completion.

---

## Practical UX Review Summary

Full Practical UX Review was confirmed on 05/05/2026 for existing MVP screens:
- Login
- Register
- Task List
- Create Task
- Edit Task mode
- Progress Log flow
- Validation messages

Resolved Practical UX Review corrections:
- Delete Task now requires title-specific confirmation.
- User-facing `InProgress` status text now displays as `In Progress`.

Remaining Practical UX Review findings / known limitations:
- Add Progress Log button remains visible/clickable after Add Progress Log mode is already open, but clicking it again does not appear to do anything.
- Edit mode and Add Progress Log mode can be open at the same time on the same task.
- A task can be deleted while Edit mode and/or Add Progress Log mode are open, although Delete now requires confirmation.
- Multiple interaction modes may allow unsaved text to be lost if the user switches actions before saving.
- Create Task labels do not use colons, while Task List detail labels use colons.
- Create Task card and Task List card styling could be easier to distinguish visually.
- Create Task heading and Task List heading appear at different sizes.
- Date inputs in Create Task and Edit Task may appear in a different font depending on browser rendering.
- Code has repeated patterns and could benefit from future DRY cleanup.

Current decision:
- Delete confirmation and status readability were corrected because they were small, high-value existing-screen clarity/safety fixes.
- Remaining interaction-mode findings are documented as known limitations.
- Do not expand MVP scope into edit/progress-log mode redesign unless explicitly needed later.
- Do not start broad DRY refactoring during post-MVP validation unless required by a defect.

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
  - User-facing `In Progress` status text
  - Completed status confirmation
  - Edit flow
  - Delete flow
  - Delete confirmation cancel/accept behavior
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
- Playwright:
  - Login page loads
  - Register page loads
  - Task List page loads
  - Register blank-field validation
  - Login blank-field validation
  - Login → Task List navigation
  - Create Task blank-title validation
  - Valid Create Task browser flow
  - Status update browser flow
  - Progress Log add/display browser flow
  - Delete confirmation cancel browser flow
  - Delete confirmation accept browser flow

Latest test runs:
- Backend xUnit: 27 of 27 tests passed using `dotnet test`
- Frontend Angular Karma: 155 of 155 tests passed using `ng test`
- Playwright full run: 36 passed, 0 skipped, 0 failed using `npx playwright test`

Practical UX Review and Manual MVP Workflow Testing are defined in the Test Planning Document as manual validation activities for existing MVP flows only.

Security review details and future hardening backlog items are documented in the Test Planning Document.

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
- Description displays when task data includes description.
- Due Date displays when task data includes DueDate.
- Edit mode supports title, description, PriorityLevel, DueDate, and NextAction.
- DueDate edit/save persists after browser refresh.
- Status is not supplied by the frontend Create Task form; backend/default create behavior assigns initial task status.
- Internal/backend status value remains `InProgress`; user-facing display text uses `In Progress`.

Security data boundary:
- UserId exists in the backend data model.
- Current MVP uses simplified single-user behavior.
- Future multi-user versions should enforce authenticated ownership so one user cannot access or modify another user's task or Progress Log data.

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

### Production Authentication and Authorization Hardening

Current MVP behavior supports basic Register/Login behavior, password hashing, visible validation feedback, and suspicious-input validation tests.

Possible future behavior:
- Token/session enforcement
- Account verification
- Rate limiting
- Account lockout
- CAPTCHA
- Role-based access control
- Logout/session guard behavior
- Server-side authorization enforcement for task APIs
- Authenticated record ownership checks for tasks
- Authenticated record ownership checks for Progress Log endpoints
- Deny-by-default authorization policy
- CSRF review/protection for future browser-session authentication
- CORS configuration review before deployment
- Access-control logging for rejected protected requests
- Secure session/token lifetime review

These are not part of the current MVP and should not be implemented during the current post-MVP validation pass.

### Injection and Stored Text Hardening

Current MVP behavior includes suspicious-input validation for existing authentication behavior. No confirmed SQL injection or command injection vulnerability was identified in the reviewed code snippets.

Possible future behavior:
- Backend Title validation parity with frontend Create Task validation
- Backend length limits for text fields
- Progress Log input normalization review
- Stored XSS regression tests for displayed task and Progress Log fields
- Unsafe dynamic execution pattern review
- Direct API tests for suspicious task input
- Dependency vulnerability review before future release/deployment

These are not part of the current MVP and should not be implemented during the current post-MVP validation pass unless explicitly selected later as small existing-behavior hardening or final validation work.

### Interaction-Mode Guardrails

Current MVP behavior allows Edit mode and Add Progress Log mode to be open at the same time. A future version could add guardrails to prevent accidental unsaved text loss when users switch modes.

Possible future behavior:
- Close Add Progress Log mode when Edit mode opens.
- Close Edit mode when Add Progress Log mode opens.
- Warn before switching modes if unsaved text exists.
- Disable Delete while Edit mode or Progress Log mode is open.

This is not part of the current MVP and should not be implemented during the current post-MVP validation pass unless selected later as a small clarity/access correction.

### DRY / Refactoring Cleanup

Current MVP implementation has repeated patterns across UI tests and component logic. A future cleanup pass could reduce duplication and improve maintainability.

Possible future behavior:
- Shared test fixture helpers
- Shared Task factory helpers
- Shared display helper functions
- Reduced duplicated Playwright task creation setup

This is not part of the current MVP and should not be implemented during the current post-MVP validation pass unless required by a defect.

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
- [x] Add tested Delete Task confirmation
- [x] Add tested user-facing `In Progress` status readability
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
- [x] Expand Playwright coverage for documented existing MVP E2E gaps

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
- [x] Confirm Delete Task confirmation appears before destructive delete
- [x] Confirm cancelling Delete keeps the task visible
- [x] Confirm accepting Delete removes the task after refresh
- [x] Confirm Completed status confirmation manually
- [x] Confirm NextAction edit/save behavior manually after task creation
- [x] Confirm PriorityLevel edit/save persists
- [x] Confirm DueDate edit/save persists after browser refresh
- [x] Confirm Description display with task data
- [x] Confirm Due Date display with task data
- [x] Confirm Create Task Title validation displays and clears after valid create
- [x] Complete Practical UX Review after full manual screen review confirmation

---

### Documentation Alignment
- [x] Update SRS to v1.13
  - DueDate date-only boundary documented
  - NextAction edit behavior documented
  - PriorityLevel edit behavior documented
  - Create Task validation documented
  - Login/Register validation documented
  - Authentication suspicious-input behavior documented
  - Delete confirmation documented
  - Status display readability documented
  - `/register` routing reflected
  - Security scope boundary documented
  - Future hardening backlog boundary documented
  - SRS kept limited to product requirements
- [x] Update Test Plan to v1.15
  - Latest Angular Karma result remains 155 of 155
  - Latest backend xUnit result remains 27 of 27
  - Latest Playwright result remains 36 passed, 0 skipped, 0 failed
  - DueDate date-only boundary documented
  - NextAction edit-mode coverage documented
  - PriorityLevel edit-mode coverage documented
  - Create Task validation documented
  - Login/Register validation documented
  - Authentication suspicious-input tests documented
  - Delete confirmation documented
  - Status readability documented
  - Practical UX Review confirmed and findings documented
  - Security review documented
  - Future hardening backlog documented
- [x] Update README to v3.2
  - Latest Angular Karma result remains 155 of 155
  - Latest backend xUnit result remains 27 of 27
  - Latest Playwright result remains 36 passed, 0 skipped, 0 failed
  - Work log status documented as 66.48 hours worked / 33.52 remaining
  - DueDate date-only boundary documented
  - DueDate edit/save after browser refresh documented
  - Description and Due Date display confirmed
  - NextAction edit-mode support documented
  - PriorityLevel edit support documented
  - DueDate edit support documented
  - Create Task Description textarea support documented
  - Create Task Title validation documented
  - Login/Register validation documented
  - Authentication suspicious-input tests documented
  - Delete confirmation documented
  - Status display readability documented
  - Practical UX Review confirmed and known limitations documented
  - Security review documented
  - Future hardening backlog documented

---

### Practical UX Review
- [x] Complete Practical UX Review checklist after explicit full manual screen review confirmation
- [x] Confirm Login flow understandable
- [x] Confirm Register flow understandable
- [x] Confirm existing MVP screen access understandable
- [x] Confirm existing MVP screen structure supports task follow-through
- [x] Confirm Task List details are clear enough for demo use
- [x] Confirm Create Task validation is understandable
- [x] Confirm Login/Register validation is understandable
- [x] Document remaining Practical UX Review findings as known limitations

---

### Security Review
- [x] Review Injection risk area against current MVP code/documentation
- [x] Review Broken Access Control risk area against current MVP code/documentation
- [x] Document that no confirmed SQL injection or command injection vulnerability was identified in reviewed snippets
- [x] Document that current MVP uses basic authentication and simplified single-user behavior
- [x] Document that token/session enforcement remains outside MVP scope
- [x] Document that multi-user ownership enforcement remains outside MVP scope
- [x] Create future hardening backlog cards for Injection-related items
- [x] Create future hardening backlog cards for Broken Access Control-related items
- [x] Align security review wording across SRS, Test Plan, and README

---

### Integration Gaps
- [x] Register → navigate back to Login after success
- [x] Login → navigate to `/tasks` after success
- [x] Login page links to Register
- [x] Register page links to Login
- [x] Login/Register blank fields are blocked before service calls
- [x] Delete confirmation protects destructive delete action
- [ ] Authentication/session route protection is not implemented and remains out of scope for MVP
- [ ] Multi-user task ownership enforcement is not implemented and remains out of scope for MVP

---

### E2E Coverage
- [x] TaskList page load test
- [x] Revisit skipped Register page load test now that `/register` route exists
- [x] Add Login → TaskList Playwright flow test
- [x] Add task creation Playwright flow test
- [x] Add status update Playwright flow test
- [x] Add Progress Log Playwright flow test
- [x] Add validation-message Playwright checks for Login, Register, and Create Task
- [x] Add Delete confirmation Playwright flow tests

---

### Practical UX / Access Issues
- [x] Login had no visible Register access
- [x] Register had no visible Login return link
- [x] Register duplicate email failure had no visible message
- [x] Login invalid credential failure had no visible message
- [x] Login/Register blank fields had no frontend validation
- [x] Login/Register links had inconsistent styling
- [x] Accidental Completed status selection risk addressed with confirmation
- [x] Accidental Delete Task risk addressed with title-specific confirmation
- [x] User-facing InProgress display changed to In Progress
- [x] Task List details needed clearer labels and structure
- [x] Task List display was missing Description when present
- [x] Task List display was missing Priority when present
- [x] Task List display was missing Due Date when present
- [x] Edit Task UI did not expose NextAction
- [x] Edit Task UI did not expose PriorityLevel
- [x] Edit Task UI did not expose DueDate
- [x] Create Task UI did not capture Description
- [x] Create Task UI allowed blank/whitespace Title submission

Remaining known limitations:
- Add Progress Log button remains visible/clickable after Add Progress Log mode is already open.
- Edit mode and Add Progress Log mode can be open at the same time.
- A task can be deleted while Edit mode and/or Add Progress Log mode are open, although Delete now requires confirmation.
- Unsaved text may be lost if the user switches interaction modes before saving.
- Create Task labels and Task List labels use slightly different punctuation.
- Create Task and Task List sections could be more visually distinct.
- Date inputs may render with browser-specific font differences.
- Code has repeated patterns and could benefit from future DRY cleanup.
- Current MVP does not include token/session enforcement.
- Current MVP does not include multi-user ownership enforcement.
- Current MVP should not be treated as production-grade security.

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
- Do not add multi-user ownership enforcement in the current MVP
- Do not add role-based access control in the current MVP
- Do not add CSRF protection in the current MVP
- Do not add CAPTCHA, rate limiting, lockouts, or account verification in the current MVP
- Do not start broad DRY refactoring during post-MVP validation unless required by a defect

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
  - User-facing In Progress status display
  - Completed confirmation
  - Completed exclusion
  - Delete confirmation
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
  - Security review identified future hardening items without expanding MVP scope
  - Existing-flow Playwright coverage confirmed MVP behavior in browser

---

### Work Log / Git
- [x] Add 2026-04-30 work log entry
- [x] Add 2026-05-01 Completed confirmation work log entry
- [x] Add 2026-05-01 Task List clarity/access work log entry
- [x] Add 2026-05-02 Task List Description/Due Date display work log entry
- [x] Add 2026-05-03 frontend validation/documentation alignment work log entry
- [x] Add 2026-05-04 Create Task form usability work log entry
- [x] Add 2026-05-04 authentication validation work log entry
- [ ] Add 2026-05-05 Playwright validation work log entry
- [ ] Add 2026-05-05 Practical UX Review/Delete confirmation/status readability/documentation work log entry
- [ ] Add 2026-05-06 security review/backlog documentation work log entry
- [ ] Commit/sync latest SRS, Test Plan, README, validation, and documentation updates if not already committed

---

## Next Steps (Execution Order)

1. Commit/sync latest Test Plan, SRS, README, validation, and documentation updates if not already committed.
2. Update private continuity/context document if needed.
3. Update private assistant instructions/context if needed for future session alignment.
4. Add 05/05/2026 work log entries.
5. Add 05/06/2026 security review/backlog documentation work log entry.
6. Prepare demo notes for the implemented MVP.
7. Prepare capstone presentation and poster materials.
8. Continue work logging toward the 100-hour capstone requirement.
9. Only add further code changes for confirmed defects or small existing-screen clarity/access corrections.

---

## Notes

- Strict MVP scope enforced
- Single-user system
- Practical UX Review is allowed for clarity, access, and usability of existing MVP flows
- Manual MVP Workflow Testing is required for existing MVP flows
- Detailed Practical UX Review and Manual MVP Workflow Testing checklists are maintained in the Test Planning Document
- Security review details and future hardening backlog items are maintained in the Test Planning Document
- UX polish, redesign, and new workflows are not part of the current scope
- No notifications, roles, or advanced features
- No navbar/logout/session guard behavior in current MVP scope
- No time-specific DueDate behavior in current MVP scope
- No production authentication hardening beyond current MVP validation checks
- No token/session enforcement in current MVP scope
- No multi-user authorization or ownership enforcement in current MVP scope
- Refresh pattern is mandatory for UI consistency
- Status logic enforced by backend rules
- Completed tasks are terminal and cannot be reactivated in MVP
- Confirmation before Completed protects against accidental terminal status selection
- Confirmation before Delete protects against accidental destructive deletion
- Create payloads are intentionally smaller than full returned Task objects
- Returned/rendered Task test fixtures must use the full frontend Task shape
- Existing Progress Log entries are add/view only in the current MVP
- Progress Log correction history is documented as a future enhancement only
- Current work log status: 66.48 hours worked / 33.52 hours remaining

---

## Changelog

### v3.2 (05/06/2026)
- Updated README to align with SRS v1.13 and Test Planning Document v1.15.
- Updated document references to SRS_v1.13_050626.pdf and Test_Planning_Document_v1.15_050626.pdf.
- Updated current work log status to 66.48 hours worked and 33.52 hours remaining toward the 100-hour capstone requirement.
- Added security review documentation to Current Status, Capstone Work Remaining, Known Scope Boundaries, Documentation Alignment Status, Frontend Architecture Notes, Test Coverage, Future Enhancement Notes, Loose Ends, Next Steps, and Notes.
- Added Security Review Summary section.
- Documented that security review covered Injection and Broken Access Control study topics.
- Documented implemented MVP security validation:
  - Login rejects invalid credentials.
  - Duplicate registration is rejected.
  - Passwords are hashed during registration.
  - Blank Login/Register fields are blocked in the frontend before service calls.
  - Suspicious/script-like Login input is passed as plain text and does not bypass backend authentication.
  - Suspicious/script-like Register input is passed as plain text.
  - Suspicious registration password input is hashed and not stored raw.
  - Create Task blank Title is blocked in the frontend before createTask and refreshTasks calls.
- Documented current security assessment:
  - No confirmed SQL injection or command injection vulnerability was identified in reviewed code snippets.
  - Reviewed backend behavior appears to use Entity Framework Core/LINQ rather than string-concatenated dynamic SQL.
  - Angular text interpolation should remain preferred for displaying user-entered text.
  - Unsafe dynamic HTML patterns, direct DOM manipulation, and dynamic command/query construction should be avoided in future changes.
  - The main security limitation is MVP-level access control/authentication enforcement.
  - Current MVP uses basic authentication and simplified single-user behavior.
  - Current MVP does not include token/session enforcement.
  - Current MVP does not include multi-user record ownership enforcement.
  - Current MVP should not be described as production-grade security.
- Added future security backlog summary:
  - Backend Title validation parity with frontend Create Task validation.
  - Backend length limits for text fields.
  - Progress Log input normalization review.
  - Stored XSS regression tests for task display fields.
  - Unsafe dynamic execution pattern review.
  - Direct API tests for suspicious task input.
  - Backend authentication/session hardening.
  - Duplicate and invalid email validation review.
  - Dependency vulnerability review before future release/deployment.
  - Backend authentication enforcement for Task APIs.
  - Authenticated user ownership checks.
  - Progress Log ownership checks.
  - Force browsing protection tests.
  - Frontend unauthorized-response handling.
  - CSRF review for future browser-based authentication.
  - CORS review before deployment.
  - Deny-by-default authorization policy.
  - Access-control logging for rejected protected requests.
  - Rate limiting for authentication and protected APIs.
  - Secure session/token lifetime review.
- Added Production Authentication and Authorization Hardening future enhancement note.
- Added Injection and Stored Text Hardening future enhancement note.
- Added Security Review loose-end checklist.
- Added 2026-05-06 security review/backlog documentation work log item as pending.
- Updated Next Steps to include 05/06/2026 security review/backlog documentation work log entry.
- Replaced "MyGPT instructions/context" wording with "private assistant instructions/context."
- Maintained scope boundaries: no new MVP features, no new workflows, no token/session enforcement, no multi-user ownership enforcement, no CAPTCHA, no rate limiting, no lockouts, no account verification, no role-based access control, no CSRF implementation, no Progress Log edit/delete/revision history, no due times, and no broad refactoring.

### v3.1 (05/05/2026)
- Updated README to align with SRS v1.12 and Test Planning Document v1.14.
- Recorded latest Angular Karma result: 155 of 155 tests passed using `ng test`.
- Recorded latest Playwright result: 36 passed, 0 skipped, and 0 failed using `npx playwright test`.
- Kept latest backend xUnit result: 27 of 27 tests passed using `dotnet test`.
- Updated work log status to 64.23 hours worked and 35.77 hours remaining.
- Documented Register page Playwright revalidation after enabling/correcting the route test to `/register`.
- Documented Register blank-field Playwright validation coverage.
- Documented Login blank-field Playwright validation as included in full Playwright coverage.
- Documented Login → Task List Playwright coverage.
- Documented Create Task blank-title Playwright validation coverage.
- Documented valid Create Task Playwright flow coverage.
- Documented Status update Playwright coverage.
- Documented Progress Log add/display Playwright coverage.
- Documented Delete confirmation Playwright coverage for cancel and accept flows.
- Updated E2E section to show previously documented Playwright gaps are complete.
- Documented Delete Task confirmation behavior.
- Documented Delete confirmation message includes clicked task title.
- Documented Delete cancel path keeps the task visible and does not call delete/refresh.
- Documented Delete accept path calls delete, refreshes, and removes the task.
- Documented user-facing status display correction from `InProgress` to `In Progress`.
- Clarified backend/status value remains `InProgress`.
- Updated Manual MVP Workflow Testing confirmations for DueDate edit/save after browser refresh, Description display, Due Date display, Delete confirmation, and Practical UX Review completion.
- Added Practical UX Review Summary section.
- Documented remaining Practical UX Review known limitations.
- Added Future Enhancement notes for interaction-mode guardrails and DRY/refactoring cleanup.
- Updated Loose Ends, Manual Validation, Documentation Alignment, E2E Coverage, Practical UX / Access Issues, Demo / Presentation Prep, Work Log / Git, and Next Steps sections.
- Maintained scope boundaries: no new MVP features, no new workflows, no completed-task restore/reactivation/archive behavior, no due times, no Progress Log edit/delete/revision history, no token/session enforcement, and no broad refactoring.

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