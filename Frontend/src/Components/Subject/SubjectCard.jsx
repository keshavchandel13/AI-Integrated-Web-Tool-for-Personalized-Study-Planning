import React from "react";
import { Link } from "react-router-dom";
import { parseISO, format } from "date-fns";

export default function SubjectCard({ item }) {
 const STATUS = {
  0: "In Progress",
  1: "Completed",
};
  return (
    <div className="p-4 bg-white rounded-xl border dark:bg-gray-800 shadow flex justify-between">
      <div>
        <p className="font-semibold text-lg">{item.title}</p>
        <p className="text-sm">{item.subject_name}</p>

          <p className={item.completed===1?"text-green-400 text-sm":"text-yellow-400 text-sm"}>
            {STATUS[item.completed]}
          </p>
        {item.grade && <p>Grade: {item.grade}</p>}
      </div>

      <div className="text-sm text-right">
        <p>
          {format(parseISO(item.start_date), "dd-MM-yyyy")} -{" "}
          {format(parseISO(item.end_date), "dd-MM-yyyy")}
        </p>

        <div className="flex gap-2 mt-4">
          <Link to="/syllabus">
            <button className="bg-green-500 text-white px-3 py-1 rounded">
              View Syllabus
            </button>
          </Link>
          <Link to="/studyplan">
            <button className="bg-indigo-600 text-white px-3 py-1 rounded">
              Study Plan
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
