import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../store";
import { FE_ROUTE } from "../config/app-routes";
import type { Props } from "../types";

export default function ProtectedRoute({ children }: Props) {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  return isAuthenticated ? children : <Navigate to={FE_ROUTE.HOME} replace />;
}
