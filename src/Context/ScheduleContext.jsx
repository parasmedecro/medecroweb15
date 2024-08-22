import { createContext, useState } from "react";

export const ScheduleContext = createContext();

export const ScheduleContextProvider = ({ children }) => {
  const defaultEvents = [
    {
      title: "Dentist Appointment",
      start: new Date(2024, 5, 21, 10, 0), 
      end: new Date(2024, 5, 21, 11, 0),   
      hospitalName: "Dental Clinic",
      confirmed: true
    },
    {
      title: "ENT Appointment",
      start: new Date(2024, 5, 9, 13, 0),
      end: new Date(2024, 5, 9, 14, 0),  
      hospitalName: "ENT Clinic",
      confirmed: false
    },
    {
      title: "Health Check",
      start: new Date(2024, 5, 7, 16, 0),
      end: new Date(2024, 5, 7, 17, 0),  
      hospitalName: "Health Center",
      confirmed: true
    }
  ];

  const defaultMedications = [
    {
      title: "Aspirin",
      start: new Date(2024, 5, 7, 8, 0), 
      end: new Date(2024, 5, 7, 9, 0),   
      dosage: "500mg",
      instructions: "Take 1 tablet after lunch"
    },
    {
      title: "Antibiotic",
      start: new Date(2024, 5, 7, 10, 0),
      end: new Date(2024, 5, 7, 11, 0),  
      dosage: "250mg",
      instructions: "Take 1 capsule in the morning"
    },
    {
      title: "Vitamin C",
      start: new Date(2024, 5, 7, 14, 0),
      end: new Date(2024, 5, 7, 15, 0),  
      dosage: "200mg",
      instructions: "Take 1 tablet after lunch"
    }
  ]
  

    const [Appointment, setAppointment] = useState(defaultEvents);
    const [medications, setMedications] = useState(defaultMedications);


  return (
    <ScheduleContext.Provider value={{ Appointment,setAppointment,medications,setMedications}}>
      {children}
    </ScheduleContext.Provider>
  );
};
