import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})

export class RegisterComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService) { }

  onSubmit(): void {
    const emailInput = document.querySelector('input[name="email"]') as HTMLInputElement;
    const passwordInput = document.querySelector('input[name="password"]') as HTMLInputElement;

    this.email = emailInput.value;
    this.password = passwordInput.value;

    this.authService.register(this.email, this.password).subscribe();
  }
}
