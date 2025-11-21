import React, { useEffect, useState } from "react";
import { getSubjectProgress } from "../Api/StudyPlan";
import { getSubjects } from "../Api/Subject";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { FiBookOpen } from "react-icons/fi";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Progress() {
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user.id;

  const [progressData, setProgressData] = useState({});
  const [subjects, setSubjects] = useState([]);

  //  Fetch subjects
  const fetchSubjects = async () => {
    try {
      const res = await getSubjects(userId);
      setSubjects(res);
    } catch (err) {
      console.log("Error fetching subjects:", err);
    }
  };

  //  Fetch progress for each subject
  const fetchProgress = async (subjectId) => {
    try {
      const res = await getSubjectProgress(userId, subjectId);
      return res?.completion_percent || 0;
    } catch (error) {
      console.error("Error fetching progress:", error);
      return 0;
    }
  };

  //  Load all data
  useEffect(() => {
    const loadData = async () => {
      await fetchSubjects();
    };
    loadData();
  }, []);

  useEffect(() => {
    const loadProgress = async () => {
      const data = {};
      for (const subject of subjects) {
        const percent = await fetchProgress(subject.id);
        data[subject.id] = percent;
      }
      setProgressData(data);
    };
    if (subjects.length > 0) loadProgress();
  }, [subjects]);

  return (
    <div className="p-6">
      {subjects.length === 0 ? (
        <p className="text-purple-500 text-center text-lg font-medium">
          No subjects found.
        </p>
      ) : (
        subjects.map((item) => {
          const progress = progressData[item.id] || 0;

          // Pie Chart Data
          const pieData = {
            labels: ["Completed", "Remaining"],
            datasets: [
              {
                data: [progress, 100 - progress],
                backgroundColor: ["#8b5cf6", "#e5e7eb"],
                borderWidth: 0,
              },
            ],
          };

          return (
            <div
              key={item.id}
              className="bg-white border dark:bg-gray-700 border-gray-200 dark:border-green-300 rounded-2xl shadow-sm hover:shadow-md transition overflow-hidden mb-6"
            >
              <div className="p-6 flex justify-between items-center">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <FiBookOpen className="text-purple-700 text-xl" />
                    <p className="text-purple-500 font-semibold text-lg">
                      {item.title}
                    </p>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-64 bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-purple-600 h-3 rounded-full"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    {progress}% completed
                  </p>
                </div>

                {/* Pie Chart */}
                <div className="w-24 h-24">
                  <Pie data={pieData} />
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
