import React from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import Home from "../pages/Home";
import Event from "../pages/Event";
import Login from "../pages/Login";
import OrganizeEvent from "../pages/OrganizeEvent";
import EventDetails from "../pages/EventDetails";
import Admin from "../pages/Admin";
import PageNotFound from "../pages/PageNotFound";
import JoinTeam from "../pages/JoinTeam";
import PrivateRoutes from "./PrivateRoutes";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/login" element={<Login />} />
      <Route path="*" element={<PageNotFound />} />
      <Route path="/events" element={<Event />} />

      <Route element={<PrivateRoutes />}>
        <Route path="/organize-event" element={<OrganizeEvent />} />
        <Route path="/join-team" element={<JoinTeam />} />
        <Route path="/event-details" element={<EventDetails />} />
        <Route path="/admin" element={<Admin />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
