import React, { useState, useEffect } from "react";
import QuizPopup from "./QuizPopup";
import { completedTopic, getSubjectProgress } from "../../Api/StudyPlan";

export default function SubjectPlan({ plan, userId, subjectId }) {
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [completedTopics, setCompletedTopics] = useState(
    plan.filter((p) => p.completed === 1).map((p) => p.id)
  );
  const [progress, setProgress] = useState(0);

  //  Fetch subject progress percentage
  const fetchProgress = async () => {
    try {
      const res = await getSubjectProgress(userId, subjectId);
      if (res?.completion_percent !== undefined) {
        setProgress(res.completion_percent);
      }
    } catch (error) {
      console.error("Error fetching progress:", error);
    }
  };

  useEffect(() => {
    fetchProgress();
  }, []);

  //  Handle quiz popup open/close
  const handleQuizClick = (item) => setSelectedTopic(item);

  const handleClosePopup = () => {
    if (selectedTopic) {
      setCompletedTopics((prev) => [...prev, selectedTopic.id]);
      fetchProgress(); // Refresh progress
    }
    setSelectedTopic(null);
  };

  //  Mark topic as completed
  const handleMarkCompleted = async (item) => {
    try {
      await completedTopic({
        user_id: userId,
        topic_id: item.topic_id,
        subject_id: item.subject_id,
        completed: true,
      });

      setCompletedTopics((prev) => [...prev, item.id]);
      await fetchProgress(); // Refresh progress after marking complete
    } catch (e) {
      console.error("Error marking topic completed:", e);
    }
  };

  if (!plan || plan.length === 0) {
    return <p className="text-gray-500 text-sm">No plan available.</p>;
  }

  return (
    <div className="mt-4 border border-gray-200 rounded-lg shadow-sm p-4 bg-white">
      {/*  Subject Progress Header */}
      <div className="mb-4">
        <div className="flex justify-between items-center">
          <h3 className="text-purple-700 font-semibold text-lg">Study Plan</h3>
          <span className="text-sm font-medium text-gray-600">
            {progress}% Completed
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3 mt-2">
          <div
            className="bg-green-500 h-3 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/*  Study Plan Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left border-collapse">
          <thead className="bg-purple-100 text-purple-800">
            <tr>
              <th className="px-3 py-2 border">Day</th>
              <th className="px-3 py-2 border">Date</th>
              <th className="px-3 py-2 border">Topic</th>
              <th className="px-3 py-2 border">Allocated Time</th>
              <th className="px-3 py-2 border">Status</th>
              <th className="px-3 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {plan.map((item) => {
              const isCompleted = completedTopics.includes(item.id) || item.completed === 1;

              return (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-3 py-2 border text-center">{item.day}</td>
                  <td className="px-3 py-2 border">{item.date_assigned}</td>
                  <td className="px-3 py-2 border text-center">{item.topic}</td>
                  <td className="px-3 py-2 border text-center">
                    {`${Math.floor(item.allocated_time / 60)}h ${item.allocated_time % 60}m`}
                  </td>
                  <td className="px-3 py-2 border text-center">
                    {isCompleted ? (
                      <span className="text-green-600 font-medium">Done</span>
                    ) : (
                      <span className="text-yellow-600 font-medium">Pending</span>
                    )}
                  </td>
                  <td className="px-3 py-2 border text-center space-x-2">
                    <button
                      onClick={() => handleQuizClick(item)}
                      className="bg-green-500 px-3 py-1 rounded text-white hover:bg-green-600"
                    >
                      Quiz
                    </button>
                    <button
                      onClick={() => handleMarkCompleted(item)}
                      className={`px-3 py-1 rounded text-white ${
                        isCompleted
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-blue-500 hover:bg-blue-600"
                      }`}
                      disabled={isCompleted}
                    >
                      {isCompleted ? "Completed" : "Mark Completed"}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Quiz Popup */}
      {selectedTopic && (
        <QuizPopup
          topicId={selectedTopic.topic_id}
          subjectId={selectedTopic.subject_id}
          topic={selectedTopic.topic}
          onClose={handleClosePopup}
          userId={userId}
        />
      )}
    </div>
  );
}
