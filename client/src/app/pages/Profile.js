import React from 'react'
import Header from '../Component/Header'
import { tradesmanProfile } from '../Data'

const Profile = () => {
  return (
    <div>
        <Header />
        <main className="p-3vw w-full">
            {tradesmanProfile?.map((item, index) => (
                <div key={index} className="w-full h-full">
                    <h1 className='text-3xl text-center italic font-medium underline'>{item?.title}</h1>
                    <img src={''} alt="" className='w-full bg-slate-300 mt-vw max-w-[7vw] h-[7vw] rounded-full border-[1px] border-gray-300' />
                    <input type="file" className='p-0.5vw mt-vw border-[1px] border-gray-300 rounded-md w-full max-w-[10vw]' />
                    <div className="col-center w-full">
                    <section className="mt-vw ml-8vw p-2vw w-full grid grid-cols-2 gap-2">
                        {item?.form?.map((item2, index)=>(
                            <div key={index} className='w-full max-w-[33vw]'>
                                {item2?.type === 'textarea' ? 
                                <>
                                    <label className='text-black text-vw font-semibold'>{item2?.label}</label> <br />
                                 <textarea value={item2?.title} rows={3} placeholder={item2?.placeholder} name={item2?.name} className='w-full focus:outline-none max-w-[30vw] p-vw rounded-md border-[1px] border-gray-300' />
                                </> :
                            <div className='mt-vw'>
                                <label className='text-black text-vw font-semibold'>{item2?.label}</label> <br />
                                <input value={item2?.title} placeholder={item2?.placeholder} name={item2?.name} className='w-full max-w-[30vw] focus:outline-none p-vw rounded-md border-[1px] border-gray-300' />
                                </div>}
                            </div>
                        ))}
                    </section>
                    <div className="flex w-full justify-center items-center">
                                <button type='submit' className='bg-[#1dbf73] text-white mt-2vw p-0.5vw w-full max-w-[10vw] hover:bg-[#1dbf73e0] text-vw rounded-md'>Submit</button>
                            </div>
                    </div>
                </div>
            ))}
        </main>
    </div>
  )
}

export default Profile
