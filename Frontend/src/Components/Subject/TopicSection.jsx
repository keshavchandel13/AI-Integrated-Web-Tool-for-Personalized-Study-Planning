import React from "react";
import TopicItem from "./TopicItem";

export default function TopicSection({
  title,
  topics,
  color,
  showDate = false,
  showStatus = false,
  emptyText,
}) {
  
  if (!topics || topics.length === 0) {
    return emptyText ? <p className="text-gray-500 mb-3">{emptyText}</p> : null;
  }

  return (
    <div className="mb-3">
        <h4 className={`font-semibold text-${color}-600 mb-2`}>{title}</h4>
     

      <ul className="space-y-1">
        {topics.map((task) => (
          <TopicItem
            key={task.id}
            task={task}
            color={color}
            showDate={showDate}
            showStatus={showStatus}
          />
        ))}
      </ul>
    </div>
  );
}
