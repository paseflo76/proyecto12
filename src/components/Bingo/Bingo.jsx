import React from 'react'
import { useBingo } from '../../hooks/useBingo'
import CardCell from './CardCell.jsx'
import './Bingo.css'

function generarCarton() {
  const nums = Array.from({ length: 100 }, (_, i) => i + 1).sort(
    () => 0.5 - Math.random()
  )
  return nums
}

const initialState = {
  card: generarCarton(),
  drawn: []
}

function reducer(state, action) {
  switch (action.type) {
    case 'DRAW': {
      const remaining = state.card.filter((n) => !state.drawn.includes(n))
      if (remaining.length === 0) return state
      const next = remaining[Math.floor(Math.random() * remaining.length)]
      return { ...state, drawn: [...state.drawn, next] }
    }
    case 'RESET':
      return { card: generarCarton(), drawn: [] }
    default:
      return state
  }
}

export default function Bingo() {
  const { state, dispatch } = useBingo(initialState, reducer)

  return (
    <section className='bingo-container'>
      <h1>Bingo</h1>
      <div className='bg-container'>
        <img src='/assets/bingo.png' alt='fondo bingo' className='bg-img' />
      </div>
      <div className='bingo-grid'>
        {(state?.card || []).map((n, i) => (
          <CardCell key={i} number={n} drawn={state.drawn.includes(n)} />
        ))}
      </div>
      <button onClick={() => dispatch({ type: 'DRAW' })}>Sacar Número</button>
      <button onClick={() => dispatch({ type: 'RESET' })}>Reiniciar</button>
    </section>
  )
}
