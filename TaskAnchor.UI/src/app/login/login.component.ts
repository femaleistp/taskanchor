import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = 'string';
  password = 'string';

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  onSubmit(): void {
    const emailInput = document.querySelector('input[name="email"]') as HTMLInputElement;
    const passwordInput = document.querySelector('input[name="password"]') as HTMLInputElement;

    this.email = emailInput.value;
    this.password = passwordInput.value;

    this.authService.login(this.email, this.password).subscribe(() => {
      this.router.navigate(['/tasks']);
    });
  }
}
