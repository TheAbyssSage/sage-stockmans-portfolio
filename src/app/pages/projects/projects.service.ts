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
}

@Injectable({ providedIn: 'root' })
export class ProjectsService {
    private readonly username = 'TheAbyssSage';
    private projects$?: Observable<ProjectEntry[]>;

    constructor(private http: HttpClient) { }

    getProjects(): Observable<ProjectEntry[]> {
        // If already loaded, return cached observable
        if (this.projects$) {
            return this.projects$;
        }

        const url = `https://api.github.com/users/${this.username}/repos?sort=created&per_page=50`;

        this.projects$ = this.http.get<GithubRepo[]>(url).pipe(
            map(repos => {
                const filtered = repos.filter(repo => !repo.fork && !repo.archived);
                const basicProjects = filtered.map(repo =>
                    this.mapRepoToProject(repo, {})
                );
                // Sort newest by created_at
                basicProjects.sort(
                    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
                );
                return basicProjects;
            }),
            // If GitHub fails, return empty list so UI doesn't break
            catchError(() => of([])),
            // Cache the result for future subscribers
            shareReplay(1)
        );

        return this.projects$;
    }

    // Optional: method to enrich with languages later if you want
    // (you can add this once basic caching works)

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
        };
    }
}
