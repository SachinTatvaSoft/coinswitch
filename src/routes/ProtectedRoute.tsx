import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { JSX } from "react";
import type { RootState } from "../store";

interface Props {
  children: JSX.Element;
}

export default function ProtectedRoute({ children }: Props) {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  return isAuthenticated ? children : <Navigate to="/" replace />;
}
