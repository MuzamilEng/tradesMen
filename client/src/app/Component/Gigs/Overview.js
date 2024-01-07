import React from 'react'

const Overview = () => {
  return (
    <div>
        <div className="flex items-start justify-between w-full">
            <div className="">
                <h1 className="text-[1.2vw] font-bold">Gig Title</h1>
                <p className='text-vw w-full max-w-[17vw]'>As your Gig storefront, your title is the most important place to include keywords that buyers would likely use to search for a service like yours.</p>
            </div>
            <textarea  className='w-full p-vw border-[2px] rounded-md max-w-[25vw] focus:outline-none' ></textarea>
        </div>
        <div className="mt-2vw border-b-[1px] w-full">
                <h1 className="text-[1.5vw] w-full text-center border-b-[1px] p-vw font-bold">Description</h1>
                <p className='text-vw w-full mt-vw font-medium max-w-[17vw]'>Briefly Describe Your Gig</p>
            <textarea rows={6} className='w-full p-vw mt-vw border-[2px] rounded-md focus:outline-none' ></textarea>
        </div>
        <div className="mt-vw w-full">
          <h1 className='text-[1.5vw] font-bold text-center'>Showcase Your Services In A Gig Gallery</h1>
          <p className='text-vw w-full mt-vw font-medium'>Encourage buyers to choose your Gig by featuring a variety of your work.</p>
          <section className="w-full p-vw">
            <h1 className='text-vw text-black underline'>Gig Image Guideline</h1>
            <h1 className='text-vw text-black MT-0.5vw'>Images (up to 3)</h1>
            <p className='text-vw w-full mt-vw font-medium'>Get noticed by the right buyers with visual examples of your services</p>
            <div className="flex mt-vw items-center">
            {/* <div className='relative w-full bg-gray-400 cursor-pointer hover:bg-gray-600 overflow-hidden max-w-[10vw] h-[10vw] rounded-full border-2'>
                  <label htmlFor='image' className='relative bg-gray-300'>
                      <img src={selectedImageURL} alt=' ' className='w-full h-full z-10 object-cover' />
                      {!selectedImageURL && <Icon icon="ant-design:camera-filled" className='text-3vw text-white absolute top-[3.3vw] left-[3.3vw] z-50 ' />}
                  </label>
                  <input
                    type='file'
                    id='image'
                    name='image'
                    onChange={handleImageChange}
                    className='sr-only' // Use sr-only class to hide the input visually
                  />
                 </div>   */}
            </div>
          </section>
        </div>
    </div>
  )
}

export default Overview