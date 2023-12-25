import React, { useEffect, useState } from 'react'
import Header from '../Component/Header'
import { tradesmanProfile } from '../Data'
import { useForm, Controller } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';
import { useAddTradesmanMutation } from '../store/storeApi';
import { useGlobalContext } from '../UserContext/UserContext';
import Map from '../Component/Map';

{/* <Map setSearchedLocation={setSearchedLocation}/> */}

const Profile = () => {
  const [searchedLocation, setSearchedLocation] = useState(null)
   // Retrieving user login info from localStorage
   const userLoginInfoString = localStorage.getItem('userLoginInfo');
   const userLoginInfo = JSON.parse(userLoginInfoString);
    const [addTradesman] = useAddTradesmanMutation();
    const navigate = useNavigate();
    // const [userDetails, setUserDetails] = useState(null)
    const { tradesManProfile, setTradesManProfile } = useGlobalContext();
    const [selectedImageURL, setSelectedImageURL] = useState(tradesManProfile?.image || "");
    const { handleSubmit, setValue, control, formState: { errors } } = useForm({
      defaultValues: {
        occupation: tradesManProfile?.occupation || "",
        username: userLoginInfo?.username || "",
        email: userLoginInfo?.email || "",
        phoneNumber: userLoginInfo?.phoneNumber || "",
        ratings: tradesManProfile?.ratings || "",
        hourlyRate: tradesManProfile?.hourlyRate || "",
        description: tradesManProfile?.description || "",
        location: tradesManProfile?.location || "",
        image: tradesManProfile?.image
      },
    });
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setValue(name, value);
    };
  
    const handleImageChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        setTradesManProfile({ ...tradesManProfile, [e.target.name]: file }); // Set image as an object with public_id and url: file });
        const imageURL = URL.createObjectURL(file);
        setSelectedImageURL(imageURL);
      }
    };
  
    const onSubmit = async (data) => {
      const formData = new FormData();
  
      // Append text data to formData
      for (const key in data) {
        if (data[key] !== undefined) {
          formData.append(key, data[key]);
        }
      }
      // Append image to formData
      if (tradesManProfile?.image) {
        formData.append('image', tradesManProfile.image);
        console.log(tradesManProfile.image, "tradesManProfile.image");
    }
    
  
      try {
        const result = await addTradesman(formData);
  
        toast.success("Post Added successfully", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
        });
  
        setTimeout(() => {
          // navigate('/');
        }, 3000);
  
        console.log(result, "from onSubmit");
      } catch (error) {
        toast.error("An error occurred while adding post", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
        });
      }
    };

    useEffect(()=> {
      console.log(searchedLocation,'searchedLocation');
  }, [searchedLocation])

  return (
    <div>
        <Header />
        <ToastContainer />
        <form onSubmit={handleSubmit(onSubmit)} className="p-3vw w-full">
            {tradesmanProfile?.map((item, index) => (
                <div key={index} className="w-full h-full">
                    <h1 className='text-3xl text-center italic font-medium underline'>{item?.title}</h1>
                    <img src={selectedImageURL || tradesManProfile?.image} className='w-full bg-slate-300 mt-vw max-w-[7vw] h-[7vw] rounded-full border-[1px] border-gray-300 ' /> <br />
                    {/* <img src={''} alt="" className='w-full bg-slate-300 mt-vw max-w-[7vw] h-[7vw] rounded-full border-[1px] border-gray-300' /> */}
                    <input type="file" name='image' onChange={handleImageChange} className='p-0.5vw mt-vw border-[1px] border-gray-300 rounded-md w-full max-w-[10vw]' />
                    <div className="col-center w-full">
                    <section className="mt-vw ml-8vw p-2vw w-full grid grid-cols-2 gap-2">
                        {item?.form?.map((item2, index)=>(
                            <div key={index} className='w-full max-w-[33vw]'>
                                {item2?.type === 'textarea' ? 
                                <>
                                    <label className='text-black text-vw font-semibold'>{item2?.label}</label> <br />
                                    <Controller
                                        name={item2?.name}
                                        control={control}
                                        rules={item2?.rules}
                                        render={({ field }) => (
                                            <textarea rows={3}
                                                onChange={handleInputChange}
                                                {...field} value={field?.value}
                                                type={item2?.type} placeholder={item2?.placeholder}
                                                className="w-full focus:outline-none max-w-[30vw] p-vw rounded-md border-[1px] border-gray-300"
                                            ></textarea>
                                        )}
                                    />
                                    <br />
                                    {errors[item2?.name] && <p className='text-red-500'>{errors[item2?.name]?.message}</p>}
                                 {/* <textarea value={item2?.title} rows={3} placeholder={item2?.placeholder} name={item2?.name} className='w-full focus:outline-none max-w-[30vw] p-vw rounded-md border-[1px] border-gray-300' /> */}
                                </> :
                            <div className='mt-vw'>
                                <label className='text-black text-vw font-semibold'>{item2?.label}</label> <br />
                                <Controller
                                        name={item2?.name}
                                        control={control}
                                        rules={item2?.rules}
                                        render={({ field }) => (
                                            <input
                                                onChange={handleInputChange}
                                                {...field} value={field?.value}
                                                type={item2?.type} placeholder={item2?.placeholder}
                                                className="w-full max-w-[30vw] focus:outline-none p-vw rounded-md border-[1px] border-gray-300"
                                            />
                                        )}
                                    />
                                    <br />
                                    {errors[item2?.name] && <p className='text-red-500'>{errors[item2?.name]?.message}</p>}
                                {/* <input value={item2?.title} placeholder={item2?.placeholder} name={item2?.name} className='w-full max-w-[30vw] focus:outline-none p-vw rounded-md border-[1px] border-gray-300' /> */}
                                </div>}
                            </div>
                        ))}
                    </section>
                    <div className="flex w-full justify-center items-center">
                                <button type='submit' className='bg-[#1dbf73] text-white mt-2vw p-0.5vw w-full max-w-[10vw] hover:bg-[#1dbf73e0] text-vw rounded-md'>Submit</button>
                            </div>
                    </div>
                            <div className="mb-4vw">
                      <Map setSearchedLocation={setSearchedLocation} />
                    </div>
                    <div className="flex w-full justify-center items-center">
                                <button type='submit' className='bg-[#1dbf73] text-white mt-2vw p-0.5vw w-full max-w-[10vw] hover:bg-[#1dbf73e0] text-vw rounded-md'>Submit</button>
                            </div>
                </div>
            ))}
        </form>
    </div>
  )
}

export default Profile
