import React, { useState } from "react";

export default function Progress() {
  // Example progress data (later you can fetch from backend)
  const [progressData] = useState([
    {
      id: 1,
      subject: "Data Science",
      totalTasks: 10,
      completed: 6,
    },
    {
      id: 2,
      subject: "COA",
      totalTasks: 8,
      completed: 4,
    },
    {
      id: 3,
      subject: "Python Programming",
      totalTasks: 12,
      completed: 9,
    },
  ]);

  return (
    <div className="bg-gradient-to-br from-white to-blue-50 min-h-screen p-6">
      <h2 className="text-2xl font-semibold text-blue-900 mb-6">📊 Progress Tracker</h2>

      <div className="grid gap-6">
        {progressData.map((item) => {
          const percentage = Math.round((item.completed / item.totalTasks) * 100);
          return (
            <div
              key={item.id}
              className="p-4 bg-white rounded-xl border border-gray-200 shadow hover:shadow-md transition"
            >
              <div className="flex justify-between items-center mb-2">
                <p className="text-lg font-semibold text-blue-800">{item.subject}</p>
                <span className="text-gray-600 text-sm">
                  {item.completed}/{item.totalTasks} tasks
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div
                  className="bg-green-600 h-4 rounded-full transition-all"
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>

              <p className="text-right text-sm text-gray-500 mt-1">{percentage}% done</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
