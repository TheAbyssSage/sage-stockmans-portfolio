import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

type UiLang = 'en' | 'nl';

@Component({
  selector: 'app-privacy',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './privacy.html',
  styleUrls: ['./privacy.css'],
})
export class PrivacyComponent implements OnInit, OnDestroy {
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
      title: 'Privacy Policy',
      subtitle: 'A short overview of what this portfolio does and doesn\'t do with data.',
      overviewTitle: '1. Overview',
      overviewText: 'This site is a personal portfolio built to showcase my work as a full stack developer. It does not collect analytics, does not track visitors, and does not use cookies for profiling.',
      dataTitle: '2. What data is processed',
      dataText1: 'When you visit this site, standard technical information is processed by the hosting provider (Netlify), such as IP address, browser type, and basic request logs. These logs are used only for security and performance and are not used by me to profile or identify individual visitors.',
      dataText2: 'The projects page reads public data from my GitHub profile using the GitHub REST API. This only fetches information about my own repositories; it does not read anything about you.',
      contactTitle: '3. Contact',
      contactText: 'If you contact me by email, LinkedIn, or phone, any personal data you share in that message stays in those channels. I do not copy it into separate databases or sell it to anyone.',
      rightsTitle: '4. Your rights',
      rightsText: 'If you have any questions about data related to this site, you can contact me at sage.stockmans@pm.me. I\'ll respond as soon as reasonably possible.',
    },
    nl: {
      sectionLabel: 'Juridisch',
      title: 'Privacybeleid',
      subtitle: 'Een kort overzicht van wat deze portfolio wel en niet doet met data.',
      overviewTitle: '1. Overzicht',
      overviewText: 'Deze site is een persoonlijke portfolio om mijn werk als full stack developer te tonen. Hij verzamelt geen analytics, volgt geen bezoekers en gebruikt geen cookies voor profilering.',
      dataTitle: '2. Welke data wordt verwerkt',
      dataText1: 'Wanneer je deze site bezoekt, verwerkt de hostingprovider (Netlify) standaard technische informatie zoals IP-adres, browsertype en basis request-logs. Deze logs worden alleen gebruikt voor beveiliging en prestaties en niet door mij om individuele bezoekers te profileren of identificeren.',
      dataText2: 'De projectenpagina leest publieke data van mijn GitHub-profiel via de GitHub REST API. Dit haalt alleen informatie over mijn eigen repositories op; het leest niets over jou.',
      contactTitle: '3. Contact',
      contactText: 'Als je contact met mij opneemt via e-mail, LinkedIn of telefoon, blijven alle persoonlijke gegevens die je deelt in die kanalen. Ik kopieer ze niet naar aparte databases en verkoop ze niet.',
      rightsTitle: '4. Jouw rechten',
      rightsText: 'Als je vragen hebt over data met betrekking tot deze site, kun je contact opnemen via sage.stockmans@pm.me. Ik reageer zo snel als redelijkerwijs mogelijk.',
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
