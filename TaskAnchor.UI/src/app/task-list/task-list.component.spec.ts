import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskListComponent } from './task-list.component';
import { TaskService } from '../services/task.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaskListComponent],
      imports: [HttpClientTestingModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TaskListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render a Task List heading', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Task List');
  });

  it('should render a list container', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const list = compiled.querySelector('ul');
    expect(list).not.toBeNull();
  });

  it('should render empty state text where there are no tasks', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('No active tasks');
  });

  it('should render task items when tasks exist', () => {
    component.tasks = [
      { title: 'Test Task 1' },
      { title: 'Test Task 2' }
    ] as any;

    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const items = compiled.querySelectorAll('li');

    expect(items.length).toBe(2);
  });

  it('should not render empty state when tasks exist', () => {
    component.tasks = [
      { title: 'Task 1' }
    ] as any;

    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).not.toContain('No active tasks');
  });

  it('should render task title text for each taks item', () => {
    component.tasks = [
      { title: 'Pay bill' },
      { title: 'Call doctor' }
    ] as any;

    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Pay bill');
    expect(compiled.textContent).toContain('Call doctor');
  });

  it('should load tasks from TaskService on init', () => {
    const taskService = TestBed.inject(TaskService);
    spyOn(taskService, 'getTasks').and.returnValue({
      subscribe: (fn: any) => fn([{ title: 'Task 1' }])
    } as any);

    component.ngOnInit();

    expect(taskService.getTasks).toHaveBeenCalled();
    expect(component.tasks.length).toBe(1);
  });

  it('should render tasks returned from TaskService', () => {
    const taskService = TestBed.inject(TaskService);
    spyOn(taskService, 'getTasks').and.returnValue({
      subscribe: (fn: any) => fn([{ title: 'Test Task' }])
    } as any);

    component.ngOnInit();
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Test Task');
  });

  it('should call TaskService.getTasks only once on init', () => {
    const taskService = TestBed.inject(TaskService);
    spyOn(taskService, 'getTasks').and.returnValue({
      subscribe: (fn: any) => fn([])
    } as any);

    component.ngOnInit();

    expect(taskService.getTasks).toHaveBeenCalledTimes(1);
  });

  it('should render empty state when TaskService returns no tasks', () => {
    const taskService = TestBed.inject(TaskService);
    spyOn(taskService, 'getTasks').and.returnValue({
      subscribe: (fn: any) => fn([])
    } as any);

    component.ngOnInit();
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('No active tasks');
  });

  it('should update tasks when getTasks is called again', () => {
    const taskService = TestBed.inject(TaskService);

    const firstResponse = [{ title: 'Task 1' }];
    const secondResponse = [{ title: 'Task1' }, { title: 'Task 2' }];

    let callCount = 0;

    spyOn(taskService, 'getTasks').and.callFake(() => {
      return {
        subscribe: (fn: any) => {
          callCount++;
          fn(callCount === 1 ? firstResponse : secondResponse);
        }
      } as any;
    });

    component.ngOnInit();
    expect(component.tasks.length).toBe(1);

    // simulate refresh
    component.ngOnInit();

    expect(component.tasks.length).toBe(2);
  });

  it('should render a newly created task after refresh is triggered', () => {
    const taskService = TestBed.inject(TaskService);

    const initialTasks = [{ title: 'Task 1' }];
    const refreshedTasks = [{ title: 'Task 1' }, { title: 'Task 2' }];

    let getTasksCallCount = 0;

    spyOn(taskService, 'getTasks').and.callFake(() => {
      return {
        subscribe: (fn: any) => {
          getTasksCallCount++;
          fn(getTasksCallCount === 1 ? initialTasks : refreshedTasks);
        }
      } as any;
    });

    component.ngOnInit();
    fixture.detectChanges();

    let compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Task 1');
    expect(compiled.textContent).not.toContain('Task 2');

    component.loadTasks();
    fixture.detectChanges();

    compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Task 2');
  });

  it('should call loadTasks when taskService emits a refresh event', () => {
    const taskService = TestBed.inject(TaskService);

    const loadTasksSpy = spyOn(component, 'loadTasks');

    loadTasksSpy.calls.reset();

    taskService.refreshTasks();

    expect(loadTasksSpy).toHaveBeenCalledTimes(1);
  });
});
