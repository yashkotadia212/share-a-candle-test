import React from "react";
import useAuthStore from "../zustand/authStore";
import { Outlet, Navigate } from "react-router-dom";

const PrivateRoutes = () => {
  const { auth } = useAuthStore();
  const isAuthorized = (auth && auth.token) || false;

  return <>{isAuthorized ? <Outlet /> : <Navigate to="/sign-in" />}</>;
};

export default PrivateRoutes;
