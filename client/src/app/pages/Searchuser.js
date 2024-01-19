import React from 'react'
import { useGlobalContext } from '../UserContext/UserContext'

const Searchuser = () => {
    const {searchData} = useGlobalContext()
   
  return (
    <>
    <h1>hy</h1>
     {
  searchData?.data.map((item, index) => {
          return (
            <div key={index}>
              <h1 className="font-bold text-[1.5vw] transform translate-y-[1.3vw] ">
                {item?.occupation}
              </h1>
              <h1 className="font-bold text-[1.5vw] transform translate-y-[1.3vw] ">
                {item?.username}
              </h1>
              <img src={item.gigImage1} alt="" />
            </div>
          )
        })     
     }
    </>
  )
}

export default Searchuser
