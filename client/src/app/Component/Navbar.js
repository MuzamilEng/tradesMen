import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
// import "./Navbar.scss";

function Navbar() {
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

  // const currentUser = null

  const currentUser = {
    id: 1,
    username: "Anna",
    isSeller: true,
  };

  return (
    <>
    <div className={active || pathname !== "/" ? "navbar active" : "navbar"}>
      <div className="navbar_container">
        <div className="logo">
          <Link className="link" to="/">
            <span className="text">TradesMen</span>
          </Link>
          <span className="dot">.</span>
        </div>
        <div className="nav_links">
          <span>TradesMen Business</span>
          <span>Explore</span>
          <span>English</span>
          {!currentUser?.isSeller && <span>Become a Seller</span>}
          {currentUser ? (
            <div className="user" onClick={()=>setOpen(!open)}>
              <img
                src="https://images.pexels.com/photos/1115697/pexels-photo-1115697.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
              />
              <span>{currentUser?.username}</span>
              {open && <div className="options">
                {currentUser.isSeller && (
                  <>
                    <Link className="nav_link" to="/mygigs">
                      Gigs
                    </Link>
                    <Link className="nav_link" to="/add">
                      Add New Gig
                    </Link>
                  </>
                )}
                <Link className="nav_link" to="/orders">
                  Orders
                </Link>
                <Link className="nav_link" to="/messages">
                  Messages
                </Link>
                <Link className="nav_link" to="/">
                  Logout
                </Link>
              </div>}
            </div>
          ) : (
            <>
              <span>Sign in</span>
              <Link className="link" to="/register">
                <button className="nav_btn">Join</button>
              </Link>
            </>
          )}
        </div>
      </div>
      
    </div>
    {/* {(active || pathname !== "/") && ( */}
    <>
          <hr />
          <div className="nav_menu">
            <Link className="link menuLink" to="/">
              Graphics & Design
            </Link>
            <Link className="link menuLink" to="/">
              Video & Animation
            </Link>
            <Link className="link menuLink" to="/">
              Writing & Translation
            </Link>
            <Link className="link menuLink" to="/">
              AI Services
            </Link>
            <Link className="link menuLink" to="/">
              Digital Marketing
            </Link>
            <Link className="link menuLink" to="/">
              Music & Audio
            </Link>
            <Link className="link menuLink" to="/">
              Programming & Tech
            </Link>
            <Link className="link menuLink" to="/">
              Business
            </Link>
            <Link className="link menuLink" to="/">
              Lifestyle
            </Link>
          </div>
          <hr />
        </>
      {/* )}     */}
    </>
  );
}

export default Navbar;
