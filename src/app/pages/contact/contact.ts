// src/app/pages/contact/contact.component.ts

import { Component, Inject, PLATFORM_ID, OnInit, OnDestroy } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

type UiLang = 'en' | 'nl';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact implements OnInit, OnDestroy {
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
      sectionLabel: 'Contact',
      title: "Let's talk about code, projects, and what we can build.",
      subtitle: 'Open to internships, junior roles, collaborations, and project feedback.',

      mainP1:
        "If you're looking for someone who enjoys learning quickly, staying calm " +
        'under pressure, and taking responsibility for a piece of the stack, ' +
        "I'd be happy to hear from you.",
      mainP2:
        'Email is usually the best way to reach me, but you can also connect on ' +
        "LinkedIn or explore my GitHub to see what I've been building.",

      emailTitle: 'Email',
      emailText: 'For opportunities, questions about my work, or longer messages.',

      linkedInTitle: 'LinkedIn',
      linkedInText: 'Connect professionally, view my experience, or send a quick message.',
      linkedInCta: 'View profile',

      githubTitle: 'GitHub',
      githubText:
        'Browse my code, experiments, and projects as I learn and ship new things.',
      githubCta: 'Visit GitHub',

      cvTitle: 'Download CV',
      cvText: 'Download a PDF version of my CV for offline review or sharing.',
      cvButton: 'Download CV',

      noteText:
        "I'm currently studying Full Stack Development at SyntraPXL, so I'm " +
        'especially interested in roles and projects where I can grow as a PHP / ' +
        'Laravel & Angular developer, introduce new tools, and help improve ' +
        'reliability and developer experience.',
    },
    nl: {
      sectionLabel: 'Contact',
      title: 'Laten we praten over code, projecten en wat we kunnen bouwen.',
      subtitle:
        'Open voor stages, junior functies, samenwerkingen en feedback op projecten.',

      mainP1:
        'Als je iemand zoekt die graag snel leert, rustig blijft onder druk ' +
        'en verantwoordelijkheid neemt voor zijn deel van de stack, hoor ik het graag.',
      mainP2:
        'E‑mail is meestal de beste manier om mij te bereiken, maar je kunt ook connecteren via ' +
        'LinkedIn of mijn GitHub bekijken om te zien waar ik mee bezig ben.',

      emailTitle: 'E‑mail',
      emailText: 'Voor kansen, vragen over mijn werk of langere berichten.',

      linkedInTitle: 'LinkedIn',
      linkedInText:
        'Maak professioneel contact, bekijk mijn ervaring of stuur een kort bericht.',
      linkedInCta: 'Bekijk profiel',

      githubTitle: 'GitHub',
      githubText:
        'Bekijk mijn code, experimenten en projecten terwijl ik leer en nieuwe dingen bouw.',
      githubCta: 'Bekijk GitHub',

      cvTitle: 'CV downloaden',
      cvText: 'Download een PDF‑versie van mijn CV om offline te bekijken of te delen.',
      cvButton: 'Download CV',

      noteText:
        'Ik studeer momenteel Full Stack Development aan SyntraPXL en ben vooral geïnteresseerd ' +
        'in rollen en projecten waarin ik kan groeien als PHP / Laravel & Angular developer, ' +
        'nieuwe tools kan introduceren en mee kan werken aan betrouwbaarheid en developer experience.',
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
