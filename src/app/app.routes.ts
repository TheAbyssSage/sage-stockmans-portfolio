import { Routes } from '@angular/router';
import { PrivacyComponent } from './components/privacy/privacy';
import { TermsComponent } from './components/terms/terms';
import { ImprintComponent } from './components/imprint/imprint';
import { Home } from './pages/home/home';
import { About } from './pages/about/about';
import { ProjectsComponent } from './pages/projects/projects';
import { Contact } from './pages/contact/contact';
import { ExperienceComponent } from './pages/experience/experience';


export const routes: Routes = [
  { path: '', component: Home, pathMatch: 'full' },
  { path: 'about', component: About },
  { path: 'projects', component: ProjectsComponent },
  { path: 'contact', component: Contact },
  { path: 'experience', component: ExperienceComponent },
  { path: 'privacy', component: PrivacyComponent },
  { path: 'terms', component: TermsComponent },
  { path: 'imprint', component: ImprintComponent },
  { path: '**', redirectTo: '' },
];
