import React from 'react'
import Layout from '../Layout/Layout'
import PinLocation from './GoogleMap/PinLocation'
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
            <main className=" mt-vw">
                <h1 className='text-2vw text-center font-semibold text-black'>Welcome Back! {data?.username}</h1>
                <img src={data?.image ? data?.image : '/img/man.png'} alt={data?.username} className='w-full max-w-[6vw] h-[6vw] rounded-full absolute left-2vw top-[12vw] object-fit' />
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
                    <p className='text-vw ml-vw p-vw w-full max-w-[25vw] rounded-md border-[1px] border-gray-300 focus:outline-none' >{data?.description}</p>
                </section>
                <section className='p-vw m-0.5vw'>
                    <label className='text-vw font-semibold ml-vw text-black' htmlFor="">Address</label> <br />
                    <input type="text" value={data?.location} className='text-vw ml-vw p-vw w-full max-w-[25vw] rounded-md border-[1px] border-gray-300 focus:outline-none' />
                </section>
                </article>
                <div className="w-full h-[25vw] relative">
                <PinLocation lat={lat ? lat : -73.978548} lng={lng? lng : 40.755588} />
                </div>
            </main>
        </Layout>
    </div>
  )
}

export default UserProfile