import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent {
  email: string = '';
  password: string = '';
  registerError: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  onSubmit(): void {
    this.registerError = '';

    if (!this.email.trim() || !this.password.trim()) {
      this.registerError = 'Email and password are required.';
      return;
    }

    this.authService.register(this.email, this.password).subscribe(
      () => {
        this.router.navigate(['/']);
      },
      (error) => {
        this.registerError =
          typeof error?.error === 'string'
            ? error.error
            : 'Registration failed. Please try again.';
      }
    );
  }
}
