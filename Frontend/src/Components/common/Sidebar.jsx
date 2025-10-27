import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { CiHome } from "react-icons/ci";
import { FaBook } from "react-icons/fa";
import { GrPlan } from "react-icons/gr";
import { LuBrain } from "react-icons/lu";
import { GiProgression } from "react-icons/gi";
import { IoMdExit } from "react-icons/io";

export default function Sidebar() {
  const options = [
    { label: "Home", icon: <CiHome />, link: "/home" },
    { label: "Syllabus", icon: <FaBook />, link: "/syllabus" },
    { label: "Study Plan", icon: <GrPlan />, link: "/studyplan" },
    { label: "Progress", icon: <GiProgression />, link: "/progress" },
    // { label: "Quizes", icon: <LuBrain />, link: "/quizes" },
  ];

  const navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="bg-gradient-to-b from-purple-50 to-blue-50 min-h-screen p-5 w-60">
      {/* Header */}
      <div className="flex items-center p-2">
        <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-blue-500 rounded-lg flex items-center justify-center">
          <LuBrain className="text-white" />
        </div>
        <h1 className="text-2xl font-bold text-purple-700 ml-2">EduPilot</h1>
      </div>

      {/* Routes */}
      <div className="flex gap-6 flex-col text-black mt-12">
        {options.map((op) => {
          const isActive = location.pathname === op.link;
          return (
            <Link
              to={op.link}
              key={op.label}
              className={`flex items-center text-lg px-3 py-2 rounded-lg transition ${
                isActive
                  ? "bg-purple-200 text-purple-900 font-semibold"
                  : "text-purple-700 hover:bg-purple-100"
              }`}
            >
              {op.icon}
              <p className="ml-2">{op.label}</p>
            </Link>
          );
        })}
      </div>

      <hr className="opacity-25 mt-12" />

      {/* Logout */}
      <button
        onClick={logout}
        className="flex items-center gap-2 mt-6 text-purple-600 hover:text-purple-800 transition"
      >
        <IoMdExit /> Log out
      </button>
    </div>
  );
}
