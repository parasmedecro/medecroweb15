import React, { useContext, useEffect, useState } from "react";
import Indicators from "../Components/Indicators";
import Tablets from "../Components/Tablets";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Analytics from "../Components/Analytics";
import { userContext } from "../Context/UserContext";
import Badge from "@mui/material/Badge";
import { ScheduleContext } from "../Context/ScheduleContext";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { PickersDay } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import PushPinIcon from '@mui/icons-material/PushPin';
import { Link } from "react-router-dom";
import profilepic from "../Resources/Designer.png"

const DashBoard = () => {
  const { Appointment } = useContext(ScheduleContext);
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [selectedDateAppointments, setSelectedDateAppointments] = useState([]);
  const { userdata, updateData } = useContext(userContext);
 
  const handleDateChange = (date) => {
    setSelectedDate(date);
    const clickedDate = date.format("YYYY-MM-DD");
    const appointmentsOnClickedDate = Appointment.filter(
      (event) => dayjs(event.start).format("YYYY-MM-DD") === clickedDate
    );
    setSelectedDateAppointments(appointmentsOnClickedDate);
  };


  const IndicatorData = [
    {
      src: "https://img.freepik.com/free-vector/gradient-heart_78370-478.jpg?w=740&t=st=1713229537~exp=1713230137~hmac=d57565a1a32e425781c5190707bb7fdb034cfcce8a28ea36a685a0dc2b1b41b1",
      value: "80 bpm",
      title: "Heart Rate",
    },
    {
      src: "https://img.freepik.com/free-vector/water-drop-icon_24911-115257.jpg?t=st=1713232700~exp=1713236300~hmac=176be18ba025cfbafe86e168c8439a3d31ced06f79f909fe4c4a2b807fc60b77&w=740",
      value: "60-70 mg/dL",
      title: "Gluscose Level",
    },
    {
      src: "https://img.freepik.com/free-vector/heartbeat-line-design_25030-68490.jpg?t=st=1713232908~exp=1713236508~hmac=00cc02b98c650612bb6024f8a140121c89e62c865d1bdfc18da842aef66e97e9&w=740",
      value: "120/80 mmHg",
      title: "Blood Pressure",
    },
  ];

  const tablets = [
    {
      title: "Antibiotics",
      value: "1 tablet after breakfast",
      src: "https://img.freepik.com/free-vector/red-pill-illustration_24908-82615.jpg?t=st=1713233222~exp=1713236822~hmac=588d86231cb1b6ca05e242d3f554bb35807f477ab6f2eb27c687dcbbeed58f99&w=740",
    },
    {
      title: "Vitamin C",
      value: "1 tablet after lunch",
      src: "https://img.freepik.com/premium-vector/painkiller-capsule-icon-isometric-painkiller-capsule-vector-icon-web-design-isolated-white-background_96318-48832.jpg?w=740",
    },
    {
      title: "Vitamin D",
      value: "1 tablet before breakfast",
      src: "https://img.freepik.com/free-vector/red-pill-illustration_24908-82615.jpg?t=st=1713233222~exp=1713236822~hmac=588d86231cb1b6ca05e242d3f554bb35807f477ab6f2eb27c687dcbbeed58f99&w=740",
    },
    {
      title: "Aspirin",
      value: "1 tablet after lunch",
      src: "https://img.freepik.com/premium-vector/painkiller-capsule-icon-isometric-painkiller-capsule-vector-icon-web-design-isolated-white-background_96318-48832.jpg?w=740",
    },
  ];

  const ServerDay = (props) => {
    const { day,...other } = props;
  
    const hasAppointments = Appointment.some(
      (event) => dayjs(event.start).format("YYYY-MM-DD") === day.format("YYYY-MM-DD")
    );
  
    return (
      <Badge
        key={day.toString()}
        overlap="circular"
        badgeContent={hasAppointments ? <PushPinIcon sx={{ fontSize: '20px', color: 'darkviolet' }} /> : undefined}
      >
        <PickersDay {...other} day={day} />
      </Badge>
    );
  };

  useEffect(() => {
    handleDateChange(dayjs());
    const storeddata = localStorage.getItem("userdata");
    if (storeddata) {
      updateData(JSON.parse(storeddata));
    }
  }, []);


  return (
    <div
      className="w-screen flex flex-row bg-violet-200"
      style={{ fontFamily: "Poppins" }}
    >
      <div
        style={{ width: "100%" }}
        className="mx-3 my-8 flex flex-col justify-center items-center"
      >
        {/*Profile*/}

        <div className="w-5/6 bg-white px-5 py-1 rounded-xl shadow-xl flex justify-between items-center">
          <div className="px-4 py-4">
            <p className="text-lg text-violet-500 pb-3">Good Morning,</p>
            <p className="text-4xl text-violet-950 font-semibold">
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

        {/*Indicators*/}

        <div className="w-5/6 mt-8 mb-5 flex">
          {IndicatorData.map((item,index) => (
            <Indicators key={index} data={item} />
          ))}
        </div>

        {/*Analytics*/}

        <div className="w-5/6 bg-violet-300 rounded-xl shadow-xl">
          <div className="w-full flex">
            <div style={{ width: "73%" }}>
              <Analytics />
            </div>

            <div className="bg-violet-300 rounded-xl">
              {tablets.map((item,index) => (
                <Tablets key={index} data={item} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center">
        <div className="mt-10 mr-5 rounded-xl">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <StaticDatePicker
              value={selectedDate}
              onChange={handleDateChange}
              className="rounded-xl m-3"
              slots={{
                day: ServerDay,
              }}
            />
          </LocalizationProvider>
        </div>
        <div className="mt-5 bg-white p-5 rounded-xl w-fit">
          {selectedDateAppointments.length > 0 ? (
            <div>
              <h2 className="font-semibold text-violet-800 mb-4">
                Appointments on Selected Date:
              </h2>
              <ul>
                {selectedDateAppointments.map((appointment, index) => (
                  <li key={index}>
                    {index + 1}) {appointment.title}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p>No appointments on selected date.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
