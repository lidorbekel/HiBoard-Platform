import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

export type Theme = 'light' | 'dark';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private activeTheme = new BehaviorSubject<Theme>('light');
  activeTheme$ = this.activeTheme.asObservable();

  setActive(theme: Theme) {
    document.documentElement.setAttribute('theme', `${theme}-mode`);
    this.activeTheme.next(theme);
  }

  toggleTheme() {
    const newTheme = this.activeTheme.getValue() === 'light' ? 'dark' : 'light';
    this.setActive(newTheme);
  }

  init() {
    this.setActive('light');
  }

  getActiveTheme() {
    return this.activeTheme.getValue();
  }
}
