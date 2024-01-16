import React from 'react'
import Navbar2 from '../Component/Common/Navbar2'
import { Description } from '../Component/Common/Description'

export const ProfileD = () => {
  return (
    <div className='overflow-x-hidden'>
    <Navbar2 />
    <main className=' shadow-lg w-full max-w-[80vw] m-auto p-[2vw] mt-[2vw] rounded-lg flex justify-between'>
    <div className='w-full flex'>
      <img src="/img/man2.jpg" alt="profile" className='rounded-full shadow-xl w-full max-w-[10vw] h-[10vw]'/>
    <div className='ml-[1vw]'>
    <p className='font-bold text-[1.2vw]'>Dr. Muhammad Shoaib Ahmed</p>
    <p>Dentist</p>
    <p>BDS (Gold Medalist) FCPS Res. (Orthodontics), RDSPGR</p>
    <p> 189 Reviews10 Yrs Experience</p>
    </div>
    </div>
     <div>
      <button className='shadow-lg p-[0.5vw] px-[5vw] bg-blue-800 text-white rounded-md'>consult online</button>
      <button className='shadow-lg p-[0.5vw] px-[5.5vw] bg-green-800 text-white rounded-md mt-[1vw]'>visit in clinic</button>
     </div>
    </main>
    <Description />
    </div>
  )
}
