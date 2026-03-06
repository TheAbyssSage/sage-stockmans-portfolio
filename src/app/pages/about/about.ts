import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

type UiLang = 'en' | 'nl';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './about.html',
  styleUrls: ['./about.css'],
})
export class AboutComponent implements OnInit, OnDestroy {
  uiLang: UiLang = 'en';
  private readonly LANG_KEY = 'uiLang';

  private langListener = (event: Event) => {
    const custom = event as CustomEvent<{ lang: UiLang }>;
    const nextLang = custom.detail?.lang;
    if (nextLang === 'en' || nextLang === 'nl') {
      this.uiLang = nextLang;
    }
  };

  t = {
    en: {
      sectionLabel: 'About',
      title: 'Full stack developer in training,\nwho likes to understand the whole system.',
      subtitle: 'Arizona & Belgium · PHP, Laravel, Angular, MySQL',

      snapshotTitle: 'Snapshot',
      snapshotText:
        "I'm Sage Stockmans — a full stack developer in training who enjoys " +
        'taking an idea from a rough sketch to a working web application, ' +
        'across backend, frontend, and database.',
      snapshotCurrentFocusLabel: 'Current focus',
      snapshotCurrentFocus: 'Full Stack @ SyntraPXL',
      snapshotStacksLabel: 'Stacks',
      snapshotStacks: 'PHP/Laravel · Angular · MySQL',
      snapshotLanguagesLabel: 'Languages',
      snapshotLanguages: 'Dutch & English',
      snapshotStyleLabel: 'Working style',
      snapshotStyle: 'Calm, curious, team‑oriented',

      whoTitle: 'Who I am',
      whoP1:
        "I'm Sage Stockmans, with roots in both Belgium and the United States. " +
        "I'm fluent in Dutch and English, and I tend to stay calm and focused " +
        'when things get complex or time‑sensitive.',
      whoP2:
        "I'm currently studying Full Stack Development at SyntraPXL. I'm drawn " +
        'to full stack work because it gives me creative freedom: design the ' +
        'database, build the API, wire up the UI, and finish with something you ' +
        'can actually click and use.',
      whoP3:
        'I like understanding how all the pieces fit together — from routing and ' +
        'validation on the backend, to state and UX on the frontend.',

      quickFactsTitle: 'Quick facts',
      quickLocationLabel: 'Location',
      quickLocation: 'Arizona City · Hasselt ties',
      quickTimeLabel: 'Time pressure',
      quickTime: 'Comfortable under deadlines',
      quickCollabLabel: 'Collaboration',
      quickCollab: 'Enjoys pair programming & reviews',
      quickLearnLabel: 'Learning style',
      quickLearn: 'Hands‑on projects & experiments',

      whatTitle: 'What I work with',
      pillBackendLabel: 'Backend',
      pillBackendValue: 'PHP (OOP), Laravel, REST APIs',
      pillFrontendLabel: 'Frontend',
      pillFrontendValue: 'Angular, TypeScript, JavaScript',
      pillDataLabel: 'Data',
      pillDataValue: 'MySQL, database design & normalization',
      pillWorkflowLabel: 'Workflow',
      pillWorkflowValue: 'Agile & Scrum, Git, code reviews',
      pillAiLabel: 'AI',
      pillAiValue: 'Learned to interpret the results and always double‑check them',

      howBuildTitle: 'How I like to build',
      howBuildP:
        'I care about clear structure, predictable APIs, and frontends that feel ' +
        'simple to use. I enjoy debugging weird bugs, improving error handling, ' +
        'and making sure the app is reliable enough to show to real users – whether ' +
        'I wrote it by hand or used AI to speed up part of the process.',
      howBuildTags: ['Clean structure', 'Error handling', 'Readable code', 'Real users in mind'],

      nowTitle: "What I'm working on now",
      nowP1:
        "I'm focusing on projects that combine a PHP/Laravel backend with an " +
        'Angular frontend: REST APIs, authentication, forms, and state.',
      nowP2:
        "I'm especially interested in reliability patterns, better error messages, " +
        "and making it easy to understand what's going on in the system — even " +
        'when something goes wrong.',
      nowCtaProjects: 'See the projects behind this',
      nowCtaContact: 'Reach out',

      outsideTitle: 'Outside of code',
      outsideP1:
        "I'm into music and games — anything with good atmosphere, tension, and " +
        'a story. That same mix of systems and feeling is what I like in software ' +
        'too: not just code that works, but interfaces that feel considered.',
      outsideP2:
        "If you're looking for someone who enjoys problem‑solving, learns quickly, " +
        "and likes taking ownership of a piece of the stack, I'd be happy to talk.",
    },
    nl: {
      sectionLabel: 'Over mij',
      title: 'Full stack developer in opleiding,\ndie graag het hele systeem begrijpt.',
      subtitle: 'Arizona & België · PHP, Laravel, Angular, MySQL',

      snapshotTitle: 'Snapshot',
      snapshotText:
        'Ik ben Sage Stockmans — een full stack developer in opleiding die het leuk vindt ' +
        'om een idee van ruwe schets naar een werkende webapplicatie te brengen, ' +
        'van backend tot frontend en database.',
      snapshotCurrentFocusLabel: 'Huidige focus',
      snapshotCurrentFocus: 'Full Stack @ SyntraPXL',
      snapshotStacksLabel: 'Stacks',
      snapshotStacks: 'PHP/Laravel · Angular · MySQL',
      snapshotLanguagesLabel: 'Talen',
      snapshotLanguages: 'Nederlands & Engels',
      snapshotStyleLabel: 'Werkstijl',
      snapshotStyle: 'Rustig, nieuwsgierig, teamgericht',

      whoTitle: 'Wie ik ben',
      whoP1:
        'Ik ben Sage Stockmans, met roots in zowel België als de Verenigde Staten. ' +
        'Ik spreek vloeiend Nederlands en Engels, en blijf meestal rustig en gefocust ' +
        'als het complex of tijdsgebonden wordt.',
      whoP2:
        'Ik studeer momenteel Full Stack Development aan SyntraPXL. Full stack spreekt me aan ' +
        'omdat het creatieve vrijheid geeft: de database ontwerpen, de API bouwen, de UI koppelen, ' +
        'en eindigen met iets waar je echt op kunt klikken.',
      whoP3:
        'Ik wil begrijpen hoe alle stukken in elkaar passen — van routing en validatie in de backend ' +
        'tot state en UX in de frontend.',

      quickFactsTitle: 'Korte feiten',
      quickLocationLabel: 'Locatie',
      quickLocation: 'Arizona City · Hasselt',
      quickTimeLabel: 'Tijdsdruk',
      quickTime: 'Voelt zich oké onder deadlines',
      quickCollabLabel: 'Samenwerking',
      quickCollab: 'Houdt van pair programming & reviews',
      quickLearnLabel: 'Leerstijl',
      quickLearn: 'Leren door projecten en experimenten',

      whatTitle: 'Waar ik mee werk',
      pillBackendLabel: 'Backend',
      pillBackendValue: 'PHP (OOP), Laravel, REST APIs',
      pillFrontendLabel: 'Frontend',
      pillFrontendValue: 'Angular, TypeScript, JavaScript',
      pillDataLabel: 'Data',
      pillDataValue: 'MySQL, database‑ontwerp & normalisatie',
      pillWorkflowLabel: 'Workflow',
      pillWorkflowValue: 'Agile & Scrum, Git, code reviews',
      pillAiLabel: 'AI',
      pillAiValue: 'Resultaten interpreteren en altijd zelf dubbelchecken',

      howBuildTitle: 'Hoe ik graag bouw',
      howBuildP:
        'Ik geef om een duidelijke structuur, voorspelbare APIs en frontends die eenvoudig aanvoelen. ' +
        'Ik vind het leuk om rare bugs op te lossen, foutafhandeling te verbeteren en ervoor te zorgen ' +
        'dat een app betrouwbaar genoeg is om aan echte gebruikers te tonen – of ik nu alles met de hand schrijf, ' +
        'of AI gebruik om stukken te versnellen.',
      howBuildTags: ['Duidelijke structuur', 'Foutafhandeling', 'Leesbare code', 'Echte gebruikers in gedachten'],

      nowTitle: 'Waar ik nu aan werk',
      nowP1:
        'Ik focus op projecten die een PHP/Laravel‑backend combineren met een Angular‑frontend: REST APIs, ' +
        'authenticatie, formulieren en state.',
      nowP2:
        'Ik ben vooral geïnteresseerd in patronen rond betrouwbaarheid, betere foutmeldingen, ' +
        'en het makkelijk maken om te begrijpen wat er in het systeem gebeurt — ook als er iets misgaat.',
      nowCtaProjects: 'Bekijk de projecten hierbij',
      nowCtaContact: 'Neem contact op',

      outsideTitle: 'Naast code',
      outsideP1:
        'Ik houd van muziek en games — alles met sfeer, spanning en een goed verhaal. Die combinatie van systemen ' +
        'en gevoel zie ik ook graag terug in software: niet alleen code die werkt, maar interfaces die doordacht aanvoelen.',
      outsideP2:
        'Zoek je iemand die graag problemen oplost, snel leert en verantwoordelijkheid neemt voor zijn deel van de stack, ' +
        'dan praat ik graag verder.',
    },
  };

  ngOnInit(): void {
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

  ngOnDestroy(): void {
    window.removeEventListener('ui-lang-change', this.langListener as EventListener);
  }

  get current() {
    return this.t[this.uiLang];
  }
}
