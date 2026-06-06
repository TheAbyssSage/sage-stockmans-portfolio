import { Component, Inject, PLATFORM_ID, OnInit, OnDestroy } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';

type UiLang = 'en' | 'nl';

@Component({
  selector: 'app-cookie-consent',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cookie-consent.html',
  styleUrl: './cookie-consent.css',
})
export class CookieConsentComponent implements OnInit, OnDestroy {
  showBanner = false;
  private isBrowser: boolean;

  uiLang: UiLang = 'en';

  private langListener = (event: Event) => {
    const custom = event as CustomEvent<{ lang: UiLang }>;
    const nextLang = custom.detail?.lang;
    if (nextLang === 'en' || nextLang === 'nl') {
      this.uiLang = nextLang;
    }
  };

  t = {
    en: {
      message: 'This site uses essential cookies and respects your privacy. No tracking.',
      accept: 'Got it',
      privacy: 'Privacy Policy',
    },
    nl: {
      message: 'Deze site gebruikt essentiële cookies en respecteert uw privacy. Geen tracking.',
      accept: 'Begrepen',
      privacy: 'Privacyverklaring',
    },
  };

  constructor(@Inject(PLATFORM_ID) platformId: object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      try {
        const consent = localStorage.getItem('cookieConsent');
        if (!consent) {
          this.showBanner = true;
        }
        const savedLang = localStorage.getItem('uiLang');
        if (savedLang === 'en' || savedLang === 'nl') {
          this.uiLang = savedLang;
        }
      } catch {
        this.showBanner = true;
      }

      window.addEventListener('ui-lang-change', this.langListener as EventListener);
    }
  }

  ngOnDestroy(): void {
    if (this.isBrowser) {
      window.removeEventListener('ui-lang-change', this.langListener as EventListener);
    }
  }

  accept(): void {
    this.showBanner = false;
    if (this.isBrowser) {
      try {
        localStorage.setItem('cookieConsent', 'true');
      } catch {
        // ignore
      }
    }
  }

  get current() {
    return this.t[this.uiLang];
  }
}
