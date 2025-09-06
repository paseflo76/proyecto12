import { useGameContext } from '../../hooks/GameContext.js'
import './HundirLaflota.css'

export default function HundirLaFlota() {
  const { state, dispatch } = useGameContext()

  return (
    <section className='game-container'>
      <div className='contain-img'>
        <img
          src='/assets/hundir.png'
          alt='fondo hundir la flota'
          className='hundir-img'
        />
      </div>

      <div className='content'>
        <h1>Hundir la Flota</h1>
        {state.gameOver && <p>Resultado: {state.result}</p>}
        <button
          className='reset-btn'
          onClick={() => dispatch({ type: 'RESET' })}
        >
          Reiniciar
        </button>
        <div className='counter'>
          Fallos: <span>{state.misses}</span> / 20
        </div>

        <div className='grid'>
          {Array.from({ length: 10 }).map((_, row) =>
            Array.from({ length: 10 }).map((_, col) => {
              const isHit = state.hits.some(([r, c]) => r === row && c === col)
              const isMiss = state.missesCoords.some(
                ([r, c]) => r === row && c === col
              )
              const isShip =
                state.gameOver &&
                state.result === '¡Perdiste!' &&
                state.ships.some(([r, c]) => r === row && c === col)

              const cellClass = isHit
                ? 'cell hit'
                : isMiss
                ? 'cell miss'
                : isShip
                ? 'cell ship'
                : 'cell empty'

              return (
                <div
                  key={`${row}-${col}`}
                  onClick={() =>
                    !state.gameOver &&
                    dispatch({ type: 'FIRE', coords: [row, col] })
                  }
                  className={cellClass}
                >
                  {isHit ? (
                    <img
                      src='/assets/explosion.png'
                      alt='hit'
                      className='cell-img'
                    />
                  ) : isMiss ? (
                    <img
                      src='/assets/agua.png'
                      alt='miss'
                      className='cell-img'
                    />
                  ) : isShip ? (
                    <img
                      src='/assets/barco.png'
                      alt='ship'
                      className='cell-img'
                    />
                  ) : null}
                </div>
              )
            })
          )}
        </div>
      </div>
    </section>
  )
}
