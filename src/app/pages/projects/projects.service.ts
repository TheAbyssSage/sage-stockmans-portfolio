// src/app/services/projects.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, shareReplay, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

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

export interface ProjectEntry {
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
    lastUpdated: string;
    size: number;
    primaryLanguage: string;
}

@Injectable({ providedIn: 'root' })
export class ProjectsService {
    private readonly username = 'TheAbyssSage';
    private projects$?: Observable<ProjectEntry[]>;

    constructor(private http: HttpClient) { }

    getProjects(): Observable<ProjectEntry[]> {
        if (this.projects$) {
            return this.projects$;
        }

        const url = `https://api.github.com/users/${this.username}/repos?sort=created&per_page=50`;

        this.projects$ = this.http.get<GithubRepo[]>(url).pipe(
            map(repos => {
                const filtered = repos.filter(repo => !repo.fork && !repo.archived);

                return filtered.map(repo => this.mapRepoToProject(repo));
            }),
            catchError(() => of([])), // Return empty array on error
            shareReplay(1)
        );

        return this.projects$;
    }

    private mapRepoToProject(repo: GithubRepo): ProjectEntry {
        const topics = repo.topics && repo.topics.length > 0 ? repo.topics : [];
        const mainLang = repo.language ?? 'Mixed stack';

        return {
            title: repo.name.replace(/-/g, ' '),
            description: repo.description ?? 'No description added yet.',
            date: repo.created_at,
            type: 'GitHub repository',
            stack: mainLang,
            focus: 'Learning by building & iterating',
            githubUrl: repo.html_url,
            liveUrl: repo.homepage || undefined,
            tags: [...topics.slice(0, 3)].filter(Boolean),
            stars: repo.stargazers_count,
            lastUpdated: repo.pushed_at,
            size: repo.size,
            primaryLanguage: mainLang,
        };
    }
}
