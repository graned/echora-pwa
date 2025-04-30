import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HelloPage from "./pages/HelloPage";
import HelloPage2 from "./pages/HelloPage2";
import ProtectedRoute from "./components/ProtectedRoute";
import AppLayout from "./components/AppLayout";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <AppLayout>
                <HelloPage />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/hello2"
          element={
            <ProtectedRoute>
              <AppLayout>
                <HelloPage2 />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
