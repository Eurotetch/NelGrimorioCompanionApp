import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import GamesList from './pages/GamesList'
import RecommendGame from './features/RecommendGame'
import UserProfile from './pages/UserProfile'
import Login from './pages/Login'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/games" element={<GamesList />} />
      <Route path="/profile" element={<UserProfile />} />
      
      {/* Pagine placeholder per il menu */}
      <Route path="/marketplace" element={<PlaceholderPage title="Mercatino" />} />
      <Route path="/events" element={<PlaceholderPage title="Eventi" />} />
      <Route path="/feedback" element={<PlaceholderPage title="Feedback" />} />
      <Route path="/login" element={<Login />} />
	  
	  {/* Features esterne nel menu*/}
	  <Route path="/recommend" element={<RecommendGame />} />
    </Routes>
  )
}

// Componente temporaneo per pagine non ancora implementate
function PlaceholderPage({ title }) {
  return (
    <div className="min-h-screen bg-stone-900 text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-yellow-400 mb-4">🚧 {title}</h1>
        <p className="text-stone-400 mb-6">Pagina in costruzione</p>
        <a href="/" className="px-6 py-3 bg-yellow-500 text-stone-900 font-bold rounded-lg inline-block hover:bg-yellow-600 transition-colors">
          Torna alla Home
        </a>
      </div>
    </div>
  )
}

export default App