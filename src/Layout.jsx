import React, { useContext } from "react";
import NavBar from "./Pages/NavBar";
import { Outlet, useLocation } from "react-router-dom";
import { Routes, Route } from "react-router-dom"; // Import Routes and Route from react-router-dom

import Schedule from "./Pages/Schedule";
import Health from "./Pages/Health";
import AnalyticsPage from "./Pages/AnalyticsPage";
import Login from "./Pages/Login";
import Register from './Pages/Register';
import Dashboard from "./Pages/Dashboard";
import { PopupContext } from "./Context/PopupContext";
import Popup from "./Components/Popup";
import Profile from "./Pages/Profile";

const Layout = () => {
  const location = useLocation();
  const isNavbarVisible = !['/', '/Login', '/Register'].includes(location.pathname);
  const { showPopup } = useContext(PopupContext);

  return (
    <div className="flex w-full h-screen bg-violet-200" style={{ fontFamily: "Poppins" }}>
      {isNavbarVisible && <NavBar />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/Schedule" element={<Schedule />} />
        <Route path="/Hospital" element={<Health />} />
        <Route path="/Analytics" element={<AnalyticsPage />} />
        <Route path="/Profile" element={<Profile />} />
      </Routes>
      <Outlet /> {/* Render nested routes */}
      {showPopup && <Popup />}
    </div>
  );
};

export default Layout;
