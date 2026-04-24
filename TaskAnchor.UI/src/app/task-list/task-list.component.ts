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

  onEdit(task: any): void {

  }

  onDelete(task: any): void {
    this.taskService.deleteTask(task.taskId).subscribe(() => {
      this.taskService.refreshTasks();
    });
  }

  onStatusChange(task: any): void {
    if (task.status === 'Active') {
      task.status = 'InProgress';
    } else if (task.status === 'InProgress') {
      task.status = 'Completed';
    }

    this.taskService.updateTask(task).subscribe();
  }
}
