import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Event from "../pages/Event";
import Login from "../pages/Login";
import OrganizeEvent from "../pages/OrganizeEvent";
import EventDetails from "../pages/EventDetails";
import Admin from "../pages/Admin";
import PageNotFound from "../pages/PageNotFound";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/events" element={<Event />} />
      <Route path="/organize-event" element={<OrganizeEvent />} />
      <Route path="/event-details" element={<EventDetails />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default AppRoutes;
