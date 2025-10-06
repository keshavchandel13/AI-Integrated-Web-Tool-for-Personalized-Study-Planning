import React, { useState } from "react";
import { FiCalendar } from "react-icons/fi";

export default function StudyPlan() {
  const [plans] = useState([
    {
      id: 1,
      title: "Data Science Revision Plan",
      subject_name: "Data Science",
      start_date: "2025-09-20",
      end_date: "2025-10-10",
      tasks: ["Finish Statistics basics", "Practice ML algorithms", "Revise Python libraries (Pandas, NumPy)"],
    },
    {
      id: 2,
      title: "Computer Organization & Architecture",
      subject_name: "COA",
      start_date: "2025-09-21",
      end_date: "2025-10-05",
      tasks: ["Revise Number System", "Pipeline & Parallelism", "Memory Hierarchy"],
    },
    {
      id: 3,
      title: "Python Programming Mastery",
      subject_name: "Python Programming",
      start_date: "2025-09-22",
      end_date: "2025-10-15",
      tasks: ["OOP concepts", "Error handling", "File handling", "Practice Leetcode problems"],
    },
  ]);

  return (
    <div className="bg-gradient-to-br from-white to-blue-50 border border-blue-200 rounded-xl shadow-md p-6 mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-blue-900 flex items-center text-xl font-semibold">
          <FiCalendar className="w-6 h-6 mr-2" />
          Study Plans
        </h2>
      </div>

      {/* Plans List */}
      <div className="mt-6 grid gap-4">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className="p-4 bg-white rounded-xl border border-gray-200 shadow hover:shadow-md transition"
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="text-blue-900 font-semibold text-lg">{plan.title}</p>
                <p className="text-blue-600 text-sm">{plan.subject_name}</p>
                <p className="text-gray-500 text-sm mt-1">
                  {plan.start_date} - {plan.end_date}
                </p>
              </div>
            </div>

            {/* Task List */}
            <div className="mt-3">
              <p className="text-gray-700 font-medium mb-1">Tasks:</p>
              <ul className="pl-6 text-gray-600 space-y-2">
                {plan.tasks.map((task, idx) => (
                  <li key={idx} className="flex items-center justify-between">
                    <span>{task}</span>
                    <hr />
                    <button
                      className="bg-green-600 rounded text-white px-3 py-1 text-sm hover:bg-green-700 transition"
                      onClick={() => handleQuiz(plan.id, task)}
                    >
                      Take Quiz
                    </button>
                  </li>
                ))}
              </ul>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
