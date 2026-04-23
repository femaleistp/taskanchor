import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { AuthService } from '../services/auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [HttpClientTestingModule, FormsModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render a Login heading', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Login');
  });

  it('should render an email input', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const emailInput = compiled.querySelector('input[type="email"]');
    expect(emailInput).not.toBeNull();
  });

  it('should render a password input', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const passwordInput = compiled.querySelector('input[type="password"]');
    expect(passwordInput).not.toBeNull();
  });

  it('should render a submit button', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const button = compiled.querySelector('button[type="submit"]');
    expect(button).not.toBeNull();
  });

  it('should render a form element', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const form = compiled.querySelector('form');
    expect(form).not.toBeNull();
  });

  it('should call onSubmit when form is submitted', () => {
    spyOn(component, 'onSubmit');

    const form = fixture.nativeElement.querySelector('form');
    form.dispatchEvent(new Event('submit'));

    expect(component.onSubmit).toHaveBeenCalled();
  });

  it('should render an email input with name attribute', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const emailInput = compiled.querySelector('input[type="email"]');
    expect(emailInput?.getAttribute('name')).toBe('email');
  });

  it('should render an email input with name attribute', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const emailInput = compiled.querySelector('input[type="password"]');
    expect(emailInput?.getAttribute('name')).toBe('password');
  });

  it('should read email and password values on submit', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const emailInput = compiled.querySelector('input[name="email"]') as HTMLInputElement;
    const passwordInput = compiled.querySelector('input[name="password"]') as HTMLInputElement;

    emailInput.value = 'test@example.com';
    emailInput.dispatchEvent(new Event('input'));

    passwordInput.value = 'password123';
    passwordInput.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    spyOn(component, 'onSubmit').and.callThrough();

    const form = compiled.querySelector('form');
    form?.dispatchEvent(new Event('submit'));

    expect(component.email).toBe('test@example.com');
    expect(component.password).toBe('password123');
  });

  it('should call AuthService.login on submit', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    const emailInput = compiled.querySelector('input[name="email"]') as HTMLInputElement;
    const passwordInput = compiled.querySelector('input[name="password"]') as HTMLInputElement;

    emailInput.value = 'test@example.com';
    emailInput.dispatchEvent(new Event('input'));

    passwordInput.value = 'password123';
    passwordInput.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    const authService = TestBed.inject(AuthService);
    spyOn(authService, 'login').and.returnValue({ subscribe: () => { } } as any);

    const form = compiled.querySelector('form');
    form?.dispatchEvent(new Event('submit'));

    expect(authService.login).toHaveBeenCalledWith('test@example.com', 'password123');
  });

  it('should navigate to /tasks after successful login', () => {
    const authService = TestBed.inject(AuthService);
    spyOn(authService, 'login').and.returnValue({
      subscribe: (fn: any) => fn({})
    } as any);

    const router = TestBed.inject(Router);
    spyOn(router, 'navigate');

    const compiled = fixture.nativeElement as HTMLElement;
    const emailInput = compiled.querySelector('input[name="email"]') as HTMLInputElement;
    const passwordInput = compiled.querySelector('input[name="password"]') as HTMLInputElement;

    emailInput.value = 'test@example.com';
    passwordInput.value = 'password123';

    const form = compiled.querySelector('form');
    form?.dispatchEvent(new Event('submit'));

    expect(router.navigate).toHaveBeenCalledWith(['/tasks']);
  });

  it('should initialize email and password as empty strings', () => {
    expect(component.email).toBe('');
    expect(component.password).toBe('');
  });

  it('should login from component email and password without relying on document.querySelector', () => {
    const authService = TestBed.inject(AuthService);
    const router = TestBed.inject(Router);

    spyOn(document, 'querySelector').and.callFake(() => {
      throw new Error('document.querySelector should not be used here');
    });

    spyOn(authService, 'login').and.returnValue({
      subscribe: (fn: any) => fn({})
    } as any);

    spyOn(router, 'navigate');

    component.email = 'test@example.com';
    component.password = 'password123';

    component.onSubmit();

    expect(authService.login).toHaveBeenCalledWith('test@example.com', 'password123');
    expect(router.navigate).toHaveBeenCalledWith(['/tasks']);
  });
});
