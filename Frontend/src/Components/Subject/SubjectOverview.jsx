import React from "react";
import TopicSection from "./TopicSection";

export default function SubjectOverview({ subject, today }) {
   if (Number(subject.is_plan_generated) === 0) {
    return (
      <div className="border border-gray-300 rounded-xl p-4 shadow-sm mb-6">
        <h3 className="text-xl font-medium mb-4 text-blue-700">
          {subject.subject_name}
        </h3>
        <p className="text-gray-500">
          You haven't added syllabus yet.
        </p>
      </div>
    );
  }
  return (
    <div className="border border-gray-300 rounded-xl p-4 shadow-sm mb-6">
      <h3 className="text-xl font-medium mb-4 text-blue-700">
        {subject.subject_name}
      </h3>

      <TopicSection
        title="Missed Topics"
        color="red"
        is_plan_generated={subject.is_plan_generated}
        topics={subject.missedTopics}
        showDate
      />

      <TopicSection
        title={`Today's Topics (${today})`}
        color="green"
        topics={subject.todayTopics}
        is_plan_generated={subject.is_plan_generated}
        showStatus
        emptyText="No tasks for today."
      />

      <TopicSection
        title="Upcoming Topics"
        color="blue"
        is_plan_generated={subject.is_plan_generated}
        topics={subject.upcomingTopics.slice(0, 3)}
        showDate
      />
    </div>
  );
}
