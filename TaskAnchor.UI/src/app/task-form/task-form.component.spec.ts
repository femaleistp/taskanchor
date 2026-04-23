import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskFormComponent } from './task-form.component';
import { TaskService } from '../services/task.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';

describe('TaskFormComponent', () => {
  let component: TaskFormComponent;
  let fixture: ComponentFixture<TaskFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaskFormComponent],
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

    expect(taskService.createTask).toHaveBeenCalledWith({ title: 'New Task' });
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

    expect(taskService.createTask).toHaveBeenCalledWith({ title: 'New Task' });
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

    expect(taskService.createTask).toHaveBeenCalledWith({ title: 'New Task' });
    expect(taskService.refreshTasks).toHaveBeenCalled();
    expect(component.title).toBe('');
  });
});
