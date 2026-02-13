import { Component, OnInit } from '@angular/core';
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
  imports: [RouterModule, HttpClientModule, CommonModule, DatePipe],
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
    const url = `https://api.github.com/users/TheAbyssSage/repos?sort=updated`;

    this.http.get<GithubRepo[]>(url).subscribe({
      next: repos => {
        // Filter to only show “real” projects if you want:
        const filtered = repos.filter(repo => !repo.fork && !repo.archived);

        this.projects = filtered.map(repo => this.mapRepoToProject(repo));

        // newest first
        this.projects.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );

        this.loading = false;
      },
      error: () => {
        this.error = 'Could not load projects from GitHub.';
        this.loading = false;
      },
    });
  }

  private mapRepoToProject(repo: GithubRepo): ProjectEntry {
    const created = new Date(repo.created_at);
    const dateString = created.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    const mainLang = repo.language ?? 'Mixed stack';

    const topics = repo.topics && repo.topics.length > 0
      ? repo.topics
      : [];

    return {
      title: repo.name.replace(/-/g, ' '),
      description: repo.description ?? 'No description added yet.',
      date: repo.created_at,
      type: 'GitHub repository',
      stack: mainLang,
      focus: 'Learning by building & iterating',
      githubUrl: repo.html_url,
      liveUrl: repo.homepage || undefined,
      tags: [
        mainLang,
        ...topics.slice(0, 3), // limit number of chips
      ].filter(Boolean),
    };
  }
}
