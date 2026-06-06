// src/app/pages/home/home.ts

import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

type UiLang = 'en' | 'nl';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit, OnDestroy {
  projectCount = 8;
  languages: string[] = ['PHP', 'Laravel', 'Angular', 'TypeScript', 'JavaScript', 'MySQL'];

  uiLang: UiLang = 'en';
  private readonly LANG_KEY = 'uiLang';
  private isBrowser: boolean;

  // use a bound function so we can add/remove it cleanly
  private langListener = (event: Event) => {
    const custom = event as CustomEvent<{ lang: UiLang }>;
    const nextLang = custom.detail?.lang;
    if (nextLang === 'en' || nextLang === 'nl') {
      this.uiLang = nextLang;
    }
  };

  t = {
    en: {
      headerLabel: 'Portfolio · Full Stack Development',
      headerMetaLine1: 'PHP · Laravel · Angular',
      headerMetaLine2: 'Arizona & Belgium',
      headerMetaLine3: 'Full Stack Developer',
      availabilityStatus: 'Available for new projects',
      availabilityNote: 'Booking for Q3 2026',
      introText:
        'I build full stack web applications with PHP, Laravel, Angular, and MySQL — ' +
        'with a focus on clean architecture, responsive UI, and reliable APIs. I deliver ' +
        'end-to-end solutions that solve real business problems and drive measurable results.',
      featuredSectionLabel: 'Featured work',
      featuredTitle1: 'Building production-ready',
      featuredTitle2: 'applications.',
      featuredText:
        'From business websites to e-commerce platforms and data dashboards, ' +
        'I deliver full stack solutions that are secure, scalable, and built to ' +
        'perform in production environments.',
      featuredTags: ['Full stack', 'APIs', 'Laravel & PHP', 'Angular'],
      ctaProjects: 'View projects',
      ctaAbout: 'About me',
      statProjectsLabel: 'Projects delivered',
      statLanguagesLabel: (count: number) => `Languages in use${count !== 1 ? 's' : ''}`,
      statBugsLabel: 'Problems solved & systems optimized',

      processSectionLabel: 'How I work',
      processTitle: 'From idea to production in five steps.',
      processStep1Title: 'Discovery',
      processStep1Text: 'Understand your business needs, constraints, and goals.',
      processStep2Title: 'Planning',
      processStep2Text: 'Architecture, timeline, and transparent milestones.',
      processStep3Title: 'Development',
      processStep3Text: 'Agile sprints with clean code and continuous testing.',
      processStep4Title: 'Delivery',
      processStep4Text: 'Testing, deployment, documentation, and handoff.',
      processStep5Title: 'Support',
      processStep5Text: 'Maintenance, iterations, and scaling as you grow.',
      processCta: 'See full services',

      testimonialSectionLabel: 'Client feedback',
      testimonialQuote1: '"Sage delivered a professional Laravel website with quote forms that significantly improved our customer inquiries. The code was clean and the communication was excellent throughout."',
      testimonialAuthor1: '— Uyttendaele Verhuizingen',
      testimonialRole1: 'Business Website',
      testimonialQuote2: '"The Learning Health Platform handles payments and invoicing seamlessly. Sage understood our requirements quickly and built a solution that just works."',
      testimonialAuthor2: '— Learning Health Platform',
      testimonialRole2: 'Educational Platform',

      contactSectionLabel: 'Get in touch',
      contactText:
        "Open to full stack roles, freelance projects, and collaborations. If you're " +
        'looking for a developer who delivers clean, maintainable code on time, let\u2019s talk.',
      contactEmail: 'Email',
      contactCta: 'Contact me',
      introTagBackend: 'Backend · PHP - Laravel',
      introTagFrontend: 'Frontend · Angular · JS',
      introTagData: 'Data · MySQL - DB design',
      introTagWorkflow: 'Workflow · Agile & Scrum',
      introTagAi: 'AI/Agentic workflows · strategic integration',
    },
    nl: {
      headerLabel: 'Portfolio · Full Stack Development',
      headerMetaLine1: 'PHP · Laravel · Angular',
      headerMetaLine2: 'Arizona & België',
      headerMetaLine3: 'Full Stack Developer',
      availabilityStatus: 'Beschikbaar voor nieuwe projecten',
      availabilityNote: 'Boeking voor Q3 2026',
      introText:
        'Ik bouw full stack webapplicaties met PHP, Laravel, Angular en MySQL — ' +
        'met focus op heldere architectuur, een responsieve UI en betrouwbare APIs. ' +
        'Ik lever end-to-end oplossingen die echte bedrijfsproblemen oplossen en meetbare resultaten opleveren.',
      featuredSectionLabel: 'Uitgelicht werk',
      featuredTitle1: 'Productieklare applicaties',
      featuredTitle2: 'bouwen.',
      featuredText:
        'Van zakelijke websites tot e-commerceplatforms en data-dashboards: ' +
        'ik lever full stack oplossingen die veilig, schaalbaar en gebouwd zijn ' +
        'om te presteren in productieomgevingen.',
      featuredTags: ['Full stack', 'APIs', 'Laravel & PHP', 'Angular'],
      ctaProjects: 'Bekijk projecten',
      ctaAbout: 'Over mij',
      statProjectsLabel: 'Projecten opgeleverd',
      statLanguagesLabel: (count: number) => `Gebruikte talen`,
      statBugsLabel: 'Problemen opgelost & systemen geoptimaliseerd',

      processSectionLabel: 'Hoe ik werk',
      processTitle: 'Van idee tot productie in vijf stappen.',
      processStep1Title: 'Ontdekking',
      processStep1Text: 'Begrijp uw bedrijfsbehoeften, beperkingen en doelen.',
      processStep2Title: 'Planning',
      processStep2Text: 'Architectuur, tijdlijn en transparante mijlpalen.',
      processStep3Title: 'Ontwikkeling',
      processStep3Text: 'Agile sprints met schone code en continue testen.',
      processStep4Title: 'Oplevering',
      processStep4Text: 'Testen, deployment, documentatie en overdracht.',
      processStep5Title: 'Ondersteuning',
      processStep5Text: 'Onderhoud, iteraties en schaalvergroting naarmate u groeit.',
      processCta: 'Bekijk alle diensten',

      testimonialSectionLabel: 'Klantfeedback',
      testimonialQuote1: '"Sage leverde een professionele Laravel-website met offerteformulieren die onze klantenvragen aanzienlijk verbeterden. De code was schoon en de communicatie was uitstekend gedurende het hele traject."',
      testimonialAuthor1: '— Uyttendaele Verhuizingen',
      testimonialRole1: 'Zakelijke Website',
      testimonialQuote2: '"Het Learning Health Platform verwerkt betalingen en facturering naadloos. Sage begreep onze vereisten snel en bouwde een oplossing die gewoon werkt."',
      testimonialAuthor2: '— Learning Health Platform',
      testimonialRole2: 'Educatief Platform',

      contactSectionLabel: 'Contact',
      contactText:
        'Ik sta open voor full stack functies, freelance projecten en samenwerkingen. ' +
        'Als je een developer zoekt die schone, onderhoudbare code op tijd oplevert, laat gerust iets weten.',
      contactEmail: 'E‑mail',
      contactCta: 'Neem contact op',
      introTagBackend: 'Backend · PHP - Laravel',
      introTagFrontend: 'Frontend · Angular · JS',
      introTagData: 'Data · MySQL - DB design',
      introTagWorkflow: 'Workflow · Agile & Scrum',
      introTagAi: 'AI/Agentic workflows · strategische integratie',
    },
  };

  constructor(@Inject(PLATFORM_ID) platformId: object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    // read language from storage only in the browser
    if (this.isBrowser) {
      try {
        const saved = localStorage.getItem(this.LANG_KEY);
        if (saved === 'en' || saved === 'nl') {
          this.uiLang = saved;
        }
      } catch {
        this.uiLang = 'en';
      }

      window.addEventListener('ui-lang-change', this.langListener as EventListener);
    }
  }

  ngOnDestroy(): void {
    if (this.isBrowser) {
      window.removeEventListener('ui-lang-change', this.langListener as EventListener);
    }
  }

  get current() {
    return this.t[this.uiLang];
  }
}
