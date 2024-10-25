import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaChartBar, FaBook, FaUserGraduate, FaSignOutAlt } from "react-icons/fa";

const LibrarySidebar = () => {
  const [open, setOpen] = useState(true);

  // Updated menu items for the library sidebar
  const Menus = [
    { title: "Dashboard", icon: <FaChartBar />, path: "/librarydashboard" },
    { title: "Book List", icon: <FaBook />, path: "/librarydetail" },
    { title: "Student Details", icon: <FaUserGraduate />, path: "/stddetail" },
  ];

  return (
    <div className="flex min-h-screen">
      <div className={` ${open ? "w-72" : "w-20"} bg-blue-600 p-5 pt-8 relative duration-300`}>
        {/* Toggle button */}
        <img
          src={open ? "https://img.icons8.com/material-outlined/24/000000/circled-left.png" : "https://img.icons8.com/material-outlined/24/000000/circled-right.png"}
          className={`absolute cursor-pointer -right-3 top-9 w-7 border-blue-600 border-2 rounded-full ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
          alt="Toggle"
          aria-label="Toggle sidebar"
        />

        {/* Logo Section */}
        <div className="flex gap-x-4 items-center mb-10">
          <img
            src="https://i.pinimg.com/564x/0c/d0/74/0cd0740f68cacae354e0960f340e1448.jpg"
            className={`cursor-pointer duration-500 w-10 h-10 ${open && "rotate-[360deg]"}`}
            alt="Logo"
          />
          <h1 className={`text-white origin-left font-medium text-xl duration-200 ${!open && "scale-0"}`}>
            Library
          </h1>
        </div>

        {/* Menu List */}
        <ul className="space-y-8">
          {Menus.map((Menu, index) => (
            <li
              key={index}
              className={`flex rounded-md p-2 cursor-pointer hover:bg-blue-500 text-gray-300 text-sm items-center gap-x-4 
              ${index === 0 && "bg-blue-500"}`}
            >
              <span className="text-xl">{Menu.icon}</span>
              <Link to={Menu.path}>
                <span className={`${!open && "hidden"} origin-left duration-200`}>{Menu.title}</span>
              </Link>
            </li>
          ))}
        </ul>

        {/* Logout at the bottom */}
        <div className="absolute bottom-10 w-full">
          <ul className="space-y-8">
            <li className="flex rounded-md p-2 cursor-pointer hover:bg-blue-500 text-gray-300 text-sm items-center gap-x-4">
              <span className="text-xl"><FaSignOutAlt /></span>
              <Link to="/">
                <span className={`${!open && "hidden"} origin-left duration-200`}>Logout</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LibrarySidebar;
