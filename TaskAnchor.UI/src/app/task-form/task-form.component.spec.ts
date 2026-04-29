import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskFormComponent } from './task-form.component';
import { TaskService } from '../services/task.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { TaskListComponent } from '../task-list/task-list.component';

describe('TaskFormComponent', () => {
  let component: TaskFormComponent;
  let fixture: ComponentFixture<TaskFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaskFormComponent, TaskListComponent],
      imports: [HttpClientTestingModule, FormsModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TaskFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render a Create task heading', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Create Task');
  });

  it('should render a form element', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const form = compiled.querySelector('form');
    expect(form).not.toBeNull();
  });

  it('should render a title input', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const input = compiled.querySelector('input[name="title"]');
    expect(input).not.toBeNull();
  });

  it('should render a submit button', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const button = compiled.querySelector('button[type="submit"]');
    expect(button).not.toBeNull();
  });

  it('should call onSubmit when form is submitted', () => {
    spyOn(component, 'onSubmit');

    const form = fixture.nativeElement.querySelector('form');
    form?.dispatchEvent(new Event('submit'));

    expect(component.onSubmit).toHaveBeenCalled();
  });

  it('should read title value on submit', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    const input = compiled.querySelector('input[name="title"]') as HTMLInputElement;
    input.value = 'New Task';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    spyOn(component, 'onSubmit').and.callThrough();

    const form = compiled.querySelector('form');
    form?.dispatchEvent(new Event('submit'));

    expect(component['title']).toBe('New Task');
  });

  it('should call TaskService.createTask on submit', () => {
    const taskService = TestBed.inject(TaskService);
    spyOn(taskService, 'createTask').and.returnValue({
      subscribe: () => { }
    } as any);

    const compiled = fixture.nativeElement as HTMLElement;
    const input = compiled.querySelector('input[name="title"]') as HTMLInputElement;
    input.value = 'New Task';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    const form = compiled.querySelector('form');
    form?.dispatchEvent(new Event('submit'));

    expect(taskService.createTask).toHaveBeenCalledWith({ title: 'New Task', priorityLevel: 1, dueDate: null, nextAction: '' });
  });

  it('should clear title after successful task creation', () => {
    const taskService = TestBed.inject(TaskService);
    spyOn(taskService, 'createTask').and.returnValue({
      subscribe: (fn: any) => fn({})
    } as any);

    const compiled = fixture.nativeElement as HTMLElement;
    const input = compiled.querySelector('input[name="title"]') as HTMLInputElement;
    input.value = 'New Task';

    const form = compiled.querySelector('form');
    form?.dispatchEvent(new Event('submit'));

    expect(component.title).toBe('');
  });

  it('should call refreshTasks and not call getTasks after successful task creation', () => {
    const taskService = TestBed.inject(TaskService);

    spyOn(taskService, 'createTask').and.returnValue({
      subscribe: (fn: any) => fn({})
    } as any);

    spyOn(taskService, 'refreshTasks');
    spyOn(taskService, 'getTasks').and.returnValue({
      subscribe: () => { }
    } as any);

    const compiled = fixture.nativeElement as HTMLElement;
    const input = compiled.querySelector('input[name="title"]') as HTMLInputElement;
    input.value = 'New Task';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    const form = compiled.querySelector('form');
    form?.dispatchEvent(new Event('submit'));

    expect(taskService.createTask).toHaveBeenCalledWith({ title: 'New Task', priorityLevel: 1, dueDate: null, nextAction: '' });
    expect(taskService.refreshTasks).toHaveBeenCalled();
    expect(taskService.getTasks).not.toHaveBeenCalled();
  });

  it('should create a task from component title without relying on document.querySelector', () => {
    const taskService = TestBed.inject(TaskService);

    spyOn(document, 'querySelector').and.callFake(() => {
      throw new Error('document.querySelector should not be used here');
    });

    spyOn(taskService, 'createTask').and.returnValue({
      subscribe: (fn: any) => fn({})
    } as any);

    spyOn(taskService, 'refreshTasks');

    component.title = 'New Task';

    component.onSubmit();

    expect(taskService.createTask).toHaveBeenCalledWith({ title: 'New Task', priorityLevel: 1, dueDate: null, nextAction: '' });
    expect(taskService.refreshTasks).toHaveBeenCalled();
    expect(component.title).toBe('');
  });

  it('should render a NextAction input field', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    const input = compiled.querySelector('input[name="nextAction"]');

    expect(input).not.toBeNull();
  });

  it('should bind NextAction input to component property', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    const input = compiled.querySelector('input[name="nextAction"]') as HTMLInputElement;

    input.value = 'Test next step';
    input.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    expect(component.nextAction).toBe('Test next step');
  });

  it('should include nextAction when creating a task', () => {
    const taskService = TestBed.inject(TaskService);

    spyOn(taskService, 'createTask').and.returnValue({
      subscribe: () => { }
    } as any);

    component.title = 'Test Task';
    component.nextAction = 'Do something next';

    component.onSubmit();

    expect(taskService.createTask).toHaveBeenCalledWith(
      jasmine.objectContaining({
        title: 'Test Task',
        nextAction: 'Do something next'
      })
    );
  });

  it('should render a DueDate input field', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    const input = compiled.querySelector('input[name="dueDate"]');

    expect(input).not.toBeNull();
  });

  it('should bind DueDate input to component property', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    const input = compiled.querySelector('input[name="dueDate"]') as HTMLInputElement;

    input.value = '2026-04-30';
    input.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    expect(component.dueDate).toBe('2026-04-30');
  });
  it('should include dueDate when creating a task', () => {
    const taskService = TestBed.inject(TaskService);

    spyOn(taskService, 'createTask').and.returnValue({
      subscribe: () => { }
    } as any);

    component.title = 'Test Task';
    component.dueDate = '2026-04-30';
    component.nextAction = 'Next step';

    component.onSubmit();

    expect(taskService.createTask).toHaveBeenCalledWith(
      jasmine.objectContaining({
        title: 'Test Task',
        dueDate: '2026-04-30',
        nextAction: 'Next step'
      })
    );
  });

  it('should render a PriorityLevel select input', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    const select = compiled.querySelector('select[name="priorityLevel"]');

    expect(select).not.toBeNull();
  });

  it('should bind PriorityLevel select to component property', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    const select = compiled.querySelector('select[name="priorityLevel"]') as HTMLInputElement;

    select.value = "High";
    select.dispatchEvent(new Event('change'));

    fixture.detectChanges();

    expect(component.priorityLevel).toBe('High');
  });

  it('should include priorityLevel when creating a task', () => {
    const taskService = TestBed.inject(TaskService);

    spyOn(taskService, 'createTask').and.returnValue({
      subscribe: () => { }
    } as any);

    component.title = 'Test Task';
    component.priorityLevel = 'High';
    component.dueDate = '2026-04-30';
    component.nextAction = 'Next step';

    component.onSubmit();

    expect(taskService.createTask).toHaveBeenCalledWith(
      jasmine.objectContaining({
        title: 'Test Task',
        priorityLevel: 2,
        dueDate: '2026-04-30',
        nextAction: 'Next step'
      })
    );
  });

  it('should render create task form inside a task form card container', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const taskFormCard = compiled.querySelector('.task-form-card');

    expect(taskFormCard).not.toBeNull();
  });
});
