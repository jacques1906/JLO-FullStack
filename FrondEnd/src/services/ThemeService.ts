import { ThemeColor, ThemeColors } from '../types/theme'

export class ThemeService {
  static applyTheme(theme: ThemeColor, colors: Record<ThemeColor, ThemeColors>): void {
    const root = document.documentElement
    const selectedTheme = colors[theme]
    
    root.style.setProperty('--background-color', selectedTheme.background)
    root.style.setProperty('--text-color', selectedTheme.text)
    root.style.setProperty('--accent-color', selectedTheme.accent)
    root.style.setProperty('--secondary-background', selectedTheme.secondaryBackground)
    root.style.setProperty('--tertiary-background', selectedTheme.tertiaryBackground)
  }

  static getDefaultColors(): Record<ThemeColor, ThemeColors> {
    return {
      sombre: {
        background: '#000000',
        text: '#AF8D86',
        accent: '#EDBFC6',
        secondaryBackground: '#1a1a1a',
        tertiaryBackground: '#2a2a2a'
      },
      gris: {
        background: '#4a4a4a',
        text: '#ffffff',
        accent: '#747bff',
        secondaryBackground: '#3a3a3a',
        tertiaryBackground: '#2a2a2a'
      },
      beige: {
        background: '#f5f5dc',
        text: '#333333',
        accent: '#646cff',
        secondaryBackground: '#ffffff',
        tertiaryBackground: '#e5e5c5'
      }
    }
  }
} 