import { createContext, useCallback, useContext, useEffect, useState } from 'react'

const STORAGE_KEY = 'cube_user'

export interface User {
  email: string
}

interface AuthContextValue {
  user: User | null
  login: (email: string) => void
  logout: () => void
  isLoaded: boolean
}

const AuthContext = createContext<AuthContextValue | null>(null)

function loadUser(): User | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const data = JSON.parse(raw) as User
    return data.email ? data : null
  } catch {
    return null
  }
}

function saveUser(user: User | null) {
  if (user) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
  } else {
    localStorage.removeItem(STORAGE_KEY)
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setUser(loadUser())
    setIsLoaded(true)
  }, [])

  const login = useCallback((email: string) => {
    const u = { email: email.trim().toLowerCase() }
    setUser(u)
    saveUser(u)
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    saveUser(null)
  }, [])

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoaded }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
