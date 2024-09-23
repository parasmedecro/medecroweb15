import React, { useContext } from "react";
import NavBar from "./Pages/NavBar";
import { Outlet, useLocation } from "react-router-dom";
import { Routes, Route } from "react-router-dom"; 

import Schedule from "./Pages/Schedule";
import Health from "./Pages/Health";
import AnalyticsPage from "./Pages/AnalyticsPage";
import Login from "./Pages/Login";
import Register from './Pages/Register';
import Dashboard from "./Pages/Dashboard";
import { PopupContext } from "./Context/PopupContext";
import { userContext } from "./Context/UserContext";
import Popup from "./Components/Popup";
import Profile from "./Pages/Profile";
import Sickcheck from "./Pages/Sickcheck";
import DashBoard2 from "./Pages/Dashboard2";
import Prescribe from "./Pages/Prescribe";
import NavBar2 from "./Pages/NavBar2";
import InventoryTable from "./Components/Inventory";
import PatientTable from "./Components/Patients";

const Layout = () => {
  const location = useLocation();
  const isNavbarVisible = !['/', '/Login', '/Register'].includes(location.pathname);
  const { showPopup } = useContext(PopupContext);
  const {userdata} = useContext(userContext);

  return (
    <div className={(userdata.role==='patient' || userdata.role==='Patient')?"flex w-full h-screen bg-violet-200":"flex w-full h-screen bg-blue-200"} style={{ fontFamily: "Poppins" }}>
      {isNavbarVisible && ((userdata.role==='patient' || userdata.role==='Patient')?<NavBar/>:<NavBar2/>)}
      <Outlet />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/Schedule" element={<Schedule />} />
        <Route path="/Hospital" element={<Health />} />
        <Route path="/Analytics" element={<AnalyticsPage />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/SickCheck" element={<Sickcheck/>}/>
        <Route path="/DocDashboard" element={<DashBoard2/>}/>
        <Route path="/prescribe" element={<Prescribe/>}/>
        <Route path="/Inventory" element={<InventoryTable/>}/>
        <Route path="/PatientsAppointments" element={<PatientTable/>}/>
      </Routes>
      {showPopup && <Popup />}
    </div>
  );
};

export default Layout;
