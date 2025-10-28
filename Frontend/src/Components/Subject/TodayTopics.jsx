import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { getSubjects } from "../../Api/Subject";
import { getstudyplan } from "../../Api/StudyPlan";

const TodayTopics = ({ userId }) => {
  const [subjects, setSubjects] = useState([]);
  const [plans, setPlans] = useState({});
  const [loading, setLoading] = useState(true);
  const today = dayjs().format("YYYY-MM-DD");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getSubjects(userId);
        const fetchedSubjects = res || [];
        setSubjects(fetchedSubjects);

        const allPlans = {};
        for (const subj of fetchedSubjects) {
          const planRes = await getstudyplan(subj.id);
          allPlans[subj.id] = planRes || [];
        }

        setPlans(allPlans);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching subjects or plans:", err);
      }
    };

    fetchData();
  }, [userId]);

  if (loading) {
    return <p className="text-center text-gray-500">Loading study plan...</p>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">Study Overview</h2>

      {subjects.map((subj) => {
        const subjectId = subj.id;
        const subjectTopics = plans[subjectId] || [];

        // Categorize topics
        const todayTopics = subjectTopics.filter(
          (t) => t.date_assigned === today
        );
        const missedTopics = subjectTopics.filter(
          (t) => dayjs(t.date_assigned).isBefore(today) && t.completed === 0
        );
        const upcomingTopics = subjectTopics.filter((t) =>
          dayjs(t.date_assigned).isAfter(today)
        );

        return (
          <div
            key={subjectId}
            className=" border border-gray-300 rounded-xl p-2 shadow-sm"
          >
            <h3 className="text-xl font-medium mb-4 text-blue-700">
              {subj.subject_name}
            </h3>

            {/* Missed Topics */}
            {missedTopics.length > 0 && (
              <div className="mb-3">
                <h4 className="font-semibold text-red-600 mb-2">
                  Missed Topics (Previous Days)
                </h4>
                <ul className="space-y-1">
                  {missedTopics.map((task) => (
                    <li
                      key={task.id}
                      className="bg-red-100 text-red-700 px-3 py-1 rounded-md flex justify-between"
                    >
                      <span>{task.topic}</span>
                      <span className="text-sm">({task.date_assigned})</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Today's Topics */}
            <div className="mb-3">
              <h4 className="font-semibold text-green-600 mb-2">
                Today's Topics ({today})
              </h4>
              {todayTopics.length > 0 ? (
                <ul className="space-y-1">
                  {todayTopics.map((task) => (
                    <li
                      key={task.id}
                      className={`px-3 py-1 rounded-md flex justify-between ${
                        task.completed
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      <span>{task.topic}</span>
                      <span className="text-sm">
                        {task.completed ? "Completed" : "Pending"}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">No tasks for today.</p>
              )}
            </div>

            {/* Upcoming Topics */}
            {upcomingTopics.length > 0 && (
              <div>
                <h4 className="font-semibold text-blue-600 mb-2">
                  Upcoming Topics
                </h4>
                <ul className="space-y-1">
                  {upcomingTopics.slice(0, 3).map((task) => (
                    <li
                      key={task.id}
                      className="bg-blue-100 text-blue-700 px-3 py-1 rounded-md flex justify-between"
                    >
                      <span>{task.topic}</span>
                      <span className="text-sm">({task.date_assigned})</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default TodayTopics;
