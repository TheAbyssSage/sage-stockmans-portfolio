// src/app/pages/projects/projects.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { ProjectsCacheService } from '../../services/projects-cache.service';

export interface ProjectEntry {
    title: string;
    description: string;
    date: string;
    type: 'project' | 'experiment';
    stack: string[];
    focus: string[];
    githubUrl: string;
    liveUrl?: string | null;
    tags: string[];
    stars: number;
    lastUpdated: string;
    size: number;
    primaryLanguage: string | null;
}

// Static backup list used when GitHub / function is down
const FALLBACK_PROJECTS: ProjectEntry[] = [
    {
        title: 'sage-stockmans-portfolio',
        description:
            "My new portfolio! You're probably viewing it right now. Angular + custom Petrichor theme.",
        date: '2026-03-09',
        type: 'project',
        stack: ['Angular', 'TypeScript', 'Bootstrap-ish'],
        focus: ['Portfolio', 'Frontend', 'SSR', 'Netlify'],
        githubUrl: 'https://github.com/TheAbyssSage/sage-stockmans-portfolio',
        liveUrl: 'https://sage-stockmans.netlify.app/',
        tags: ['Angular', 'TypeScript', 'Portfolio'],
        stars: 0,
        lastUpdated: '2026-03-09',
        size: 0,
        primaryLanguage: 'TypeScript',
    },
    {
        title: 'Halo-Services',
        description: 'PHP practice repo with various service-style exercises.',
        date: '2026-03-03',
        type: 'project',
        stack: ['PHP'],
        focus: ['Backend', 'APIs'],
        githubUrl: 'https://github.com/TheAbyssSage/Halo-Services',
        liveUrl: null,
        tags: ['PHP'],
        stars: 0,
        lastUpdated: '2026-03-03',
        size: 0,
        primaryLanguage: 'PHP',
    },
    {
        title: 'sagetimecapsule',
        description:
            'Digital time capsule in PHP: stores messages to be opened in the future.',
        date: '2026-02-03',
        type: 'project',
        stack: ['PHP', 'MySQL'],
        focus: ['Backend', 'Forms'],
        githubUrl: 'https://github.com/TheAbyssSage/sagetimecapsule',
        liveUrl: null,
        tags: ['PHP', 'MySQL', 'Time capsule'],
        stars: 0,
        lastUpdated: '2026-02-03',
        size: 0,
        primaryLanguage: 'PHP',
    },
    {
        title: 'dompdf',
        description: 'Experiments with HTML-to-PDF generation and QR codes in PHP.',
        date: '2026-02-09',
        type: 'experiment',
        stack: ['PHP'],
        focus: ['PDF', 'QR codes'],
        githubUrl: 'https://github.com/TheAbyssSage/dompdf',
        liveUrl: null,
        tags: ['PHP', 'PDF', 'QR'],
        stars: 0,
        lastUpdated: '2026-02-09',
        size: 0,
        primaryLanguage: 'PHP',
    },
    {
        title: 'iss-piss',
        description:
            'Fun project using ISS data to show how full their “piss container” is, with an AI twist.',
        date: '2026-02-13',
        type: 'experiment',
        stack: ['PHP'],
        focus: ['APIs', 'Data viz'],
        githubUrl: 'https://github.com/TheAbyssSage/iss-piss',
        liveUrl: null,
        tags: ['PHP', 'API'],
        stars: 0,
        lastUpdated: '2026-02-13',
        size: 0,
        primaryLanguage: 'PHP',
    },
    {
        title: 'upload-file',
        description:
            'Exercise in uploading, validating, and handling files/images in PHP.',
        date: '2026-02-04',
        type: 'experiment',
        stack: ['PHP'],
        focus: ['File upload', 'Validation'],
        githubUrl: 'https://github.com/TheAbyssSage/upload-file',
        liveUrl: null,
        tags: ['PHP', 'Uploads'],
        stars: 0,
        lastUpdated: '2026-02-04',
        size: 0,
        primaryLanguage: 'PHP',
    },
    {
        title: 'blauwevolgel-sage',
        description:
            'Email template for a travel agency using PHPMailer and custom HTML/CSS.',
        date: '2026-02-09',
        type: 'experiment',
        stack: ['PHP'],
        focus: ['Email', 'Templates'],
        githubUrl: 'https://github.com/TheAbyssSage/blauwevolgel-sage',
        liveUrl: null,
        tags: ['PHP', 'Email'],
        stars: 0,
        lastUpdated: '2026-02-09',
        size: 0,
        primaryLanguage: 'PHP',
    },
    {
        title: 'Memory-game',
        description: 'A simple JavaScript memory game.',
        date: '2025-12-12',
        type: 'experiment',
        stack: ['JavaScript'],
        focus: ['Game', 'Frontend'],
        githubUrl: 'https://github.com/TheAbyssSage/Memory-game',
        liveUrl: null,
        tags: ['JavaScript', 'Game'],
        stars: 0,
        lastUpdated: '2025-12-12',
        size: 0,
        primaryLanguage: 'JavaScript',
    },
    {
        title: 'The-Illuminates-Weather-App',
        description:
            'Group project using a weather API to present surfer‑style context around the data.',
        date: '2025-11-21',
        type: 'project',
        stack: ['HTML', 'JavaScript'],
        focus: ['API', 'Frontend'],
        githubUrl: 'https://github.com/TheAbyssSage/The-Illuminates-Weather-App',
        liveUrl: null,
        tags: ['Weather', 'API', 'JavaScript'],
        stars: 0,
        lastUpdated: '2025-11-21',
        size: 0,
        primaryLanguage: 'HTML',
    },
];

