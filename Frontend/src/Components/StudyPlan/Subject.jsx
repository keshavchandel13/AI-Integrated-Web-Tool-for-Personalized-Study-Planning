import React, { useEffect, useState } from "react";
import { FiBookOpen } from "react-icons/fi";
import { addSubject as addSubjectApi, getSubjects } from "../../Api/Subject";
import { Link } from "react-router-dom";
import SubjectPlan from "./SubjectPlan";
import { generatePlanforsubject, getstudyplan } from "../../Api/StudyPlan";

export default function Subject({ userId }) {
  const [subjects, setSubjects] = useState([]);
  const [plans, setPlans] = useState({});

  const getStudyPlan = async () => {
    try {
      const updatedPlans = {};
      for (const subject of subjects) {
        if (subject.is_plan_generated === 1) {
          const planData = await getstudyplan(subject.id);
          updatedPlans[subject.id] = planData;
        }
      }
      setPlans(updatedPlans);
    } catch (err) {
      console.log("Error fetching plans:", err);
    }
  };

  const fetchSubjects = async () => {
    try {
      const res = await getSubjects(userId);
      setSubjects(res);
    } catch (err) {
      console.log("Error fetching subjects:", err);
    }
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  useEffect(() => {
    if (subjects.length > 0) {
      getStudyPlan();
    }
  }, [subjects]);

  return (
    <div className="space-y-6">
      {subjects.length === 0 ? (
        <p className="text-purple-500 text-center text-lg font-medium">
          No subjects found.
        </p>
      ) : (
        subjects.map((item) => (
          <div
            key={item.id}
            className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition overflow-hidden"
          >
            {/* Top Section: Subject Info */}
            <div className="p-6 flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2">
                  <FiBookOpen className="text-purple-700 text-xl" />
                  <p className="text-purple-900 font-semibold text-lg">
                    {item.title}
                  </p>
                </div>
                <p className="text-purple-600 text-sm mt-1">{item.subject_name}</p>
                {item.grade && (
                  <p className="text-gray-500 text-sm mt-1">
                    Grade: {item.grade}
                  </p>
                )}
                <p className="text-gray-400 text-sm mt-2">
                  {item.start_date} - {item.end_date}
                </p>
              </div>

              {/* Buttons */}
              <div className="flex flex-col items-end">
                <Link
                  to={"/syllabus"}
                  className="px-4 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600 transition shadow"
                >
                  View Syllabus
                </Link>

                {item.is_plan_generated === 0 ? (
                  <Link
                    to={"/generateplan"}
                    state={{ subjectId: item.id, userId: userId }}
                    className="px-4 py-2 mt-2 rounded-lg bg-purple-700 text-white hover:bg-purple-800 transition shadow"
                  >
                    Generate Plan
                  </Link>
                ) : (
                  <span className="text-gray-400 mt-3 text-sm">
                    Plan Generated
                  </span>
                )}
              </div>
            </div>

            {/* Bottom Section: Study Plan */}
            {item.is_plan_generated === 1 && (
              <div className="bg-gray-50 border-t border-gray-200 p-5">
                {plans[item.id] ? (
                  <SubjectPlan plan={plans[item.id]} userId={userId} subjectId={item.id} />
                ) : (
                  <p className="text-gray-400 text-center">Loading plan...</p>
                )}
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}
