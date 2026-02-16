import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
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

  constructor(private projectsService: ProjectsService) {}

  ngOnInit(): void {
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
    });
  }
}


