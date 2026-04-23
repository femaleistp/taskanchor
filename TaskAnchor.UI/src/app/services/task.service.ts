import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private taskRefreshSource = new Subject<void>();
  taskRefresh$ = this.taskRefreshSource.asObservable();

  constructor(private http: HttpClient) { }

  getTasks(): Observable<any> {
    return this.http.get('/api/tasks');
  }

  createTask(task: any): Observable<any> {
    return this.http.post('/api/tasks', task);
  }

  refreshTasks(): void {
    this.taskRefreshSource.next();
  }
}
