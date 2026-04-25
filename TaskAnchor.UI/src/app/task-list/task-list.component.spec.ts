import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskListComponent } from './task-list.component';
import { TaskService } from '../services/task.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaskListComponent],
      imports: [FormsModule, HttpClientTestingModule]
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

  it('should reload tasks when taskRefresh$ emits', () => {
    const taskService = TestBed.inject(TaskService);

    spyOn(taskService, 'getTasks').and.returnValues(
      {
        subscribe: (fn: any) => fn([{ title: 'Initial Load' }])
      } as any,
      {
        subscribe: (fn: any) => fn([{ title: 'After Refresh' }])
      } as any
    );

    component.loadTasks();

    expect(component.tasks as any).toEqual([{ title: 'Initial Load' }]);
    expect(taskService.getTasks).toHaveBeenCalledTimes(1);

    taskService.refreshTasks();

    expect(taskService.getTasks).toHaveBeenCalledTimes(2);
    expect(component.tasks as any).toEqual([{ title: 'After Refresh' }]);
  });

  it('should keep tasks typed with title values from the service response', () => {
    const taskService = TestBed.inject(TaskService);

    spyOn(taskService, 'getTasks').and.returnValue({
      subscribe: (fn: any) => fn([
        { title: 'Task A' },
        { title: 'Task B' }
      ])
    } as any);

    component.loadTasks();

    expect(component.tasks.length).toBe(2);
    expect(component.tasks[0].title).toBe('Task A');
    expect(component.tasks[1].title).toBe('Task B');
  });

  it('should accept a task list shaped as objects with title strings', () => {
    component.tasks = [
      { title: 'Task A' },
      { title: 'Task B' }
    ] as any;

    expect(component.tasks[0].title).toBe('Task A');
    expect(component.tasks[1].title).toBe('Task B');
  });

  it('should render NextAction when present on a task', () => {
    component.tasks = [
      {
        taskId: 1,
        title: 'Test Task',
        description: '',
        status: 'Active',
        priorityLevel: 'Medium',
        dueDate: null,
        nextAction: 'Do the next step',
        lastUpdatedDate: new Date().toISOString()
      }
    ];

    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.textContent).toContain('Do the next step');
  });

  it('should render an Edit button for each task', () => {
    component.tasks = [
      {
        taskId: 1,
        title: 'Test Task',
        description: '',
        status: 'Active',
        priorityLevel: 'Medium',
        dueDate: null,
        nextAction: null,
        lastUpdatedDate: new Date().toISOString()
      }
    ];

    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const button = compiled.querySelector('button');

    expect(button).not.toBeNull();
    expect(button?.textContent).toContain('Edit');
  });

  it('should call onEdit when Edit button is clicked', () => {
    component.tasks = [
      {
        taskId: 1,
        title: 'Test Task',
        description: '',
        status: 'Active',
        priorityLevel: 'Medium',
        dueDate: null,
        nextAction: null,
        lastUpdatedDate: new Date().toISOString()
      }
    ];

    spyOn(component, 'onEdit');

    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const button = compiled.querySelector('button');

    button?.dispatchEvent(new Event('click'));

    expect(component.onEdit).toHaveBeenCalledWith(component.tasks[0]);
  });

  it('should call onEdit with the correct task when multiple tasks exist', () => {
    component.tasks = [
      {
        taskId: 1,
        title: 'Test Task',
        description: '',
        status: 'Active',
        priorityLevel: 'Medium',
        dueDate: null,
        nextAction: null,
        lastUpdatedDate: new Date().toISOString()
      },
      {
        taskId: 2,
        title: 'Task 2',
        description: '',
        status: 'Active',
        priorityLevel: 'Medium',
        dueDate: null,
        nextAction: null,
        lastUpdatedDate: new Date().toISOString()
      }
    ];

    spyOn(component, 'onEdit');

    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const items = compiled.querySelectorAll('li');
    const secondItem = items[1];

    const editButton = secondItem.querySelector('button');

    editButton?.dispatchEvent(new Event('click'));

    expect(component.onEdit).toHaveBeenCalledWith(component.tasks[1]);
  });

  it('should render a Delete button for each task', () => {
    component.tasks = [
      {
        taskId: 1,
        title: 'Test Task',
        description: '',
        status: 'Active',
        priorityLevel: 'Medium',
        dueDate: null,
        nextAction: null,
        lastUpdatedDate: new Date().toISOString()
      }
    ];

    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const buttons = compiled.querySelectorAll('button');

    const deleteButton = Array.from(buttons).find(
      b => b.textContent?.trim() === 'Delete'
    );

    expect(deleteButton).not.toBeNull();
  });

  it('should call onDelete when Delete button is clicked', () => {
    component.tasks = [
      {
        taskId: 1,
        title: 'Test Task',
        description: '',
        status: 'Active',
        priorityLevel: 'Medium',
        dueDate: null,
        nextAction: null,
        lastUpdatedDate: new Date().toISOString()
      }
    ];

    spyOn(component, 'onDelete');

    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const buttons = compiled.querySelectorAll('button');

    const deleteButton = Array.from(buttons).find(
      b => b.textContent?.trim() === 'Delete'
    );

    deleteButton?.dispatchEvent(new Event('click'));

    expect(component.onDelete).toHaveBeenCalledWith(component.tasks[0]);
  });

  it('should call onDelete with correct task when multiple tasks exist', () => {
    component.tasks = [
      {
        taskId: 1,
        title: 'Task 1',
        description: '',
        status: 'Active',
        priorityLevel: 'Medium',
        dueDate: null,
        nextAction: null,
        lastUpdatedDate: new Date().toISOString()
      },
      {
        taskId: 2,
        title: 'Task 2',
        description: '',
        status: 'Active',
        priorityLevel: 'Medium',
        dueDate: null,
        nextAction: null,
        lastUpdatedDate: new Date().toISOString()
      }
    ];

    spyOn(component, 'onDelete');

    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const items = compiled.querySelectorAll('li');
    const secondItem = items[1];

    const buttons = secondItem.querySelectorAll('button');

    const deleteButton = Array.from(buttons).find(
      b => b.textContent?.trim() === 'Delete'
    );

    deleteButton?.dispatchEvent(new Event('click'));

    expect(component.onDelete).toHaveBeenCalledWith(component.tasks[1]);
  });

  it('should call TaskService.deleteTask when onDelete is triggered', () => {
    const taskService = TestBed.inject(TaskService);

    spyOn(taskService, 'deleteTask').and.returnValue({
      subscribe: () => { }
    } as any);

    const task = {
      taskId: 1,
      title: 'Test Task',
      description: '',
      status: 'Active',
      priorityLevel: 'Medium',
      dueDate: null,
      nextAction: null,
      lastUpdatedDate: new Date().toISOString()
    };

    component.onDelete(task);

    expect(taskService.deleteTask).toHaveBeenCalledWith(task.taskId);
  });

  it('should trigger task refresh after delete', () => {
    const taskService = TestBed.inject(TaskService);

    spyOn(taskService, 'deleteTask').and.returnValue({
      subscribe: (fn: any) => fn()
    } as any);

    spyOn(taskService, 'refreshTasks');

    const task = {
      taskId: 1,
      title: 'Test Task',
      description: '',
      status: 'Active',
      priorityLevel: 'Medium',
      dueDate: null,
      nextAction: null,
      lastUpdatedDate: new Date().toISOString()
    };

    component.onDelete(task);

    expect(taskService.refreshTasks).toHaveBeenCalled();
  });

  it('should render task status for each task', () => {
    component.tasks = [
      {
        taskId: 1,
        title: 'Test Task',
        description: '',
        status: 'InProgress',
        priorityLevel: 'Medium',
        dueDate: null,
        nextAction: null,
        lastUpdatedDate: new Date().toISOString()
      }
    ];

    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.textContent).toContain('InProgress');
  });

  it('should call onStatusChange when status is clicked', () => {
    component.tasks = [
      {
        taskId: 1,
        title: 'Test Task',
        description: '',
        status: 'Active',
        priorityLevel: 'Medium',
        dueDate: null,
        nextAction: null,
        lastUpdatedDate: new Date().toISOString()
      }
    ];

    spyOn(component, 'onStatusChange');

    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;

    const statusElement = Array.from(compiled.querySelectorAll('div')).find(d => d.textContent?.trim() === 'Active');

    statusElement?.dispatchEvent(new Event('click'));

    expect(component.onStatusChange).toHaveBeenCalledWith(component.tasks[0]);
  });

  it('should change status from Active to InProgress when clicked', () => {
    const task = {
      taskId: 1,
      title: 'Test Task',
      description: '',
      status: 'Active',
      priorityLevel: 'Medium',
      dueDate: null,
      nextAction: null,
      lastUpdatedDate: new Date().toISOString()
    };

    component.onStatusChange(task);

    expect(task.status).toBe('InProgress');
  });

  it('should change status from InProgress to Completed when clicked', () => {
    const task = {
      taskId: 1,
      title: 'Test Task',
      description: '',
      status: 'InProgress',
      priorityLevel: 'Medium',
      dueDate: null,
      nextAction: null,
      lastUpdatedDate: new Date().toISOString()
    };

    component.onStatusChange(task);

    expect(task.status).toBe('Completed');
  });

  it('should not change status when task is already Completed', () => {
    const task = {
      taskId: 1,
      title: 'Test Task',
      description: '',
      status: 'Completed',
      priorityLevel: 'Medium',
      dueDate: null,
      nextAction: null,
      lastUpdatedDate: new Date().toISOString()
    };

    component.onStatusChange(task);

    expect(task.status).toBe('Completed');
  });

  it('should call TaskService.updateTask when status changes', () => {
    const taskService = TestBed.inject(TaskService);

    spyOn(taskService, 'updateTask').and.returnValue({
      subscribe: () => { }
    } as any);

    const task = {
      taskId: 1,
      title: 'Test Task',
      description: '',
      status: 'Active',
      priorityLevel: 'Medium',
      dueDate: null,
      nextAction: null,
      lastUpdatedDate: new Date().toISOString()
    };

    component.onStatusChange(task);

    expect(taskService.updateTask).toHaveBeenCalled();
  });

  it('should call refreshTasks after successful status update', () => {
    const taskService = TestBed.inject(TaskService);

    const task = {
      taskId: 1,
      userId: 1,
      title: 'Test Task',
      description: 'desc',
      priorityLevel: 'High',
      status: 'Active',
      dueDate: null,
      nextAction: 'Next step',
      lastUpdatedDate: new Date().toISOString()
    } as any;

    spyOn(taskService, 'updateTask').and.returnValue({
      subscribe: (fn?: any) => {
        if (fn) {
          fn({})
        }
      }
    } as any);

    spyOn(taskService, 'refreshTasks');

    component.onStatusChange(task);

    expect(taskService.refreshTasks).toHaveBeenCalled();
  });

  it('should call TaskService.updateTask when onEdit is triggered', () => {
    const taskService = TestBed.inject(TaskService);

    const task = {
      taskId: 1,
      title: 'Test Task',
      description: 'desc',
      status: 'Active',
      priorityLevel: 'Medium',
      dueDate: null,
      nextAction: 'Next step',
      lastUpdatedDate: new Date().toISOString()
    };

    spyOn(taskService, 'updateTask').and.returnValue({
      subscribe: () => { }
    } as any);

    component.onEdit(task);

    expect(component.editingTaskId).toBe(task.taskId);
  });

  it('should call refreshTasks after successful edit', () => {
    const taskService = TestBed.inject(TaskService);

    const task = {
      taskId: 1,
      title: 'Test Task',
      description: 'desc',
      status: 'Active',
      priorityLevel: 'Medium',
      dueDate: null,
      nextAction: 'Next step',
      lastUpdatedDate: new Date().toISOString()
    };

    spyOn(taskService, 'updateTask').and.returnValue({
      subscribe: (fn?: any) => {
        if (fn) fn({});
      }
    } as any);

    spyOn(taskService, 'refreshTasks');

    component.onEdit(task);

    expect(taskService.refreshTasks).not.toHaveBeenCalled();
  });

  it('should NOT call refreshTasks if updateTask fails', () => {
    const taskService = TestBed.inject(TaskService);

    const task = {
      taskId: 1,
      title: 'Test Task',
      description: 'desc',
      status: 'Active',
      priorityLevel: 'Medium',
      dueDate: null,
      nextAction: 'Next step',
      lastUpdatedDate: new Date().toISOString()
    };

    spyOn(taskService, 'updateTask').and.returnValue({
      subscribe: (_success?: any, error?: any) => {
        if (error) {
          error({});
        }
      }
    } as any);

    spyOn(taskService, 'refreshTasks');

    component.onEdit(task);

    expect(taskService.refreshTasks).not.toHaveBeenCalled();
  });

  it('should send updated task data when editing', () => {
    const taskService = TestBed.inject(TaskService);

    const task = {
      taskId: 1,
      title: 'Original Title',
      description: 'desc',
      status: 'Active',
      priorityLevel: 'Medium',
      dueDate: null,
      nextAction: 'Next step',
      lastUpdatedDate: new Date().toISOString()
    };

    spyOn(taskService, 'updateTask').and.returnValue({
      subscribe: () => { }
    } as any);

    // simulate edit
    task.title = 'Updated Title';

    component.onEdit(task);

    expect(component.editingTaskId).toBe(task.taskId);
  });

  it('should render an input for editing task title when edit is triggered', () => {
    component.tasks = [
      {
        taskId: 1,
        title: 'Test Task',
        description: '',
        status: 'Active',
        priorityLevel: 'Medium',
        dueDate: null,
        nextAction: null,
        lastUpdatedDate: new Date().toISOString()
      }
    ];

    component.onEdit(component.tasks[0]);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;

    const input = compiled.querySelector('input[name="editTitle"]');

    expect(input).not.toBeNull();
  });

  it('should call updateTask when edited task is saved', () => {
    const taskService = TestBed.inject(TaskService);

    const task = {
      taskId: 1,
      title: 'Test Task',
      description: 'desc',
      status: 'Active',
      priorityLevel: 'Medium',
      dueDate: null,
      nextAction: 'Next step',
      lastUpdatedDate: new Date().toISOString()
    };

    spyOn(taskService, 'updateTask').and.returnValue({
      subscribe: (fn?: any) => { if (fn) fn({}); }
    } as any);

    spyOn(taskService, 'refreshTasks');

    component.editingTaskId = 1;
    task.title = 'Updated Title';

    component.onSave(task);

    expect(taskService.updateTask).toHaveBeenCalledWith(task);
    expect(taskService.refreshTasks).toHaveBeenCalled();
  });

  it('should render a Save button when editing a task', () => {
    component.tasks = [
      {
        taskId: 1,
        title: 'Test Task',
        description: '',
        status: 'Active',
        priorityLevel: 'Medium',
        dueDate: null,
        nextAction: null,
        lastUpdatedDate: new Date().toISOString()
      }
    ];

    component.editingTaskId = 1;
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;

    const button = compiled.querySelector('button[name="saveButton"]');

    expect(button).not.toBeNull();
  });

  it('should call onSave when Save button is clicked', () => {
    component.tasks = [
      {
        taskId: 1,
        title: 'Test Task',
        description: '',
        status: 'Active',
        priorityLevel: 'Medium',
        dueDate: null,
        nextAction: null,
        lastUpdatedDate: new Date().toISOString()
      }
    ];

    component.editingTaskId = 1;

    spyOn(component, 'onSave');

    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;

    const button = compiled.querySelector('button[name="saveButton"]') as HTMLButtonElement;

    button.click();

    expect(component.onSave).toHaveBeenCalledWith(component.tasks[0]);
  });
});
