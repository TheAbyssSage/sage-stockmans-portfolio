import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export interface CachedProjects {
  data: any[];
  timestamp: number;
}

@Injectable({
  providedIn: 'root',
})
export class ProjectsCacheService {
  private cache: CachedProjects | null = null;
  private readonly CACHE_KEY = 'projects-cache';
  private readonly CACHE_DURATION = 1000 * 60 * 60; // 1 hour
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: object) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.loadFromLocalStorage();
  }

  get(): any[] | null {
    if (!this.cache) return null;

    // Check if cache is stale
    const now = Date.now();
    if (now - this.cache.timestamp > this.CACHE_DURATION) {
      this.clear();
      return null;
    }

    return this.cache.data;
  }

  set(data: any[]): void {
    this.cache = {
      data,
      timestamp: Date.now(),
    };
    this.saveToLocalStorage();
  }

  clear(): void {
    this.cache = null;
    if (this.isBrowser) {
      localStorage.removeItem(this.CACHE_KEY);
    }
  }

  private loadFromLocalStorage(): void {
    if (!this.isBrowser) return;

    try {
      const cached = localStorage.getItem(this.CACHE_KEY);
      if (cached) {
        const parsed = JSON.parse(cached) as CachedProjects;
        // Verify cache isn't stale on load
        const now = Date.now();
        if (now - parsed.timestamp <= this.CACHE_DURATION) {
          this.cache = parsed;
        } else {
          localStorage.removeItem(this.CACHE_KEY);
        }
      }
    } catch (e) {
      // Ignore parse errors
    }
  }

  private saveToLocalStorage(): void {
    if (!this.isBrowser || !this.cache) return;

    try {
      localStorage.setItem(this.CACHE_KEY, JSON.stringify(this.cache));
    } catch (e) {
      // Ignore storage errors (quota exceeded, etc)
    }
  }
}
