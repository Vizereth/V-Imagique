import React from "react";
import { NavLink, Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import logo from "../../assets/logo.png";
import { categories } from "../../utilities/data";

const Sidebar = ({ user, closeToggle }) => {
  const isActiveStyle =
    "flex items-center px-5 gap-3 text-hoverColor text-base border-black capitalize";
  const isNotActiveStyle =
    "flex items-center px-5 gap-3 text-base hover:text-hoverColor transition-all duration-200 ease-in-out capitalize";

  const handleCloseSidebar = () => {
    if (closeToggle) {
      closeToggle(false);
    }
  };

  return (
    <div className="pb-14 md:pb-0 hide-scrollbar overflow-y-scroll bg-primaryColorDark border-solid border-r-2 border-primaryColorLight shadow-lg flex flex-col justify-between min-h-full h-full min-w-210">
      <div className="flex flex-col gap-4">
        <Link
          to="/"
          className="flex px-5 gap-2 my-4 pt-1 w-190 items-center"
          onClick={handleCloseSidebar}
        >
          <img src={logo} alt="Logo" className="w-10 lg:w-20 h-auto" />
        </Link>
        <div className="flex flex-col gap-4">
          <NavLink
            to="/"
            className={(obj) => {
              return obj.isActive ? isActiveStyle : isNotActiveStyle;
            }}
            onClick={handleCloseSidebar}
          >
            <FaHome fontSize={20}/> Home
          </NavLink>
          <div className="mt-2 px-5">
            <h3 className="text-hoverColor text-base lg:text-big">
              Discover Categories
            </h3>
          </div>
          {categories.map((category) => (
            <NavLink
              to={`/category/${category.name}`}
              className={(obj) => {
                return obj.isActive ? isActiveStyle : isNotActiveStyle;
              }}
              onClick={handleCloseSidebar}
              key={category.name}
            >
              {category.name}
            </NavLink>
          ))}
        </div>
      </div>
      {user && (
        <div className="self-start my-5 mb-3 mx-3 p-0.5 border-solid border-2 border-primaryColorLight hover:border-accentColor transition-all duration-200 ease-in-out">
          <Link
            to={`user-profile/${user._id}`}
            className="flex gap-5 items-center px-3 py-1 bg-primaryColorLight hover:bg-accentColor transition-all duration-200 ease-in-out"
            onClick={handleCloseSidebar}
          >
            <img
              src={user.image}
              alt="user"
              className="w-10 h-10 rounded-full"
            />
            <p className="text-big lg:text-big text-secondary">{user.userName}</p>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
