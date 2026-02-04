import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { CiHome } from "react-icons/ci";
import { FaBook } from "react-icons/fa";
import { GrPlan } from "react-icons/gr";
import { LuBrain } from "react-icons/lu";
import { GiProgression } from "react-icons/gi";
import { IoMdExit } from "react-icons/io";
import { MessageCircleQuestionMark } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  const options = [
    { label: "Home", icon: <CiHome />, link: "/home" },
    { label: "Syllabus", icon: <FaBook />, link: "/syllabus" },
    { label: "Study Plan", icon: <GrPlan />, link: "/studyplan" },
    { label: "Progress", icon: <GiProgression />, link: "/progress" },
    { label: "Doubts", icon: <MessageCircleQuestionMark />, link: "/aibot" },
  ];

  const navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
    try {
      localStorage.removeItem("user");
      toast.success("Logged out successfully");
      navigate("/");
    } catch (err) {
      console.error("Logout failed:", err);
      toast.error("Logout failed. Please try again.");
    }
  };

  const handleLinkClick = () => {
    // auto close on mobile
    setOpen(false);
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={4000}
        theme="colored"
        newestOnTop
        closeOnClick={false}
        draggable={false}
        pauseOnHover={false}
      />

      {/* Mobile hamburger */}
      <button
        onClick={() => setOpen(!open)}
        className="md:hidden fixed top-4 left-4 z-50 bg-purple-600 text-white px-3 py-2 rounded-lg shadow"
      >
        ☰
      </button>

      {/* Overlay (mobile) */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed md:static z-50
          min-h-screen w-60 p-5 transition-transform duration-300
          bg-gradient-to-b from-purple-50 to-blue-50
          dark:from-gray-900 dark:to-gray-950
          text-black dark:text-gray-200
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        {/* Header */}
        <div className="flex items-center p-2">
          <div
            className="
              w-8 h-8 rounded-lg flex items-center justify-center
              bg-gradient-to-br from-purple-400 to-blue-500
              dark:from-purple-600 dark:to-blue-700
            "
          >
            <LuBrain className="text-white" />
          </div>
          <h1 className="text-2xl font-bold ml-2 text-purple-700 dark:text-purple-300">
            EduPilot
          </h1>
        </div>

        {/* Routes */}
        <div className="flex flex-col gap-6 mt-12">
          {options.map((op) => {
            const isActive = location.pathname === op.link;

            return (
              <Link
                to={op.link}
                key={op.label}
                onClick={handleLinkClick}
                className={`flex items-center text-lg px-3 py-2 rounded-lg transition
                  ${
                    isActive
                      ? "bg-purple-200 dark:bg-purple-700 text-purple-900 dark:text-white font-semibold"
                      : "text-purple-700 dark:text-gray-300 hover:bg-purple-100 dark:hover:bg-gray-800"
                  }
                `}
              >
                {op.icon}
                <p className="ml-2">{op.label}</p>
              </Link>
            );
          })}
        </div>

        <hr className="opacity-25 mt-12 dark:border-gray-700" />

        {/* Logout */}
        <button
          onClick={logout}
          className="
            flex items-center gap-2 mt-6 transition
            text-purple-600 dark:text-gray-300
            hover:text-purple-800 dark:hover:text-white
          "
        >
          <IoMdExit /> Log out
        </button>
      </div>
    </>
  );
}
