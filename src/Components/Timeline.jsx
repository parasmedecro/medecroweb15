import React, { useContext } from "react";
import { ScheduleContext } from "../Context/ScheduleContext";
import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot } from '@mui/lab';
import LocationCityOutlinedIcon from '@mui/icons-material/LocationCityOutlined';
import MedicationIcon from '@mui/icons-material/Medication'; 

const TimelineComponent = (props) => {
  const { Appointment, medications } = useContext(ScheduleContext);


  const events = props.type === 'appointments' ? Appointment : medications;

  if (!events) {
    return null;
  }

  const sortedEvents = events.sort((a, b) => a.start - b.start);

  return (
    <Timeline position="alternate" sx={{ fontFamily: "Poppins" }} className="bg-white rounded-2xl mt-6">
      {sortedEvents.map((event, index) => (
        <TimelineItem key={index}>
          <TimelineSeparator>
            <TimelineDot variant="outlined" color="primary">
              {props.type === 'appointments' ? <LocationCityOutlinedIcon /> : <MedicationIcon />}
            </TimelineDot>
            {index !== sortedEvents.length - 1 && <TimelineConnector />}
          </TimelineSeparator>
          <TimelineContent>
            <div>
              <h4>{event.title}</h4>
              <p>{event.start.toLocaleString()}</p>
              {props.type !== 'appointments' ? (
                <p>{event.dosage}</p>
              ):null}
            </div>
          </TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  );
};

export default TimelineComponent;
