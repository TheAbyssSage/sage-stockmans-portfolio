// src/app/pages/projects/projects.ts

import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule, DatePipe } from '@angular/common';

interface GithubRepo {
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  created_at: string;
  pushed_at: string;
  language: string | null;
  fork: boolean;
  archived: boolean;
  topics?: string[];
  stargazers_count: number;
  size: number;
}

interface ProjectEntry {
  title: string;
  description: string;
  date: string; // created_at ISO
  type: string;
  stack: string;
  focus: string;
  githubUrl: string;
  liveUrl?: string;
  tags: string[];
  stars: number;
  lastUpdated: string; // pushed_at ISO
  size: number; // in KB
  primaryLanguage: string;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [RouterModule, HttpClientModule, CommonModule, DatePipe],
  templateUrl: './projects.html',
  styleUrls: ['./projects.css'],
})
export class ProjectsComponent implements OnInit {
  projects: ProjectEntry[] = [];
  loading = true;
  error = '';
  viewMode: 'timeline' | 'grid' | 'list' = 'timeline';

  private readonly username = 'TheAbyssSage';
  private isBrowser: boolean;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) platformId: object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.loadViewMode();
  }

  ngOnInit(): void {
    this.loadProjectsFromGithub();
  }

  toggleViewMode(mode: 'timeline' | 'grid' | 'list'): void {
    this.viewMode = mode;
    if (this.isBrowser) {
      localStorage.setItem('projectsViewMode', mode);
    }
  }

  private loadViewMode(): void {
    if (!this.isBrowser) return;

    const saved = localStorage.getItem('projectsViewMode');
    if (saved === 'timeline' || saved === 'grid' || saved === 'list') {
      this.viewMode = saved;
    }
  }

  private loadProjectsFromGithub(): void {
    const url = `https://api.github.com/users/${this.username}/repos?sort=created&per_page=50`;

    this.http.get<GithubRepo[]>(url).subscribe({
      next: repos => {
        const filtered = repos.filter(repo => !repo.fork && !repo.archived);

        // 1) Show projects immediately using only basic repo data
        let basicProjects = filtered.map(repo =>
          this.mapRepoToProject(repo, {})
        );

        // 2) Sort by creation date: newest first
        basicProjects = basicProjects.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );

        this.projects = basicProjects;
        this.loading = false;

        // 3) Enrich with full languages in the background
        const languageRequests = filtered.map(repo =>
          this.http.get<Record<string, number>>(
            `https://api.github.com/repos/${this.username}/${repo.name}/languages`
          )
        );

        Promise.all(
          languageRequests.map(req =>
            req
              .toPromise()
              .catch(() => ({} as Record<string, number>)) // ignore per-repo language errors
          )
        ).then(languageResults => {
          // Map again with languages
          const enrichedProjects = filtered.map((repo, index) =>
            this.mapRepoToProject(repo, languageResults[index] || {})
          );

          // Sort again by created_at so order stays consistent
          this.projects = enrichedProjects.sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
          );
        });
      },
      error: () => {
        this.error = 'Could not load projects from GitHub.';
        this.loading = false;
      },
    });
  }

  private mapRepoToProject(
    repo: GithubRepo,
    languagesMap: Record<string, number>
  ): ProjectEntry {
    const allLanguages = Object.keys(languagesMap);
    const mainLang = allLanguages[0] ?? repo.language ?? 'Mixed stack';
    const topics = repo.topics && repo.topics.length > 0 ? repo.topics : [];

    return {
      title: repo.name.replace(/-/g, ' '),
      description: repo.description ?? 'No description added yet.',
      date: repo.created_at,
      type: 'GitHub repository',
      stack: allLanguages.length > 0 ? allLanguages.join(' · ') : mainLang,
      focus: 'Learning by building & iterating',
      githubUrl: repo.html_url,
      liveUrl: repo.homepage || undefined,
      tags: [
        ...allLanguages.slice(0, 3),
        ...topics.slice(0, 3),
      ].filter(Boolean),
      stars: repo.stargazers_count,
      lastUpdated: repo.pushed_at,
      size: repo.size,
      primaryLanguage: mainLang,
    };
  }
}
