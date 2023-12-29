import React from 'react'
import { login } from '../Data'
import { useForm, Controller } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';
import { useLoginUserMutation } from '../store/storeApi';
import { Icon } from '@iconify/react';
import Header from '../Component/Header';
import Navbar from '../Component/Navbar';
import axios from 'axios';
import LoginButton from '../Component/LoginButton';

const Login = () => {
    const [loginUser] = useLoginUserMutation();
    const navigate = useNavigate()
    const { handleSubmit, setValue, control, formState: { errors } } = useForm({
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        console.log(value, "value")
        setValue(name, value);
    };
    const showToast = (message, type) => {
        toast[type](message, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000,
        });
    };

    const onSubmit = async (data, e) => {
        e.preventDefault();
       try {
        const response  = await loginUser(data);
        // console.log(response.data.token, 'success');
        const fetchDetails = await axios.get('http://localhost:5000/api/v1/getDetails', {
            headers: {
              Authorization: `Bearer ${response.data.token}`,
            },
          });
       // Storing user login info in localStorage
        const userLoginInfo = fetchDetails?.data;
        localStorage.setItem('userLoginInfo', JSON.stringify(userLoginInfo));
        //   console.log(fetchDetails.data, 'fetched user details');
        //   console.log(fetchDetails.status, 'fetched user details');
        if(fetchDetails.status === 200 || fetchDetails.status === 201) {
            showToast('Successfully Logged In', 'success');
            setTimeout(() => {
                navigate('/profile');
            }, 3000);
        } else {
            showToast('Failed to login. Please try again.', 'error');
        }
       } catch (error) {
        console.error('Error during login:', error);
        showToast('An unexpected error occurred. Please try again.', 'error');
       }
    };
    return (
        <div>
            <main className='w-screen relative h-full'>
                <ToastContainer />
                <Header />
                {/* <Navbar /> */}
                <form onSubmit={handleSubmit(onSubmit)} className="flex mt-vw justify-center items-center">
                    {login?.map((item, index) => (
                        <div key={index} className='mt-2vw'>
                            <h1 className='text-[1.6vw] italic font-medium text-start'>{item?.title}</h1>
                            {item?.form?.map((form, index) => (
                                <div key={index} className='w-full p-0.5vw max-w-[30vw]'>
                                    <label className='text-[1.4vw] font-light text-black'>{form?.label}</label> <br />
                                    <Controller
                                        name={form?.name}
                                        control={control}
                                        rules={form?.rules}
                                        render={({ field }) => (
                                            <input
                                                onChange={handleInputChange}
                                                {...field} value={field?.value}
                                                type={form?.type} placeholder={form?.placeholder}
                                                className="w-[32vw] text-vw focus:outline-none p-[0.6vw] focus:shadow-md border-gray-300 border-[1px] rounded-md"
                                            />
                                        )}
                                    />
                                    <br />
                                    {errors[form?.name] && <p className='text-red-500'>{errors[form?.name]?.message}</p>}
                                </div>
                            ))}
                            <div className="flex justify-center items-center">
                                <button type='submit' className='bg-[#1dbf73] text-white mt-2vw p-0.5vw w-full max-w-[10vw] hover:bg-[#1dbf73e0] text-vw rounded-md'>Login</button>
                            </div>
                            <p className='text-[0.9vw] mt-0.5vw w-full text-center'>Don't have an account? <Link to='/signup' className='text-vw font-medium text-black hover:text-blue-600'>Sign up</Link></p>
                            
                            <p className='text-[0.9vw] mt-0.5vw w-full text-center'>or continue with</p>
                            {/* <LoginButton /> */}
                            <div className="mt-2vw w-full flex items-center">
                                <section className="flex items-center border-[1px] border-gray-500 cursor-pointer hover:bg-gray-100 ml-vw w-full max-w-[8vw] text-center justify-center rounded-md p-0.5vw">
                                    <Icon icon="mdi:facebook" className='text-[#3b5998] text-[1.5vw] mr-0.2vw' />
                                </section>
                                <section className="flex items-center border-[1px] border-gray-500 cursor-pointer hover:bg-gray-100 ml-vw w-full max-w-[8vw] text-center justify-center rounded-md p-0.5vw">
                                    <Icon icon="devicon:google" className='text-[1.5vw] mr-0.2vw' />
                                </section>
                                <section className="flex items-center border-[1px] border-gray-500 cursor-pointer hover:bg-gray-100 ml-vw w-full max-w-[8vw] text-center justify-center rounded-md p-0.5vw">
                                    <Icon icon="pajamas:twitter" className='text-[1.5vw] mr-0.2vw' />
                                </section>
                            </div>
                        </div>
                    ))}
                </form>
            </main>
        </div>
    )
}

export default Login