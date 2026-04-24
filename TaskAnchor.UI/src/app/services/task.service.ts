import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private taskRefreshSource = new Subject<void>();
  taskRefresh$ = this.taskRefreshSource.asObservable();

  constructor(private http: HttpClient) { }

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>('/api/tasks');
  }

  createTask(task: any): Observable<any> {
    return this.http.post('/api/tasks', task);
  }

  refreshTasks(): void {
    this.taskRefreshSource.next();
  }

  deleteTask(taskId: number) {
    return this.http.delete(`/api/tasks/${taskId}`);
  }

  updateTask(task: any) {
    return this.http.put(`/api/tasks/${task.taskId}`, task);
  }
}
