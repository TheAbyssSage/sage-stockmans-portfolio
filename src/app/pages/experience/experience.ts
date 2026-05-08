// src/app/pages/experience/experience.ts

import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';

type ExperienceTrack = 'work' | 'education' | 'ai';
type UiLang = 'en' | 'nl';

interface ExperienceEntry {
  title: string;
  organization: string;
  location?: string;
  track: ExperienceTrack;
  start: string;
  end?: string;
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
export class ExperienceComponent implements OnInit, OnDestroy {
  tracks: ExperienceTrack[] = ['work', 'education', 'ai'];

  uiLang: UiLang = 'en';
  private readonly LANG_KEY = 'uiLang';
  private isBrowser: boolean;

  private langListener = (event: Event) => {
    const custom = event as CustomEvent<{ lang: UiLang }>;
    const nextLang = custom.detail?.lang;
    if (nextLang === 'en' || nextLang === 'nl') {
      this.uiLang = nextLang;
    }
  };

  t = {
    en: {
      sectionLabel: 'Experience',
      title: "Work, education, and how I'm learning to use AI responsibly.",
      subtitle: 'A git-branch inspired overview of jobs, school, and extra learning.',
      ctaText:
        "I use what I learned in customer-facing jobs, school, and AI/agentic workflows " +
        "to build software that's reliable, understandable, and actually pleasant to use.",

      legendWork: 'Work',
      legendEducation: 'Education',
      legendAi: 'AI / Agentic workflows',

      laneWorkTitle: 'Work',
      laneEducationTitle: 'Education',
      laneAiTitle: 'AI / Extra',
    },
    nl: {
      sectionLabel: 'Ervaring',
      title: 'Werk, opleiding en hoe ik leer om AI verantwoord te gebruiken.',
      subtitle: 'Een git-branch geïnspireerd overzicht van jobs, school en extra leertrajecten.',
      ctaText:
        'Wat ik leerde in klantgerichte jobs, op school en in AI/agentic workflows gebruik ik ' +
        'om software te bouwen die betrouwbaar, begrijpelijk en fijn in gebruik is.',

      legendWork: 'Werk',
      legendEducation: 'Opleiding',
      legendAi: 'AI / Agentic workflows',

      laneWorkTitle: 'Werk',
      laneEducationTitle: 'Opleiding',
      laneAiTitle: 'AI / Extra',
    },
  };

