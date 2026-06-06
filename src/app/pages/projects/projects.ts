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
      title: "A portfolio of production-ready applications I've built.",
      subtitle: 'Newest at the top · client work, platforms, and tools.',

      introTitle: 'How I approach projects',
      introP1:
        'Each project here represents a delivered solution — whether for a client, a business need, or ' +
        'a focused technical exploration. This portfolio reflects real, working applications ' +
        'built to professional standards.',
      introP2:
        'I specialize in PHP/Laravel backends, Angular frontends, and practical browser‑side ' +
        'JavaScript. Projects range from solo deliveries to collaborative builds.',
      introTags: ['Full stack', 'APIs', 'UI & UX', 'Production ready'],

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
      title: 'Een portfolio van productieklare applicaties die ik heb gebouwd.',
      subtitle:
        'Nieuwste bovenaan · klantwerk, platforms en tools.',

      introTitle: 'Hoe ik projecten aanpak',
      introP1:
        'Elk project hier vertegenwoordigt een opgeleverde oplossing — of het nu voor een klant, een bedrijfsbehoefte of ' +
        'een gerichte technische verkenning is. Dit portfolio toont echte, werkende applicaties ' +
        'gebouwd volgens professionele standaarden.',
      introP2:
        'Ik specialiseer me in PHP/Laravel backends, Angular frontends en praktische JavaScript in de browser. ' +
        'Projecten variëren van solo-opleveringen tot samenwerkingsprojecten.',
      introTags: ['Full stack', 'APIs', 'UI & UX', 'Productieklaar'],

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
        description: 'A customized Laravel application for a health education platform handling 200+ monthly transactions with automatic invoice generation through Plug&Pay integration. Reduced manual invoicing time by 90%.',
        date: '2026-04-15',
        type: 'Educational Platform',
        stack: 'Laravel, PHP, MySQL, Bootstrap, Stripe, Plug&Pay API',
        focus: 'Full Stack, Payment Processing, API Integration',
        tags: ['Laravel', 'PHP', 'Education', 'Payments', 'API']
      },
      {
        title: 'Verhuisfirma Uyttendaele Website',
        description: 'Official website for a Belgian moving company with quote request forms and service information. Improved customer inquiry volume and streamlined the quote request workflow.',
        date: '2026-04-10',
        type: 'Business Website',
        stack: 'Laravel, PHP, MySQL, Bootstrap',
        focus: 'Business, Forms, Accessibility',
        liveUrl: 'https://verhuizingen-uyttendaele.be/',
        tags: ['Laravel', 'PHP', 'Business', 'Forms']
      },
      {
        title: 'Hex & Halo Certificate Generator',
        description: 'An e-commerce PHP application for generating personalized certificates with celestial themes and QR codes. Integrated Stripe for secure payments and Dompdf for instant PDF delivery.',
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
        description: 'A real-time PHP dashboard monitoring the International Space Station waste water tank status. Demonstrates reliable API integration, error handling, and data visualization under production constraints.',
        date: '2026-02-13',
        type: 'Dashboard',
        stack: 'PHP, Bootstrap',
        focus: 'API Integration, Reliability, Error Handling',
        githubUrl: 'https://github.com/TheAbyssSage/iss-piss',
        tags: ['PHP', 'API', 'Dashboard', 'Reliability']
      },
      {
        title: 'Sage Stockmans Portfolio',
        description: 'This portfolio site — built with Angular, server-side rendering, and a custom design system. Optimized for performance, SEO, and accessibility to serve as a professional business presence.',
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
        description: 'A production-ready weather application with four unique themed experiences using the OpenWeatherMap API. Built with responsive design, error handling, and clean component architecture.',
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
        description: 'A lightweight, elegant utility app for finding Chinese zodiac signs from birth dates. Focused on clean UI, fast load times, and mobile-first responsive design.',
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
        description: 'Een op maat gemaakte Laravel-applicatie voor een gezondheidseducatieplatform met 200+ maandelijkse transacties en automatische factuurgeneratie via Plug&Pay-integratie. Handmatige factureringstijd met 90% verminderd.',
        date: '2026-04-15',
        type: 'Educatief Platform',
        stack: 'Laravel, PHP, MySQL, Bootstrap, Stripe, Plug&Pay API',
        focus: 'Full Stack, Betalingsverwerking, API-integratie',
        tags: ['Laravel', 'PHP', 'Educatie', 'Betalingen', 'API']
      },
      {
        title: 'Verhuisfirma Uyttendaele Website',
        description: 'Officiële website voor een Belgisch verhuisbedrijf met offerte-aanvraagformulieren en service-informatie. Klantenvragen verbeterd en het offerte-aanvraagproces gestroomlijnd.',
        date: '2026-04-10',
        type: 'Zakelijke Website',
        stack: 'Laravel, PHP, MySQL, Bootstrap',
        focus: 'Zakelijk, Formulieren, Toegankelijkheid',
        liveUrl: 'https://verhuizingen-uyttendaele.be/',
        tags: ['Laravel', 'PHP', 'Zakelijk', 'Formulieren']
      },
      {
        title: 'Hex & Halo Certificate Generator',
        description: 'Een e-commerce PHP-applicatie voor het genereren van gepersonaliseerde certificaten met hemelse thema\'s en QR-codes. Stripe geïntegreerd voor veilige betalingen en Dompdf voor directe PDF-levering.',
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
        description: 'Een real-time PHP-dashboard voor het monitoren van het afvalwatertankstatus van het Internationaal Ruimtestation. Demonstreert betrouwbare API-integratie, foutafhandeling en datavisualisatie onder productieomstandigheden.',
        date: '2026-02-13',
        type: 'Dashboard',
        stack: 'PHP, Bootstrap',
        focus: 'API-integratie, Betrouwbaarheid, Foutafhandeling',
        githubUrl: 'https://github.com/TheAbyssSage/iss-piss',
        tags: ['PHP', 'API', 'Dashboard', 'Betrouwbaarheid']
      },
      {
        title: 'Sage Stockmans Portfolio',
        description: 'Deze portfolio-site — gebouwd met Angular, server-side rendering en een custom design system. Geoptimaliseerd voor prestaties, SEO en toegankelijkheid als professionele zakelijke aanwezigheid.',
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
        description: 'Een productieklare weerapplicatie met vier unieke thema-ervaringen met de OpenWeatherMap API. Gebouwd met responsief ontwerp, foutafhandeling en schone component-architectuur.',
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
        description: 'Een lichtgewicht, elegante utility-app voor het vinden van Chinese sterrenbeelden op basis van geboortedata. Focus op schone UI, snelle laadtijden en mobile-first responsief ontwerp.',
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
