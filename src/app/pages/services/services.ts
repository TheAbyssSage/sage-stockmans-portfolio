import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';

type UiLang = 'en' | 'nl';

interface ServiceItem {
  title: string;
  description: string;
  features: string[];
  stack: string[];
}

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './services.html',
  styleUrl: './services.css',
})
export class ServicesComponent implements OnInit, OnDestroy {
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
      sectionLabel: 'Services',
      title: 'What I can build for you.',
      subtitle: 'End-to-end web development with a focus on clean architecture, reliable delivery, and business results.',

      processTitle: 'How I work',
      processStep1Title: 'Discovery',
      processStep1Text: 'I start by understanding your business needs, constraints, and goals. No assumptions — just clear requirements.',
      processStep2Title: 'Planning',
      processStep2Text: 'Architecture, timeline, and milestones. You get a transparent roadmap before a single line of code is written.',
      processStep3Title: 'Development',
      processStep3Text: 'Agile sprints with regular updates. Clean code, version control, and continuous testing from day one.',
      processStep4Title: 'Delivery',
      processStep4Text: 'Testing, deployment, documentation, and handoff. Your application is production-ready and maintainable.',
      processStep5Title: 'Support',
      processStep5Text: 'I stay available for maintenance, iterations, and scaling as your business grows.',

      ctaTitle: 'Ready to start a project?',
      ctaText: "Tell me what you're building and I'll get back to you within 24 hours.",
      ctaButton: 'Get in touch',

