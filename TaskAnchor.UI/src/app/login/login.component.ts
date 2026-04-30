import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = '';
  password = '';
  loginError: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  onSubmit(): void {
    this.loginError = '';

    this.authService.login(this.email, this.password).subscribe(
      () => {
      this.router.navigate(['/tasks']);
      },
      () => {
        this.loginError = 'Login failed. Please check your email and password.'
      }
    );
  }
}
