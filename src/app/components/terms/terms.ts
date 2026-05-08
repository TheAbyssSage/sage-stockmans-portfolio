import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

type UiLang = 'en' | 'nl';

@Component({
  selector: 'app-terms',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './terms.html',
  styleUrls: ['./terms.css'],
})
export class TermsComponent implements OnInit, OnDestroy {
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
      title: 'Terms of Use',
      subtitle: 'Simple terms for browsing this personal portfolio.',
      purposeTitle: '1. Purpose',
      purposeText: 'This site exists to present my work, skills, and projects as a full stack developer. It\'s not an online shop or a production SaaS product.',
      guaranteesTitle: '2. No guarantees',
      guaranteesText: 'I do my best to keep the information on this site accurate and up to date, but I can\'t guarantee that everything is always perfect. Use any code, examples, or ideas from this site at your own risk.',
      ipTitle: '3. Intellectual property',
      ipText: 'The design, text, and structure of this site are created by me. You\'re welcome to view and reference them, but please don\'t copy the entire site or design as your own portfolio.',
      linksTitle: '4. External links',
      linksText: 'This site links to external services like GitHub and LinkedIn. I\'m not responsible for the content, availability, or policies of those external sites.',
    },
    nl: {
      sectionLabel: 'Juridisch',
      title: 'Gebruiksvoorwaarden',
      subtitle: 'Eenvoudige voorwaarden voor het gebruik van deze persoonlijke portfolio.',
      purposeTitle: '1. Doel',
      purposeText: 'Deze site bestaat om mijn werk, vaardigheden en projecten als full stack developer te presenteren. Het is geen webshop of productie-SaaS-product.',
      guaranteesTitle: '2. Geen garanties',
      guaranteesText: 'Ik doe mijn best om de informatie op deze site accuraat en up-to-date te houden, maar ik kan niet garanderen dat alles altijd perfect is. Gebruik code, voorbeelden of ideeën van deze site op eigen risico.',
      ipTitle: '3. Intellectueel eigendom',
      ipText: 'Het ontwerp, de tekst en de structuur van deze site zijn door mij gemaakt. Je mag ze bekijken en als referentie gebruiken, maar kopieer de hele site of het ontwerp niet als je eigen portfolio.',
      linksTitle: '4. Externe links',
      linksText: 'Deze site linkt naar externe diensten zoals GitHub en LinkedIn. Ik ben niet verantwoordelijk voor de inhoud, beschikbaarheid of beleid van die externe sites.',
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
