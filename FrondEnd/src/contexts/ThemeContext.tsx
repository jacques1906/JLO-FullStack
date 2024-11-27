import { createContext, useContext, useState, ReactNode, useEffect } from 'react'
import { ThemeColor, ThemeContextType } from '../types/theme'
import { ThemeService } from '../services/ThemeService'
import { LocalStorageService } from '../services/LocalStorageService'

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [themeColor, setThemeColor] = useState<ThemeColor>(() => 
    LocalStorageService.getTheme()
  )

  const colors = ThemeService.getDefaultColors()

  useEffect(() => {
    ThemeService.applyTheme(themeColor, colors)
    LocalStorageService.setTheme(themeColor)
  }, [themeColor])

  const handleSetThemeColor = (color: ThemeColor) => {
    setThemeColor(color)
  }

  return (
    <ThemeContext.Provider 
      value={{ 
        themeColor, 
        setThemeColor: handleSetThemeColor,
        colors 
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
} 