  entriesData = {
    en: [
      // WORK
      {
        title: 'Cashier / Student worker',
        organization: 'Brico',
        location: 'Hasselt, Belgium',
        track: 'work' as ExperienceTrack,
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
        organization: 'Versuz',
        location: 'Hasselt, Belgium',
        track: 'work' as ExperienceTrack,
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
        track: 'work' as ExperienceTrack,
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
        track: 'work' as ExperienceTrack,
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
        track: 'work' as ExperienceTrack,
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
        track: 'education' as ExperienceTrack,
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
        organization: 'Leuven Language Institute · Leuven, Belgium',
        track: 'education' as ExperienceTrack,
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
        track: 'education' as ExperienceTrack,
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
        track: 'ai' as ExperienceTrack,
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
        track: 'ai' as ExperienceTrack,
        start: '2024-09',
        end: undefined,
        periodLabel: '2024 – now',
        summary:
          'Ongoing self-study on using AI responsibly in development.',
        details:
          'Use AI to explore ideas, refactor code, and prototype, but always review, test, and keep responsibility for the final result.',
        tags: ['Prompt design', 'Code review', 'Reliability'],
      },
    ],
    nl: [
      // WORK
      {
        title: 'Kassier / Studentenwerker',
        organization: 'Brico',
        location: 'Hasselt, België',
        track: 'work' as ExperienceTrack,
        start: '2025-08',
        end: '2025-09',
        periodLabel: 'Aug 2025 – Sep 2025',
        summary: 'Kassier en vloerondersteuning in een doe-het-zelfwinkel.',
        details:
          'Voorraad bijgevuld, displays onderhouden, transacties verwerkt en klanten geholpen in een drukke retailomgeving.',
        tags: ['Klantenservice', 'Retail', 'Kassier'],
      },
      {
        title: 'Bartender & Server',
        organization: 'Versuz',
        location: 'Hasselt, België',
        track: 'work' as ExperienceTrack,
        start: '2025-04',
        end: '2025-06',
        periodLabel: 'Apr 2025 – Jun 2025',
        summary: 'Bartender en server in een drukke club.',
        details:
          'Drankjes gemixt, bestellingen afgehandeld en on-the-spot problemen opgelost terwijl de service vriendelijk en efficiënt bleef.',
        tags: ['Horeca', 'Snel tempo', 'Klantenservice'],
      },
      {
        title: 'Productie-assistent',
        organization: 'Studio Pieter Stockmans',
        location: 'Genk, België',
        track: 'work' as ExperienceTrack,
        start: '2025-01',
        end: '2025-01',
        periodLabel: 'Jan 2025',
        summary: 'Praktisch werk in porseleinproductie en presentatie.',
        details:
          'Geholpen met creatie, decoratie en presentatie van porseleinen stukken, waarbij ik het volledige proces van materiaal tot afgewerkt werk zag.',
        tags: ['Kunst & design', 'Productie', 'Detailgericht'],
      },
      {
        title: 'Acteur / Technicus',
        organization: 'Old Tucson Company',
        location: 'Tucson, Arizona, USA',
        track: 'work' as ExperienceTrack,
        start: '2022-10',
        end: '2024-12',
        periodLabel: 'Okt 2022 – Dec 2024',
        summary:
          'Environmental actor en technicus in een thematisch evenementenpark.',
        details:
          'Speelde in-world personages om locaties tot leven te brengen en bediende licht en geluid om shows en evenementen te ondersteunen.',
        tags: ['Performance', 'Technische operaties', 'Teamwork'],
      },
      {
        title: 'Seizoensgebonden verhuizer',
        organization: 'Uyttendaele Europese Verhuizingen',
        location: 'Aarschot, België',
        track: 'work' as ExperienceTrack,
        start: '2019-07',
        end: '2019-08',
        periodLabel: 'Zomer 2019',
        summary:
          'Vrachtwagens geladen en gelost, goederen veilig verplaatst, en gewerkt als onderdeel van een logistiek team.',
        tags: ['Teamwork', 'Fysiek werk', 'Logistiek'],
      },

      // EDUCATION
      {
        title: 'Full Stack Developer (Diploma)',
        organization: 'SyntraPXL',
        location: 'Hasselt, België',
        track: 'education' as ExperienceTrack,
        start: '2025-09',
        end: '2026-06',
        periodLabel: '2025.09 – 2026 (lopend)',
        summary:
          'Full stack development-programma gericht op backend, frontend en software craftsmanship.',
        details:
          'Cursus omvat OO-programmering, REST APIs, PHP (OOP), Laravel, Node.js, beveiliging, frontend (Angular/JS) en Agile workflows.',
        tags: ['Full stack', 'PHP/Laravel', 'Angular', 'REST APIs', 'MySQL', 'Database design', 'TypeScript'],
      },
      {
        title: 'Nederlands - KU-Leuven',
        organization: 'Leuven Language Institute · Leuven, België',
        track: 'education' as ExperienceTrack,
        start: '2025-02',
        end: '2025-06',
        periodLabel: '2025.02 – 2025.06',
        summary:
          'Nederlandse taalcursus op hoog niveau om communicatievaardigheden in een professionele context te verbeteren.',
        tags: ['Nederlandse taal', 'Communicatievaardigheden'],
      },
      {
        title: 'Marana High School',
        organization: 'Marana High School',
        location: 'Arizona, USA',
        track: 'education' as ExperienceTrack,
        start: '2019-08',
        end: '2022-05',
        periodLabel: '2019 – 2022',
        summary: 'Middelbare school afgerond in Arizona.',
        tags: ['Engels', 'Algemene vorming'],
      },

      // AI / EXTRA
      {
        title: 'AI agents – bouw je eigen assistent',
        organization: 'SyntraPXL',
        track: 'ai' as ExperienceTrack,
        start: '2025-01',
        end: '2025-06',
        periodLabel: '2025 (extra module)',
        summary:
          'Praktische cursus over het bouwen en orkestreren van AI-agents voor echte taken.',
        details:
          'Geleerd hoe ik AI-workflows ontwerp, tools/APIs koppel, en kritisch denk over betrouwbaarheid, bias en failure modes.',
        tags: ['AI/Agentic workflows', 'Tooling', 'Orchestratie'],
      },
      {
        title: 'Verantwoord AI-gebruik & prompts',
        organization: 'Zelfstudie & workshops',
        track: 'ai' as ExperienceTrack,
        start: '2024-09',
        end: undefined,
        periodLabel: '2024 – nu',
        summary:
          'Doorlopende zelfstudie over verantwoord AI-gebruik in development.',
        details:
          'Gebruik AI om ideeën te verkennen, code te refactoren en te prototypen, maar controleer en test altijd en neem verantwoordelijkheid voor het eindresultaat.',
        tags: ['Prompt design', 'Code review', 'Betrouwbaarheid'],
      },
    ],
  };

  get entries(): ExperienceEntry[] {
    return this.entriesData[this.uiLang];
  }

  constructor(@Inject(PLATFORM_ID) platformId: object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
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

  getEntriesForTrack(track: ExperienceTrack): ExperienceEntry[] {
    return this.entries
      .filter(e => e.track === track)
      .sort(
        (a, b) =>
          new Date(b.start).getTime() - new Date(a.start).getTime()
      );
  }
}