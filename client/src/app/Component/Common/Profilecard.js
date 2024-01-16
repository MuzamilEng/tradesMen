import React from "react";

const Profilecard = ({name, proffession, experience,img})=>{
    return (
      <div className = "flex bg-blue-500 gap-2 p-[1vw] shadow-lg rounded-md w-full max-w-[50vw]">
        <div className="p-[1vw]">
          <img src={img} alt="profile pic" className="border-[1vw] border-white w-[5vw] h-[5vw] rounded-full " />
        </div>
        <div>
        <p className="font-bold transform translate-y-[1vw] text-white">{name}</p>
        <p className="transform translate-y-[1vw] text-white">{proffession}</p>
        <p className="transform translate-y-[1vw] text-white">{experience}</p>
        </div>
      </div>
    );
    }
    export default Profilecard