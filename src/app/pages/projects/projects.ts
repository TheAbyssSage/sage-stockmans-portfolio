// src/app/pages/projects/projects.ts

import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, DatePipe, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProjectsService, ProjectEntry } from '../../pages/projects/projects.service';

type UiLang = 'en' | 'nl';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [RouterModule, CommonModule, DatePipe],
  templateUrl: './projects.html',
  styleUrls: ['./projects.css'],
})
export class ProjectsComponent implements OnInit {
  projects: ProjectEntry[] = [];
  loading = false;
  error = '';
  viewMode: 'timeline' | 'grid' | 'list' = 'timeline';

  private readonly isBrowser: boolean;

  uiLang: UiLang = 'en';
  private readonly LANG_KEY = 'uiLang';

  t = {
    en: {
      sectionLabel: 'Projects',
      title: "A timeline of things I'm building as I learn.",
      subtitle: 'Newest at the top · real projects, small experiments, and everything in‑between.',

      introTitle: 'How I use projects to learn',
      introP1:
        'Each project here taught me something—about APIs, UI, architecture, or just ' +
        'debugging weird edge cases. This page is more of a log than a showcase: ' +
        'honest, work‑in‑progress, and updated as I grow.',
      introP2:
        'I focus on PHP/Laravel backends, Angular frontends, and practical browser‑side ' +
        'JavaScript. Some projects are solo, others are built with classmates.',
      introTags: ['Full stack', 'APIs', 'UI & UX', 'Learning log'],

      timelineLabel: 'Timeline · newest first',
      helperText: 'Loads instantly.',
      viewTimeline: 'Timeline',
      viewGrid: 'Grid',
      viewList: 'List',

      loadingText: 'Loading projects…',
      emptyText: 'No projects found yet.',
      newestChip: 'Newest',
      typeLabel: 'Type',
      focusLabel: 'Focus',
      gridTypeLabel: 'Type',
      gridCreatedLabel: 'Created',
      listProjectHeader: 'Project',
      listTypeHeader: 'Type',
      listCreatedHeader: 'Created',
      listLinksHeader: 'Links',
      githubCta: 'GitHub',
      liveCta: 'Live',
      viewOnGithubCta: 'View on GitHub',
      viewLiveCta: 'View live',
    },
    nl: {
      sectionLabel: 'Projecten',
      title: 'Een tijdlijn van dingen die ik bouw terwijl ik leer.',
      subtitle:
        'Meest recente bovenaan · echte projecten, kleine experimenten en alles daartussen.',

      introTitle: 'Hoe ik projecten gebruik om te leren',
      introP1:
        'Elk project hier heeft me iets geleerd — over APIs, UI, architectuur of gewoon ' +
        'rare edge-cases debuggen. Deze pagina is meer een logboek dan een vitrine: ' +
        'eerlijk, work-in-progress en bijgewerkt terwijl ik groei.',
      introP2:
        'Ik focus op PHP/Laravel backends, Angular frontends en praktische JavaScript in de browser. ' +
        'Sommige projecten zijn solo, andere zijn groepswerk met medestudenten.',
      introTags: ['Full stack', 'APIs', 'UI & UX', 'Learning log'],

      timelineLabel: 'Tijdlijn · nieuwste eerst',
      helperText: 'Laadt meteen.',
      viewTimeline: 'Tijdlijn',
      viewGrid: 'Raster',
      viewList: 'Lijst',

      loadingText: 'Projecten laden…',
      emptyText: 'Nog geen projecten gevonden.',
      newestChip: 'Nieuwste',
      typeLabel: 'Type',
      focusLabel: 'Focus',
      gridTypeLabel: 'Type',
      gridCreatedLabel: 'Aangemaakt',
      listProjectHeader: 'Project',
      listTypeHeader: 'Type',
      listCreatedHeader: 'Datum',
      listLinksHeader: 'Links',
      githubCta: 'GitHub',
      liveCta: 'Live',
      viewOnGithubCta: 'Bekijk op GitHub',
      viewLiveCta: 'Bekijk live',
    },
  };

  constructor(
    private projectsService: ProjectsService,
    @Inject(PLATFORM_ID) platformId: object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    this.loadLang();
    this.loadViewMode();
    this.loadProjects();
    this.setupLangListener();
  }

  private loadProjects(): void {
    this.loading = true;
    this.error = '';

    this.projectsService.getProjects().subscribe({
      next: projects => {
        this.projects = projects;
        this.loading = false;
      },
      error: () => {
        this.error = 'Could not load projects.';
        this.loading = false;
      },
    });
  }

  toggleViewMode(mode: 'timeline' | 'grid' | 'list'): void {
    this.viewMode = mode;

    if (this.isBrowser) {
      try {
        localStorage.setItem('projectsViewMode', mode);
      } catch {
        // ignore storage errors
      }
    }
  }

  private loadViewMode(): void {
    if (!this.isBrowser) return;

    try {
      const saved = localStorage.getItem('projectsViewMode');
      if (saved === 'timeline' || saved === 'grid' || saved === 'list') {
        this.viewMode = saved;
      }
    } catch {
      // ignore storage errors
    }
  }

  private loadLang(): void {
    if (!this.isBrowser) {
      this.uiLang = 'en';
      return;
    }
    try {
      const saved = localStorage.getItem(this.LANG_KEY);
      if (saved === 'en' || saved === 'nl') {
        this.uiLang = saved;
      }
    } catch {
      this.uiLang = 'en';
    }
  }

  private setupLangListener(): void {
    if (!this.isBrowser) return;

    window.addEventListener('ui-lang-change', this.onLangChange as EventListener);
  }

  private onLangChange = (event: Event) => {
    const custom = event as CustomEvent<{ lang: UiLang }>;
    const nextLang = custom.detail?.lang;
    if (nextLang === 'en' || nextLang === 'nl') {
      this.uiLang = nextLang;
    }
  };

  get current() {
    return this.t[this.uiLang];
  }
}
