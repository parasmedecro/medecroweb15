import React from 'react'

const Indicators = (props) => {
  return (
    <div className='bg-white w-1/3 flex rounded-xl items-center m-3 hover:scale-105'>
      <img className='w-12 h-12 bg-violet-500 m-5' src={props.data.src}></img>
      <div>
      <p className='text-base'>{props.data.value}</p>
      <p className='text-sm'>{props.data.title}</p>
      </div>
    </div>
  )
}

export default Indicators
