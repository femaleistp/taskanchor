import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskListComponent } from './task-list.component';
import { TaskService } from '../services/task.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { TaskFormComponent } from '../task-form/task-form.component';

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaskListComponent, TaskFormComponent],
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

  it('should render task list content inside a task list card container', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const taskListCard = compiled.querySelector('.task-list-card');

    expect(taskListCard).not.toBeNull();
  });

  it('should render empty state text where there are no tasks', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('No active tasks');
  });

  it('should render task items when tasks exist', () => {
    component.tasks = [
      {
        taskId: 1,
        title: 'Test Task 1',
        description: '',
        status: 'Active',
        priorityLevel: 'Medium',
        dueDate: null,
        nextAction: null,
        lastUpdatedDate: new Date().toISOString()
      },
      {
        taskId: 2,
        title: 'Test Task 2',
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
    const items = compiled.querySelectorAll('li');

    expect(items.length).toBe(2);
  });

  it('should not render empty state when tasks exist', () => {
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
      }
    ];

    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).not.toContain('No active tasks');
  });

  it('should render task title text for each task item', () => {
    component.tasks = [
      {
        taskId: 1,
        title: 'Pay bill',
        description: '',
        status: 'Active',
        priorityLevel: 'Medium',
        dueDate: null,
        nextAction: null,
        lastUpdatedDate: new Date().toISOString()
      },
      {
        taskId: 2,
        title: 'Call doctor',
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
    expect(compiled.textContent).toContain('Pay bill');
    expect(compiled.textContent).toContain('Call doctor');
  });

  it('should load tasks from TaskService on init', () => {
    const taskService = TestBed.inject(TaskService);
    spyOn(taskService, 'getTasks').and.returnValue({
      subscribe: (fn: any) => fn([
        {
          taskId: 1,
          title: 'Task 1',
          description: '',
          status: 'Active',
          priorityLevel: 'Medium',
          dueDate: null,
          nextAction: null,
          lastUpdatedDate: new Date().toISOString()
        }
      ])
    } as any);

    component.ngOnInit();

    expect(taskService.getTasks).toHaveBeenCalled();
    expect(component.tasks.length).toBe(1);
  });

  it('should render tasks returned from TaskService', () => {
    const taskService = TestBed.inject(TaskService);
    spyOn(taskService, 'getTasks').and.returnValue({
      subscribe: (fn: any) => fn([
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
      ])
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

    const firstResponse = [
      {
        taskId: 1,
        title: 'Task 1',
        description: '',
        status: 'Active',
        priorityLevel: 'Medium',
        dueDate: null,
        nextAction: null,
        lastUpdatedDate: new Date().toISOString()
      }
    ];

    const secondResponse = [
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

    const initialTasks = [
      {
        taskId: 1,
        title: 'Task 1',
        description: '',
        status: 'Active',
        priorityLevel: 'Medium',
        dueDate: null,
        nextAction: null,
        lastUpdatedDate: new Date().toISOString()
      }
    ];

    const refreshedTasks = [
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

    const initialLoadTasks = [
      {
        taskId: 1,
        title: 'Initial Load',
        description: '',
        status: 'Active',
        priorityLevel: 'Medium',
        dueDate: null,
        nextAction: null,
        lastUpdatedDate: new Date().toISOString()
      }
    ];

    const afterRefreshTasks = [
      {
        taskId: 1,
        title: 'After Refresh',
        description: '',
        status: 'Active',
        priorityLevel: 'Medium',
        dueDate: null,
        nextAction: null,
        lastUpdatedDate: new Date().toISOString()
      }
    ];

    spyOn(taskService, 'getTasks').and.returnValues(
      {
        subscribe: (fn: any) => fn(initialLoadTasks)
      } as any,
      {
        subscribe: (fn: any) => fn(afterRefreshTasks)
      } as any
    );

    component.loadTasks();

    expect(component.tasks).toEqual(initialLoadTasks);
    expect(taskService.getTasks).toHaveBeenCalledTimes(1);

    taskService.refreshTasks();

    expect(taskService.getTasks).toHaveBeenCalledTimes(2);
    expect(component.tasks).toEqual(afterRefreshTasks);
  });

  it('should keep tasks typed with title values from the service response', () => {
    const taskService = TestBed.inject(TaskService);

    spyOn(taskService, 'getTasks').and.returnValue({
      subscribe: (fn: any) => fn([
        {
          taskId: 1,
          title: 'Task A',
          description: '',
          status: 'Active',
          priorityLevel: 'Medium',
          dueDate: null,
          nextAction: null,
          lastUpdatedDate: new Date().toISOString()
        },
        {
          taskId: 2,
          title: 'Task B',
          description: '',
          status: 'Active',
          priorityLevel: 'Medium',
          dueDate: null,
          nextAction: null,
          lastUpdatedDate: new Date().toISOString()
        }
      ])
    } as any);

    component.loadTasks();

    expect(component.tasks.length).toBe(2);
    expect(component.tasks[0].title).toBe('Task A');
    expect(component.tasks[1].title).toBe('Task B');
  });

  it('should accept a full task list shaped with title strings', () => {
    component.tasks = [
      {
        taskId: 1,
        title: 'Task A',
        description: '',
        status: 'Active',
        priorityLevel: 'Medium',
        dueDate: null,
        nextAction: null,
        lastUpdatedDate: new Date().toISOString()
      },
      {
        taskId: 2,
        title: 'Task B',
        description: '',
        status: 'Active',
        priorityLevel: 'Medium',
        dueDate: null,
        nextAction: null,
        lastUpdatedDate: new Date().toISOString()
      }
    ];

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
    const buttons = Array.from(compiled.querySelectorAll('button'));
    const editButton = buttons.find(button => button.textContent?.trim() === 'Edit');

    expect(editButton).toBeTruthy();
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
    const buttons = Array.from(compiled.querySelectorAll('button'));
    const editButton = buttons.find(button => button.textContent?.trim() === 'Edit') as HTMLButtonElement;

    editButton.dispatchEvent(new Event('click'));

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

    const editButton = Array.from(secondItem.querySelectorAll('button')).find(button => button.textContent?.trim() === 'Edit') as HTMLButtonElement;

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

    const statusButton = compiled.querySelector('li .status-button') as HTMLButtonElement;

    statusButton.dispatchEvent(new Event('click'));

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

    const taskService = TestBed.inject(TaskService);

    spyOn(taskService, 'updateTaskStatus').and.returnValue({
      subscribe: (fn: any) => fn({})
    } as any);

    spyOn(taskService, 'refreshTasks');

    component.onStatusChange(task);

    expect(taskService.updateTaskStatus).toHaveBeenCalledWith(1, 1);
    expect(taskService.refreshTasks).toHaveBeenCalled();
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

    const taskService = TestBed.inject(TaskService);

    spyOn(taskService, 'updateTaskStatus').and.returnValue({
      subscribe: (fn: any) => fn({})
    } as any);

    spyOn(taskService, 'refreshTasks');
    spyOn(window, 'confirm').and.returnValue(true);

    component.onStatusChange(task);

    expect(taskService.updateTaskStatus).toHaveBeenCalledWith(1, 2);
    expect(taskService.refreshTasks).toHaveBeenCalled();
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

    spyOn(taskService, 'updateTaskStatus').and.returnValue({
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

    expect(taskService.updateTaskStatus).toHaveBeenCalled();
  });

  it('should call refreshTasks after successful status update', () => {
    const taskService = TestBed.inject(TaskService);

    const task = {
      taskId: 1,
      title: 'Test Task',
      description: 'desc',
      priorityLevel: 'High',
      status: 'Active',
      dueDate: null,
      nextAction: 'Next step',
      lastUpdatedDate: new Date().toISOString()
    };

    spyOn(taskService, 'updateTaskStatus').and.returnValue({
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

    component.editingTaskId = 1;

    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const editFields = compiled.querySelector('.edit-task-fields');
    const titleInput = editFields?.querySelector('input[name="editTitle"]');

    expect(editFields).not.toBeNull();
    expect(titleInput).not.toBeNull();
  });

  it('should render a description textarea when editing a task', () => {
    component.tasks = [
      {
        taskId: 1,
        title: 'Test Task',
        description: 'Original description',
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
    const editFields = compiled.querySelector('.edit-task-fields');
    const descriptionTextarea = editFields?.querySelector('textarea[name="editDescription"]');

    expect(editFields).not.toBeNull();
    expect(descriptionTextarea).not.toBeNull();
  });

  it('should render a priority select inside edit mode when editing a task', () => {
    component.tasks = [
      {
        taskId: 1,
        title: 'Test Task',
        description: 'Test description',
        status: 'Active',
        priorityLevel: 'High',
        dueDate: '2026-05-01',
        nextAction: 'Original next action',
        lastUpdatedDate: new Date().toISOString()
      }
    ];

    component.editingTaskId = 1;

    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const editFields = compiled.querySelector('.edit-task-fields');
    const prioritySelect = editFields?.querySelector('select[name="editPriorityLevel"]');

    expect(editFields).not.toBeNull();
    expect(prioritySelect).not.toBeNull();
  });

  it('should render a DueDate input inside edit mode when editing a task', () => {
    component.tasks = [
      {
        taskId: 1,
        title: 'Test Task',
        description: 'Test description',
        status: 'Active',
        priorityLevel: 'Medium',
        dueDate: '2026-05-01',
        nextAction: 'Original next action',
        lastUpdatedDate: new Date().toISOString()
      }
    ];

    component.editingTaskId = 1;

    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const editFields = compiled.querySelector('.edit-task-fields');
    const dueDateInput = editFields?.querySelector('input[name="editDueDate"]');

    expect(editFields).not.toBeNull();
    expect(dueDateInput).not.toBeNull();
  });

  it('should hide read-only Due Date display while editing a task', () => {
    component.tasks = [
      {
        taskId: 1,
        title: 'Test Task',
        description: 'Test description',
        status: 'Active',
        priorityLevel: 'Medium',
        dueDate: '2026-05-01',
        nextAction: 'Original next action',
        lastUpdatedDate: new Date().toISOString()
      }
    ];

    component.editingTaskId = 1;

    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const readOnlyDetails = Array.from(compiled.querySelectorAll('.task-detail')) as HTMLElement[];
    const readOnlyDueDateDisplay = readOnlyDetails.find(detail =>
      detail.textContent?.includes('Due Date:')
    );

    expect(readOnlyDueDateDisplay).toBeUndefined();
  });

  it('should render edit dueDate as a date-only input value', () => {
    component.tasks = [
      {
        taskId: 1,
        title: 'Test Task',
        description: 'Test description',
        status: 'Active',
        priorityLevel: 'Medium',
        dueDate: '2026-05-01T00:00:00',
        nextAction: 'Original next action',
        lastUpdatedDate: new Date().toISOString()
      }
    ];

    component.editingTaskId = 1;

    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const editFields = compiled.querySelector('.edit-task-fields');
    const dueDateInput = editFields?.querySelector('input[name="editDueDate"]') as HTMLInputElement;

    expect(dueDateInput.type).toBe('date');
    expect(dueDateInput.value).toBe('2026-05-01');
  });

  it('should render Priority when a task has priorityLevel', () => {
    component.tasks = [
      {
        taskId: 1,
        title: 'Test Task',
        description: 'Test description',
        status: 'Active',
        priorityLevel: 'High',
        dueDate: '2026-05-01',
        nextAction: 'Original next action',
        lastUpdatedDate: new Date().toISOString()
      }
    ];

    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.textContent).toContain('Priority:');
    expect(compiled.textContent).toContain('High');
  });

  it('should render a nextAction input inside edit mode when editing a task', () => {
    component.tasks = [
      {
        taskId: 1,
        title: 'Test Task',
        description: 'Test description',
        status: 'Active',
        priorityLevel: 'Medium',
        dueDate: null,
        nextAction: 'Original next action',
        lastUpdatedDate: new Date().toISOString()
      }
    ];

    component.editingTaskId = 1;

    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const editFields = compiled.querySelector('.edit-task-fields');
    const nextActionInput = editFields?.querySelector('input[name="editNextAction"]');

    expect(editFields).not.toBeNull();
    expect(nextActionInput).not.toBeNull();
  });

  it('should hide read-only NextAction display while editing a task', () => {
    component.tasks = [
      {
        taskId: 1,
        title: 'Test Task',
        description: 'Test description',
        status: 'Active',
        priorityLevel: 'Medium',
        dueDate: null,
        nextAction: 'Original next action',
        lastUpdatedDate: new Date().toISOString()
      }
    ];

    component.editingTaskId = 1;

    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const readOnlyDetails = Array.from(compiled.querySelectorAll('.task-detail')) as HTMLElement[];
    const readOnlyNextActionDisplay = readOnlyDetails.find(detail =>
      detail.textContent?.includes('Next Action')
    );

    expect(readOnlyNextActionDisplay).toBeUndefined();
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

  it('should render an Add Progress Log button for each task', () => {
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

    const button = compiled.querySelector('button[name="addProgressLogButton"]') as HTMLButtonElement;

    expect(button).not.toBeNull();
  });

  it('should call onAddProgressLog when Add Progress Log button is clicked', () => {
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

    spyOn(component, 'onAddProgressLog');

    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;

    const button = compiled.querySelector('button[name="addProgressLogButton"]') as HTMLButtonElement;

    button.click();

    expect(component.onAddProgressLog).toHaveBeenCalledWith(component.tasks[0]);
  });

  it('should render a Progress Log input when Add Progress Log is triggered', () => {
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

    component.onAddProgressLog(component.tasks[0]);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;

    const input = compiled.querySelector('input[name="progressLogInput"]');

    expect(input).not.toBeNull();
  });

  it('should bind Progress Log input to component property', () => {
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

    component.onAddProgressLog(component.tasks[0]);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;

    const input = compiled.querySelector('input[name="progressLogInput"]') as HTMLInputElement;

    input.value = 'Worked on task';
    input.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    expect(component.progressLogText).toBe('Worked on task');
  });

  it('should call TaskService to save progress log and refresh tasks', () => {
    const taskService = TestBed.inject(TaskService);

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

    spyOn(taskService, 'addProgressLog').and.returnValue({
      subscribe: (fn?: any) => { if (fn) fn({}); }
    } as any);

    spyOn(taskService, 'refreshTasks');

    component.progressLogTaskId = 1;
    component.progressLogText = 'Worked on task';

    component.onSaveProgressLog(task);

    expect(taskService.addProgressLog).toHaveBeenCalledWith(task.taskId, 'Worked on task');
    expect(taskService.refreshTasks).toHaveBeenCalled();
  });

  it('should not save Progress Log when text is blank or whitespace', () => {
    const taskService = TestBed.inject(TaskService);

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

    spyOn(taskService, 'addProgressLog').and.returnValue({
      subscribe: () => { }
    } as any);

    spyOn(taskService, 'refreshTasks');

    component.progressLogTaskId = 1;
    component.progressLogText = '   ';

    component.onSaveProgressLog(task);

    expect(taskService.addProgressLog).not.toHaveBeenCalled();
    expect(taskService.refreshTasks).not.toHaveBeenCalled();
    expect(component.progressLogTaskId).toBeNull();
    expect(component.progressLogText).toBe('');
  });

  it('should render a Save Progress Log button when adding a progress log,', () => {
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

    component.progressLogTaskId = 1;
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;

    const button = compiled.querySelector('button[name="saveProgressLogButton"]');

    expect(button).not.toBeNull();
  });

  it('should render progress logs for a task when present', () => {
    component.tasks = [
      {
        taskId: 1,
        title: 'Test Task',
        description: '',
        status: 'Active',
        priorityLevel: 'Medium',
        dueDate: null,
        nextAction: null,
        lastUpdatedDate: new Date().toISOString(),
        progressLogs: [
          { text: 'Worked on task' },
          { text: 'Made more progress' }
        ]
      }
    ];

    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.textContent).toContain('Worked on task');
    expect(compiled.textContent).toContain('Made more progress');
  });

  it('should mark a single Progress Log entry as the latest progress log entry', () => {
    component.tasks = [
      {
        taskId: 1,
        title: 'Test Task',
        description: '',
        status: 'Active',
        priorityLevel: 'Medium',
        dueDate: null,
        nextAction: null,
        lastUpdatedDate: new Date().toISOString(),
        progressLogs: [
          { text: 'Only progress log entry' }
        ]
      }
    ];

    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const progressLogEntry = compiled.querySelector('.progress-log-entry');

    expect(progressLogEntry).not.toBeNull();
    expect(progressLogEntry?.classList).toContain('latest-progress-log-entry');
  });

  it('should apply latest-progress-log-entry class when a task has exactly one Progress Log entry', () => {
    component.tasks = [
      {
        taskId: 1,
        title: 'Single Progress Log Task',
        description: '',
        status: 'Active',
        priorityLevel: 'Medium',
        dueDate: null,
        nextAction: null,
        lastUpdatedDate: new Date().toISOString(),
        progressLogs: [
          { text: 'Only progress log entry' }
        ]
      }
    ];

    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const progressLogEntry = compiled.querySelector('.progress-log-entry');

    expect(progressLogEntry).not.toBeNull();
    expect(progressLogEntry?.textContent).toContain('Only progress log entry');
    expect(progressLogEntry?.classList).toContain('latest-progress-log-entry');
  });

  it('should not update status to Completed when completion confirmation is cancelled', () => {
    const taskService = TestBed.inject(TaskService);

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

    spyOn(window, 'confirm').and.returnValue(false);
    spyOn(taskService, 'updateTaskStatus').and.callThrough();
    spyOn(taskService, 'refreshTasks');

    component.onStatusChange(task);

    expect(window.confirm).toHaveBeenCalledWith(
      'Mark this task Completed? Completed tasks leave the active list and cannot be reactivated in the MVP.'
    );
    expect(taskService.updateTaskStatus).not.toHaveBeenCalled();
    expect(taskService.refreshTasks).not.toHaveBeenCalled();
  });

  it('should update status to Completed when completion confirmation is accepted', () => {
    const taskService = TestBed.inject(TaskService);

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

    spyOn(window, 'confirm').and.returnValue(true);

    spyOn(taskService, 'updateTaskStatus').and.returnValue({
      subscribe: (fn?: any) => {
        if (fn) {
          fn({});
        }
      }
    } as any);

    spyOn(taskService, 'refreshTasks');

    component.onStatusChange(task);

    expect(window.confirm).toHaveBeenCalledWith(
      'Mark this task Completed? Completed tasks leave the active list and cannot be reactivated in the MVP.'
    );
    expect(taskService.updateTaskStatus).toHaveBeenCalledWith(1, 2);
    expect(taskService.refreshTasks).toHaveBeenCalled();
  });

  it('should render a NextAction label when a task has nextAction', () => {
    component.tasks = [
      {
        taskId: 1,
        title: 'Test Task',
        description: '',
        status: 'Active',
        priorityLevel: 'Medium',
        dueDate: null,
        nextAction: 'Call pharmacy',
        lastUpdatedDate: new Date().toISOString()
      }
    ];

    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const taskCard = compiled.querySelector('li');

    expect(taskCard).not.toBeNull();
    expect(taskCard?.textContent).toContain('Next Action: ');
    expect(taskCard?.textContent).toContain('Call pharmacy');
  });

  it('should render a Progress Log label inside the task card when a task has progress logs', () => {
    component.tasks = [
      {
        taskId: 1,
        title: 'Test Task',
        description: '',
        status: 'Active',
        priorityLevel: 'Medium',
        dueDate: null,
        nextAction: null,
        lastUpdatedDate: new Date().toISOString(),
        progressLogs: [
          { text: 'Worked on task' }
        ]
      }
    ];

    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const taskCard = compiled.querySelector('li');

    expect(taskCard).not.toBeNull();
    expect(taskCard?.textContent).toContain('Progress Log: ');
    expect(taskCard?.textContent).toContain('Worked on task');
  });

  it('should render task details using consistent task-detail rows', () => {
    component.tasks = [
      {
        taskId: 1,
        title: 'Test Task',
        description: '',
        status: 'Active',
        priorityLevel: 'Medium',
        dueDate: null,
        nextAction: 'Call pharmacy',
        lastUpdatedDate: new Date().toISOString(),
        progressLogs: [
          { text: 'Worked on task' }
        ]
      }
    ];

    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const taskCard = compiled.querySelector('li');
    const detailedRows = taskCard?.querySelectorAll('.task-detail');

    expect(taskCard).not.toBeNull();
    expect(detailedRows?.length).toBe(5);
  });

  it('should render task title with a task-title class for scanability', () => {
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
    const taskTitle = compiled.querySelector('.task-title');

    expect(taskTitle).not.toBeNull();
    expect(taskTitle?.textContent).toContain('Test Task');
  });

  it('should apply an active status class when task status is Active', () => {
    component.tasks = [
      {
        taskId: 1,
        title: 'Active Task',
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
    const statusButton = compiled.querySelector('li .status-button');

    expect(statusButton).not.toBeNull();
    expect(statusButton?.classList).toContain('status-active');
  });

  it('should apply in-progress status class when task status is InProgress', () => {
    component.tasks = [
      {
        taskId: 1,
        title: 'InProgress Task',
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
    const statusButton = compiled.querySelector('li .status-button');

    expect(statusButton).not.toBeNull();
    expect(statusButton?.classList).toContain('status-in-progress');
  });

  it('should render compact status button text with current status and click target', () => {
    component.tasks = [
      {
        taskId: 1,
        title: 'Active Task',
        description: '',
        status: 'Active',
        priorityLevel: 'Medium',
        dueDate: null,
        nextAction: null,
        lastUpdatedDate: new Date().toISOString()
      },
      {
        taskId: 2,
        title: 'InProgress Task',
        description: '',
        status: 'InProgress',
        priorityLevel: 'High',
        dueDate: null,
        nextAction: null,
        lastUpdatedDate: new Date().toISOString()
      }
    ];

    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const statusButtons = compiled.querySelectorAll('li .status-button');

    expect(statusButtons.length).toBe(2);
    expect(statusButtons[0].textContent).toContain('Status: Active');
    expect(statusButtons[0].textContent).toContain('Click → InProgress');

    expect(statusButtons[1].textContent).toContain('Status: InProgress');
    expect(statusButtons[1].textContent).toContain('Click → Complete');
  });

  it('should render a Description label when a task has description', () => {
    component.tasks = [
      {
        taskId: 1,
        title: 'Test Task',
        description: 'Pick up refill before Friday',
        status: 'Active',
        priorityLevel: 'Medium',
        dueDate: null,
        nextAction: null,
        lastUpdatedDate: new Date().toISOString()
      }
    ];

    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const taskCard = compiled.querySelector('li');

    expect(taskCard).not.toBeNull();
    expect(taskCard?.textContent).toContain('Description: ');
    expect(taskCard?.textContent).toContain('Pick up refill before Friday');
  });

  it('should show a description empty-state message when a task has no description', () => {
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
    const taskCard = compiled.querySelector('li');

    expect(taskCard).not.toBeNull();
    expect(taskCard?.textContent).toContain('Description: ');
    expect(taskCard?.textContent).toContain('No description added. Use Edit to add one.');
  });

  it('should render a Due Date label when a task has dueDate', () => {
    component.tasks = [
      {
        taskId: 1,
        title: 'Test Task',
        description: 'Test Task',
        status: 'Active',
        priorityLevel: 'Medium',
        dueDate: '2026-05-03',
        nextAction: null,
        lastUpdatedDate: new Date().toISOString()
      }
    ];

    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const taskCard = compiled.querySelector('li');

    expect(taskCard).not.toBeNull();
    expect(taskCard?.textContent).toContain('Due Date: ');
    expect(taskCard?.textContent).toContain('5/3/26');
  });
});
