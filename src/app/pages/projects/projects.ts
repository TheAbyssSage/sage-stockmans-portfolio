import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http'; // <-- no HttpClientModule here
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
  imports: [RouterModule, CommonModule, DatePipe], // <-- remove HttpClientModule
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
    const url = `https://api.github.com/users/TheAbyssSage/repos?sort=updated&per_page=50`;

    this.http.get<GithubRepo[]>(url).subscribe({
      next: repos => {
        const filtered = repos.filter(repo => !repo.fork && !repo.archived);

        // Show projects immediately with basic data
        this.projects = filtered.map(repo =>
          this.mapRepoToProject(repo, {})
        );

        this.projects.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );

        this.loading = false;

        // Load languages in the background
        filtered.forEach((repo, index) => {
          this.http.get<Record<string, number>>(
            `https://api.github.com/repos/TheAbyssSage/${repo.name}/languages`
          ).subscribe({
            next: languagesMap => {
              this.projects[index] = this.mapRepoToProject(repo, languagesMap);
            }
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
    const created = new Date(repo.created_at);

    const allLanguages = Object.keys(languagesMap);
    const mainLang = allLanguages[0] ?? repo.language ?? 'Mixed stack';

    const topics = repo.topics && repo.topics.length > 0 ? repo.topics : [];

    return {
      title: repo.name.replace(/-/g, ' '),
      description: repo.description ?? 'No description added yet.',
      date: repo.created_at, // still ISO string for | date pipe
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
