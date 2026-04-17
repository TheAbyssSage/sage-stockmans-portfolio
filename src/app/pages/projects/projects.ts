// src/app/pages/projects/projects.ts

import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, DatePipe, isPlatformBrowser } from '@angular/common';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { ProjectsService, ProjectEntry } from './projects.service';
import { DebugFunctionsComponent } from './debug.component';

type UiLang = 'en' | 'nl';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [RouterModule, CommonModule, DatePipe, DebugFunctionsComponent],
  templateUrl: './projects.html',
  styleUrls: ['./projects.css'],
})
export class ProjectsComponent implements OnInit, OnDestroy {
  projects: ProjectEntry[] = [];
  loading = true;
  error = '';
  viewMode: 'timeline' | 'grid' | 'list' = 'timeline';

  private autoRefreshAttempts = 0;
  private readonly maxAutoRefreshAttempts = 3;
  private readonly autoRefreshDelayMs = 2000;
  private readonly isBrowser: boolean;
  private routerSubscription: Subscription | null = null;

  uiLang: UiLang = 'en';
  private readonly LANG_KEY = 'uiLang';

  // NEW: track whether we've attempted a load at least once
  hasLoadedOnce = false;

  // t object unchanged...
  t = {
    en: {
      sectionLabel: 'Projects',
      title: "A timeline of things I'm building as I learn.",
      subtitle:
        'Newest at the top · real projects, small experiments, and everything in‑between.',

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
      helperText: 'Loads instantly. If not, you can reload GitHub projects below.',
      viewTimeline: 'Timeline',
      viewGrid: 'Grid',
      viewList: 'List',

      loadingText: 'Loading projects from GitHub…',
      emptyText: 'No projects found yet. Check back soon.',
      reloadCta: 'Load GitHub repositories',   // NEW label
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
      helperText: 'Laadt meteen. Zo niet, dan kun je hieronder GitHub-projecten opnieuw laden.',
      viewTimeline: 'Tijdlijn',
      viewGrid: 'Raster',
      viewList: 'Lijst',

      loadingText: 'Projecten laden van GitHub…',
      emptyText: 'Nog geen projecten gevonden. Kom later nog eens terug.',
      reloadCta: 'GitHub‑repositories laden',   // NEW label
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
    private router: Router,
    @Inject(PLATFORM_ID) platformId: object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    this.loadLang();
    this.loadViewMode();
    this.loadProjects();
    this.setupLangListener();

    if (this.isBrowser) {
      this.routerSubscription = this.router.events
        .pipe(filter(event => event instanceof NavigationEnd))
        .subscribe((event: any) => {
          if (event.url === '/projects') {
            this.resetAutoRefresh();
            this.loadProjects();
          }
        });
    }
  }

  private loadProjects(isRefresh = false): void {
    this.loading = true;
    if (!isRefresh) {
      this.error = '';
    }

    const source$ = isRefresh
      ? this.projectsService.refreshProjects()
      : this.projectsService.getProjects();

    source$.subscribe({
      next: projects => {
        this.hasLoadedOnce = true;
        this.projects = projects;
        this.loading = false;

        if (
          this.isBrowser &&
          projects.length === 0 &&
          this.autoRefreshAttempts < this.maxAutoRefreshAttempts
        ) {
          this.autoRefreshAttempts++;
          setTimeout(() => {
            this.loadProjects(true);
          }, this.autoRefreshDelayMs);
        } else if (
          projects.length === 0 &&
          this.autoRefreshAttempts >= this.maxAutoRefreshAttempts
        ) {
          this.error = 'No projects found on GitHub right now.';
        }
      },
      error: (err) => {
        this.hasLoadedOnce = true;
        console.error('Error loading projects:', err);
        this.error = 'Could not load projects from GitHub. Please try again later.';
        this.loading = false;
      },
    });
  }

  private resetAutoRefresh(): void {
    this.autoRefreshAttempts = 0;
    this.error = '';
  }

  // NEW: handler for the “Load GitHub repositories” button
  onManualReload(): void {
    this.resetAutoRefresh();
    this.loadProjects(true);
  }

  toggleViewMode(mode: 'timeline' | 'grid' | 'list'): void {
    this.viewMode = mode;
    if (this.isBrowser) {
      try {
        localStorage.setItem('projectsViewMode', mode);
      } catch {
        // ignore
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
      // ignore
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

  ngOnDestroy(): void {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
    if (this.isBrowser) {
      window.removeEventListener('ui-lang-change', this.onLangChange as EventListener);
    }
  }
}