      availabilityLabel: 'Availability',
      availabilityStatus: 'Available for new projects',
      availabilityNote: 'Booking for Q3 2026',
    },
    nl: {
      sectionLabel: 'Diensten',
      title: 'Wat ik voor u kan bouwen.',
      subtitle: 'End-to-end webontwikkeling met focus op heldere architectuur, betrouwbare oplevering en bedrijfsresultaten.',

      processTitle: 'Hoe ik werk',
      processStep1Title: 'Ontdekking',
      processStep1Text: 'Ik begin met het begrijpen van uw bedrijfsbehoeften, beperkingen en doelen. Geen aannames — alleen duidelijke vereisten.',
      processStep2Title: 'Planning',
      processStep2Text: 'Architectuur, tijdlijn en mijlpalen. U krijgt een transparante roadmap voordat er een regel code wordt geschreven.',
      processStep3Title: 'Ontwikkeling',
      processStep3Text: 'Agile sprints met regelmatige updates. Schone code, versiebeheer en continue testen vanaf dag één.',
      processStep4Title: 'Oplevering',
      processStep4Text: 'Testen, deployment, documentatie en overdracht. Uw applicatie is productieklaar en onderhoudbaar.',
      processStep5Title: 'Ondersteuning',
      processStep5Text: 'Ik blijf beschikbaar voor onderhoud, iteraties en schaalvergroting naarmate uw bedrijf groeit.',

      ctaTitle: 'Klaar om een project te starten?',
      ctaText: 'Vertel me wat u aan het bouwen bent en ik reageer binnen 24 uur.',
      ctaButton: 'Neem contact op',

      availabilityLabel: 'Beschikbaarheid',
      availabilityStatus: 'Beschikbaar voor nieuwe projecten',
      availabilityNote: 'Boeking voor Q3 2026',
    },
  };

  servicesData = {
    en: [
      {
        title: 'Custom Web Applications',
        description: 'Full stack applications built to solve your specific business problems — from internal tools to customer-facing platforms.',
        features: ['Scalable architecture', 'RESTful APIs', 'Authentication & authorization', 'Database design'],
        stack: ['PHP', 'Laravel', 'Angular', 'MySQL'],
      },
      {
        title: 'API Development & Integration',
        description: 'Build new APIs or integrate with third-party services — payment gateways, CRMs, shipping providers, and more.',
        features: ['REST API design', 'Third-party integrations', 'Webhook handling', 'API documentation'],
        stack: ['PHP', 'Laravel', 'REST', 'JSON'],
      },
      {
        title: 'E-commerce Solutions',
        description: 'Online stores and payment flows that convert visitors into customers — with secure checkout and automated invoicing.',
        features: ['Product catalogs', 'Payment processing', 'Automatic invoicing', 'Order management'],
        stack: ['Laravel', 'Stripe', 'MySQL'],
      },
      {
        title: 'Database Design & Optimization',
        description: 'Well-structured databases that grow with your business — from schema design to query optimization.',
        features: ['Schema design', 'Normalization', 'Query optimization', 'Migration strategies'],
        stack: ['MySQL', 'Tableplus', 'sqlite'],
      },
      {
        title: 'Frontend Modernization',
        description: 'Migrate legacy frontends to modern Angular applications with responsive design and smooth user experiences.',
        features: ['Angular migration', 'Responsive UI', 'Performance tuning', 'Accessibility (a11y)'],
        stack: ['Angular', 'TypeScript', 'Bootstrap'],
      },
      {
        title: 'Maintenance & Support',
        description: 'Ongoing support for existing applications — bug fixes, feature additions, security updates, and performance improvements.',
        features: ['Bug fixes', 'Feature additions', 'Security patches', 'Performance audits'],
        stack: ['PHP', 'Laravel', 'Angular', 'MySQL'],
      },
    ],
    nl: [
      {
        title: 'Op Maat Gemaakte Webapplicaties',
        description: 'Full stack applicaties gebouwd om uw specifieke bedrijfsproblemen op te lossen — van interne tools tot klantgerichte platforms.',
        features: ['Schaalbare architectuur', 'RESTful APIs', 'Authenticatie & autorisatie', 'Database-ontwerp'],
        stack: ['PHP', 'Laravel', 'Angular', 'MySQL'],
      },
      {
        title: 'API-ontwikkeling & Integratie',
        description: 'Bouw nieuwe APIs of integreer met derde partijen — betalingsgateways, CRMs, verzendproviders en meer.',
        features: ['REST API-ontwerp', 'Integraties met derde partijen', 'Webhook-afhandeling', 'API-documentatie'],
        stack: ['PHP', 'Laravel', 'REST', 'JSON'],
      },
      {
        title: 'E-commerce Oplossingen',
        description: 'Online winkels en betalingsstromen die bezoekers omzetten in klanten — met veilige checkout en automatische facturering.',
        features: ['Productcatalogi', 'Betalingsverwerking', 'Automatische facturering', 'Orderbeheer'],
        stack: ['Laravel', 'Stripe', 'MySQL'],
      },
      {
        title: 'Database-ontwerp & Optimalisatie',
        description: 'Goed gestructureerde databases die meegroeien met uw bedrijf — van schema-ontwerp tot query-optimalisatie.',
        features: ['Schema-ontwerp', 'Normalisatie', 'Query-optimalisatie', 'Migratiestrategieën'],
        stack: ['MySQL', 'Tableplus', 'sqlite'],
      },
      {
        title: 'Frontend Modernisering',
        description: 'Migreer legacy frontends naar moderne Angular-applicaties met responsief ontwerp en soepele gebruikerservaringen.',
        features: ['Angular-migratie', 'Responsieve UI', 'Prestatie-afstemming', 'Toegankelijkheid (a11y)'],
        stack: ['Angular', 'TypeScript', 'Bootstrap'],
      },
      {
        title: 'Onderhoud & Ondersteuning',
        description: 'Doorlopende ondersteuning voor bestaande applicaties — bugfixes, functie-uitbreidingen, beveiligingsupdates en prestatieverbeteringen.',
        features: ['Bugfixes', 'Functie-uitbreidingen', 'Beveiligingspatches', 'Prestatie-audits'],
        stack: ['PHP', 'Laravel', 'Angular', 'MySQL'],
      },
    ],
  };

  get services(): ServiceItem[] {
    return this.servicesData[this.uiLang];
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
}
