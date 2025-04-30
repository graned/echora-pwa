import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import HelloPage from './pages/HelloPage'
import HelloPage2 from './pages/HelloPage2'
import ProtectedRoute from './components/ProtectedRoute'
import Layout from './components/Layout'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout>
                <HelloPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/hello2"
          element={
            <ProtectedRoute>
              <Layout>
                <HelloPage2 />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
