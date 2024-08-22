import React, { useState } from "react";
import BasicCalendar from "../Components/BasicCalendar";
import EventTable from "../Components/EventTable";
import TimelineComponent from "../Components/Timeline";
import "react-big-calendar/lib/css/react-big-calendar.css";

const Schedule = () => {
  const [viewMode, setViewMode] = useState('appointments');

  const handleViewAppointments = () => {
    setViewMode('appointments');
  };

  const handleViewMedications = () => {
    setViewMode('medications');
  };

  return (
    <div className="flex w-full mt-7" style={{ fontFamily: "Poppins" }}>
      <div className="w-9/12 flex flex-col">
        {viewMode === 'appointments' && (
          <div className="mx-14 mt-8" style={{height:"53%"}}>
            <BasicCalendar type={viewMode} />
          </div>
        )}
        {viewMode === 'medications' && (
          <div className="h-1/2 mx-14 mt-8">
            <BasicCalendar type={viewMode}/>
          </div>
        )}
        <div className="h-fit mx-14 mt-10">
          <EventTable type={viewMode}/>
        </div>
      </div>
      <div className="w-3/12 mt-4 mr-10">
        <div className="bg-violet-300 rounded-xl  mx-5 mt-5 h-9/12 flex flex-col gap-3 p-3">
          <div className="px-4 py-3 my-1 border-2 rounded-xl bg-white text-black hover:scale-105" onClick={handleViewAppointments}>View Appointments</div>
          <div className="px-4 py-3 my-1 border-2 rounded-xl bg-white text-black hover:scale-105" onClick={handleViewMedications}>View Medications</div>
        </div>
        <TimelineComponent type={viewMode}/>
      </div>
    </div>
  );
};

export default Schedule;
