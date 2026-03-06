import React, { useState, useEffect } from "react";
import { getQuiz, generateQuiz, updateProgress } from "../../Api/quizApi";
import { toast } from "react-toastify";

export default function QuizPopup({ topicId, subjectId, topic, onClose, userId }) {

  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [score, setScore] = useState(null);
  const [showReview, setShowReview] = useState(false);
  const [time, setTime] = useState(0);
  const [previousScore, setPreviousScore] = useState(null);


  /* Timer                            */


  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);


  /* Fetch Quiz                       */


  useEffect(() => {
    const fetchQuiz = async () => {

      try {

        let quizData;

        try {
          quizData = await getQuiz(topicId);
        } catch {

          await generateQuiz({
            subject_id: subjectId,
            topic_id: topicId,
            topic: topic,
            difficulty: "Medium"
          });

          quizData = await getQuiz(topicId);
        }

        setQuestions(quizData.quizzes || []);

        if (quizData.previous_score) {
          setPreviousScore(quizData.previous_score);
        }

      } catch (err) {

        console.error(err);
        toast.error("Failed to load quiz");

      } finally {

        setLoading(false);

      }
    };

    fetchQuiz();

  }, [topicId, subjectId, topic]);

  const handleSelect = (qId, answer) => {
    setAnswers({ ...answers, [qId]: answer });
  };


  /* Submit Quiz                      */


  const handleSubmit = async () => {

    try {

      let correct = 0;

      questions.forEach((q) => {
        if (answers[q.id] === q.answer) {
          correct++;
        }
      });

      const finalScore = Math.round((correct / questions.length) * 100);

      setScore(finalScore);
      setShowReview(true);

      await updateProgress({
        user_id: userId,
        subject_id: subjectId,
        topic_id: topicId,
        quiz_score: finalScore,
        time_spent: time,
        completed: true
      });

      toast.success("Quiz submitted successfully");

    } catch (err) {

      console.error(err);
      toast.error("Failed to submit quiz");

    }
  };

  /* Loader                           */


  if (loading) {
    return (
      <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-40 z-50">
        <div className="bg-white p-6 rounded shadow-lg flex items-center gap-3">
          <div className="w-6 h-6 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
          <p>Loading quiz...</p>
        </div>
      </div>
    );
  }

  const allAnswered = questions.every((q) => answers[q.id]);
  /* UI                               */


  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-40 z-50">

      <div className="bg-white w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-lg shadow-lg p-6 relative">

        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-600 hover:text-black text-xl"
        >
          ✕
        </button>

        <h2 className="text-xl font-semibold text-purple-700 mb-2">
          {topic} Quiz
        </h2>

        {/* Timer */}

        <div className="text-sm text-gray-500 mb-2">
          Time: {Math.floor(time / 60)}m {time % 60}s
        </div>

        {/* Previous Score */}

        {previousScore && (
          <p className="text-green-600 text-sm mb-4">
            Previously Completed: {previousScore}%
          </p>
        )}

        {/* Review Mode */}

        {showReview ? (

          <div>

            <h3 className="text-lg font-semibold mb-4">
              Score: <span className="text-purple-600">{score}%</span>
            </h3>

            {questions.map((q) => {

              const userAns = answers[q.id];
              const isCorrect = userAns === q.answer;

              return (

                <div key={q.id} className="mb-4 border p-3 rounded">

                  <p className="font-medium mb-2">{q.question}</p>

                  {q.options.map((opt, idx) => {

                    let color = "text-gray-700";

                    if (opt === q.answer)
                      color = "text-green-600 font-semibold";

                    if (opt === userAns && opt !== q.answer)
                      color = "text-red-600 font-semibold";

                    return (
                      <p key={idx} className={color}>
                        {opt}
                      </p>
                    );

                  })}

                  <p className="text-sm text-gray-500 mt-1">
                    Correct Answer: {q.answer}
                  </p>

                </div>
              );
            })}

            <button
              onClick={onClose}
              className="mt-4 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
            >
              Close
            </button>

          </div>

        ) : (

          <>
            {/* Question Progress */}

            <p className="text-sm text-gray-500 mb-4">
              {Object.keys(answers).length} / {questions.length} answered
            </p>

            {questions.map((q) => (

              <div key={q.id} className="mb-5">

                <p className="font-medium text-gray-800 mb-2">
                  {q.question}
                </p>

                {q.options.map((opt, idx) => (

                  <label
                    key={idx}
                    className="block text-sm text-gray-700 cursor-pointer mb-1"
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
              disabled={!allAnswered}
              className={`mt-4 px-4 py-2 rounded text-white ${
                allAnswered
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              Submit Quiz
            </button>

          </>
        )}
      </div>
    </div>
  );
}