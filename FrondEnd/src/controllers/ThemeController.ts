import { ThemeColor, ThemeColors } from '../types/theme'
import { LocalStorageService } from '../services/LocalStorageService'
import { ThemeService } from '../services/ThemeService'

export class ThemeController {
  private currentTheme: ThemeColor
  private notifyChange: () => void

  constructor(notifyChange: () => void) {
    this.currentTheme = LocalStorageService.getTheme()
    this.notifyChange = notifyChange
    this.applyTheme(this.currentTheme)
  }

  getTheme(): ThemeColor {
    return this.currentTheme
  }

  setTheme(color: ThemeColor): void {
    this.currentTheme = color
    LocalStorageService.setTheme(color)
    this.applyTheme(color)
    this.notifyChange()
  }

  getColors(): Record<ThemeColor, ThemeColors> {
    return ThemeService.getDefaultColors()
  }

  private applyTheme(theme: ThemeColor): void {
    ThemeService.applyTheme(theme, this.getColors())
  }
} 