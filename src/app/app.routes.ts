import { Routes } from '@angular/router';
import { Privacy } from './components/privacy/privacy';
import { Terms } from './components/terms/terms';
import { Imprint } from './components/imprint/imprint';
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
  { path: 'privacy', component: Privacy },
  { path: 'terms', component: Terms },
  { path: 'imprint', component: Imprint },
  { path: '**', redirectTo: '' },
];
