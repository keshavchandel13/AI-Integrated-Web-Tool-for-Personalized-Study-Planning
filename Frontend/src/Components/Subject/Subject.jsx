import React, { useEffect, useState } from "react";
import { FiBookOpen } from "react-icons/fi";
import { addSubject as addSubjectApi, getSubjects } from "../../Api/Subject";

export default function Subject({ userId }) {
  const date = new Date();
  const [subj, setSubj] = useState([]);
  const [windowOpen, setWindowOpen] = useState(false);

  const [form, setForm] = useState({
    title: "",
    subject_name: "",
    start_date: "",
    end_date: "",
  });

  const fetchSubject = async () => {
    try {
      const res = await getSubjects(userId);
      setSubj(res);
    } catch (err) {
      alert(err);
    }
  };

  const addSubject = async (e) => {
    e.preventDefault();
    try {
      const res = await addSubjectApi({ user_id: userId, ...form });
      if (res.message === "Subject added successfully") {
        alert("Subject Added");
        setWindowOpen(false);
        fetchSubject();
        setForm({ title: "", subject_name: "", start_date: "", end_date: "" });
      }
    } catch (err) {
      alert(err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    fetchSubject();
  }, []);

  return (
    <div className="bg-gradient-to-br from-white to-purple-50 border border-purple-200 rounded-xl shadow-md p-6  mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-purple-900 flex items-center text-xl font-semibold">
          <FiBookOpen className="w-6 h-6 mr-2" />
          Your Subjects
        </h2>
        <div className="text-right">
          <p className="text-purple-600 font-medium">
            {date.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
          </p>
          <button
            className="text-white bg-purple-600 hover:bg-purple-700 px-3 py-1 mt-2 rounded shadow-sm transition"
            onClick={() => setWindowOpen(true)}
          >
            Add Subject
          </button>
        </div>
      </div>

      {/* Add Subject Form */}
      {windowOpen && (
        <form onSubmit={addSubject} className="space-y-4 border-t pt-5">
          {["title", "subject_name", "start_date", "end_date"].map((field) => (
            <div key={field}>
              <label className="block text-gray-700 font-medium mb-1 capitalize">
                {field.replace("_", " ")}
              </label>
              <input
                type={field.includes("date") ? "date" : "text"}
                placeholder={field === "title" ? "e.g., DS study plan..." : field === "subject_name" ? "e.g., Data Science..." : ""}
                name={field}
                value={form[field]}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
                required
              />
            </div>
          ))}

          <div className="flex justify-end space-x-3">
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition shadow"
            >
              Save
            </button>
            <button
              type="button"
              className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 transition"
              onClick={() => setWindowOpen(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Subject List */}
      {!windowOpen && (
        <div className="mt-6 grid gap-4">
          {subj.length === 0 ? (
            <p className="text-purple-500 text-center">No subjects found.</p>
          ) : (
            subj.map((item) => (
              <div
                key={item.id}
                className="p-4 bg-white rounded-xl border border-gray-200 shadow hover:shadow-md transition flex justify-between items-center"
              >
                <div>
                  <p className="text-purple-900 font-semibold text-lg">{item.title}</p>
                  <p className="text-purple-600 text-sm">{item.subject_name}</p>
                  {item.grade && <p className="text-gray-500 text-sm mt-1">Grade: {item.grade}</p>}
                </div>
                <div className="text-gray-500 text-sm text-right">
                  <p>{item.start_date} - {item.end_date}</p>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
