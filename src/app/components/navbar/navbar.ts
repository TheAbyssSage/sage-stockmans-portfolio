// src/app/components/navbar/navbar.component.ts

import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

type UiLang = 'en' | 'nl';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css'],
})
export class NavbarComponent implements OnInit {
  isOpen = false;
  lang: UiLang = 'en';
  private readonly LANG_KEY = 'uiLang';

  ngOnInit(): void {
    try {
      const saved = localStorage.getItem(this.LANG_KEY);
      if (saved === 'en' || saved === 'nl') {
        this.lang = saved;
      }
    } catch {
      this.lang = 'en';
    }
  }

  toggleLang(): void {
    this.lang = this.lang === 'en' ? 'nl' : 'en';
    try {
      localStorage.setItem(this.LANG_KEY, this.lang);
    } catch {
      // ignore storage errors
    }

    // Notify listeners (like Home, About, etc.)
    window.dispatchEvent(
      new CustomEvent('ui-lang-change', { detail: { lang: this.lang } })
    );
  }
}
