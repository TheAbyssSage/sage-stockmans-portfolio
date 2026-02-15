// src/app/pages/projects/projects.ts

import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
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
}

interface ProjectEntry {
  title: string;
  description: string;
  date: string;
  type: string;
  stack: string;
  focus: string;
  githubUrl: string;
  liveUrl?: string;
  tags: string[];
}

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

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.loadProjectsFromGithub();
  }

  private loadProjectsFromGithub(): void {
    const username = 'TheAbyssSage';
    const url = `https://api.github.com/users/${username}/repos?sort=created&per_page=50`;

    this.http.get<GithubRepo[]>(url).subscribe({
      next: repos => {
        const filtered = repos.filter(repo => !repo.fork && !repo.archived);

        // Show projects immediately with basic data (created date based)
        this.projects = filtered.map(repo =>
          this.mapRepoToProject(repo, {})
        );

        // Newest by created_at first
        this.projects.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );

        this.loading = false;

        // Enrich projects with full language set in the background
        filtered.forEach(repo => {
          this.http
            .get<Record<string, number>>(
              `https://api.github.com/repos/${username}/${repo.name}/languages`
            )
            .subscribe({
              next: languagesMap => {
                // Find the matching project by GitHub URL (more robust than index)
                const index = this.projects.findIndex(
                  p => p.githubUrl === repo.html_url
                );
                if (index !== -1) {
                  this.projects[index] = this.mapRepoToProject(
                    repo,
                    languagesMap
                  );
                }
              },
            });
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
      // Use created_at so | date and sorting are based on creation time
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
    };
  }
}
