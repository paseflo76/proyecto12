// src/App.jsx
import { Routes, Route } from 'react-router-dom'
import Nav from './components/Nav/Nav'
import HundirLaFlota from './components/HundirLaFlota/HundirLaFlota.jsx'
import Bingo from './components/Bingo/Bingo'
import { GameProvider } from './hooks/GameProvider.jsx'
import './App.css'
export default function App() {
  return (
    <GameProvider>
      <Nav />
      <Routes>
        <Route path='/' element={<HundirLaFlota />} />
        <Route path='/bingo' element={<Bingo />} />
      </Routes>
    </GameProvider>
  )
}
