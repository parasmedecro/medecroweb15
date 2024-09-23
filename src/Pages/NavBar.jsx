import React, { useContext } from "react";
import GridViewTwoToneIcon from "@mui/icons-material/GridViewTwoTone";
import CalendarTodayRoundedIcon from "@mui/icons-material/CalendarTodayRounded";
import logo from "../Resources/logo.png";
import { NavLink, useNavigate} from "react-router-dom";
import { userContext } from "../Context/UserContext";

const NavBar = () => {
  const {updateData} = useContext(userContext)
  const navigate = useNavigate()

  const NavBarData = [
    {
      title: "DashBoard",
      icon: <GridViewTwoToneIcon />,
      route: "/DashBoard",
    },
    {
      title: "Schedule",
      icon: <CalendarTodayRoundedIcon />,
      route: "/Schedule",
    },
    {
      title: "Hospital",
      icon: <i className="fa-regular fa-hospital" />,
      route: "/Hospital",
    },
    {
      title: "Analytics",
      icon: <i className="fa-solid fa-chart-line" />,
      route: "/Analytics",
    },
    {
      title:"Sick Check",
      icon:<i class="fa-solid fa-magnifying-glass"/>,
      route:"/SickCheck"
    }
  ];

  const LogOutHandler = () =>
  {
    localStorage.removeItem("userdata");
    updateData({name:"",email:""})
    navigate("/Login")
  }

  return (
    <>
      <style>
        {`.active {
          	background-color: rgb(196 181 253)
        }`}
      </style>
      <nav
        style={{ fontFamily: "Poppins" }}
        className="flex flex-col my-4 ml-2 w-1/5 bg-white border-2 border-violet-300 pr-5 rounded-xl"
      >
        <div>
          <div className="flex flex-col items-start">
            <div className="flex item-center justify-center pl-3 h-20 font-semibold text-lg text-violet-950 my-7">
              <img alt="logo" className="w-20 h-20" src={logo} />
              <p className="pt-6">Health Mate</p>
            </div>
            <div className="pl-6 w-full">
              {NavBarData.map((item, index) => (
                <NavLink
                  to={item.route}
                  key={index}
                  className="rounded-2xl text-lg flex item-start text-center w-full hover:bg-violet-100 py-5 px-5"
                  activeClassName="active"
                >
                  <div className="pr-4">{item.icon}</div>
                  <div className="text-center">{item.title}</div>
                </NavLink>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-24 flex justify-center items-center rounded-xl py-5 ml-3 hover:bg-violet-300" onClick={LogOutHandler}>
          <i className="fa-solid fa-right-from-bracket"></i>
          <p className="pl-3 font-semibold">LogOut</p>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
