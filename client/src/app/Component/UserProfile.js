import React from 'react'
import Layout from '../Layout/Layout'
import PinLocation from './PinLocation'
import { Link, useParams } from 'react-router-dom'
import { useGetTrademanByIdQuery } from '../store/storeApi'
import { Icon } from '@iconify/react';

const UserProfile = () => {
    const {id} = useParams()
    const {data} = useGetTrademanByIdQuery(id);
    const lat = data?.lat
    const lng = data?.lng
    console.log(data, "data profile")
  return (
    <div className='w-full'>
        <Layout>
            {/* <main className=" mt-vw">
                <h1 className='text-2vw text-center font-semibold text-black'>Welcome Back! {data?.username}</h1>
                <img src={data?.image} alt={data?.username} className='w-full max-w-[6vw] h-[6vw] rounded-full absolute left-2vw top-[12vw]' />
                <article className="w-full p-3vw grid grid-cols-2 mt-2vw gap-2">
                <section className='p-vw m-0.5vw'>
                    <label className='text-vw font-semibold ml-vw text-black' htmlFor="">Username</label> <br />
                    <input type="text" value={data?.username} className='text-vw ml-vw p-vw w-full max-w-[25vw] rounded-md border-[1px] border-gray-300 focus:outline-none' />
                </section>
                <section className='p-vw m-0.5vw'>
                    <label className='text-vw font-semibold ml-vw text-black' htmlFor="">Email</label> <br />
                    <input type="text" value={data?.email} className='text-vw ml-vw p-vw w-full max-w-[25vw] rounded-md border-[1px] border-gray-300 focus:outline-none' />
                </section>
                <section className='p-vw m-0.5vw'>
                    <label className='text-vw font-semibold ml-vw text-black' htmlFor="">Phone Number</label> <br />
                    <input type="text" value={data?.phoneNumber} className='text-vw ml-vw p-vw w-full max-w-[25vw] rounded-md border-[1px] border-gray-300 focus:outline-none' />
                </section>
                <section className='p-vw m-0.5vw'>
                    <label className='text-vw font-semibold ml-vw text-black' htmlFor="">Occupation</label> <br />
                    <input type="text" value={data?.occupation} className='text-vw ml-vw p-vw w-full max-w-[25vw] rounded-md border-[1px] border-gray-300 focus:outline-none' />
                </section>
                <section className='p-vw m-0.5vw'>
                    <label className='text-vw font-semibold ml-vw text-black' htmlFor="">Description</label> <br />
                    <textarea type="text" value={data?.description} rows={3} className='text-vw ml-vw p-vw w-full max-w-[25vw] rounded-md border-[1px] border-gray-300 focus:outline-none' ></textarea>
                </section>
                <section className='p-vw m-0.5vw'>
                    <label className='text-vw font-semibold ml-vw text-black' htmlFor="">Address</label> <br />
                    <input type="text" value={data?.location} className='text-vw ml-vw p-vw w-full max-w-[25vw] rounded-md border-[1px] border-gray-300 focus:outline-none' />
                </section>
                </article>
                <div className="w-full h-[25vw] relative">
                <PinLocation lat={lat ? lat : -73.978548} lng={lng? lng : 40.755588} />
                </div>
            </main> */}
            <main className="w-full p-2vw">
            <article className="flex w-full items-start p-vw">
                <section className="w-full p-vw border-[1px] border-gray-300 max-w-[25vw]">
                    <div className="col-center p-vw">
                        <img src={data?.image} alt={data?.username} className='w-full max-w-[7vw] h-[7vw] rounded-full object-cover' />
                        <h1 className='text-vw text-center mt-0.5vw font-semibold text-black'>Your display name: <br />@ {data?.username}</h1>
                        <Link>
                        <div className="w-[22vw] mt-vw text-center border-[1px] hover:bg-gray-600 hover:text-white border-black rounded-md p-0.5vw">
                            <p className='text-vw text-center font-semibold hover:text-white text-black'>Preview your profile</p>
                        </div>
                        </Link>
                    </div>
                    <div className="flex justify-between items-center w-full p-vw">
                        <div className="flex items-center">
                        <Icon icon="ion:location-sharp" className='text-vw text-gray-800'/>
                        <p className='text-vw text-gray-800 ml-0.5vw'>From</p>
                        </div>
                        <p className='text-vw text-gray-800'>Pakistan</p>
                    </div>
                    <div className="flex justify-between items-center w-full p-vw">
                        <div className="flex items-center">
                        <Icon icon="mdi:account" className='text-vw text-gray-800'/>
                        <p className='text-vw text-gray-800 ml-0.5vw'>Member since</p>
                        </div>
                        <p className='text-vw text-gray-800'>March 2022</p>
                    </div>
                    <div className="flex items-center w-full p-vw">
                        <Icon icon="lets-icons:date-today" className='text-vw text-gray-800'/>
                        <p className='text-vw text-gray-800 ml-0.5vw'>Available</p>
                    </div>
                    <Link>
                        <div className="w-[22vw] mt-vw text-center border-[1px] hover:bg-gray-600 hover:text-white border-black rounded-md p-0.5vw">
                            <p className='text-vw text-center font-semibold hover:text-white text-black'>Edit</p>
                        </div>
                        </Link>
                </section>
                <section className="w-full ml-vw">
                    <img src={data?.image} className='w-full max-w-[50vw] h-20vw object-cover' alt={data?.username} />
                </section>
            </article>
            <article className="w-full ml-vw max-w-[25vw] p-vw border-[1px] border-gray-400">
                <h1 className='text-vw text-black font-semibold'>Description</h1>
                <p className='text-vw w-full mt-vw text-gray-800'>
                🔶🔶Lets talks about Web-application and Mobile-application development. 🖐️Hi guys! ▶️ I'm a skilled full stack developer with over 2.5+ years experience in ♦️MERN Stack Development with extensive experience in building CMS and CRM application. ⏩ 3+years experience in JavaScript, HTML5 and CSS . ⏩ expert in translating🔺Figma into responsive designs. ⏩ I'm an expert in🔻fixing core-web-errors in codes of any of the languages i have mastered. Also have expertise in 🔺websites speed and performance optimization . 🏅 successfully completed projects as freelancer.
                </p>
            </article>
            </main>
        </Layout>
    </div>
  )
}

export default UserProfile