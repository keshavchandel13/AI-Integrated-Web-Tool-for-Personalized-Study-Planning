import React, { useEffect, useState } from "react";
import { getSubjectProgress } from "../Api/StudyPlan";
import { getSubjects } from "../Api/Subject";
import ProgressCard from "../Components/progress/ProgressCard";
import ProgressStats from "../Components/progress/ProgressStats";
import { toast } from "react-toastify";

export default function Progress() {
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user.id;

  const [subjects, setSubjects] = useState([]);
  const [progressData, setProgressData] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchSubjects = async () => {
    try {
      const res = await getSubjects(userId);
      setSubjects(res);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load subjects");
    }
  };

  const fetchProgress = async (subjectId) => {
    try {
      const res = await getSubjectProgress(userId, subjectId);
      return res;
    } catch (err) {
      console.error(err);
      toast.error("Failed to load progress");
      return null;
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);

      try {
        const subjectRes = await getSubjects(userId);
        setSubjects(subjectRes);

        const data = {};

        for (const subject of subjectRes) {
          const res = await fetchProgress(subject.id);
          if (res) data[subject.id] = res;
        }

        setProgressData(data);

      } catch (error) {
        toast.error("Error loading progress data");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const sortedSubjects = [...subjects].sort((a, b) => {

    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1;
    }

    return new Date(b.start_date) - new Date(a.start_date);

  });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (subjects.length === 0) {
    return <p className="text-center text-gray-500">No subjects found</p>;
  }

  return (
    <div className="p-6 space-y-6">

      {/* Overall Stats */}
      <ProgressStats progressData={progressData} />

      {/* Subject Cards */}
      {sortedSubjects.map((subject) => (
        <ProgressCard
          key={subject.id}
          subject={subject}
          data={progressData[subject.id]}
        />
      ))}

    </div>
  );
}