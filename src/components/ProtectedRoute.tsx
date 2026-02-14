import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

interface ProtectedRouteProps {
  children: React.ReactNode
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, isLoaded } = useAuth()

  if (!isLoaded) {
    return null
  }

  if (!user) {
    return (
      <Navigate
        to="/"
        replace
        state={{ openLogin: true, redirectTo: '/treinamento' }}
      />
    )
  }

  return <>{children}</>
}
