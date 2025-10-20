import React, { useState } from "react";
import QuizPopup from "./QuizPopup";

export default function SubjectPlan({ plan }) {
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [completedTopics, setCompletedTopics] = useState([]);

  if (!plan || plan.length === 0) {
    return <p className="text-gray-500 text-sm">No plan available.</p>;
  }

  const handleQuizClick = (item) => setSelectedTopic(item);

  const handleClosePopup = () => {
    if (selectedTopic) {
      setCompletedTopics([...completedTopics, selectedTopic.id]);
    }
    setSelectedTopic(null);
  };

  const handleMarkCompleted = (id) => {
    setCompletedTopics([...completedTopics, id]);
  };

  return (
    <div className="mt-4 border border-gray-200 rounded-lg shadow-sm p-4 bg-white">
      <h3 className="text-purple-700 font-semibold mb-3 text-lg">Study Plan</h3>

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
            {plan.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-3 py-2 border text-center">{item.day}</td>
                <td className="px-3 py-2 border">{item.date_assigned}</td>
                <td className="px-3 py-2 border text-center">{item.topic}</td>
                <td className="px-3 py-2 border text-center">
                  {`${Math.floor(item.allocated_time / 60)}h ${item.allocated_time % 60}m`}
                </td>
                <td className="px-3 py-2 border text-center">
                  {completedTopics.includes(item.id) ? (
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
                    onClick={() => handleMarkCompleted(item.id)}
                    className="bg-blue-500 px-3 py-1 rounded text-white hover:bg-blue-600"
                  >
                    Mark Completed
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Popup Quiz */}
      {selectedTopic && (
        <QuizPopup
          topicId={selectedTopic.topic_id}
          subjectId={selectedTopic.subject_id}
          topic={selectedTopic.topic}
          onClose={handleClosePopup}
        />
      )}
    </div>
  );
}
