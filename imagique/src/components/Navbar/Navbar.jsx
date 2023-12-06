import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoMdAdd, IoMdSearch } from "react-icons/io";

const Navbar = ({ searchTerm, setSearchTerm, user }) => {
  const navigate = useNavigate();

  if (!user) return null;

  return (
    <div className="flex gap-2 md:gap-5 w-full py-7">
      <div className="flex justify-start items-center gap-3 w-full px-2 border-none outline-none focus-within:shadow-sm">
        <IoMdSearch fontSize={21} className="hidden sm:block text-textColor" />
        <input
          type="text"
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search"
          value={searchTerm}
          onFocus={() => navigate("/search")}
          className="bg-primaryColorDark text-base lg:text-big p-2 w-full border-solid border-2 border-primaryColorLight focus:border-accentColor outline-none"
        />
      </div>
      <div className="flex p-0.5 border-solid border-2 border-primaryColorLight hover:border-accentColor transition-all duration-200 ease-in-out">
        <Link
          to="create-pin"
          className="bg-primaryColorLight hover:bg-accentColor transition-all duration-200 ease-in-out text-white w-10 h-10 lg:w-12 lg:h-12 flex justify-center items-center"
        >
          <IoMdAdd />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
