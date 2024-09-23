import React, { useEffect, useRef, useState, useContext } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import Modal from "@mui/material/Modal";
import { ScheduleContext } from '../Context/ScheduleContext';
import { PopupContext } from '../Context/PopupContext';

const localizer = momentLocalizer(moment);

const BasicCalendar = ({ type }) => {
  const { Appointment, setAppointment, medications, setMedications } = useContext(ScheduleContext);
  const [showModal, setShowModal] = useState(false);
  const [eventData, setEventData] = useState({
    title: '',
    start: null,
    end: null,
    hospitalName: '',
    confirmed: false,
    dosage: '',
    instructions: ''
  });

  const titleRef = useRef(null);

  const handleSelectSlot = (slotInfo) => {
    setShowModal(true);
    setEventData({
      ...eventData,
      start: slotInfo.start,
      end: moment(slotInfo.start).add(1, 'hours').toDate()
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData({
      ...eventData,
      [name]: value
    });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setEventData({
      ...eventData,
      [name]: checked
    });
  };

  const { displayPopup } = useContext(PopupContext);

  const saveEvent = () => {
    if (eventData.title && eventData.start && eventData.hospitalName) {
      if (type === 'appointments') {
        displayPopup('Added New Appointment','correct');
        setAppointment([...Appointment, eventData]);
        
      } else if (type === 'medications') {
        displayPopup('Added New Medications','correct');
        setMedications([...medications, eventData]);
      }
      setShowModal(false);
      setEventData({
        title: '',
        start: null,
        end: null,
        hospitalName: '',
        confirmed: false,
        dosage: '',
        instructions: ''
      });
    }
  };

  useEffect(() => {
    if (showModal && titleRef.current) {
      titleRef.current.focus();
    }
  }, [showModal]);

  return (
    <div className='w-full h-full'>
      <Calendar
        localizer={localizer}
        events={type === 'appointments' ? Appointment : medications}
        startAccessor="start"
        endAccessor="end"
        selectable={true}
        onSelectSlot={handleSelectSlot}
        className='h-full w-full rounded-xl bg-white border-2 border-violet-400 p-3 shadow-violet-300 shadow-xl'
      />
      {showModal && <Modal
        open={showModal}
        onClose={() => setShowModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="bg-white opacity-90 text-white mt-72 w-1/3 mx-auto p-4 rounded-xl flex flex-col">
          <div className='flex gap-5 justify-between items-center pl-3'>
            <p className='text-xl text-violet-500 font-semibold'>Title:</p>
            <input name='title' ref={titleRef} type='text' value={eventData.title} onChange={handleChange} className='text-black w-6/12 my-3 border-2 p-2 border-violet-700 outline-violet-700 h-10 text-lg'></input>
          </div>
          <div className={type === 'medications' ? 'flex gap-5 justify-between items-center pl-3':'hidden'}>
            <p className='text-xl text-violet-500 font-semibold'>Medicine Name:</p>
            <input name='hospitalName' type='text' value={eventData.hospitalName} onChange={handleChange} className='text-black w-6/12 my-3 border-2 p-2 border-violet-700 outline-violet-700 h-10 text-lg'></input>
          </div>
          <div className={type==='appointments' ? 'flex gap-5 justify-between items-center pl-3':'hidden'}>
            <p className='text-xl text-violet-500 font-semibold'>Hospital Name:</p>
            <input name='hospitalName' type='text' value={eventData.hospitalName} onChange={handleChange} className='text-black w-6/12 my-3 border-2 p-2 border-violet-700 outline-violet-700 h-10 text-lg'></input>
          </div>
          <div className={type === 'medications' ? 'flex gap-5 justify-between items-center pl-3' : 'hidden'}>
            <p className='text-xl text-violet-500 font-semibold'>Dosage:</p>
            <input name='dosage' type='text' value={eventData.dosage} onChange={handleChange} className='text-black w-6/12 my-3 border-2 p-2 border-violet-700 outline-violet-700 h-10 text-lg'></input>
          </div>
          <div className={type === 'medications' ? 'flex gap-5 justify-between items-center pl-3' : 'hidden'}>
            <p className='text-xl text-violet-500 font-semibold'>Instructions:</p>
            <input name='instructions' type='text' value={eventData.instructions} onChange={handleChange} className='text-black w-6/12 my-3 border-2 p-2 border-violet-700 outline-violet-700 h-10 text-lg'></input>
          </div>
          <div className={type==='appointments' ? 'flex gap-36 items-center pl-3 mb-5' : 'hidden'}>
            <p className='text-xl text-violet-500 font-semibold'>Confirmed:</p>
            <input name='confirmed' type='checkbox' checked={eventData.confirmed} onChange={handleCheckboxChange} className='h-6 w-6'></input>
          </div>
          <div className='flex gap-5 justify-center'>
            <button onClick={saveEvent} className='bg-violet-500 border-2 border-violet-200 rounded-xl px-3 py-2 w-1/3'>Save Event</button>
          </div>
        </div>
      </Modal>}
    </div>
  )
}

export default BasicCalendar;
