import React, { useState } from "react";

export default function Quizes() {
  // Example quiz data (can fetch later from backend)
  const [quizzes] = useState([
    {
      id: 1,
      title: "Data Science Basics Quiz",
      subject: "Data Science",
      questions: 10,
      duration: "15 min",
    },
    {
      id: 2,
      title: "Computer Organization Quiz",
      subject: "COA",
      questions: 8,
      duration: "10 min",
    },
    {
      id: 3,
      title: "Python Programming Quiz",
      subject: "Python",
      questions: 12,
      duration: "20 min",
    },
  ]);

  return (
    <div className="bg-gradient-to-br from-white to-blue-50 min-h-screen p-6">
      <h2 className="text-2xl font-semibold text-blue-900 mb-6">📝 Available Quizzes</h2>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {quizzes.map((quiz) => (
          <div
            key={quiz.id}
            className="p-4 bg-white rounded-xl border border-gray-200 shadow hover:shadow-md transition"
          >
            <h3 className="text-lg font-semibold text-blue-800">{quiz.title}</h3>
            <p className="text-sm text-gray-600">{quiz.subject}</p>

            <div className="mt-2 text-sm text-gray-500">
              <p>⏳ {quiz.duration}</p>
            </div>

            <button
              className="mt-4 w-full bg-green-600 text-white rounded-lg px-4 py-2 hover:bg-green-700 transition"
              onClick={() => alert(`Starting ${quiz.title}...`)}
            >
              Start Quiz
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
