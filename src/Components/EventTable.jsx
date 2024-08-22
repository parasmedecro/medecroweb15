import React, { useContext } from 'react';
import { ScheduleContext } from '../Context/ScheduleContext';

const EventTable = ({ type }) => {
  const { Appointment, medications } = useContext(ScheduleContext);
  const events = type === 'appointments' ? Appointment : medications;

  // Add a guard clause to handle the case where events is undefined
  if (!events) {
    return null;
  }

  const tableHeaders =
    type === 'appointments'
      ? ['Appointment', 'Date & Time', 'Hospital Name', 'Confirmed']
      : ['Medication', 'Date & Time', 'Dosage', 'Instructions'];

  return (
    <div className="w-full">
      <table className="min-w-full bg-white rounded-xl overflow-hidden">
        <thead className="bg-gray-100 text-gray-800 uppercase">
          <tr>
            {tableHeaders.map((header, index) => (
              <th key={index} className="text-left py-3 px-3">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {events.map((event, index) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-violet-300' : 'bg-violet-100'}>
              <td className="text-left py-3 px-3">{event.title}</td>
              <td className="text-left py-3 px-3">{event.start.toLocaleString()}</td>
              <td className="text-left py-3 px-3">{type === 'appointments' ? event.hospitalName : event.dosage}</td>
              <td className="text-left py-3 px-3">{type === 'appointments' ? (event.confirmed ? 'Yes' : 'No') : event.instructions}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EventTable;
