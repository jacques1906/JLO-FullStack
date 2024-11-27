import { Link, useLocation } from 'react-router-dom'

const Navigation = () => {
  const location = useLocation()
  
  const isActive = (path: string) => {
    return location.pathname === path 
      ? 'text-accent font-bold underline' 
      : 'text-text hover:text-accent transition-colors'
  }

  return (
    <nav className="flex justify-center gap-6 mt-6">
      <Link to="/" className={isActive('/')}>
        Toutes les tâches
      </Link>
      <Link to="/taches/en-cours" className={isActive('/taches/en-cours')}>
        Tâches en cours
      </Link>
      <Link to="/taches/terminees" className={isActive('/taches/terminees')}>
        Tâches terminées
      </Link>
      <Link to="/parametres" className={isActive('/parametres')}>
        Paramètres
      </Link>
    </nav>
  )
}

export default Navigation 