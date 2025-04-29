import { Navigate } from 'react-router-dom'
import { useAppSelector } from '../store/hooks'

export default function ProtectedRoute({ children }: { children: JSX.Element }) {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated)
  return isAuthenticated ? children : <Navigate to="/login" replace />
}
