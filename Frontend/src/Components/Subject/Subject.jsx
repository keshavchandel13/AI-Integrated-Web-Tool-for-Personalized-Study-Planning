import React, { useEffect, useState } from "react";
import { FiBookOpen } from "react-icons/fi";
import { addSubject as addSubjectApi, getSubjects } from "../../Api/Subject";
import { Link } from "react-router-dom";
import { parseISO, format } from "date-fns";
import { ToastContainer, toast } from "react-toastify";
import Loader from "../common/Loader";
export default function Subject({ userId }) {
  const date = new Date();
  const [subj, setSubj] = useState([]);
  const [windowOpen, setWindowOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    subject_name: "",
    start_date: "",
    end_date: "",
  });

  const fetchSubject = async () => {
    try {
      setLoading(true);
      const res = await getSubjects(userId);
      setSubj(res);
    } catch (err) {
      toast(err);
    } finally {
      setLoading(false);
    }
  };

  const addSubject = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await addSubjectApi({ user_id: userId, ...form });
      if (res.message === "Subject added successfully") {
        toast("Subject Added");
        setWindowOpen(false);
        fetchSubject();
        setForm({ title: "", subject_name: "", start_date: "", end_date: "" });
      }
    } catch (err) {
      toast(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    fetchSubject();
  }, []);

  return (
    <>
      <div
        className="
    bg-gradient-to-br from-white to-purple-50 
    dark:from-gray-800 dark:to-gray-900
    text-black dark:text-gray-200
    border border-purple-200 dark:border-gray-700
    rounded-xl shadow-md p-6 mx-auto
"
      >
        <ToastContainer />
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="flex items-center text-xl font-semibold text-purple-900 dark:text-purple-300">
            <FiBookOpen className="w-6 h-6 mr-2" />
            Your Subjects
          </h2>

          <div className="text-right">
            <p className="text-purple-600 dark:text-gray-300 font-medium">
              {date.toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>

            <button
              className="
              text-white bg-purple-600 hover:bg-purple-700 
              dark:bg-purple-700 dark:hover:bg-purple-800
              px-3 py-1 mt-2 rounded shadow-sm transition
            "
              onClick={() => setWindowOpen(true)}
            >
              Add Subject
            </button>
          </div>
        </div>

        {/* Add Subject Form */}
        {windowOpen && (
          <form
            className="space-y-4 border-t pt-5 dark:border-gray-700"
            onSubmit={addSubject}
          >
            {["title", "subject_name", "start_date", "end_date"].map(
              (field) => (
                <div key={field}>
                  <label className="block font-medium mb-1 capitalize text-gray-700 dark:text-gray-300">
                    {field.replace("_", " ")}
                  </label>

                  <input
                    type={field.includes("date") ? "date" : "text"}
                    placeholder={
                      field === "title"
                        ? "e.g., DS study plan..."
                        : field === "subject_name"
                          ? "e.g., Data Science..."
                          : ""
                    }
                    name={field}
                    value={form[field]}
                    onChange={handleChange}
                    className="
                  w-full border border-gray-300 dark:border-gray-600 
                  bg-white dark:bg-gray-800 
                  text-black dark:text-gray-200
                  rounded-lg px-3 py-2 
                  focus:outline-none focus:ring-2
                  focus:ring-purple-400 dark:focus:ring-purple-600
                  transition
                "
                    required
                  />
                </div>
              ),
            )}

            <div className="flex justify-end space-x-3">
              <button
                type="submit"
                className="
                px-4 py-2 rounded-lg bg-purple-600 text-white 
                hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-800
                transition shadow
              "
              >
                Save
              </button>

              <button
                type="button"
                onClick={() => setWindowOpen(false)}
                className="
                px-4 py-2 rounded-lg 
                bg-gray-300 hover:bg-gray-400 
                dark:bg-gray-700 dark:hover:bg-gray-600
                text-black dark:text-white transition
              "
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
              <p className="text-purple-500 dark:text-gray-400 text-center">
                No subjects found.
              </p>
            ) : (
              subj.map((item) => (
                <div
                  key={item.id}
                  className="
                  p-4 bg-white dark:bg-gray-800 
                  rounded-xl border border-gray-200 dark:border-gray-700
                  shadow hover:shadow-md transition 
                  flex justify-between items-center
                "
                >
                  <div>
                    <p className="text-purple-900 dark:text-white font-semibold text-lg">
                      {item.title}
                    </p>
                    <p className="text-purple-600 dark:text-gray-300 text-sm">
                      {item.subject_name}
                    </p>
                    {item.grade && (
                      <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                        Grade: {item.grade}
                      </p>
                    )}
                  </div>

                  <div className="text-gray-500 dark:text-gray-300 text-sm text-right">
                    <p>
                      {format(parseISO(item.start_date), "dd-MM-yyyy")} -{" "}
                      {format(parseISO(item.end_date), "dd-MM-yyyy")}
                    </p>

                    <div className="flex gap-2 mt-5">
                      <Link to="/syllabus">
                        <button
                          className="
                        px-4 py-2 bg-green-500 hover:bg-green-600 
                        text-white rounded-lg shadow transition
                      "
                        >
                          View Syllabus
                        </button>
                      </Link>

                      <Link to="/studyplan">
                        <button
                          className="
                        px-4 py-2 bg-indigo-600 hover:bg-indigo-700 
                        text-white rounded-lg shadow transition
                      "
                        >
                          Study Plan
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </>
  );
}
