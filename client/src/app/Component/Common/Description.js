import React from 'react'
import { countrieCode, timeArray } from '../../Data';

export const Description = ({desc}) => {
    const getCurrentDate = () => {
        const now = new Date();
        const year = now.getFullYear();
        const month = (now.getMonth() + 1).toString().padStart(2, '0');
        const day = now.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
      };
  return (
    <>
    <main className='flex justify-evenly p-[2vw]'>

    <section className='shadow-lg w-full max-w-[60vw] p-[1vw] bg-slate-200 rounded-md mt-[2vw] ml-[2.5vw]'>
    <div className=' p-[0.2vw]'>
    <h1 className='font-bold'>Description</h1>
    <textarea name="" id="" cols="100" rows="8" className='shadow-lg p-[1vw] rounded-md' readOnly >{desc}</textarea>
    {/* <textarea name="" id="" cols="100" rows="5" className='shadow-lg p-[1vw] rounded-md' readOnly ></textarea> */}
    </div>
    </section>
    <section className='mt-[2vw] bg-zinc-200 rounded-md shadow-lg w-full max-w-[30vw] pb-[1vw] overflow-x-hidden'>
        
            <div className='p-[2vw]'>  
            <h1 className='font-bold text-[1vw]'>Book Appointment Now</h1>
            <p className='mt-[1vw]'><span className='bg-black text-white rounded-full p-[0.5vw] '>1</span> Select Hospital</p>
            <p className='mt-[1vw]'><span className='bg-black text-white rounded-full p-[0.5vw] '>2</span> Select Date and Time</p>
            <form className='flex justify-between mt-[2vw]'>
                <div>

                <input type="date"  defaultValue = {getCurrentDate()} name="" id="" className='p-[0.3vw] w-full max-w-[15vw] rounded-md'/>
                <input type="text" placeholder='enter phone nuimber' className='transform translate-x-[5vw] w-full max-w-[10vw] mt-[1vw] p-[0.5vw] rounded-md'  />

                <select className='w-full max-w-[5vw] transform translate-x-[-10vw] p-[0.5vw] rounded-md' defaultValue="+92-Pakistan" >
                    
                    {
                        countrieCode?.countries.map((elem,i)=>(
                           <option key={i} value={elem.defaultVal}><span>{ `${elem.code}`}</span></option>
                        ))
                    }
                </select>
                </div>
                <div>
                    <select className=' w-full max-w-[15vw] p-[0.4vw]'>
                    {
                        timeArray.map((elem,i)=>(
                            <option key={i} value={elem}>{`${elem}`}</option>
                            ))
                        }
                        </select>
                        <input type="text" placeholder='Add a patient'  name="" id="" className='w-full max-w-[15vw] p-[0.4vw] mt-[1vw]' />
                </div>
            </form>
            </div>
            <button className='bg-green-400 shadow-lg p-[0.5vw] w-full max-w-[15vw] m-auto flex justify-center rounded-md text-white mt-[2vw]' >submit now</button>
    </section>
    </main>
    </>
  )
}
