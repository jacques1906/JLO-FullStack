import { useTheme } from '../../../contexts/ThemeContext'
import { ThemeColor } from '../../../types/theme'

const Settings = () => {
  const { themeColor, setThemeColor } = useTheme()

  const themes: ThemeColor[] = ['sombre', 'gris', 'beige']

  const getButtonClasses = (theme: ThemeColor) => {
    const baseClasses = "font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 focus:outline-none focus:ring-4 transition-all duration-300"
    
    const themeClasses = {
      sombre: "bg-gray-900 text-[#AF8D86] hover:bg-gray-800 focus:ring-gray-700",
      gris: "bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500",
      beige: "bg-[#f5f5dc] text-gray-800 hover:bg-[#e5e5c5] focus:ring-[#d5d5b5]"
    }

    return `${baseClasses} ${themeClasses[theme]} ${themeColor === theme ? 'ring-4' : ''}`
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-accent">Paramètres</h2>
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium mb-3">Thème de l'application</h3>
          <div className="flex flex-wrap gap-2">
            {themes.map(theme => (
              <button
                key={theme}
                onClick={() => setThemeColor(theme)}
                className={getButtonClasses(theme)}
                type="button"
              >
                {theme.charAt(0).toUpperCase() + theme.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings 