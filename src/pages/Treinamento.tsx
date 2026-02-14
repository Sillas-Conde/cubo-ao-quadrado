import { useCallback, useEffect, useRef, useState } from 'react'
// import { useAuth } from '../context/AuthContext'
import { loadTimerHistory, addTimeToHistory } from '../utils/timerStorage'
import './Treinamento.css'

function formatTime(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000)
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  const hundredths = Math.floor((ms % 1000) / 10)
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${hundredths.toString().padStart(2, '0')}`
}

export function Treinamento() {
  // const { user } = useAuth()
  const [time, setTime] = useState(0)
  const [running, setRunning] = useState(false)
  const [history, setHistory] = useState<string[]>([])
  const startRef = useRef<number>(0)
  const rafRef = useRef<number>(0)

  // const email = user?.email ?? ''
  const email = 'teste@teste.com'

  useEffect(() => {
    if (email) setHistory(loadTimerHistory(email))
  }, [email])

  const tick = useCallback(() => {
    rafRef.current = requestAnimationFrame(() => {
      setTime(Date.now() - startRef.current)
      tick()
    })
  }, [])

  useEffect(() => {
    if (running) {
      startRef.current = Date.now() - time
      tick()
    }
    return () => cancelAnimationFrame(rafRef.current)
  }, [running, tick])

  const handlePlayPause = useCallback(() => {
    if (running) {
      setRunning(false)
      if (email) {
        const formatted = formatTime(time)
        const next = addTimeToHistory(email, formatted)
        setHistory(next)
      }
    } else {
      setRunning(true)
    }
  }, [running, time, email])

  const handleReset = useCallback(() => {
    setRunning(false)
    setTime(0)
  }, [])

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Enter') {
        e.preventDefault()
        handlePlayPause()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [handlePlayPause])

  // if (!user) {
  //   return null
  // }

  return (
    <div className="treinamento-page">
      <div id="main-img">
        <div id="img-div" />
        <h1>Treinamento</h1>
      </div>

      <section className="treinamento-timer-section">
        <div className="treinamento-display">{formatTime(time)}</div>
        <div className="treinamento-controls">
          <button
            type="button"
            className="treinamento-btn treinamento-btn-primary"
            onClick={handlePlayPause}
          >
            {running ? 'Parar' : 'Iniciar'}
          </button>
          <button
            type="button"
            className="treinamento-btn treinamento-btn-secondary"
            onClick={handleReset}
          >
            Resetar
          </button>
        </div>
        <p className="treinamento-hint">Pressione <kbd>Enter</kbd> para iniciar ou parar o timer.</p>
      </section>

      <section className="treinamento-history-section">
        <h2>Histórico de tempos</h2>
        {history.length === 0 ? (
          <p className="treinamento-empty">Nenhum tempo registrado ainda.</p>
        ) : (
          <ul className="treinamento-history-list">
            {history.map((t, i) => (
              <li key={`${t}-${i}`} className="treinamento-history-item">
                {t}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}
