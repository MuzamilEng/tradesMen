import React from 'react'
import Layout from '../Layout/Layout'
import PinLocation from './PinLocation'
import { useParams } from 'react-router-dom'
import { useGetTrademanByIdQuery } from '../store/storeApi'

const UserProfile = () => {
    const {id} = useParams()
    const {data} = useGetTrademanByIdQuery(id);
    const lat = data?.lat
    const lng = data?.lng
    console.log(data, "data profile")
  return (
    <div className='w-full'>
        <Layout>
            <main className="w-full relative h-[90vw] col-center">
                <h1 className='text-vw text-black underline'>User Profile</h1>
                <img src={data?.image} alt={data?.username} className='w-full max-w-[8vw] h-[8vw] rounded-full absolute right-2vw top-[20vw]' />
                <article className="w-full p-3vw grid grid-cols-2 gap-2">
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
                <div className="w-full">
                <label className='text-vw font-semibold ml-vw text-black' htmlFor="">Pin Location</label> <br />
                <PinLocation lat={lat ? lat : -73.978548} lng={lng? lng : 40.755588} />
                </div>
                </article>
            </main>
        </Layout>
    </div>
  )
}

export default UserProfile