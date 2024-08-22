import React from 'react'

const Doctors = (props) => {
  return (
    <div class='bg-violet-300 flex rounded-xl items-center m-3 hover:scale-105'>
      <p class='text-base px-4 py-5'>{props.data.title}</p>
      <p class='text-sm'>{props.data.time}</p>
    </div>
  )
}

export default Doctors
