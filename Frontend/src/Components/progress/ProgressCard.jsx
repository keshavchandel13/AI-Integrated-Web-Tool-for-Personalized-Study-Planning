import React from "react";
import { Pie } from "react-chartjs-2";
import { FiBookOpen } from "react-icons/fi";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function ProgressCard({ subject, data }) {

  if (!data) return null;

  const progress = data.completion_percent || 0;

  const pieData = {
    labels: ["Completed", "Remaining"],
    datasets: [
      {
        data: [progress, 100 - progress],
        backgroundColor: ["#8b5cf6", "#e5e7eb"],
        borderWidth: 0,
      },
    ],
  };

  return (
    <div className="bg-white dark:bg-gray-700 border rounded-xl shadow p-6 flex justify-between items-center">

      {/* Left Content */}
      <div className="space-y-3">

        <div className="flex items-center gap-2">
          <FiBookOpen className="text-purple-600 text-xl" />
          <p className="text-lg font-semibold text-purple-600">
            {subject.title}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-64 bg-gray-200 rounded-full h-3">
          <div
            className="bg-purple-600 h-3 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>

        <p className="text-sm text-gray-500">
          {data.completed_topics} / {data.total_topics} topics completed
        </p>

        {/* Additional Stats */}
        <div className="flex gap-6 text-sm text-gray-500">
          <p>Quiz: {data.avg_quiz_score}%</p>
          <p>Readiness: {data.exam_readiness}%</p>
        </div>

      </div>

      {/* Pie Chart */}
      <div className="w-24 h-24">
        <Pie data={pieData} />
      </div>
    </div>
  );
}