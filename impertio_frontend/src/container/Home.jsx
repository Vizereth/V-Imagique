import React, { useState, useEffect, useRef } from "react";
import logo from "../assets/logo.png";
import { AiOutlineMenuUnfold } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";
import { Link, Route, Routes } from "react-router-dom";
import { Sidebar, UserProfile } from "../components";
import Pins from "./Pins";
import { client } from "../utilities/client";
import { userQuery } from "../utilities/data";
import { fetchUser } from "../utilities/fetchUser";

const Home = () => {
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const [user, setUser] = useState(null);
  const scrollRef = useRef(null);

  const userInfo = fetchUser();

  useEffect(() => {
    const query = userQuery(userInfo?.sub);

    client.fetch(query).then((data) => {
      setUser(data[0]);
    }, []);
  });

  useEffect(() => {
    scrollRef.current.scrollTo(0, 0);
  }, []);

  return (
    <div className="pb-14 bg-primaryColor flex md:flex-row flex-col h-screen transition-height duration-75 ease-out">
      <div className="hidden md:flex h-screen flex-initial">
        <Sidebar user={user && user} />
      </div>
      <div className="flex md:hidden flex-row">
        <div className="p-2 w-full flex flex-row justify-between items-center shadow-md">
          <AiOutlineMenuUnfold
            fontSize={40}
            className="cursor-pointer text-textColor hover:text-hoverColor transition-all duration-200 ease-in-out"
            onClick={() => setToggleSidebar(true)}
          />
          <Link to="/">
            <img src={logo} alt="Logo" className="w-10 lg:w-20 m-2" />
          </Link>
        </div>
        {toggleSidebar && (
          <div className="fixed w-full h-screen overflow-y-auto shadow-md z-20 animate-slide-in">
            <div className="absolute w-full flex justify-end items-center p-2">
              <IoMdClose
                fontSize={40}
                className="cursor-pointer m-4 hover:text-hoverColor transition-all duration-200 ease-in-out"
                onClick={() => {
                  setToggleSidebar(false);
                }}
              />
            </div>
            <Sidebar user={user && user} closeToggle={setToggleSidebar} />
          </div>
        )}
      </div>
      <div
        className="scrollable pb-2 flex-1 h-screen overflow-y-scroll"
        ref={scrollRef}
      >
        <Routes>
          <Route path="/user-profile/:userId" element={<UserProfile />} />
          <Route path="/*" element={<Pins user={user && user} />} />
        </Routes>
      </div>
    </div>
  );
};

export default Home;
