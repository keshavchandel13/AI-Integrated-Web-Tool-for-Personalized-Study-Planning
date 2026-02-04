import React from "react";
import { GraduationCap, Zap, Pencil } from "lucide-react";

export default function ProfileView({ user, onEdit }) {
  return (
    <div className="bg-[#F8FAFC] text-slate-900">

      <main className="px-3 sm:px-6 md:px-8 py-6 md:py-10 max-w-7xl mx-auto">

        {/* Header */}
        <div className="bg-white rounded-3xl p-4 sm:p-6 md:p-8 border relative">

          <button
            onClick={onEdit}
            className="
              flex items-center gap-1 text-sm text-indigo-600 hover:underline
              sm:absolute sm:top-6 sm:right-6
              mb-4 sm:mb-0
            "
          >
            <Pencil className="w-4 h-4" /> Edit
          </button>

          <div className="
            flex flex-col sm:flex-row
            items-center sm:items-start
            gap-4 sm:gap-6
            text-center sm:text-left
          ">

            <img
              src={user.avatar}
              alt="profile"
              className="
                w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32
                rounded-2xl object-cover
              "
            />

            <div className="min-w-0">

              <h1 className="
                text-xl sm:text-2xl md:text-3xl
                font-bold truncate
              ">
                {user.username}
              </h1>

              <p className="
                text-indigo-600 font-semibold
                flex items-center justify-center sm:justify-start gap-1
                text-sm sm:text-base
              ">
                <Zap className="w-4 h-4" /> {user.aiPersona}
              </p>

              <div className="
                flex flex-wrap justify-center sm:justify-start
                items-center gap-2 mt-2 text-slate-600 text-sm
              ">
                <GraduationCap className="w-4 h-4" />
                <span className="break-words">
                  {user.college} | {user.branch}
                </span>
              </div>

            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="
          grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4
          gap-3 sm:gap-4 mt-8
        ">
          {user.studyStats?.map((stat, i) => (
            <div key={i} className="bg-white p-4 rounded-xl border">

              <stat.icon className={`w-5 h-5 ${stat.color}`} />

              <p className="text-xs text-slate-400 mt-1">
                {stat.label}
              </p>

              <p className="text-lg sm:text-xl font-bold">
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        {/* Courses */}
        <div className="mt-10 space-y-4">
          {user.completedCourses?.map(course => (
            <div
              key={course.id}
              className="bg-white p-4 sm:p-6 rounded-2xl border"
            >
              <h3 className="
                font-bold text-base sm:text-lg
                break-words
              ">
                {course.title}
              </h3>

              <p className="text-sm text-slate-400 mt-1">
                {course.date} • Grade {course.grade}
              </p>

              <div className="
                flex flex-wrap gap-2 mt-3
              ">
                {course.skills.map((s, i) => (
                  <span
                    key={i}
                    className="
                      text-xs bg-slate-100 px-2 py-1 rounded
                    "
                  >
                    {s}
                  </span>
                ))}
              </div>

              <p className="
                text-sm italic mt-3 text-indigo-700
                break-words
              ">
                AI Insight: {course.aiInsight}
              </p>
            </div>
          ))}
        </div>

      </main>
    </div>
  );
}
