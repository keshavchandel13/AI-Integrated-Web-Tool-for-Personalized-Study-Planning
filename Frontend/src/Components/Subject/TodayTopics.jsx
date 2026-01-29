import React, { useEffect, useMemo, useState } from "react";
import dayjs from "dayjs";
import { getSubjects } from "../../Api/Subject";
import { getstudyplan } from "../../Api/StudyPlan";
import { ToastContainer, toast } from "react-toastify";
import SubjectOverview from "./SubjectOverview";

const TodayTopics = ({ userId }) => {
  const [subjects, setSubjects] = useState([]);
  const [plans, setPlans] = useState({});
  const [loading, setLoading] = useState(true);

  const today = dayjs().format("YYYY-MM-DD");
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const res = await getSubjects(userId);
        const activeSubjects = (res || []).filter(
          (s) => Number(s.completed) !== 1
        );

        setSubjects(activeSubjects);

        const allPlans = {};
        await Promise.all(
          activeSubjects.map(async (subj) => {
            allPlans[subj.id] = (await getstudyplan(subj.id)) || [];
          })
        );

        setPlans(allPlans);
      } catch {
        toast("Error fetching Today's Topic");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  const subjectWithTopics = useMemo(() => {
    return subjects.map((subj) => {
      const topics = plans[subj.id] || [];

      return {
        ...subj,
        todayTopics: topics.filter(
          (t) => t.date_assigned === today
        ),
        missedTopics: topics.filter(
          (t) =>
            dayjs(t.date_assigned).isBefore(today) &&
            Number(t.completed) === 0
        ),
        upcomingTopics: topics.filter((t) =>
          dayjs(t.date_assigned).isAfter(today)
        ),
      };
    });
  }, [subjects, plans, today]);

  if (loading) {
    return <p className="text-center text-gray-500">Loading study plan...</p>;
  }

  return (
    <div className="p-6">
      <ToastContainer />
      <h2 className="text-2xl font-semibold mb-6">Study Overview</h2>

      {subjectWithTopics.map((subj) => (
        <SubjectOverview key={subj.id} subject={subj} today={today} />
      ))}
    </div>
  );
};

export default TodayTopics;
