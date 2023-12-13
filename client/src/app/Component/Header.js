// import React from 'react'
// import { Icon } from '@iconify/react';
// import { Link } from 'react-router-dom';

// const Header = () => {
//   return (
//     <div>
//       <div className="w-full flex justify-between items-center p-vw bg-[#f85606]">
//                     <Link to="/" className="ml-8vw flex items-center">
//                         <img src="images/logo2.png" alt="" className='w-full max-w-[4vw] -mt-vw ml-vw h-3vw' />
//                         <h1 className='text-white text-[2.5vw] font-light -ml-vw italic'>radesMen</h1>
//                     </Link>
//                     <section className='flex items-center'>
//                         <Link to={"/login"} className="flex items-center cursor-pointer m-vw">
//                             <Icon icon="mdi:account-outline" className='text-white  text-[1.5vw] mr-0.2vw' />
//                             <h1 className='text-white text-[0.9vw] font-semibold'>Login</h1>
//                         </Link>
//                         <Link to={"/signup"} className="flex items-center">
//                             <h1 className='text-white text-[0.9vw] font-semibold'>Sign Up</h1>
//                         </Link>
//                         <div className="flex items-center m-vw">
//                         <Icon icon="material-symbols:language"  className='text-white text-[1.5vw] mr-0.2vw'  />
//                         <select className='focus:outline-none bg-inherit text-vw border-none text-white'>
//                             <option className='text-black text-[0.9vw]' value="">English</option>
//                             <option className='text-black text-[0.9vw]' value="">Hindi</option>
//                         </select>
//                         </div>
//                     </section>
//                 </div>
//     </div>
//   )
// }

// export default Header
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

function Header() {
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);

  const { pathname } = useLocation();

  const isActive = () => {
    window.scrollY > 0 ? setActive(true) : setActive(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", isActive);
    return () => {
      window.removeEventListener("scroll", isActive);
    };
  }, []);

  return (
    <>
    <div className={active || pathname !== "/" ? "navbar active" : "navbar"}>
      <div className="navbar_container bg-[#013914]">
        <div className="logo">
          <Link className="link" to="/">
            <span className="text-2vw text-white">TradesMen</span>
          </Link>
          <span className="dot">.</span>
        </div>
        <div className="nav_links">
          <span className="text-vw text-white">TradesMen Business</span>
          <span className="text-vw text-white">Explore</span>
          <span className="text-vw text-white">English</span>
        </div>
      </div>
    </div>
    </>
  );
}

export default Header;
