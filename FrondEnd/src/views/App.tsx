import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import TaskList from './components/tasks/TaskList'
import Settings from './components/theme/Settings'
import Navigation from './components/layout/Navigation'
import { ThemeProvider } from '../contexts/ThemeContext'

function App() {
  return (
    <Router>
      <ThemeProvider>
        <div className="min-h-screen bg-background">
          <header className="bg-secondary shadow-md">
            <div className="max-w-7xl mx-auto px-4 py-6">
              <h1 className="text-4xl font-bold text-accent text-center mb-4">
                Gestionnaire de Tâches
              </h1>
              <Navigation />
            </div>
          </header>
          <main className="max-w-4xl mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<TaskList />} />
              <Route path="/taches/en-cours" element={<TaskList showPendingOnly={true} />} />
              <Route path="/taches/terminees" element={<TaskList showCompletedOnly={true} />} />
              <Route path="/parametres" element={<Settings />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </Router>
  )
}

export default App 