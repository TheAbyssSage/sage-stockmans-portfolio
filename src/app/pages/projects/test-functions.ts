import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TestFunctionsService {
  constructor(private http: HttpClient) {}

  testGithubProjects(): Observable<any> {
    return this.http.get('/api/github-projects');
  }

  testFunction(): Observable<any> {
    return this.http.get('/api/test-github');
  }
}