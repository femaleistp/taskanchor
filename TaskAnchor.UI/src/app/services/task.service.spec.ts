import { TestBed } from '@angular/core/testing';

import { TaskService } from './task.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('TaskService', () => {
  let service: TaskService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(TaskService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should GET /api/tasks', () => {
    service.getTasks().subscribe();
    const req = httpTestingController.expectOne('/api/tasks');

    expect(req.request.method).toBe('GET');

    req.flush([]);
  });

  it('should POST to /api/tasks when creating a task', () => {
    service.createTask({ title: 'New Task' }).subscribe();

    const req = httpTestingController.expectOne('/api/tasks');

    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ title: 'New Task' });

    req.flush({});
  });

  it('should expose a refreshTasks method', () => {
    expect(service.refreshTasks).toBeTruthy();
  });

  it('should emit when refreshTasks is called', () => {
    let wasCalled = false;

    service.taskRefresh$.subscribe(() => {
      wasCalled = true;
    });

    service.refreshTasks();

    expect(wasCalled).toBeTrue();
  });

  it('should return task objects with title from /api/tasks', () => {
    const expectedTasks = [
      { title: 'Task A' },
      { title: 'Task B' }
    ];

    let actualTasks: any[] = [];

    service.getTasks().subscribe(tasks => {
      actualTasks = tasks;
    });

    const req = httpTestingController.expectOne('/api/tasks');

    req.flush(expectedTasks);

    expect(actualTasks.length).toBe(2);
    expect(actualTasks[0].title).toBe('Task A');
    expect(actualTasks[1].title).toBe('Task B');
  });
});
