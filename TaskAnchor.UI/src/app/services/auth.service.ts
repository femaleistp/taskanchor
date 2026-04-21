import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  register(email: string, password: string): Observable<any> {
    return this.http.post('/api/auth/register', { email, password });
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post('/api/auth/login', { email, password });
  }
}
