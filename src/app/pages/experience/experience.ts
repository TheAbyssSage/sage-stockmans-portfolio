// src/app/pages/experience/experience.ts

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

type ExperienceTrack = 'work' | 'education' | 'ai';

interface ExperienceEntry {
  title: string;
  organization: string;
  location?: string;
  track: ExperienceTrack;
  start: string;   // ISO or "YYYY-MM" for ordering
  end?: string;    // undefined = ongoing
  periodLabel: string;
  summary: string;
  details?: string;
  tags: string[];
}

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './experience.html',
  styleUrls: ['./experience.css'],
})
export class ExperienceComponent {
  // Three columns / tracks
  tracks: ExperienceTrack[] = ['work', 'education', 'ai'];

  // All experience entries (from LinkedIn + CV + AI classes)
  entries: ExperienceEntry[] = [
    // WORK
    {
      title: 'Cashier / Student worker',
      organization: 'Brico',
      location: 'Hasselt, Belgium',
      track: 'work',
      start: '2025-08',
      end: '2025-09',
      periodLabel: 'Aug 2025 – Sep 2025',
      summary: 'Cashier and floor support in a DIY store.',
      details:
        'Stocked shelves, maintained displays, processed transactions, and assisted customers in a busy retail environment.',
      tags: ['Customer service', 'Retail', 'Cashier'],
    },
    {
      title: 'Bartender & Server',
      organization: 'Versus',
      location: 'Hasselt, Belgium',
      track: 'work',
      start: '2025-04',
      end: '2025-06',
      periodLabel: 'Apr 2025 – Jun 2025',
      summary: 'Bartender and server in a high-volume club.',
      details:
        'Mixed drinks, handled orders, and solved on-the-spot issues while keeping service friendly and efficient.',
      tags: ['Hospitality', 'Fast-paced', 'Customer service'],
    },
    {
      title: 'Production assistant',
      organization: 'Studio Pieter Stockmans',
      location: 'Genk, Belgium',
      track: 'work',
      start: '2025-01',
      end: '2025-01',
      periodLabel: 'Jan 2025',
      summary: 'Hands-on work in porcelain production and presentation.',
      details:
        'Helped with creation, decoration, and display of porcelain pieces, seeing the full process from material to finished work.',
      tags: ['Art & design', 'Production', 'Detail oriented'],
    },
    {
      title: 'Actor / Technician',
      organization: 'Old Tucson Company',
      location: 'Tucson, Arizona, USA',
      track: 'work',
      start: '2022-10',
      end: '2024-12',
      periodLabel: 'Oct 2022 – Dec 2024',
      summary:
        'Environmental actor and technician in a themed event park.',
      details:
        'Played in-world characters to bring locations to life and operated lights and sound to support shows and events.',
      tags: ['Performance', 'Technical ops', 'Teamwork'],
    },
    {
      title: 'Seasonal mover',
      organization: 'Uyttendaele Europese Verhuizingen',
      location: 'Aarschot, Belgium',
      track: 'work',
      start: '2019-07',
      end: '2019-08',
      periodLabel: 'Summer 2019',
      summary:
        'Loaded and unloaded trucks, moved goods safely, and worked as part of a logistics team.',
      tags: ['Teamwork', 'Physical work', 'Logistics'],
    },

    // EDUCATION
    {
      title: 'Full Stack Developer (Diploma)',
      organization: 'SyntraPXL',
      location: 'Hasselt, Belgium',
      track: 'education',
      start: '2025-09',
      end: '2026-06',
      periodLabel: '2025.09 – 2026 (ongoing)',
      summary:
        'Full stack development program focused on backend, frontend, and software craftsmanship.',
      details:
        'Coursework includes OO programming, REST APIs, PHP (OOP), Laravel, Node.js, security, frontend (Angular/JS), and Agile workflows.',
      tags: ['Full stack', 'PHP/Laravel', 'Angular', 'REST APIs', 'MySQL', 'Database design', 'TypeScript'],
    },
    {
      title: 'Dutch - KU-Leuven',
      organization: 'Lauven Language Institute · Leuven, Belgium',
      track: 'education',
      start: '2025-02',
      end: '2025-06',
      periodLabel: '2025.02 – 2025.06',
      summary:
        'High level Dutch language course to improve communication skills in a professional context.',
      tags: ['Dutch language', 'Communication skills'],
    },
    {
      title: 'Marana High School',
      organization: 'Marana High School',
      location: 'Arizona, USA',
      track: 'education',
      start: '2019-08',
      end: '2022-05',
      periodLabel: '2019 – 2022',
      summary: 'Completed secondary education in Arizona.',
      tags: ['English', 'General education'],
    },
    

    // AI / EXTRA
    {
      title: 'AI agents – build your own assistant',
      organization: 'SyntraPXL',
      track: 'ai',
      start: '2025-01',
      end: '2025-06',
      periodLabel: '2025 (extra module)',
      summary:
        'Practical course on building and orchestrating AI agents for real tasks.',
      details:
        'Learned how to design AI workflows, connect tools/APIs, and think critically about reliability, bias, and failure modes.',
      tags: ['AI/Agentic workflows', 'Tooling', 'Orchestration'],
    },
    {
      title: 'Responsible AI usage & prompts',
      organization: 'Self-study & workshops',
      track: 'ai',
      start: '2024-09',
      end: undefined,
      periodLabel: '2024 – now',
      summary:
        'Ongoing self-study on using AI responsibly in development.',
      details:
        'Use AI to explore ideas, refactor code, and prototype, but always review, test, and keep responsibility for the final result.',
      tags: ['Prompt design', 'Code review', 'Reliability'],
    },
  ];

  getEntriesForTrack(track: ExperienceTrack): ExperienceEntry[] {
    return this.entries
      .filter(e => e.track === track)
      .sort(
        (a, b) =>
          new Date(b.start).getTime() - new Date(a.start).getTime()
      );
  }
}
