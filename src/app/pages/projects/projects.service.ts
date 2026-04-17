// src/app/pages/projects/projects.service.ts

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface ProjectEntry {
    title: string;
    description: string;
    date: string;
    type: string;
    stack: string;
    focus: string;
    githubUrl?: string;
    liveUrl?: string;
    tags: string[];
}

@Injectable({ providedIn: 'root' })
export class ProjectsService {
    private projects: ProjectEntry[] = [
        // Portfolio Project
        {
            title: 'Sage Stockmans Portfolio',
            description: "My new portfolio! You're probably viewing it right now. Angular + custom Petrichor theme.",
            date: '2026-03-09',
            type: 'Portfolio',
            stack: 'Angular, TypeScript, HTML, CSS',
            focus: 'Frontend, UI/UX, SSR',
            githubUrl: 'https://github.com/TheAbyssSage/sage-stockmans-portfolio',
            liveUrl: 'https://sage-stockmans.netlify.app/',
            tags: ['Angular', 'TypeScript', 'Portfolio', 'SSR']
        },
        // Learning Health Platform
        {
            title: 'Learning Health Platform',
            description: 'A customized Laravel application for a health education platform with automatic invoice generation through Plug&Pay integration.',
            date: '2026-04-15',
            type: 'Educational Platform',
            stack: 'Laravel, PHP, MySQL, Bootstrap, Stripe, Plug&Pay API',
            focus: 'Full Stack, Payment Processing, API Integration',
            githubUrl: '#',
            liveUrl: '#',
            tags: ['Laravel', 'PHP', 'Education', 'Payments', 'API']
        },
        // Verhuisfirma Uyttendaele Website
        {
            title: 'Verhuisfirma Uyttendaele Website',
            description: 'Official website for a Belgian moving company with quote request forms and service information.',
            date: '2026-04-10',
            type: 'Business Website',
            stack: 'Laravel, PHP, MySQL, Bootstrap',
            focus: 'Business, Forms, Accessibility',
            githubUrl: '#',
            liveUrl: 'https://verhuizingen-uyttendaele.be/',
            tags: ['Laravel', 'PHP', 'Business', 'Forms']
        },
        // ISS Pee Telemetry Dashboard
        {
            title: 'ISS Pee Telemetry Dashboard',
            description: 'A PHP-based web application for monitoring the International Space Station\'s waste water tank status in real-time.',
            date: '2026-02-13',
            type: 'Dashboard',
            stack: 'PHP, Bootstrap',
            focus: 'API Integration, Reliability, Error Handling',
            githubUrl: 'https://github.com/TheAbyssSage/iss-piss',
            liveUrl: '#',
            tags: ['PHP', 'API', 'Dashboard', 'Reliability']
        },
        // Hex & Halo Certificate Generator
        {
            title: 'Hex & Halo Certificate Generator',
            description: 'A whimsical PHP web application for generating personalized certificates with celestial themes and QR codes.',
            date: '2026-01-25',
            type: 'E-commerce',
            stack: 'PHP, Dompdf, Stripe API, QR Code Library',
            focus: 'PDF Generation, Payment Processing, E-commerce',
            githubUrl: 'https://github.com/TheAbyssSage/halo',
            tags: ['PHP', 'E-commerce', 'PDF', 'Stripe']
        },
        // Project without GitHub reference
        {
            title: 'Internal Company Dashboard',
            description: 'A custom internal dashboard built for a local business to track inventory and sales metrics.',
            date: '2026-03-20',
            type: 'Internal Tool',
            stack: 'React, Node.js, MongoDB',
            focus: 'Data Visualization, Internal Tools',
            liveUrl: '#',
            tags: ['React', 'Node.js', 'MongoDB', 'Dashboard']
        }
    ];

    getProjects(): Observable<ProjectEntry[]> {
        // Return the static list of projects
        return of(this.projects);
    }

    refreshProjects(): Observable<ProjectEntry[]> {
        // For static projects, refresh is the same as get
        return this.getProjects();
    }
}
