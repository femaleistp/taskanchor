import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent]
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
    passwordInput.value = 'password123';

    spyOn(component, 'onSubmit').and.callThrough();

    const form = compiled.querySelector('form');
    form?.dispatchEvent(new Event('submit'));

    expect(component.email).toBe('test@example.com');
    expect(component.password).toBe('password123');
  });
});
