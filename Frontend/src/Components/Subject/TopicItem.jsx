import React from "react";
export default function TopicItem({
  task,
  color,
  showDate,
  showStatus,
}) {
  const isCompleted = Number(task.completed) === 1;

  return (
    <li
      className={`px-3 py-1 rounded-md flex justify-between bg-${color}-100 text-${color}-700`}
    >
      <span>{task.topic}</span>

      {showDate && (
        <span className="text-sm">({task.date_assigned})</span>
      )}

      {showStatus && (
        <span className="text-sm">
          {isCompleted ? "Completed" : "Pending"}
        </span>
      )}
    </li>
  );
}
