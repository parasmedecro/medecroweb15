import React from 'react'

const Symp = (props) => {

  const handleClick = (key)=> 
  {
    props.update((prev)=>({...prev,[key] : prev[key]==0?1:0}))
  }

  return (
    <div className={(props.selected) ?'bg-violet-300 p-5 m-3 h-10 rounded-xl flex justify-center items-center hover:bg-violet-300 cursor-pointer' : 'bg-slate-100 p-5 m-3 h-10 rounded-xl flex justify-center items-center hover:bg-violet-300 cursor-pointer'} onClick={()=>handleClick(props.data)}>
      <h1>{props.data}</h1>
    </div>
  )
}

export default Symp
