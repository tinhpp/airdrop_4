import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function ProtectedRoute() {
  const location = useLocation();
  const isAuth = useSelector((state) => state.auth.isAuth);

  if (!isAuth) return <Navigate to="/login" state={{ from: location }} />;

  return <Outlet />;
}
