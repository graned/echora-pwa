import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./components/Core/ProtectedRoute";
import { useAppSelector } from "./store/hooks";
import EchoraApp from "./apps/EchoraApp";
import StoryEditorPage from "./pages/StoryEditorPage";

export default function App() {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/"
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              defaultPath="/login"
            >
              <EchoraApp>
                <StoryEditorPage />
              </EchoraApp>
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
