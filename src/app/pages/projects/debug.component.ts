import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestFunctionsService } from './test-functions';

@Component({
  selector: 'app-debug-functions',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="debug-panel">
      <h3>Function Debug Panel</h3>
      <button (click)="testGithubProjects()" [disabled]="testing">Test GitHub Projects</button>
      <button (click)="testGenericFunction()" [disabled]="testing">Test Generic Function</button>
      
      <div *ngIf="testing">Testing...</div>
      
      <div *ngIf="result">
        <h4>Result:</h4>
        <pre>{{ result | json }}</pre>
      </div>
      
      <div *ngIf="error">
        <h4>Error:</h4>
        <pre>{{ error | json }}</pre>
      </div>
    </div>
  `,
  styles: [`
    .debug-panel {
      padding: 20px;
      border: 1px solid #ccc;
      margin: 20px 0;
      background-color: #f9f9f9;
    }
    button {
      margin: 5px;
      padding: 10px 15px;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    button:disabled {
      background-color: #cccccc;
      cursor: not-allowed;
    }
    pre {
      background-color: #f0f0f0;
      padding: 10px;
      border-radius: 4px;
      overflow-x: auto;
    }
  `]
})
export class DebugFunctionsComponent implements OnInit {
  testing = false;
  result: any = null;
  error: any = null;

  constructor(private testService: TestFunctionsService) {}

  ngOnInit() {}

  testGithubProjects() {
    this.testing = true;
    this.result = null;
    this.error = null;
    
    this.testService.testGithubProjects().subscribe({
      next: (data) => {
        this.testing = false;
        this.result = data;
      },
      error: (err) => {
        this.testing = false;
        this.error = err;
      }
    });
  }

  testGenericFunction() {
    this.testing = true;
    this.result = null;
    this.error = null;
    
    this.testService.testFunction().subscribe({
      next: (data) => {
        this.testing = false;
        this.result = data;
      },
      error: (err) => {
        this.testing = false;
        this.error = err;
      }
    });
  }
}