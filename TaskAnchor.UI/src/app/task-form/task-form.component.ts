import { Component } from '@angular/core';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent {
  title: string = '';

  constructor(private taskService: TaskService) { }
  onSubmit(): void {
    const input = document.querySelector('input[name="title"]') as HTMLInputElement;
    this.title = input.value;

    this.taskService.createTask({ title: this.title }).subscribe(() => {
      this.title = '';
    });
  }
}
