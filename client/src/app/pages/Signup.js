import React from 'react'
import { signup } from '../Data'
import { useForm, Controller } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { useLoginUserMutation } from '../store/storeApi';
import { Icon } from '@iconify/react';
import Header from '../Component/Header';
import Otp from '../Component/Otp';

const Signup = () => {
    const [loginUser] = useLoginUserMutation();
    const [showOpt, setShowOpt] = React.useState(false);
    const navigate = useNavigate()
    const [otpValue, setOptValue] = React.useState([]);
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

    const onSubmit = (data, e) => {
        e.preventDefault();
        loginUser(data);
        showToast('Successfully Signed Up', 'success');
        setTimeout(() => {
            navigate('/');
        }, 2000);
    };
    return (
        <div>
            <main className='w-screen relative h-full'>
                <ToastContainer />
               <Header />
                <form onSubmit={handleSubmit(onSubmit)} className="flex mt-vw justify-center items-center">
                    {signup?.map((item, index) => (
                        <div key={index} className='mt-2vw'>
                            <h1 className='text-[1.6vw] italic font-medium text-start'>{item?.title}</h1>
                            <section className="grid mt-2vw grid-cols-2 gap-2">
                            {item?.form?.map((form, index) => (
                                <div key={index} className='w-full  p-0.5vw max-w-[30vw]'>
                                    <label className='text-vw font-light text-black'>{form?.label}</label> <br />
                                    <Controller
                                        name={form?.name}
                                        control={control}
                                        rules={form?.rules}
                                        render={({ field }) => (
                                            <input
                                                onChange={handleInputChange}
                                                {...field} value={field?.value}
                                                type={form?.type} placeholder={form?.placeholder}
                                                className="w-[20vw] text-vw focus:outline-none p-[0.6vw] focus:shadow-md border-gray-300 border-[1px] rounded-md"
                                            />
                                        )}
                                    />
                                    <br />
                                    {errors[form?.name] && <p className='text-red-500'>{errors[form?.name]?.message}</p>}
                                </div>
                            ))}
                            </section>
                            <div className="flex w-full justify-center items-center">
                                <button type='submit' className='bg-[#1dbf73] text-white mt-2vw p-0.5vw w-full max-w-[10vw] hover:bg-[#1dbf73e0] text-vw rounded-md' onClick={() => setShowOpt(true)}>Sign Up</button>
                            </div>
                            <p className='text-[0.9vw] mt-0.5vw w-full text-center'>or continue with</p>
                            <div className="mt-2vw w-full justify-center flex items-center">
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
                {showOpt && (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="relative">
            {/* <Otp setOptValue={setOptValue} validateOtp={validateOTP} showOtp={() => setShowOpt(!showOpt)} /> */}
            <Otp showOtp={() => setShowOpt(!showOpt)} setOptValue={setOptValue} />
          </div>
        </div>
      )}
            </main>
        </div>
    )
}

export default Signup