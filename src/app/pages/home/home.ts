import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { ProjectsService, ProjectEntry } from '../projects/projects.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  projectCount = 0;
  uniqueLanguages = new Set<string>();
  languages: string[] = [];
  private isBrowser: boolean;
  private readonly CACHE_KEY = 'home-stats-cache';

  constructor(
    private projectsService: ProjectsService,
    @Inject(PLATFORM_ID) platformId: object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    // Try to load from cache first
    if (this.isBrowser) {
      const cached = this.loadFromCache();
      if (cached) {
        this.projectCount = cached.projectCount;
        this.languages = cached.languages;
        return;
      }
    }

    // No cache, fetch from API
    this.projectsService.getProjects().subscribe((projects: ProjectEntry[]) => {
      this.projectCount = projects.length;

      // Collect unique languages from all projects
      projects.forEach((project: ProjectEntry) => {
        const langs = project.stack.split(' · ');
        langs.forEach((lang: string) => {
          this.uniqueLanguages.add(lang.trim());
        });
      });

      // Convert to array and sort
      this.languages = Array.from(this.uniqueLanguages).sort();

      // Save to cache
      if (this.isBrowser) {
        this.saveToCache();
      }
    });
  }

  private loadFromCache(): { projectCount: number; languages: string[] } | null {
    try {
      const cached = localStorage.getItem(this.CACHE_KEY);
      if (cached) {
        return JSON.parse(cached);
      }
    } catch (e) {
      // Ignore parse errors
    }
    return null;
  }

  private saveToCache(): void {
    try {
      const data = {
        projectCount: this.projectCount,
        languages: this.languages,
      };
      localStorage.setItem(this.CACHE_KEY, JSON.stringify(data));
    } catch (e) {
      // Ignore storage errors
    }
  }
}

