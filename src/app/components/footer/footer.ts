// src/app/components/footer/footer.component.ts
import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';

type UiLang = 'en' | 'nl';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './footer.html',
  styleUrls: ['./footer.css'],
})
export class FooterComponent implements OnInit, OnDestroy {
  currentYear = new Date().getFullYear();

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
      role: 'Full Stack Developer',
      privacy: 'Privacy',
      terms: 'Terms',
      imprint: 'Imprint',
    },
    nl: {
      role: 'Full Stack Developer',
      privacy: 'Privacy',
      terms: 'Voorwaarden',
      imprint: 'Impressum',
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
