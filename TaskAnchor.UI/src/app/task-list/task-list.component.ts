import { Component, OnInit } from '@angular/core';
import { TaskService } from '../services/task.service';
import { Task } from '../models/task';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  editingTaskId: number | null = null
  progressLogTaskId: number | null = null
  progressLogText: string = '';

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.loadTasks();

    this.taskService.taskRefresh$.subscribe(() => {
      this.loadTasks();
    });
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe(tasks => {
      this.tasks = tasks;
    });
  }

  getStatusLabel(status: any): string {
    if (status === 0 || status === 'Active') {
      return 'Active';
    }

    if (status === 1 || status === 'InProgress') {
      return 'InProgress';
    }

    if (status === 2 || status === 'Completed') {
      return 'Completed';
    }

    return String(status);
  }

  getPriorityLabel(priorityLevel: any): string {
    if (priorityLevel === 0 || priorityLevel === 'Low') {
      return 'Low';
    }

    if (priorityLevel === 1 || priorityLevel === 'Medium') {
      return 'Medium';
    }

    if (priorityLevel === 2 || priorityLevel === 'High') {
      return 'High';
    }

    return String(priorityLevel);
  }

  onEdit(task: any): void {
    this.editingTaskId = task.taskId;
  }

  onDelete(task: any): void {
    this.taskService.deleteTask(task.taskId).subscribe(() => {
      this.taskService.refreshTasks();
    });
  }

  onStatusChange(task: any): void {
    let newStatus: number;

    if (task.status === 0 || task.status === 'Active') {
      newStatus = 1;
    } else if (task.status === 1 || task.status === 'InProgress') {
      newStatus = 2;
    } else {
      return;
    }

    this.taskService.updateTaskStatus(task.taskId, newStatus).subscribe(() => {
      this.taskService.refreshTasks();
    });
  }

  onSave(task: any): void {
    this.taskService.updateTask(task).subscribe(() => {
      this.taskService.refreshTasks();
      this.editingTaskId = null;
    });
  }

  onAddProgressLog(task: any): void {
    this.progressLogTaskId = task.taskId;
  }

  onSaveProgressLog(task: any): void {
    this.taskService.addProgressLog(task.taskId, this.progressLogText).subscribe(() => {
      this.taskService.refreshTasks();
      this.progressLogText = '';
      this.progressLogTaskId = null;
    });
  }
}
