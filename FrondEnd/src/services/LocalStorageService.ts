import { ThemeColor } from '../types/theme'

export class LocalStorageService {
  static getTheme(): ThemeColor {
    return (localStorage.getItem('theme') as ThemeColor) || 'sombre'
  }

  static setTheme(theme: ThemeColor): void {
    localStorage.setItem('theme', theme)
  }
} 