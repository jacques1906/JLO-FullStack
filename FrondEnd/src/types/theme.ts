export type ThemeColor = 'sombre' | 'gris' | 'beige'

export interface ThemeColors {
  background: string
  text: string
  accent: string
  secondaryBackground: string
  tertiaryBackground: string
}

export interface ThemeContextType {
  themeColor: ThemeColor
  setThemeColor: (color: ThemeColor) => void
  colors: Record<ThemeColor, ThemeColors>
}