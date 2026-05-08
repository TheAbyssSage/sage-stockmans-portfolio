// src/app/pages/projects/projects.ts

import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, DatePipe, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';

type UiLang = 'en' | 'nl';

interface ProjectEntry {
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

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [RouterModule, CommonModule, DatePipe],
  templateUrl: './projects.html',
  styleUrls: ['./projects.css'],
})
export class ProjectsComponent implements OnInit, OnDestroy {
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

  projectsData = {
    en: [
      {
        title: 'Learning Health Platform',
        description: 'A customized Laravel application for a health education platform with automatic invoice generation through Plug&Pay integration.',
        date: '2026-04-15',
        type: 'Educational Platform',
        stack: 'Laravel, PHP, MySQL, Bootstrap, Stripe, Plug&Pay API',
        focus: 'Full Stack, Payment Processing, API Integration',
        tags: ['Laravel', 'PHP', 'Education', 'Payments', 'API']
      },
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
      {
        title: 'ISS Pee Telemetry Dashboard',
        description: "A PHP-based web application for monitoring the International Space Station's waste water tank status in real-time.",
        date: '2026-02-13',
        type: 'Dashboard',
        stack: 'PHP, Bootstrap',
        focus: 'API Integration, Reliability, Error Handling',
        githubUrl: 'https://github.com/TheAbyssSage/iss-piss',
        tags: ['PHP', 'API', 'Dashboard', 'Reliability']
      },
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
      {
        title: 'The Illuminates Weather App',
        description: 'A weather app project developed for a school project with four unique themed experiences using the OpenWeatherMap API.',
        date: '2026-04-21',
        type: 'Educational',
        stack: 'JavaScript, HTML, CSS, Bootstrap, OpenWeatherMap API',
        focus: 'Frontend, API Integration, Responsive Design',
        githubUrl: 'https://github.com/TheAbyssSage/The-Illuminates-Weather-App.git',
        liveUrl: 'https://the-illuminates-weather-app.netlify.app/',
        tags: ['JavaScript', 'API', 'Bootstrap', 'Weather']
      },
      {
        title: 'Chinese Zodiac Finder',
        description: 'A simple, elegant web app to find your Chinese zodiac sign from a selected birth date with search functionality.',
        date: '2026-04-21',
        type: 'Utility',
        stack: 'JavaScript, HTML, CSS, Bootstrap',
        focus: 'Frontend, UI/UX',
        githubUrl: 'https://github.com/TheAbyssSage/zodiac-c.git',
        liveUrl: 'https://chinese-zodiac-s.netlify.app/',
        tags: ['JavaScript', 'Bootstrap', 'UI']
      },
    ],
    nl: [
      {
        title: 'Learning Health Platform',
        description: 'Een op maat gemaakte Laravel-applicatie voor een gezondheidseducatieplatform met automatische factuurgeneratie via Plug&Pay-integratie.',
        date: '2026-04-15',
        type: 'Educatief Platform',
        stack: 'Laravel, PHP, MySQL, Bootstrap, Stripe, Plug&Pay API',
        focus: 'Full Stack, Betalingsverwerking, API-integratie',
        tags: ['Laravel', 'PHP', 'Educatie', 'Betalingen', 'API']
      },
      {
        title: 'Verhuisfirma Uyttendaele Website',
        description: 'Officiële website voor een Belgisch verhuisbedrijf met offerte-aanvraagformulieren en service-informatie.',
        date: '2026-04-10',
        type: 'Zakelijke Website',
        stack: 'Laravel, PHP, MySQL, Bootstrap',
        focus: 'Zakelijk, Formulieren, Toegankelijkheid',
        liveUrl: 'https://verhuizingen-uyttendaele.be/',
        tags: ['Laravel', 'PHP', 'Zakelijk', 'Formulieren']
      },
      {
        title: 'Hex & Halo Certificate Generator',
        description: 'Een speelse PHP-webapplicatie voor het genereren van gepersonaliseerde certificaten met hemelse thema\'s en QR-codes.',
        date: '2026-01-25',
        type: 'E-commerce',
        stack: 'PHP, Dompdf, Stripe API, QR Code Library',
        focus: 'PDF-generatie, Betalingsverwerking, E-commerce',
        githubUrl: 'https://github.com/TheAbyssSage/halo',
        liveUrl: 'https://productionserver.be/Halo-Services/',
        tags: ['PHP', 'E-commerce', 'PDF', 'Stripe']
      },
      {
        title: 'ISS Pee Telemetry Dashboard',
        description: 'Een PHP-gebaseerde webapplicatie voor het realtime monitoren van het afvalwatertankstatus van het Internationaal Ruimtestation.',
        date: '2026-02-13',
        type: 'Dashboard',
        stack: 'PHP, Bootstrap',
        focus: 'API-integratie, Betrouwbaarheid, Foutafhandeling',
        githubUrl: 'https://github.com/TheAbyssSage/iss-piss',
        tags: ['PHP', 'API', 'Dashboard', 'Betrouwbaarheid']
      },
      {
        title: 'Sage Stockmans Portfolio',
        description: 'Mijn nieuwe portfolio! Je bekijkt het waarschijnlijk nu. Angular + custom Petrichor-thema.',
        date: '2026-03-09',
        type: 'Portfolio',
        stack: 'Angular, TypeScript, HTML, CSS',
        focus: 'Frontend, UI/UX, SSR',
        githubUrl: 'https://github.com/TheAbyssSage/sage-stockmans-portfolio',
        liveUrl: 'https://sage-stockmans.netlify.app/',
        tags: ['Angular', 'TypeScript', 'Portfolio', 'SSR']
      },
      {
        title: 'The Illuminates Weather App',
        description: 'Een weer-app-project ontwikkeld voor een schoolproject met vier unieke thema-ervaringen met de OpenWeatherMap API.',
        date: '2026-04-21',
        type: 'Educatief',
        stack: 'JavaScript, HTML, CSS, Bootstrap, OpenWeatherMap API',
        focus: 'Frontend, API-integratie, Responsief ontwerp',
        githubUrl: 'https://github.com/TheAbyssSage/The-Illuminates-Weather-App.git',
        liveUrl: 'https://the-illuminates-weather-app.netlify.app/',
        tags: ['JavaScript', 'API', 'Bootstrap', 'Weer']
      },
      {
        title: 'Chinese Zodiac Finder',
        description: 'Een eenvoudige, elegante web-app om je Chinese sterrenbeeld te vinden vanuit een geselecteerde geboortedatum met zoekfunctionaliteit.',
        date: '2026-04-21',
        type: 'Utility',
        stack: 'JavaScript, HTML, CSS, Bootstrap',
        focus: 'Frontend, UI/UX',
        githubUrl: 'https://github.com/TheAbyssSage/zodiac-c.git',
        liveUrl: 'https://chinese-zodiac-s.netlify.app/',
        tags: ['JavaScript', 'Bootstrap', 'UI']
      },
    ],
  };

  get projects(): ProjectEntry[] {
    return this.projectsData[this.uiLang];
  }

  constructor(
    @Inject(PLATFORM_ID) platformId: object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    this.loadLang();
    this.loadViewMode();
    this.setupLangListener();
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

  ngOnDestroy(): void {
    if (this.isBrowser) {
      window.removeEventListener('ui-lang-change', this.onLangChange as EventListener);
    }
  }

  get current() {
    return this.t[this.uiLang];
  }
}
