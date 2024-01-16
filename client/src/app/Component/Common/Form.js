import React from 'react'

const Form = () => {
  return (
    <>
      <div className="transform translate-y-[4vw] translate-x-[5vw]">
        <p className="">Hello, Guest!</p>
        <h1 className="font-bold text-[1.5vw] transform translate-y-[1.3vw] ">
          Find the Best Doctor Near You
        </h1>
      </div>
      <div className="ml-[20vw] mt-[5vw] ">
        <form className=" p-[2vw] flex items-center ">
          <select className="border border-solid p-[0.7vw] w-full max-w-[15vw] rounded-md shadow-md">
            <option value="1" className="">
              Option 1
            </option>
            <option value="2">Option 2</option>
            <option value="3">Option 3</option>
          </select>
          <input
            type="text"
            name="name"
            placeholder="Search by specialist"
            className="border border-solid p-[0.7vw] w-full max-w-[35vw] rounded-md shadow-md"
          />
        </form>
      </div>
    </>
  );
}

export default Form
