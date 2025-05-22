import { Navigate } from "react-router-dom";

export interface ProtectedRouteProps {
  defaultPath: string;
  children: JSX.Element;
  isAuthenticated: boolean;
}
export default function ProtectedRoute({
  defaultPath,
  children,
  isAuthenticated,
}: ProtectedRouteProps) {
  return isAuthenticated ? children : <Navigate to={defaultPath} replace />;
}
