import styles from './Navbar.module.css'
import { useState } from 'react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <nav className={styles.navbar}> 
      <a className={styles.title} href="/">Portfolio</a>
      <div className={styles.navContainer}>
        <img className={styles.menuIcon} 
            src="/assets/menuIcon.png" 
            alt="Menu" 
            onClick={() => setIsOpen(prev => !prev)}
        />
        <ul 
            className={`${styles.navLinks} ${isOpen ? styles.menuOpen : ''}`}
            onClick={() => setIsOpen(false)}
        >
            <li><a href="#about">About</a></li>
            <li><a href="#experience">Experience</a></li>
            <li><a href="#contact">Contact</a></li>
        </ul>
      </div>
    </nav>
  )
}