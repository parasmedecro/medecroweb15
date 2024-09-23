import { createContext, useState } from "react";

export const ScheduleContext = createContext();

export const ScheduleContextProvider = ({ children }) => {
  const defaultEvents = [
    {
      title: "Dentist Appointment",
      start: new Date(2024, 8, 25, 10, 0),
      end: new Date(2024, 8, 25, 11, 0),
      hospitalName: "Dental Clinic",
      confirmed: true
    },
    {
      title: "ENT Appointment",
      start: new Date(2024, 8, 27, 13, 0),
      end: new Date(2024, 8, 27, 14, 0),
      hospitalName: "ENT Clinic",
      confirmed: false
    },
    {
      title: "Health Check",
      start: new Date(2024, 8, 29, 16, 0),
      end: new Date(2024, 8, 29, 17, 0),
      hospitalName: "Health Center",
      confirmed: true
    }
  ];

  const defaultMedications = [
    {
      title: "Aspirin",
      start: new Date(2024, 8, 20, 8, 0),
      end: new Date(2024, 8, 24, 8, 0),
      dosage: "500mg",
      instructions: "Take 1 tablet after lunch"
    },
    {
      title: "Antibiotic",
      start: new Date(2024, 8, 20, 9, 0),
      end: new Date(2024, 8, 24, 9, 0),
      dosage: "250mg",
      instructions: "Take 1 capsule in the morning"
    },
    {
      title: "Vitamin C",
      start: new Date(2024, 8, 20, 14, 0),
      end: new Date(2024, 8, 24, 14, 0),
      dosage: "200mg",
      instructions: "Take 1 tablet after lunch"
    }
  ];

  const [Appointment, setAppointment] = useState(defaultEvents);
  const [medications, setMedications] = useState(defaultMedications);

  return (
    <ScheduleContext.Provider value={{ Appointment, setAppointment, medications, setMedications }}>
      {children}
    </ScheduleContext.Provider>
  );
};