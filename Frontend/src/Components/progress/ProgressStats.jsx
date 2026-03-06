import React from "react";

export default function ProgressStats({ progressData }) {

  const subjects = Object.values(progressData);

  if (subjects.length === 0) return null;

  const avgQuiz =
    subjects.reduce((sum, s) => sum + (s?.avg_quiz_score || 0), 0) /
    subjects.length;

  const totalTime = subjects.reduce(
    (sum, s) => sum + (s?.total_study_time || 0),
    0
  );

  const readiness =
    subjects.reduce((sum, s) => sum + (s?.exam_readiness || 0), 0) /
    subjects.length;

  const stats = [
    { title: "Avg Quiz Score", value: `${avgQuiz.toFixed(1)}%` },
    { title: "Exam Readiness", value: `${readiness.toFixed(1)}%` },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {stats.map((s, i) => (
        <div
          key={i}
          className="bg-white dark:bg-gray-700 rounded-xl shadow p-4 text-center"
        >
          <p className="text-sm text-gray-500">{s.title}</p>
          <p className="text-2xl font-semibold text-purple-600">{s.value}</p>
        </div>
      ))}
    </div>
  );
}