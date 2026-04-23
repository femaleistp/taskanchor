import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService) { }

  onSubmit(): void {
    this.authService.register(this.email, this.password).subscribe();
  }
}
