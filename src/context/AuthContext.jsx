import { createContext, useContext, useState } from 'react'
import { Navigate } from 'react-router-dom'

// Demo auth: keeps the "logged in" user in sessionStorage.
// TODO (backend): replace login/logout with real token/session handling.
const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(sessionStorage.getItem('vv_user')) } catch { return null }
  })
  const login = (u) => { sessionStorage.setItem('vv_user', JSON.stringify(u)); setUser(u) }
  const logout = () => { sessionStorage.removeItem('vv_user'); setUser(null) }
  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)

export function RequireAuth({ children }) {
  const { user } = useAuth()
  return user ? children : <Navigate to="/login" replace />
}
