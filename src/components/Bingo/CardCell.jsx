import React from 'react'

export default function CardCell({ number, drawn }) {
  return <div className={`card-cell ${drawn ? 'drawn' : ''}`}>{number}</div>
}
