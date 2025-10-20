import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { subjectPreference } from "../../Api/Preference";
import { generatePlanforsubject } from "../../Api/StudyPlan";

export default function PreferenceForm() {
  const location = useLocation();
  const navigate = useNavigate();
  const { subjectId, userId } = location.state || {};

  const [totalDays, setTotalDays] = useState("");
  const [dailyHours, setDailyHours] = useState("");
  const [preferredTime, setPreferredTime] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const changeData = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "totalDays") {
      setTotalDays(value);
    } else if (name === "dailyHours") {
      setDailyHours(value);
    } else if (name === "preferredTime") {
      setPreferredTime(type === "checkbox" ? checked : value);
    }
  };

  const submitPreference = async () => {
    if (!totalDays || !dailyHours) {
      setMessage("Please fill all fields.");
      return;
    }

    if (!subjectId || !userId) {
      setMessage("Invalid subject or user information.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await subjectPreference({
        subjectId,
        userId,
        totalDays,
        dailyHours,
        preferredTime,
      });
      console.log(res)

      if (res) {

        const planResponse = await generatePlanforsubject(subjectId);
      }


      setMessage("Preferences saved and plan generated successfully!");

      setTimeout(() => navigate("/studyplan"), 1500);
    } catch (error) {
      setMessage("Error while saving preferences or generating plan.");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-8 bg-white shadow-lg rounded-xl">
      <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
        Study Preference Form
      </h2>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2 font-medium">
          Target Study Days
        </label>
        <input
          type="number"
          name="totalDays"
          onChange={changeData}
          placeholder="Enter number of days you are targeting"
          value={totalDays}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2 font-medium">
          Daily Study Hours
        </label>
        <input
          type="number"
          name="dailyHours"
          onChange={changeData}
          placeholder="Enter number of hours you can study"
          value={dailyHours}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div className="flex items-center mb-6">
        <input
          type="checkbox"
          name="preferredTime"
          checked={preferredTime}
          onChange={changeData}
          className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-400"
        />
        <label className="ml-2 text-gray-700">
          Prefer studying in the morning
        </label>
      </div>

      <button
        type="button"
        onClick={submitPreference}
        disabled={loading}
        className={`w-full py-2 rounded-lg font-medium text-white transition-colors duration-300 ${loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
          }`}
      >
        {loading ? "Processing..." : "Save & Generate Plan"}
      </button>

      {message && (
        <p className="mt-4 text-center text-sm text-gray-700">{message}</p>
      )}
    </div>
  );
}
