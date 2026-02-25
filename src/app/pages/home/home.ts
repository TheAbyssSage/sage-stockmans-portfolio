// src/app/pages/home/home.ts

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  // Simple, static stats for the hero section
  // You can update these manually when you add more projects.
  projectCount = 8;
  languages: string[] = ['PHP', 'Laravel', 'Angular', 'TypeScript', 'JavaScript', 'MySQL'];
}
