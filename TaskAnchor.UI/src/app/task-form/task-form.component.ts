import { Component } from '@angular/core';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent {
  title: string = '';
  priorityLevel: string = 'Medium';
  dueDate: string = '';
  nextAction: string = '';

  constructor(private taskService: TaskService) { }

  onSubmit(): void {
    this.taskService.createTask({ title: this.title, priorityLevel: this.priorityLevel, dueDate: this.dueDate, nextAction: this.nextAction }).subscribe(() => {
      this.title = '';
      this.priorityLevel = 'Medium';
      this.dueDate = '';
      this.nextAction = '';
      this.taskService.refreshTasks();
    });
  }
}
