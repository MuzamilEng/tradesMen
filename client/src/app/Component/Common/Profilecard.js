import React from "react";

const Profilecard = ({username, image, occupation})=>{
    return (
      <div className = "flex bg-blue-500 gap-[2vw] p-[1vw] m-[1vw] shadow-lg rounded-md w-full max-w-[20vw]">
        <div className="p-[1vw]">
          <img src={image} alt="profile pic" className="border-[1vw] border-white w-[5vw] h-[5vw] rounded-full " />
        </div>
        <div>
        <p className="font-bold transform translate-y-[1vw] text-white">{username}</p>
        <p className="transform translate-y-[1vw] text-white">{occupation}</p>
       
        </div>
      </div>
    );
    }
    export default  Profilecard