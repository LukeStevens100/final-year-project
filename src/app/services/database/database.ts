import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private apiUrl = 'http://localhost:3000/api/users';

  constructor(private http: HttpClient) {}

  // Create user
  createUser(userData: any): Observable<any> {
    return this.http.post(this.apiUrl, userData);
  }

  // Read users
  getUser(loginData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, loginData);
  }
}