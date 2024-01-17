import React from 'react'

const Modal = () => {
  return (
   <div className='w-full max-w-[12vw] h-[10vw]'>
    <button className='p-vw bg-green-500 shadow-lg' onClick={()=>localStorage.removeItem("tokken")}>logout</button>
   </div>
  )
}

export default Modal
