
import React from 'react'
import { GameContext } from './GameContext.js'
import { useGame } from './useGame.js'

export function GameProvider({ children }) {
  const game = useGame() 
  return <GameContext.Provider value={game}>{children}</GameContext.Provider>
}
