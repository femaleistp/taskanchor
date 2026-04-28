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
    const priorityMap: Record<string, number> = {
      Low: 0,
      Medium: 1,
      High: 2
    };

    this.taskService.createTask({
      title: this.title,
      priorityLevel: priorityMap[this.priorityLevel],
      dueDate: this.dueDate || null,
      nextAction: this.nextAction
    }).subscribe(() => {
      this.taskService.refreshTasks();
      this.title = '';
      this.priorityLevel = 'Medium';
      this.dueDate = '';
      this.nextAction = '';
    });
  }
}
