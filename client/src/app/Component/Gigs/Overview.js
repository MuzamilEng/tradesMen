import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';

const ImageInput = ({ id, name, accept, selectedImage, handleImageChange }) => {
  return (
    <div className='relative m-vw w-full bg-gray-400 cursor-pointer hover:bg-gray-600 overflow-hidden max-w-[15vw] h-[15vw] rounded-md border-2'>
      <label htmlFor={id} className='relative bg-gray-300'>
        <img src={selectedImage ? selectedImage : " "} alt={selectedImage ? '' : ''} className='w-full h-full z-10 object-cover' />
        {!selectedImage && (
          <Icon icon='ant-design:camera-filled' className='text-3vw text-white absolute top-[5.6vw] left-[5vw] z-50' />
        )}
      </label>
      <input type='file' accept={accept} id={id} name={name} onChange={handleImageChange} className='sr-only' />
    </div>
  );
};

const VideoInput = ({ id, name, selectedVideo, handleVideoChange }) => {
  return (
    <div className='relative m-vw w-full bg-gray-400 cursor-pointer hover:bg-gray-600 overflow-hidden max-w-[15vw] h-[15vw] rounded-md border-2'>
      <label htmlFor={id} className='relative bg-gray-300'>
        {selectedVideo ? (
          <video controls className='w-full h-full z-10 object-cover'>
            <source src={selectedVideo} type='video/mp4' />
          </video>
        ) : (
          <Icon icon='solar:reel-linear' className='text-3vw text-white absolute top-[5.6vw] left-[5.4vw] z-50' />
        )}
      </label>
      <input type='file' accept='video/*' id={id} name={name} onChange={handleVideoChange} className='sr-only' />
    </div>
  );
};

const DocumentInput = ({ id, name, accept, selectedDocument, handleDocumentChange }) => {
  return (
    <div className='relative m-vw w-full bg-gray-400 cursor-pointer hover:bg-gray-600 overflow-hidden max-w-[15vw] h-[15vw] rounded-md border-2'>
      <label htmlFor={id} className='relative bg-gray-300'>
        {/* Display document preview here if needed */}
        <Icon icon='ant-design:file-pdf-filled' className='text-3vw text-white absolute top-[5.6vw] left-[5vw] z-50' />
      </label>
      <input type='file' accept={accept} id={id} name={name} onChange={handleDocumentChange} className='sr-only' />
    </div>
  );
};

const Overview = () => {
  const [selectedImageURL, setSelectedImageURL] = useState({
    image1: "", image2: "", image3: "", video: "", docs1: "", docs2: "",
  });

  const navigate = useNavigate();
  const { handleSubmit, setValue, control, formState: { errors }, reset, register } = useForm({
    defaultValues: {
      gigTitle: "",
      gigDescription: "",
      image1: "",
      image2: "",
      image3: "",
      video: "",
      docs1: "",
      docs2: "",
    },
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setSelectedImageURL({ ...selectedImageURL, [e.target.name]: imageURL });
    }
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const videoURL = URL.createObjectURL(file);
      setSelectedImageURL({ ...selectedImageURL, video: videoURL });
    }
  };

  const handleDocumentChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const documentURL = URL.createObjectURL(file);
      setSelectedImageURL({ ...selectedImageURL, [e.target.name]: documentURL });
    }
  };

  const onSubmit = (data) => {
    // Handle form submission here
    console.log(data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex items-start justify-between w-full">
          <div className="">
            <h1 className="text-[1.2vw] font-bold">Gig Title</h1>
            <p className='text-vw w-full max-w-[17vw]'>As your Gig storefront, your title is the most important place to include keywords that buyers would likely use to search for a service like yours.</p>
          </div>
          <textarea className='w-full p-vw border-[2px] rounded-md max-w-[25vw] focus:outline-none' {...register('gigTitle')}></textarea>
        </div>
        <div className="mt-2vw border-b-[1px] w-full">
          <h1 className="text-[1.5vw] w-full text-center border-b-[1px] p-vw font-bold">Description</h1>
          <p className='text-vw w-full mt-vw font-medium max-w-[17vw]'>Briefly Describe Your Gig</p>
          <textarea rows={6} className='w-full p-vw mt-vw border-[2px] rounded-md focus:outline-none' {...register('gigDescription')}></textarea>
        </div>
        <div className="mt-vw w-full">
          <h1 className='text-[1.5vw] font-bold text-center'>Showcase Your Services In A Gig Gallery</h1>
          <p className='text-vw w-full mt-vw font-medium'>Encourage buyers to choose your Gig by featuring a variety of your work.</p>
          <section className="w-full p-vw">
            <h1 className='text-vw text-black mt-0.5vw font-semibold'>Images (up to 3)</h1>
            <p className='text-vw w-full mt-vw font-medium'>Get noticed by the right buyers with visual examples of your services</p>
            <div className="flex mt-vw items-center">
              <ImageInput id='image1' name='image1' selectedImage={selectedImageURL?.image1} accept='image/*' handleImageChange={handleImageChange} />
              <ImageInput id='image2' name='image2' selectedImage={selectedImageURL?.image2} accept='image/*' handleImageChange={handleImageChange} />
              <ImageInput id='image3' name='image3' selectedImage={selectedImageURL?.image3} accept='image/*' handleImageChange={handleImageChange} />
            </div>
          </section>
          <section className="w-full p-vw">
            <h1 className='text-vw text-black underline font-bold'>Gig Video Guideline</h1>
            <h1 className='text-vw text-black mt-0.5vw font-semibold'>Video (up to 1)</h1>
            <p className='text-vw text-gray-500 font-semibold'>Capture buyers' attention with a video that showcases your service. Please choose a video shorter than 75 seconds and smaller than 50MB</p>
            <div className="flex mt-vw items-center">
              <VideoInput
                id='video'
                name='video'
                selectedVideo={selectedImageURL?.video}
                handleVideoChange={handleVideoChange}
              />
            </div>
          </section>
          <section className="w-full p-vw">
            <h1 className='text-vw text-black mt-0.5vw font-semibold'>Document (up to 2)</h1>
            <p className='text-vw w-full mt-vw font-medium'>Show some of the best work you created in a document (PDFs only).</p>
            <div className="flex mt-vw items-center">
              <DocumentInput id='docs1' name='docs1' selectedDocument={selectedImageURL?.docs1} accept='application/pdf' handleDocumentChange={handleDocumentChange} />
              <DocumentInput id='docs2' name='docs2' selectedDocument={selectedImageURL?.docs2} accept='application/pdf' handleDocumentChange={handleDocumentChange} />
            </div>
          </section>
        </div>
        <button type="submit" className="mt-4 p-2 bg-blue-500 text-white rounded">Submit</button>
      </form>
    </div>
  );
};

export default Overview;
