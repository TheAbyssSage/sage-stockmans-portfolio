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
        // Learning Health Platform
        {
            title: 'Learning Health Platform',
            description: 'A customized Laravel application for a health education platform with automatic invoice generation through Plug&Pay integration.',
            date: '2026-04-15',
            type: 'Educational Platform',
            stack: 'Laravel, PHP, MySQL, Bootstrap, Stripe, Plug&Pay API',
            focus: 'Full Stack, Payment Processing, API Integration',
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
            liveUrl: 'https://verhuizingen-uyttendaele.be/',
            tags: ['Laravel', 'PHP', 'Business', 'Forms']
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
            liveUrl: 'https://productionserver.be/Halo-Services/',
            tags: ['PHP', 'E-commerce', 'PDF', 'Stripe']
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
            // liveUrl: '#',
            tags: ['PHP', 'API', 'Dashboard', 'Reliability']
        },
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
        // The Illuminates Weather App
        {
            title: 'The Illuminates Weather App',
            description: "A weather app project developed for a school project with four unique themed experiences using the OpenWeatherMap API.",
            date: '2026-04-21',
            type: 'Educational',
            stack: 'JavaScript, HTML, CSS, Bootstrap, OpenWeatherMap API',
            focus: 'Frontend, API Integration, Responsive Design',
            githubUrl: 'https://github.com/TheAbyssSage/The-Illuminates-Weather-App.git',
            liveUrl: 'https://the-illuminates-weather-app.netlify.app/',
            tags: ['JavaScript', 'API', 'Bootstrap', 'Weather']
        },
        // Chinese Zodiac Finder
        {
            title: 'Chinese Zodiac Finder',
            description: "A simple, elegant web app to find your Chinese zodiac sign from a selected birth date with search functionality.",
            date: '2026-04-21',
            type: 'Utility',
            stack: 'JavaScript, HTML, CSS, Bootstrap',
            focus: 'Frontend, UI/UX',
            githubUrl: 'https://github.com/TheAbyssSage/zodiac-c.git',
            liveUrl: 'https://chinese-zodiac-s.netlify.app/',
            tags: ['JavaScript', 'Bootstrap', 'UI']
        },
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
