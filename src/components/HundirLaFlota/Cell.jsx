export default function Cell({ hit, onClick }) {
  return <button className={`cell ${hit ? 'hit' : ''}`} onClick={onClick} />
}
