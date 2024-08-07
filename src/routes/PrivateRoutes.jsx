import React from "react";
import useAuthStore from "../zustand/authStore";

import { Outlet, Navigate } from "react-router-dom";

const PrivateRoutes = () => {
  const { auth } = useAuthStore();
  const isAuthorized = auth?.isAuthorized || false;

  return <>{isAuthorized ? <Outlet /> : <Navigate to="/login" />}</>;
};

export default PrivateRoutes;
