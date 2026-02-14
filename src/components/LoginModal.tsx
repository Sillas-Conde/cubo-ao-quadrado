import { useState, FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './LoginModal.css'

interface LoginModalProps {
  onClose: () => void
  redirectTo?: string
}

export function LoginModal({ onClose, redirectTo = '/treinamento' }: LoginModalProps) {
  const [email, setEmail] = useState('')
  const [step, setStep] = useState<'email' | 'confirm'>('email')
  const [confirmationCode, setConfirmationCode] = useState('')
  const [sentCode, setSentCode] = useState('')
  const [error, setError] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  function generateCode() {
    return String(Math.floor(100000 + Math.random() * 900000))
  }

  function handleSendCode(e: FormEvent) {
    e.preventDefault()
    setError('')
    const trimmed = email.trim()
    if (!trimmed) {
      setError('Digite seu e-mail.')
      return
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(trimmed)) {
      setError('E-mail inválido.')
      return
    }
    const code = generateCode()
    setSentCode(code)
    setStep('confirm')
  }

  function handleConfirm(e: FormEvent) {
    e.preventDefault()
    setError('')
    if (confirmationCode.trim() !== sentCode) {
      setError('Código incorreto. Tente novamente.')
      return
    }
    login(email)
    onClose()
    navigate(redirectTo)
  }

  return (
    <div className="login-modal-overlay" onClick={onClose}>
      <div className="login-modal" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="login-modal-close" onClick={onClose} aria-label="Fechar">
          ×
        </button>
        <h2 className="login-modal-title">Entrar</h2>

        {step === 'email' && (
          <form onSubmit={handleSendCode}>
            <label className="login-modal-label">E-mail</label>
            <input
              type="email"
              className="login-modal-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              autoFocus
            />
            {error && <p className="login-modal-error">{error}</p>}
            <button type="submit" className="login-modal-btn">
              Enviar código de confirmação
            </button>
          </form>
        )}

        {step === 'confirm' && (
          <form onSubmit={handleConfirm}>
            <p className="login-modal-hint">
              Enviamos um código de 6 dígitos para <strong>{email}</strong>. Digite abaixo.
            </p>
            <p className="login-modal-demo-code">
              (Demo: seu código é <strong>{sentCode}</strong>)
            </p>
            <label className="login-modal-label">Código de confirmação</label>
            <input
              type="text"
              className="login-modal-input"
              value={confirmationCode}
              onChange={(e) => setConfirmationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
              placeholder="000000"
              maxLength={6}
              autoFocus
            />
            {error && <p className="login-modal-error">{error}</p>}
            <button type="submit" className="login-modal-btn">
              Confirmar e entrar
            </button>
            <button
              type="button"
              className="login-modal-back"
              onClick={() => setStep('email')}
            >
              Voltar
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
