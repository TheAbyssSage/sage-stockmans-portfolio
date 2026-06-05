// src/app/pages/about/about.component.ts

import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';

type UiLang = 'en' | 'nl';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './about.html',
  styleUrls: ['./about.css'],
})
export class AboutComponent implements OnInit, OnDestroy {
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
      sectionLabel: 'About',
      title: 'Full stack developer who\ndelivers end-to-end solutions.',
      subtitle: 'Arizona & Belgium · PHP, Laravel, Angular, MySQL',

      snapshotTitle: 'Snapshot',
      snapshotText:
        "I'm Sage Stockmans — a full stack developer who " +
        'transforms business requirements into working web applications, ' +
        'across backend, frontend, and database.',
      snapshotCurrentFocusLabel: 'Current focus',
      snapshotCurrentFocus: 'Full Stack Development',
      snapshotStacksLabel: 'Stacks',
      snapshotStacks: 'PHP/Laravel · Angular · MySQL',
      snapshotLanguagesLabel: 'Languages',
      snapshotLanguages: 'Dutch & English',
      snapshotStyleLabel: 'Working style',
      snapshotStyle: 'Calm, methodical, team‑oriented',

      whoTitle: 'Who I am',
      whoP1:
        "I'm Sage Stockmans, with roots in both Belgium and the United States. " +
        "I'm fluent in Dutch and English, and I stay calm and focused " +
        'when projects get complex or deadlines approach.',
      whoP2:
        "I hold a diploma in Full Stack Development from SyntraPXL. I'm drawn " +
        'to full stack work because it gives me end-to-end ownership: design the ' +
        'database, build the API, wire up the UI, and deliver a product that ' +
        'meets real business needs.',
      whoP3:
        'I understand how all the pieces fit together — from routing and ' +
        'validation on the backend, to state management and UX on the frontend.',

      quickFactsTitle: 'Quick facts',
      quickLocationLabel: 'Location',
      quickLocation: 'Arizona City · Hasselt ties',
      quickTimeLabel: 'Deadlines',
      quickTime: 'Delivers on time, communicates proactively',
      quickCollabLabel: 'Collaboration',
      quickCollab: 'Values pair programming & code reviews',
      quickLearnLabel: 'Approach',
      quickLearn: 'Continuous improvement through deliberate practice',

      whatTitle: 'What I work with',
      pillBackendLabel: 'Backend',
      pillBackendValue: 'PHP (OOP), Laravel, REST APIs',
      pillFrontendLabel: 'Frontend',
      pillFrontendValue: 'Angular, TypeScript, JavaScript',
      pillDataLabel: 'Data',
      pillDataValue: 'MySQL, database design & normalization',
      pillWorkflowLabel: 'Workflow',
      pillWorkflowValue: 'Agile & Scrum, Git, code reviews',
      pillAiLabel: 'AI',
      pillAiValue: 'Strategic AI integration with rigorous validation',

      howBuildTitle: 'How I deliver',
      howBuildP:
        'I prioritize clean architecture, predictable APIs, and frontends that feel ' +
        'intuitive to use. I excel at debugging complex issues, hardening error handling, ' +
        'and ensuring applications are reliable enough for production — whether ' +
        'I write every line by hand or leverage AI to accelerate development.',
      howBuildTags: ['Clean architecture', 'Error resilience', 'Maintainable code', 'Business impact'],

      nowTitle: "What I'm working on now",
      nowP1:
        "I'm building projects that combine a PHP/Laravel backend with an " +
        'Angular frontend: REST APIs, authentication, forms, and state management.',
      nowP2:
        "I'm particularly focused on reliability patterns, clear error messaging, " +
        "and observability — making it easy to understand what's happening in the system, even " +
        'when something goes wrong.',
      nowCtaProjects: 'See the projects behind this',
      nowCtaContact: 'Reach out',

