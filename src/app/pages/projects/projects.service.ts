// src/app/pages/projects/projects.service.ts

import { Injectable, PLATFORM_ID, Inject, TransferState, makeStateKey } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, shareReplay, catchError, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

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
    date: string;
    type: string;
    stack: string;
    focus: string;
    githubUrl: string;
    liveUrl?: string;
    tags: string[];
}

const PROJECTS_KEY = makeStateKey<ProjectEntry[]>('projects');

@Injectable({ providedIn: 'root' })
export class ProjectsService {
    private projects$?: Observable<ProjectEntry[]>;

    constructor(
        private http: HttpClient,
        private transferState: TransferState,
        @Inject(PLATFORM_ID) private platformId: object
    ) { }

    getProjects(): Observable<ProjectEntry[]> {
        // Browser: use state transferred from SSR if available
        if (isPlatformBrowser(this.platformId) && this.transferState.hasKey(PROJECTS_KEY)) {
            const cached = this.transferState.get(PROJECTS_KEY, []);
            this.transferState.remove(PROJECTS_KEY);
            this.projects$ = of(cached).pipe(shareReplay(1));
            return this.projects$;
        }

        if (this.projects$) {
            return this.projects$;
        }

        const url = '/api/github-projects'; // Netlify function endpoint

        this.projects$ = this.http.get<GithubRepo[]>(url).pipe(
            map(repos => {
                const filtered = repos.filter(r => !r.fork && !r.archived);
                const basicProjects = filtered.map(repo => this.mapRepoToProject(repo));
                basicProjects.sort(
                    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
                );
                return basicProjects;
            }),
            tap(projects => {
                if (!isPlatformBrowser(this.platformId)) {
                    this.transferState.set(PROJECTS_KEY, projects);
                }
            }),
            catchError(() => of([])),
            shareReplay(1)
        );

        return this.projects$;
    }

    refreshProjects(): Observable<ProjectEntry[]> {
        this.projects$ = undefined;
        return this.getProjects();
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
            tags: [
                ...(repo.language ? [repo.language] : []),
                ...topics.slice(0, 3),
            ].filter(Boolean),
        };
    }
}
