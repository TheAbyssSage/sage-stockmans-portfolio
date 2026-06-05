// src/app/pages/contact/contact.component.ts

import { Component, Inject, PLATFORM_ID, OnInit, OnDestroy } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';

type UiLang = 'en' | 'nl';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, RouterModule],
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
      title: "Let's discuss how I can contribute to your next project.",
      subtitle: 'Open to full stack roles, freelance projects, collaborations, and consulting.',

      mainP1:
        "If you're looking for a developer who delivers clean, maintainable code, stays calm " +
        'under pressure, and takes full ownership of their work, ' +
        "I'd be happy to hear from you.",
      mainP2:
        'Email is usually the best way to reach me, but you can also connect on ' +
        "LinkedIn or explore my GitHub to see what I've been building.",

      availabilityLabel: 'Availability',
      availabilityStatus: 'Available for new projects',
      availabilityNote: 'Booking for Q3 2026 · Response within 24 hours',

      formTitle: 'Send a message',
      formNameLabel: 'Name',
      formNamePlaceholder: 'Your name',
      formEmailLabel: 'Email',
      formEmailPlaceholder: 'your@email.com',
      formProjectLabel: 'Project type',
      formProjectPlaceholder: 'Select a project type',
      formProjectOptions: ['Web Application', 'API / Integration', 'E-commerce', 'Frontend Migration', 'Maintenance / Support', 'Other'],
      formTimelineLabel: 'Timeline / Urgency',
      formTimelinePlaceholder: 'Select a timeline',
      formTimelineOptions: ['ASAP (within 2 weeks)', '1–2 months', '3–6 months', 'Flexible / exploring', 'Not sure yet'],
      formMessageLabel: 'Message',
      formMessagePlaceholder: 'Tell me about your project, timeline, and goals...',
      formSubmit: 'Send Message',
      formPrivacy: 'By submitting, you agree to the ',
      formPrivacyLink: 'Privacy Policy',

      emailTitle: 'Email',
      emailText: 'For opportunities, project inquiries, or detailed discussions.',

      linkedInTitle: 'LinkedIn',
      linkedInText: 'Connect professionally, view my experience, or send a quick message.',
      linkedInCta: 'View profile',

      githubTitle: 'GitHub',
      githubText:
        'Browse my code, projects, and contributions as I build and ship production applications.',
      githubCta: 'Visit GitHub',

      cvTitle: 'Download CV',
      cvText: 'Download a PDF version of my CV for offline review or sharing.',
      cvButtonEn: 'English CV',
      cvButtonNl: 'Dutch CV',

      faqTitle: 'Frequently asked questions',
      faqRateQ: 'What are your rates?',
      faqRateA:
        'Rates depend on project scope and complexity. I offer both fixed-price projects and hourly arrangements. ' +
        "Contact me with your requirements and I'll provide a transparent quote within 24 hours.",
      faqRemoteQ: 'Do you work remotely?',
      faqRemoteA:
        'Yes. I work remotely with clients worldwide and can align with most time zones. ' +
        'For clients in Belgium or the Netherlands, in-person meetings are also possible.',
      faqTimelineQ: 'How long does a typical project take?',
      faqTimelineA:
        'A simple business website takes 2–3 weeks. A full custom web application typically takes 6–12 weeks. ' +
        "I'll give you a detailed timeline during our discovery call.",
      faqTechQ: 'Can you work with our existing tech stack?',
      faqTechA:
        'Absolutely. While I specialize in PHP/Laravel and Angular, I can adapt to your existing stack ' +
        'or recommend the best technology for your specific needs.',

      noteText:
        "I hold a diploma in Full Stack Development from SyntraPXL and I'm " +
        'actively seeking opportunities where I can contribute as a PHP / ' +
        'Laravel & Angular developer, drive technical improvements, ' +
        'and deliver reliable, business-focused solutions.',
    },
    nl: {
      sectionLabel: 'Contact',
      title: 'Laten we bespreken hoe ik kan bijdragen aan uw volgende project.',
      subtitle:
        'Open voor full stack functies, freelance projecten, samenwerkingen en consulting.',

      mainP1:
        'Als u een developer zoekt die schone, onderhoudbare code oplevert, rustig blijft onder druk ' +
        'en volledig eigenaarschap neemt over zijn werk, hoor ik het graag.',
      mainP2:
        'E‑mail is meestal de beste manier om mij te bereiken, maar u kunt ook connecteren via ' +
        'LinkedIn of mijn GitHub bekijken om te zien waar ik mee bezig ben.',

      availabilityLabel: 'Beschikbaarheid',
      availabilityStatus: 'Beschikbaar voor nieuwe projecten',
      availabilityNote: 'Boeking voor Q3 2026 · Reactie binnen 24 uur',

      formTitle: 'Stuur een bericht',
      formNameLabel: 'Naam',
      formNamePlaceholder: 'Uw naam',
      formEmailLabel: 'E‑mail',
      formEmailPlaceholder: 'uw@email.com',
      formProjectLabel: 'Projecttype',
      formProjectPlaceholder: 'Selecteer een projecttype',
      formProjectOptions: ['Webapplicatie', 'API / Integratie', 'E-commerce', 'Frontend-migratie', 'Onderhoud / Support', 'Anders'],
      formTimelineLabel: 'Tijdlijn / Urgentie',
      formTimelinePlaceholder: 'Selecteer een tijdlijn',
      formTimelineOptions: ['ASAP (binnen 2 weken)', '1–2 maanden', '3–6 maanden', 'Flexibel / oriënterend', 'Nog niet zeker'],
      formMessageLabel: 'Bericht',
      formMessagePlaceholder: 'Vertel me over uw project, tijdlijn en doelen...',
      formSubmit: 'Bericht versturen',
      formPrivacy: 'Door te versturen gaat u akkoord met de ',
      formPrivacyLink: 'Privacyverklaring',

      emailTitle: 'E‑mail',
      emailText: 'Voor kansen, projectaanvragen of uitgebreide gesprekken.',

      linkedInTitle: 'LinkedIn',
      linkedInText:
        'Maak professioneel contact, bekijk mijn ervaring of stuur een kort bericht.',
      linkedInCta: 'Bekijk profiel',

      githubTitle: 'GitHub',
      githubText:
        'Bekijk mijn code, projecten en bijdragen terwijl ik productieapplicaties bouw en oplever.',
      githubCta: 'Bekijk GitHub',

      cvTitle: 'CV downloaden',
      cvText: 'Download een PDF‑versie van mijn CV om offline te bekijken of te delen.',
      cvButtonEn: 'Engelse CV',
      cvButtonNl: 'Nederlandse CV',

      faqTitle: 'Veelgestelde vragen',
      faqRateQ: 'Wat zijn uw tarieven?',
      faqRateA:
        'Tarieven hangen af van projectomvang en complexiteit. Ik bied zowel fixed-price projecten als uurtarieven aan. ' +
        'Neem contact op met uw vereisten en ik geef u een transparante offerte binnen 24 uur.',
      faqRemoteQ: 'Werkt u op afstand?',
      faqRemoteA:
        'Ja. Ik werk op afstand met klanten wereldwijd en kan me aanpassen aan de meeste tijdzones. ' +
        'Voor klanten in België of Nederland zijn persoonlijke meetings ook mogelijk.',
      faqTimelineQ: 'Hoe lang duurt een typisch project?',
      faqTimelineA:
        'Een eenvoudige zakelijke website duurt 2–3 weken. Een volledige custom webapplicatie duurt doorgaans 6–12 weken. ' +
        'Ik geef u een gedetailleerde tijdlijn tijdens onze discovery call.',
      faqTechQ: 'Kunt u werken met onze bestaande tech stack?',
      faqTechA:
        'Absoluut. Hoewel ik gespecialiseerd ben in PHP/Laravel en Angular, kan ik me aanpassen aan uw bestaande stack ' +
        'of de beste technologie aanbevelen voor uw specifieke behoeften.',

      noteText:
        'Ik heb een diploma in Full Stack Development van SyntraPXL en ben ' +
        'actief op zoek naar kansen waar ik kan bijdragen als PHP / ' +
        'Laravel & Angular developer, technische verbeteringen kan aansturen ' +
        'en betrouwbare, bedrijfsgerichte oplossingen kan leveren.',
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
