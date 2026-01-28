import React from "react";
import {
  GraduationCap,
  Zap,
  Pencil
} from "lucide-react";

export default function ProfileView({ user, onEdit }) {
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900">
      <main className="p-8 max-w-7xl mx-auto">

        {/* Header */}
        <div className="bg-white rounded-3xl p-8 border relative">
          <button
            onClick={onEdit}
            className="absolute top-6 right-6 flex items-center gap-1 text-sm text-indigo-600 hover:underline"
          >
            <Pencil className="w-4 h-4" /> Edit
          </button>

          <div className="flex items-center gap-6">
            <img
              src={user.avatar}
              alt="profile"
              className="w-32 h-32 rounded-2xl object-cover"
            />

            <div>
              <h1 className="text-3xl font-bold">{user.username}</h1>

              <p className="text-indigo-600 font-semibold flex items-center gap-1">
                <Zap className="w-4 h-4" /> {user.aiPersona}
              </p>

              <div className="flex items-center gap-2 mt-2 text-slate-600">
                <GraduationCap className="w-4 h-4" />
                {user.college} | {user.branch}
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          {user.studyStats?.map((stat, i) => (
            <div key={i} className="bg-white p-4 rounded-xl border">
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
              <p className="text-xs text-slate-400 mt-1">{stat.label}</p>
              <p className="text-xl font-bold">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Courses */}
        <div className="mt-10 space-y-4">
          {user.completedCourses?.map(course => (
            <div key={course.id} className="bg-white p-6 rounded-2xl border">
              <h3 className="font-bold text-lg">{course.title}</h3>
              <p className="text-sm text-slate-400">
                {course.date} • Grade {course.grade}
              </p>

              <div className="flex gap-2 mt-3">
                {course.skills.map((s, i) => (
                  <span
                    key={i}
                    className="text-xs bg-slate-100 px-2 py-1 rounded"
                  >
                    {s}
                  </span>
                ))}
              </div>

              <p className="text-sm italic mt-3 text-indigo-700">
                AI Insight: {course.aiInsight}
              </p>
            </div>
          ))}
        </div>

      </main>
    </div>
  );
}
