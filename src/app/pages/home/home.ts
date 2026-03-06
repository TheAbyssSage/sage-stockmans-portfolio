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
      headerMetaLine3: 'Full Stack Developer in training',
      introText:
        'I build full stack web applications with PHP, Laravel, Angular, and MySQL — ' +
        'with a focus on clear structure, responsive UI, and reliable APIs. I enjoy ' +
        'taking an idea from scratch to a working product you can click and use.',
      featuredTitle1: 'Building real projects',
      featuredTitle2: 'while I learn.',
      featuredText:
        'From small JavaScript experiments to full PHP & Angular apps, ' +
        'I focus on projects that solve real problems, teach me new patterns, ' +
        'and are solid enough to deploy and maintain.',
      featuredTags: ['Full stack', 'APIs', 'Laravel & PHP', 'Angular'],
      ctaProjects: 'View projects',
      ctaAbout: 'About me',
      statProjectsLabel: 'Projects & experiments',
      statLanguagesLabel: (count: number) => `Languages in use${count !== 1 ? 's' : ''}`,
      contactSectionLabel: 'Get in touch',
      contactText:
        "Open to internships, junior roles, and collaborations. If you're " +
        'looking for someone who enjoys learning fast and shipping working code, let’s talk.',
      contactEmail: 'Email',
    },
    nl: {
      headerLabel: 'Portfolio · Full Stack Development',
      headerMetaLine1: 'PHP · Laravel · Angular',
      headerMetaLine2: 'Arizona & België',
      headerMetaLine3: 'Full Stack Developer in opleiding',
      introText:
        'Ik bouw full stack webapplicaties met PHP, Laravel, Angular en MySQL — ' +
        'met focus op duidelijke structuur, een responsieve UI en betrouwbare APIs. ' +
        'Ik haal er plezier uit om een idee van nul tot een werkende applicatie te brengen.',
      featuredTitle1: 'Echte projecten bouwen',
      featuredTitle2: 'terwijl ik leer.',
      featuredText:
        'Van kleine JavaScript-experimenten tot volledige PHP- en Angular-apps: ' +
        'ik werk aan projecten die echte problemen oplossen, mij nieuwe patronen leren, ' +
        'en stevig genoeg zijn om te deployen en te onderhouden.',
      featuredTags: ['Full stack', 'APIs', 'Laravel & PHP', 'Angular'],
      ctaProjects: 'Bekijk projecten',
      ctaAbout: 'Over mij',
      statProjectsLabel: 'Projecten & experimenten',
      statLanguagesLabel: (count: number) => `Gebruikte talen`,
      contactSectionLabel: 'Contact',
      contactText:
        'Ik sta open voor stages, junior functies en samenwerkingen. ' +
        'Als je iemand zoekt die snel leert en graag werkende code oplevert, laat gerust iets weten.',
      contactEmail: 'E‑mail',
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
