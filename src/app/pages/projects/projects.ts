// src/app/pages/projects/projects.ts

import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, DatePipe, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProjectsService, ProjectEntry } from '../../pages/projects/projects.service';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [RouterModule, CommonModule, DatePipe],
  templateUrl: './projects.html',
  styleUrls: ['./projects.css'],
})
export class ProjectsComponent implements OnInit {
  projects: ProjectEntry[] = [];
  loading = true;
  error = '';
  viewMode: 'timeline' | 'grid' | 'list' = 'timeline';

  private autoRefreshAttempts = 0;
  private readonly maxAutoRefreshAttempts = 3;
  private readonly autoRefreshDelayMs = 2000;
  private readonly isBrowser: boolean;

  constructor(
    private projectsService: ProjectsService,
    @Inject(PLATFORM_ID) platformId: object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    this.loadViewMode();
    this.loadProjects();
  }

  private loadProjects(isRefresh = false): void {
    this.loading = true;
    if (!isRefresh) {
      this.error = '';
    }

    const source$ = isRefresh
      ? this.projectsService.refreshProjects()
      : this.projectsService.getProjects();

    source$.subscribe({
      next: projects => {
        this.projects = projects;
        this.loading = false;

        if (projects.length === 0 && this.autoRefreshAttempts < this.maxAutoRefreshAttempts) {
          this.autoRefreshAttempts++;
          setTimeout(() => {
            this.loadProjects(true);
          }, this.autoRefreshDelayMs);
        } else if (projects.length === 0 && this.autoRefreshAttempts >= this.maxAutoRefreshAttempts) {
          this.error = 'No projects found on GitHub right now.';
        }
      },
      error: () => {
        this.error = 'Could not load projects from GitHub.';
        this.loading = false;
      },
    });
  }

  toggleViewMode(mode: 'timeline' | 'grid' | 'list'): void {
    this.viewMode = mode;

    // Only touch localStorage in the browser
    if (this.isBrowser) {
      localStorage.setItem('projectsViewMode', mode);
    }
  }

  private loadViewMode(): void {
    // Skip entirely during SSR
    if (!this.isBrowser) {
      return;
    }

    const saved = localStorage.getItem('projectsViewMode');
    if (saved === 'timeline' || saved === 'grid' || saved === 'list') {
      this.viewMode = saved;
    }
  }
}
