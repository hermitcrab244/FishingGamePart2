import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class BackendService {
  private apiUrl = 'http://localhost:3000';
  constructor(private http: HttpClient) {}

  registerUser(username: string, password: string) {
    return this.http.post(`${this.apiUrl}/register`, { username, password });
  }

  loginUser(username: string, password: string) {
    return this.http.post(`${this.apiUrl}/login`, { username, password });
  }

  saveResults(result: any) {
    return this.http.post(`${this.apiUrl}/results`, { result });
  }
}
