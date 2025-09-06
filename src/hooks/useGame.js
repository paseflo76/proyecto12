
import { useReducer } from 'react'

const shipSizes = [5, 4, 3, 3, 2]

function placeShips(gridSize = 10) {
  const ships = []
  const occupied = new Set()
  const toKey = (r, c) => `${r},${c}`

  for (let size of shipSizes) {
    let placed = false
    while (!placed) {
      const horizontal = Math.random() < 0.5
      const row = Math.floor(Math.random() * gridSize)
      const col = Math.floor(Math.random() * gridSize)
      const coords = []

      for (let i = 0; i < size; i++) {
        const r = horizontal ? row : row + i
        const c = horizontal ? col + i : col
        if (r >= gridSize || c >= gridSize) {
          coords.length = 0
          break
        }
        coords.push([r, c])
      }

      if (coords.length !== size) continue

      const conflict = coords.some(([r, c]) => {
        for (let dr = -1; dr <= 1; dr++) {
          for (let dc = -1; dc <= 1; dc++) {
            if (occupied.has(toKey(r + dr, c + dc))) return true
          }
        }
        return false
      })

      if (!conflict) {
        coords.forEach(([r, c]) => {
          for (let dr = -1; dr <= 1; dr++) {
            for (let dc = -1; dc <= 1; dc++) {
              occupied.add(toKey(r + dr, c + dc))
            }
          }
        })
        ships.push(coords)
        placed = true
      }
    }
  }
  return ships.flat()
}

const initialState = () => ({
  ships: placeShips(),
  hits: [],
  missesCoords: [],
  misses: 0,
  gameOver: false,
  result: null
})

function reducer(state, action) {
  switch (action.type) {
    case 'FIRE': {
      const [row, col] = action.coords
      const alreadyFired =
        state.hits.some(([r, c]) => r === row && c === col) ||
        state.missesCoords.some(([r, c]) => r === row && c === col)
      if (alreadyFired) return state

      const isHit = state.ships.some(([r, c]) => r === row && c === col)
      const newHits = isHit ? [...state.hits, [row, col]] : state.hits
      const newMissesCoords = isHit
        ? state.missesCoords
        : [...state.missesCoords, [row, col]]
      const newMisses = isHit ? state.misses : state.misses + 1

      const win = newHits.length === state.ships.length
      const lose = newMisses >= 20

      return {
        ...state,
        hits: newHits,
        missesCoords: newMissesCoords,
        misses: newMisses,
        gameOver: win || lose,
        result: win ? '¡Ganaste!' : lose ? '¡Perdiste!' : null
      }
    }
    case 'RESET':
      return initialState()
    default:
      return state
  }
}

export function useGame() {
  const [state, dispatch] = useReducer(reducer, undefined, initialState)
  return { state, dispatch }
}
