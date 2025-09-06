import { Link } from 'react-router-dom'
import './Nav.css'
export default function Nav() {
  return (
    <div className='nav-container'>
      <nav className='enlaces'>
        <Link to='/bingo'>Bingo</Link>
        <Link to='/'>Hundir la Flota</Link>
      </nav>
    </div>
  )
}
