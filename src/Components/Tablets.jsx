import React from 'react'

const Tablets = (props) => {
  return (
    <div class='bg-white w-10/12 flex rounded-xl items-center m-3 ml-5 hover:scale-105'>
      <img alt='tablet' class='w-14 h-12 bg-violet-500 my-4 mx-3' src={props.data.src}></img>
      <div className='pr-3'>
      <p class='text-base'>{props.data.title}</p>
      <p class='text-xs'>{props.data.value}</p>
      </div>
    </div>
  )
}

export default Tablets
