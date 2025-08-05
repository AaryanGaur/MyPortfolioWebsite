import { useState, useEffect } from 'react'
import styles from './RetroClock.module.css'

export default function RetroClock() {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(interval)
  }, [])

  const hours = time.getHours()
  const minutes = time.getMinutes()

  const hourDeg = (hours % 12) * 30 + minutes * 0.5
  const minuteDeg = minutes * 6

  // seconds
  const seconds = time.getSeconds()
  const secondDeg = (seconds * 6) 

  // styles for everything
  const secondStyle = {
    transform: `rotate(${secondDeg}deg)`,
    transition: seconds === 0 ? "none" : "transform 0.3s linear",
  }

  const hourStyle = {
    transform: `rotate(${hourDeg}deg)`,
    transition: hours === 0 ? "none" : "transform 0.3s linear",
  }

  const minuteStyle = {
    transform: `rotate(${minuteDeg}deg)`,
    transition: minutes === 0 ? "none" : "transform 0.3s linear",
  }

  // render clock
  return (
    <div className={styles.clock}>
      <div className={styles.marker} />
      <div className={styles.hand + ' ' + styles.hour} style={hourStyle} />
      <div className={styles.hand + ' ' + styles.minute} style={minuteStyle} />
        <div className={styles.hand + ' ' + styles.second} style={secondStyle} />
      <div className={styles.centerDot} />
    </div>
  )
}
