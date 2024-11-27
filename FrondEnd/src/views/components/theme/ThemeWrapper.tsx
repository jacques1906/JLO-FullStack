import { useTheme } from '../../../contexts/ThemeContext'

interface ThemeWrapperProps {
  children: React.ReactNode
}
const ThemeWrapper = ({ children }: ThemeWrapperProps) => {
  const { themeColor } = useTheme()
  
  return (
    <div className={`ThemeColor-${themeColor}`}>
      {children}    
    </div>
  )
}

export default ThemeWrapper 