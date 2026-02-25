// src/app/pages/projects/projects.component.ts

import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ProjectsService, ProjectEntry } from '../../pages/projects/projects.service';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [RouterModule, CommonModule, DatePipe, HttpClientModule],
  templateUrl: './projects.html',
  styleUrls: ['./projects.css'],
})
export class ProjectsComponent implements OnInit {
  projects: ProjectEntry[] = [];
  loading = true;
  error = '';
  viewMode: 'timeline' | 'grid' | 'list' = 'timeline';

  private isBrowser: boolean;

  constructor(
    private projectsService: ProjectsService,
    @Inject(PLATFORM_ID) platformId: object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
    console.log('[ProjectsComponent] isBrowser =', this.isBrowser);
  }

  ngOnInit(): void {
    this.loadViewMode();

    if (!this.isBrowser) {
      console.log('[ProjectsComponent] SSR init, skipping fetch');
      return;
    }

    console.log('[ProjectsComponent] Browser init, starting fetch');

    this.projectsService.getProjects().subscribe({
      next: (data) => {
        this.projects = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('[ProjectsComponent] Service error:', err);
        this.error = 'Could not load projects.';
        this.loading = false;
      }
    });
  }

  toggleViewMode(mode: 'timeline' | 'grid' | 'list'): void {
    this.viewMode = mode;
    if (this.isBrowser) {
      try {
        localStorage.setItem('projectsViewMode', mode);
      } catch {
        // ignore
      }
    }
  }

  private loadViewMode(): void {
    if (!this.isBrowser) return;
    try {
      const saved = localStorage.getItem('projectsViewMode');
      if (saved === 'timeline' || saved === 'grid' || saved === 'list') {
        this.viewMode = saved;
      }
    } catch {
      // ignore
    }
  }
}
``
