import React from "react";
import { FiBookOpen } from "react-icons/fi";

export default function SubjectHeader({ onAdd }) {
  const date = new Date();

  return (
    <div className="flex items-center justify-between mb-6 dark:from-gray-800 dark:to-gray-900">
      <h2 className="flex items-center text-xl font-semibold text-purple-900">
        <FiBookOpen className="mr-2" />
        Your Subjects
      </h2>

      <div className="text-right">
        <p className="text-purple-600 font-medium">
          {date.toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>

        <button
          onClick={onAdd}
          className="mt-2 px-3 py-1 bg-purple-600 text-white rounded"
        >
          Add Subject
        </button>
      </div>
    </div>
  );
}
