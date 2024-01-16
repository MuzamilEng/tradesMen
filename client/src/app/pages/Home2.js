import React from "react";
import Form from "../Component/Common/Form";
import Hero from "../Component/Common/Hero";
import Queries from "../Component/Common/Queries";
import Profile from "../Component/Common/Profile";
import Navbar2 from "../Component/Common/Navbar2";

const Home2 = () => {
  return (
    <div className="h-[100vh] w-full overflow-y-scroll overflow-x-hidden ">
      <Navbar2 />
      <Form />
      <Hero />
      <Queries />
      <Profile />
    </div>
  );
};

export default Home2;
