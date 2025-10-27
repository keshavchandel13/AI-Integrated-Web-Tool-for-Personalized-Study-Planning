import React, { useState, useEffect } from "react";
import { getQuiz, generateQuiz, updateProgress } from "../../Api/quizApi";

export default function QuizPopup({ topicId, subjectId, topic, onClose, userId }) {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [score, setScore] = useState(null);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        let quizData;
        try {
          quizData = await getQuiz(topicId);
        } catch {
          // If not found, create a new quiz
          await generateQuiz({
            subject_id: subjectId,
            topic_id: topicId,
            topic: topic,
            difficulty: "Medium",
          });
          quizData = await getQuiz(topicId);
        }

        setQuestions(quizData.quizzes || []);
      } catch (err) {
        console.error("Error fetching quiz:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [topicId, subjectId, topic]);

  const handleSelect = (qId, answer) => {
    setAnswers({ ...answers, [qId]: answer });
  };

  const handleSubmit = async () => {
    let correct = 0;
    questions.forEach((q) => {
      if (answers[q.id] && answers[q.id].includes(q.answer)) {
        correct++;
      }
    });
    const finalScore = Math.round((correct / questions.length) * 100);
    setScore(finalScore);

    // Push to progress API
    await updateProgress({
      user_id: userId,
      subject_id: subjectId,
      topic_id: topicId,
      quiz_score: finalScore,
      completed: true,
    });
  };

  if (loading) {
    return (
      <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-40">
        <div className="bg-white p-6 rounded shadow-lg">
          <p>Loading quiz...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-40 z-50">
      <div className="bg-white w-full max-w-2xl max-h-[80vh] overflow-y-auto rounded-lg shadow-lg p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-600 hover:text-gray-900 text-xl"
        >
          ✕
        </button>
        <h2 className="text-xl font-semibold text-purple-700 mb-4">
          {topic} Quiz
        </h2>

        {score !== null ? (
          <div className="text-center">
            <h3 className="text-lg font-medium text-gray-800">
              Your Score: <span className="text-purple-600">{score}%</span>
            </h3>
            <button
              onClick={onClose}
              className="mt-4 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
            >
              Close
            </button>
          </div>
        ) : (
          <>
            {questions.map((q) => (
              <div key={q.id} className="mb-4">
                <p className="font-medium text-gray-800 mb-2">{q.question}</p>
                {q.options.map((opt, idx) => (
                  <label
                    key={idx}
                    className="block text-sm text-gray-700 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name={q.id}
                      value={opt}
                      checked={answers[q.id] === opt}
                      onChange={() => handleSelect(q.id, opt)}
                      className="mr-2"
                    />
                    {opt}
                  </label>
                ))}
              </div>
            ))}

            <button
              onClick={handleSubmit}
              className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Submit Quiz
            </button>
          </>
        )}
      </div>
    </div>
  );
}
