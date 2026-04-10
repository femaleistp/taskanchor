SRS — Draft v1.1 (Week 3 Deliverable)

1\. Introduction

This document defines a simplified Software Requirements Specification for the Priority Task Management System. It focuses on a minimal, achievable MVP that supports task follow-through, visibility, and continuity of work. This document is expected to evolve as development progresses.

The system focuses on ensuring that tasks are not only captured, but consistently revisited and completed over time.

2\. System Overview

System Name: TaskAnchor

TaskAnchor is the product name for the Priority Task Management System.

Purpose:

Provide a structured system that ensures users revisit, track, and complete real-life priorities over time.

Core Problem:

Users forget, ignore, or inconsistently manage tasks because current tools do not enforce follow-up or visibility of incomplete work. Tasks are often stored in separate systems, but those systems do not ensure that tasks are revisited, tracked over time, or brought back into focus until they are completed.

System Positioning:

The system is a personal follow-through system designed to help users keep unfinished work visible, return to tasks that have been set aside, and maintain awareness of priorities over time. It emphasizes follow-through by ensuring that incomplete tasks remain visible and actionable until they are resolved, while also helping users immediately identify the next concrete step needed to continue progress.

Unlike a standard task list, this system is designed to reduce the friction of returning to unfinished work by preserving context, surfacing urgency, and showing the next concrete step forward.

3\. Scope

In Scope (MVP)

\- Basic user authentication

\- Create tasks

\- Edit tasks

\- Delete tasks

\- View active tasks

\- Task status tracking (Active, InProgress, Completed)

\- Optional due dates

\- Optional priority levels

\- Overdue task identification (derived)

\- Add and view Progress Log entries

\- NextAction tracking

\- Simple task sorting

Out of Scope (MVP)

\- Subtasks

\- Task archiving and restoration

\- Reactivating completed tasks

\- Estimated effort tracking

\- Category or domain grouping

\- Advanced prioritization logic

\- Multi-user support

\- Task assignment between users

\- Payment or subscription systems

\- UI polish

4\. Stakeholders

Primary User:

Individual managing personal tasks and responsibilities.

5\. Functional Requirements

5.1 Authentication

\- User can register

\- User can log in

\- Authentication is required to access tasks

5.2 Task Management

User can:

\- Create task

\- Edit task

\- Delete task

\- View active task list

Task fields:

\- Title

\- Description

\- Status (Active, InProgress, Completed)

\- PriorityLevel (Low, Medium, High)

\- DueDate (optional)

\- NextAction (optional)

\- LastUpdatedDate

5.3 Status Tracking

Task states:

\- Active

\- InProgress

\- Completed

Behavior:

\- Active → InProgress

\- InProgress → Active

\- Active/InProgress → Completed

Completed tasks are removed from the active task list.

5.4 Priority and Sorting

Tasks are displayed using the following order:

1\. Overdue tasks

2\. Tasks with due dates (earliest first)

3\. Tasks without due dates (sorted by priority: High → Low)

All incomplete tasks remain visible and are continuously re-evaluated to ensure they are revisited until completed.

5.5 Due Date and Overdue Behavior

A task is considered overdue if:

\- Status is Active or InProgress

\- DueDate exists

\- DueDate is earlier than the current date

Overdue is not stored; it is calculated dynamically.

Users may update due dates at any time.

5.6 Progress Log

Users can add Progress Log entries to tasks.

Each ProgressLogEntry includes:

\- EntryText

\- CreatedDate

Progress Log entries are used to:

\- record progress

\- capture where work stopped

\- support resuming tasks later

5.7 NextAction

Users may assign a NextAction to a task.

NextAction is a short description of the next concrete step needed to move the task forward.

The system displays NextAction with the task to reduce friction when returning to unfinished work.

6\. Non-Functional Requirements

6.1 Security

\- Passwords are hashed

\- Authentication required

6.2 Usability

\- Minimal interface

\- Clear distinction between task states

\- Overdue tasks clearly visible

\- NextAction clearly visible

6.3 Reliability

\- Data persists in SQL Server

\- No data loss under normal usage

7\. System Architecture

Frontend: Angular  

Backend: ASP.NET Core API  

Database: SQL Server  

ORM: Entity Framework Core


8\. Data Model

User

\- UserId

\- Email

\- PasswordHash

Task

\- TaskId

\- UserId (FK)

\- Title

\- Description

\- Status

\- PriorityLevel

\- DueDate

\- NextAction

\- LastUpdatedDate

ProgressLogEntry

\- ProgressLogEntryId

\- TaskId (FK)

\- EntryText

\- CreatedDate

9\. Core Logic

Revisit Rule:

Tasks remain visible and actionable until marked Completed.

Tasks are included in every active task list retrieval until completed.

InProgress Rule:

Tasks can move between Active and InProgress.

Overdue Rule:

Overdue tasks are dynamically determined and prioritized higher.

NextAction Rule:

Tasks may include a defined next step to reduce friction when resuming work.

Sorting Rule:

Tasks are ordered by:

\- overdue status

\- due date (earliest first)

\- then tasks without due dates sorted by priority

Update Tracking Rule:

LastUpdatedDate is updated when:

\- Task is created

\- Task is edited

\- Task status changes

\- A ProgressLogEntry is added

10\. Constraints & Risks

\- Limited experience with authentication implementation

\- Risk of over-investing in UI instead of functionality

\- Time constraint (100-hour project limit)

11\. Future Enhancements

\- Subtasks (task decomposition)

\- Task archiving and restoration

\- Reactivating completed tasks

\- Estimated effort tracking

\- Advanced prioritization algorithms

\- Multi-user support

\- Caregiver or household workflows

\- Task assignment between users

\- Payment or subscription features

\- AI-assisted task breakdown

\- Task history and change tracking

\- Version rollback for task edits

12\. Use Cases (MVP)

UC-1: Register User

User creates an account by entering an email address and password.

UC-2: Login

User logs into the system using their registered credentials.

UC-3: Create Task

User creates a new task by entering a title, description, and optional fields such as due date, priority level, and NextAction.

UC-4: Edit Task

User updates an existing task by modifying its fields.

UC-5: Delete Task

User removes a task from the system.

UC-6: Mark Task In Progress

User changes a task status from Active to InProgress.

UC-7: Return Task to Active

User changes a task status from InProgress back to Active.

UC-8: Complete Task

User marks a task as Completed.

UC-9: View Active Tasks

System displays all incomplete tasks ordered by defined sorting rules.

UC-10: Set Task Priority

User assigns or updates a priority level.

UC-11: Set Task Due Date

User assigns or updates a due date.

UC-12: Add Progress Log Entry

User adds a ProgressLogEntry to record work or context.

UC-13: View Progress Log

User views ProgressLogEntry history for a task.

UC-14: Set/View NextAction

User defines or views the next step for a task.

13\. External Interface (REST API)

Auth:

\- POST /api/auth/register

\- POST /api/auth/login

Tasks:

\- GET /api/tasks

\- POST /api/tasks

\- PUT /api/tasks/{id}

\- DELETE /api/tasks/{id}

Progress Log:

\- GET /api/tasks/{id}/progress

\- POST /api/tasks/{id}/progress