      outsideTitle: 'Outside of code',
      outsideP1:
        "I'm into music and games — anything with good atmosphere, tension, and " +
        'a story. That same mix of systems and feeling is what I like in software ' +
        'too: not just code that works, but interfaces that feel considered.',
      outsideP2:
        "If you're looking for a developer who solves problems methodically, delivers consistently, " +
        "and takes ownership of their work, I'd be happy to talk.",
    },
    nl: {
      sectionLabel: 'Over mij',
      title: 'Full stack developer die\nend-to-end oplossingen levert.',
      subtitle: 'Arizona & België · PHP, Laravel, Angular, MySQL',

      snapshotTitle: 'Snapshot',
      snapshotText:
        'Ik ben Sage Stockmans — een full stack developer die ' +
        'bedrijfsvereisten omzet in werkende webapplicaties, ' +
        'van backend tot frontend en database.',
      snapshotCurrentFocusLabel: 'Huidige focus',
      snapshotCurrentFocus: 'Full Stack Development',
      snapshotStacksLabel: 'Stacks',
      snapshotStacks: 'PHP/Laravel · Angular · MySQL',
      snapshotLanguagesLabel: 'Talen',
      snapshotLanguages: 'Nederlands & Engels',
      snapshotStyleLabel: 'Werkstijl',
      snapshotStyle: 'Rustig, methodisch, teamgericht',

      whoTitle: 'Wie ik ben',
      whoP1:
        'Ik ben Sage Stockmans, met roots in zowel België als de Verenigde Staten. ' +
        'Ik spreek vloeiend Nederlands en Engels, en blijf rustig en gefocust ' +
        'als projecten complex worden of deadlines naderen.',
      whoP2:
        'Ik heb een diploma in Full Stack Development van SyntraPXL. Full stack spreekt me aan ' +
        'omdat het end-to-end eigenaarschap geeft: de database ontwerpen, de API bouwen, de UI koppelen, ' +
        'en een product opleveren dat aan echte bedrijfsbehoeften voldoet.',
      whoP3:
        'Ik begrijp hoe alle stukken in elkaar passen — van routing en validatie in de backend ' +
        'tot state management en UX in de frontend.',

      quickFactsTitle: 'Korte feiten',
      quickLocationLabel: 'Locatie',
      quickLocation: 'Arizona City · Hasselt',
      quickTimeLabel: 'Deadlines',
      quickTime: 'Levert op tijd, communiceert proactief',
      quickCollabLabel: 'Samenwerking',
      quickCollab: 'Waardeert pair programming & code reviews',
      quickLearnLabel: 'Aanpak',
      quickLearn: 'Continue verbetering door gerichte praktijk',

      whatTitle: 'Waar ik mee werk',
      pillBackendLabel: 'Backend',
      pillBackendValue: 'PHP (OOP), Laravel, REST APIs',
      pillFrontendLabel: 'Frontend',
      pillFrontendValue: 'Angular, TypeScript, JavaScript',
      pillDataLabel: 'Data',
      pillDataValue: 'MySQL, database‑ontwerp & normalisatie',
      pillWorkflowLabel: 'Workflow',
      pillWorkflowValue: 'Agile & Scrum, Git, code reviews',
      pillAiLabel: 'AI',
      pillAiValue: 'Strategische AI-integratie met grondige validatie',

      howBuildTitle: 'Hoe ik oplever',
      howBuildP:
        'Ik geef prioriteit aan heldere architectuur, voorspelbare APIs en frontends die intuïtief aanvoelen. ' +
        'Ik blink uit in het debuggen van complexe problemen, het versterken van foutafhandeling ' +
        'en het garanderen dat applicaties betrouwbaar genoeg zijn voor productie — of ik nu alles met de hand schrijf, ' +
        'of AI gebruik om ontwikkeling te versnellen.',
      howBuildTags: ['Heldere architectuur', 'Foutbestendigheid', 'Onderhoudbare code', 'Bedrijfsimpact'],

      nowTitle: 'Waar ik nu aan werk',
      nowP1:
        'Ik bouw projecten die een PHP/Laravel‑backend combineren met een Angular‑frontend: REST APIs, ' +
        'authenticatie, formulieren en state management.',
      nowP2:
        'Ik focus me vooral op betrouwbaarheidspatronen, duidelijke foutmeldingen ' +
        'en observability — zodat het makkelijk te begrijpen is wat er in het systeem gebeurt, ook als er iets misgaat.',
      nowCtaProjects: 'Bekijk de projecten hierbij',
      nowCtaContact: 'Neem contact op',

      outsideTitle: 'Naast code',
      outsideP1:
        'Ik houd van muziek en games — alles met sfeer, spanning en een goed verhaal. Die combinatie van systemen ' +
        'en gevoel zie ik ook graag terug in software: niet alleen code die werkt, maar interfaces die doordacht aanvoelen.',
      outsideP2:
        'Zoek je een developer die problemen methodisch oplost, consistent oplevert ' +
        'en eigenaarschap neemt over zijn werk, dan praat ik graag verder.',
    },
  };

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
}
