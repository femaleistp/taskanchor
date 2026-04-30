import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import { AuthService } from '../services/auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      imports: [HttpClientTestingModule, FormsModule, RouterTestingModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render a Register heading', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Register');
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

  it('should render a password input with name attribute', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const passwordInput = compiled.querySelector('input[type="password"]');
    expect(passwordInput?.getAttribute('name')).toBe('password');
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

  it('should call AuthService.register on submit', () => {
    const authService = TestBed.inject(AuthService);
    spyOn(authService, 'register').and.returnValue({ subscribe: () => { } } as any);

    const compiled = fixture.nativeElement as HTMLElement;

    const emailInput = compiled.querySelector('input[name="email"]') as HTMLInputElement;
    const passwordInput = compiled.querySelector('input[name="password"]') as HTMLInputElement;

    emailInput.value = 'test@example.com';
    emailInput.dispatchEvent(new Event('input'));

    passwordInput.value = 'password123';
    passwordInput.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    const form = compiled.querySelector('form');
    form?.dispatchEvent(new Event('submit'));

    expect(authService.register).toHaveBeenCalledWith('test@example.com', 'password123');
  });

  it('should register from component email and password without relying on document.querySelector', () => {
    const authService = TestBed.inject(AuthService);

    spyOn(document, 'querySelector').and.callFake(() => {
      throw new Error('document.querySelector should not be used here');
    });

    spyOn(authService, 'register').and.returnValue({
      subscribe: () => { }
    } as any);

    component.email = 'test@example.com';
    component.password = 'password123';

    component.onSubmit();

    expect(authService.register).toHaveBeenCalledWith('test@example.com', 'password123');
  });

  it('should navigate to login after successful registration', () => {
    const authService = TestBed.inject(AuthService);
    spyOn(authService, 'register').and.returnValue(of('Registered'));

    const router = TestBed.inject(Router);
    spyOn(router, 'navigate');

    component.email = 'test@example.com';
    component.password = 'password123';

    component.onSubmit();

    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should render register form inside a register card container', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const registerCard = compiled.querySelector('.register-card');

    expect(registerCard).not.toBeNull();
  });

  it('should show a register error message when registration fails', () => {
    const authService = TestBed.inject(AuthService);

    spyOn(authService, 'register').and.returnValue({
      subscribe: (_success: any, error?: any) => {
        if (error) {
          error({ error: 'Email is already registered.' })
        }
      }
    } as any);

    component.email = 'test@example.com';
    component.password = 'password123';

    component.onSubmit();
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const errorMessage = compiled.querySelector('.register-error');

    expect(errorMessage).not.toBeNull();
    expect(errorMessage?.textContent).toContain('Email is already registered.');
  });

  it('should render a login link for users who already have an account', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const loginLink = compiled.querySelector('a[routerLink="/"]');

    expect(loginLink).not.toBeNull();
    expect(loginLink?.textContent).toContain('Login');
  });
});
