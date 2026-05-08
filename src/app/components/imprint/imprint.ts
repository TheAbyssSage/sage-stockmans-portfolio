import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

type UiLang = 'en' | 'nl';

@Component({
  selector: 'app-imprint',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './imprint.html',
  styleUrls: ['./imprint.css'],
})
export class ImprintComponent implements OnInit, OnDestroy {
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
      sectionLabel: 'Legal',
      title: 'Imprint',
      subtitle: 'Basic contact and ownership information for this portfolio.',
      ownerTitle: 'Site owner',
      ownerNameLabel: 'Name:',
      ownerName: 'Sage Stockmans',
      ownerLocationLabel: 'Location:',
      ownerLocation: 'Hasselt region, Belgium',
      ownerEmailLabel: 'Email:',
      ownerEmail: 'sage.stockmans@pm.me',
      purposeTitle: 'Purpose of this site',
      purposeText: 'This is a personal portfolio to present my work as a full stack developer, including projects, skills, and experience. It is not a commercial online shop or a platform with user accounts.',
      hostingTitle: 'Hosting',
      hostingText: 'The site is hosted by Netlify. Basic technical and access logs may be processed by the hosting provider for security and performance.',
    },
    nl: {
      sectionLabel: 'Juridisch',
      title: 'Impressum',
      subtitle: 'Basis contact- en eigendomsinformatie voor deze portfolio.',
      ownerTitle: 'Site-eigenaar',
      ownerNameLabel: 'Naam:',
      ownerName: 'Sage Stockmans',
      ownerLocationLabel: 'Locatie:',
      ownerLocation: 'Regio Hasselt, België',
      ownerEmailLabel: 'E-mail:',
      ownerEmail: 'sage.stockmans@pm.me',
      purposeTitle: 'Doel van deze site',
      purposeText: 'Dit is een persoonlijke portfolio om mijn werk als full stack developer te presenteren, inclusief projecten, vaardigheden en ervaring. Het is geen commerciële webshop of een platform met gebruikersaccounts.',
      hostingTitle: 'Hosting',
      hostingText: 'De site wordt gehost door Netlify. Basis technische en toegangslogs kunnen door de hostingprovider worden verwerkt voor beveiliging en prestaties.',
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