@Injectable({ providedIn: 'root' })
export class ProjectsService {
    constructor(
        private http: HttpClient,
        private cacheService: ProjectsCacheService
    ) { }

    getProjects(): Observable<ProjectEntry[]> {
        // First check if we have cached data that's still valid
        const cached = this.cacheService.get();
        if (cached) {
            console.log('Returning cached projects');
            // Map cached data to ProjectEntry objects
            const mapped = this.mapReposToEntries(cached);
            return of(mapped.length > 0 ? mapped : FALLBACK_PROJECTS);
        }

        // Use proxy to avoid CORS issues in development
        const apiUrl = '/api/github-projects';
        
        console.log('Fetching projects from:', apiUrl);
        return this.http
            .get<any[]>(apiUrl)
            .pipe(
                map(repos => {
                    console.log('GitHub API Response:', repos);
                    // Ensure we have an array
                    const repoArray = Array.isArray(repos) ? repos : [];
                    const mapped = this.mapReposToEntries(repoArray);
                    return mapped.length > 0 ? mapped : FALLBACK_PROJECTS;
                }),
                tap(projects => {
                    // Only cache if we didn't fall back to the static list
                    if (projects !== FALLBACK_PROJECTS) {
                        // We need to cache the raw GitHub API response data
                        // But we don't have access to it here, so we'll cache the processed data
                        // and convert it back to the GitHub format when retrieving from cache
                        this.cacheService.set(projects.map(project => ({
                            name: project.title,
                            description: project.description,
                            created_at: project.date,
                            updated_at: project.lastUpdated,
                            html_url: project.githubUrl,
                            homepage: project.liveUrl,
                            language: project.primaryLanguage,
                            stargazers_count: project.stars,
                            size: project.size,
                            fork: false,
                            archived: false
                        })));
                    }
                }),
                catchError((error) => {
                    console.error('Error fetching projects:', error);
                    return of(FALLBACK_PROJECTS);
                })
            );
    }

    refreshProjects(): Observable<ProjectEntry[]> {
        // Clear cache and fetch fresh data
        this.cacheService.clear();
        
        // Use proxy to avoid CORS issues in development
        const apiUrl = '/api/github-projects';
        
        console.log('Refreshing projects from:', apiUrl);
        return this.http
            .get<any[]>(apiUrl)
            .pipe(
                map(repos => {
                    console.log('GitHub API Refresh Response:', repos);
                    // Ensure we have an array
                    const repoArray = Array.isArray(repos) ? repos : [];
                    const mapped = this.mapReposToEntries(repoArray);
                    return mapped.length > 0 ? mapped : FALLBACK_PROJECTS;
                }),
                tap(projects => {
                    // Only cache if we didn't fall back to the static list
                    if (projects !== FALLBACK_PROJECTS) {
                        // Cache the processed data converted back to GitHub format
                        this.cacheService.set(projects.map(project => ({
                            name: project.title,
                            description: project.description,
                            created_at: project.date,
                            updated_at: project.lastUpdated,
                            html_url: project.githubUrl,
                            homepage: project.liveUrl,
                            language: project.primaryLanguage,
                            stargazers_count: project.stars,
                            size: project.size,
                            fork: false,
                            archived: false
                        })));
                    }
                }),
                catchError((error) => {
                    console.error('Error refreshing projects:', error);
                    return of(FALLBACK_PROJECTS);
                })
            );
    }

    private mapReposToEntries(repos: any[]): ProjectEntry[] {
        if (!Array.isArray(repos)) {
            return [];
        }

        return repos
            .filter(repo => !repo.fork && !repo.archived)
            .map<ProjectEntry>(repo => {
                const createdAt: string = repo.created_at || '';
                const updatedAt: string = repo.updated_at || '';
                const homepage: string | null = repo.homepage || null;
                const primaryLanguage = repo.language || null;

                const inferredType: 'project' | 'experiment' =
                    repo.size && repo.size > 200 ? 'project' : 'experiment';

                const stack: string[] = [];
                const focus: string[] = [];
                const baseTags: string[] = [];

                if (primaryLanguage) {
                    baseTags.push(primaryLanguage);
                }
                if (primaryLanguage === 'PHP' || /laravel/i.test(repo.description || '')) {
                    stack.push('PHP', 'Laravel');
                    focus.push('Backend', 'APIs');
                }
                if (primaryLanguage === 'TypeScript' || primaryLanguage === 'JavaScript') {
                    stack.push('Angular/TS', 'Frontend');
                    focus.push('UI & UX');
                }
                if (stack.length === 0 && primaryLanguage) {
                    stack.push(primaryLanguage);
                }

                const tags = Array.from(new Set([...baseTags, ...stack, ...focus]));

                return {
                    title: repo.name || 'Untitled project',
                    description:
                        repo.description ||
                        'Project description coming soon. Built as part of my learning log.',
                    date: createdAt,
                    type: inferredType,
                    stack,
                    focus,
                    githubUrl: repo.html_url,
                    liveUrl: homepage && homepage.trim() !== '' ? homepage : null,
                    tags,
                    stars:
                        typeof repo.stargazers_count === 'number' ? repo.stargazers_count : 0,
                    lastUpdated: updatedAt,
                    size: typeof repo.size === 'number' ? repo.size : 0,
                    primaryLanguage,
                };
            })
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }
}
