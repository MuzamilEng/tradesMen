import React from 'react'
import Layout from '../Layout/Layout'
import PinLocation from './PinLocation'

const UserProfile = () => {
  return (
    <div className='w-full'>
        <Layout>
            <main className="w-full h-[90vw] col-center">
                <h1 className='text-vw text-black underline'>User Profile</h1>
                <article className="w-full p-3vw grid grid-cols-2 gap-2">
                <section className='p-vw m-0.5vw'>
                    <label className='text-vw font-semibold ml-vw text-black' htmlFor="">Username</label> <br />
                    <input type="text" className='text-vw ml-vw p-vw w-full max-w-[25vw] rounded-md border-[1px] border-gray-300 focus:outline-none' />
                </section>
                <section className='p-vw m-0.5vw'>
                    <label className='text-vw font-semibold ml-vw text-black' htmlFor="">Email</label> <br />
                    <input type="text" className='text-vw ml-vw p-vw w-full max-w-[25vw] rounded-md border-[1px] border-gray-300 focus:outline-none' />
                </section>
                <section className='p-vw m-0.5vw'>
                    <label className='text-vw font-semibold ml-vw text-black' htmlFor="">Phone Number</label> <br />
                    <input type="text" className='text-vw ml-vw p-vw w-full max-w-[25vw] rounded-md border-[1px] border-gray-300 focus:outline-none' />
                </section>
                <section className='p-vw m-0.5vw'>
                    <label className='text-vw font-semibold ml-vw text-black' htmlFor="">Occupation</label> <br />
                    <input type="text" className='text-vw ml-vw p-vw w-full max-w-[25vw] rounded-md border-[1px] border-gray-300 focus:outline-none' />
                </section>
                <section className='p-vw m-0.5vw'>
                    <label className='text-vw font-semibold ml-vw text-black' htmlFor="">Description</label> <br />
                    <textarea type="text" rows={3} className='text-vw ml-vw p-vw w-full max-w-[25vw] rounded-md border-[1px] border-gray-300 focus:outline-none' ></textarea>
                </section>
                <section className='p-vw m-0.5vw'>
                    <label className='text-vw font-semibold ml-vw text-black' htmlFor="">Pin Location</label> <br />
                    <input type="text" className='text-vw ml-vw p-vw w-full max-w-[25vw] rounded-md border-[1px] border-gray-300 focus:outline-none' />
                </section>
                <div className="w-full">
                <label className='text-vw font-semibold ml-vw text-black' htmlFor="">Pin Location</label> <br />
                <PinLocation lat={74.314183} lng={31.565682} />
                </div>
                </article>
            </main>
        </Layout>
    </div>
  )
}

export default UserProfile