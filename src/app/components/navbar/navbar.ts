// src/app/shared/navbar/navbar.component.ts

import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';

type UiLang = 'en' | 'nl';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css'],
})
export class NavbarComponent implements OnInit {
  isOpen = false;
  lang: UiLang = 'en';
  private readonly LANG_KEY = 'uiLang';
  private isBrowser: boolean;

  t = {
    en: {
      home: 'Home',
      about: 'About',
      services: 'Services',
      projects: 'Projects',
      experience: 'Experience',
      contact: 'Contact',
    },
    nl: {
      home: 'Home',
      about: 'Over mij',
      services: 'Diensten',
      projects: 'Projecten',
      experience: 'Ervaring',
      contact: 'Contact',
    },
  };

  constructor(@Inject(PLATFORM_ID) platformId: object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    if (!this.isBrowser) {
      this.lang = 'en';
      return;
    }

    try {
      const saved = localStorage.getItem(this.LANG_KEY);
      if (saved === 'en' || saved === 'nl') {
        this.lang = saved;
      }
    } catch {
      this.lang = 'en';
    }
  }

  toggleLang(): void {
    this.lang = this.lang === 'en' ? 'nl' : 'en';

    if (this.isBrowser) {
      try {
        localStorage.setItem(this.LANG_KEY, this.lang);
      } catch {
        // ignore storage errors
      }

      // Notify listeners (Home, About, Contact, Experience, Projects, etc.)
      window.dispatchEvent(
        new CustomEvent('ui-lang-change', { detail: { lang: this.lang } })
      );
    }
  }

  openOffcanvas(): void {
    this.isOpen = true;
    if (this.isBrowser) {
      document.body.style.overflow = 'hidden';
    }
  }

  closeOffcanvas(): void {
    this.isOpen = false;
    if (this.isBrowser) {
      document.body.style.overflow = '';
    }
  }

  get current() {
    return this.t[this.lang];
  }
}
