import React, { useContext } from "react";
import { userContext } from "../Context/UserContext";
import { Link } from "react-router-dom";
import profilepic from "../Resources/surgeon-doctor.svg"
import ClinicalEarnings from "../Components/Earnings";
import Small_Count from "../Components/Small_Count";

const DashBoard2 = () => {
  const { userdata } = useContext(userContext);

  return (
    <div
      className="w-screen h-screen flex flex-row bg-blue-200"
      style={{ fontFamily: "Poppins" }}
    >
      <div
        style={{ width: "100%" }}
        className="mx-3 flex flex-col justify-center items-center"
      >
        {/*Profile*/}

        <div className="w-5/6 bg-white px-4 py-1 rounded-xl shadow-xl flex justify-between items-center mb-6">
          <div className="px-4 py-4">
            <p className="text-lg text-blue-500 pb-3">Good Morning,</p>
            <p className="text-4xl text-blue-950 font-semibold">
              {userdata.name}
            </p>
          </div>


          <div className="flex gap-8 items-center">
            <i className="fa-regular fa-bell text-3xl scale-105 hover:scale-110"></i>

            <Link to="/Profile">
              <img
                className="rounded-full w-14 hover:scale-110"
                src={profilepic}
                ></img>
            </Link>
          </div>
        </div>

        <div className="flex gap-8">
          <div className="bg-white px-5 py-3 rounded-lg text-lg hover:scale-105">O<sub>2</sub> Cylinders Available: <span  className="text-blue-800 font-bold">6</span></div>
          <div className="bg-white px-5 py-3 rounded-lg text-lg hover:scale-105">Beds Available: <span  className="text-blue-800 font-bold">10</span></div>
          <div className="bg-white px-5 py-3 rounded-lg text-lg hover:scale-105">Today's Earnings: <span  className="text-blue-800 font-bold">4000</span></div>
        </div>

        <ClinicalEarnings />
      </div>

      <div className="flex flex-col items-center mt-10 mr-16">
        <Small_Count data={[8, 10, 11, 9, 6, 13, 12]} name="No of Doctors"/>
        <Small_Count data={[48, 60, 64, 49, 36, 38, 50]} name="No of Patients"/>
        <Small_Count data={[18, 16, 15, 12, 17, 15, 13]} name="No of Appointments"/>
      </div>
    </div>
  );
};

export default DashBoard2;
