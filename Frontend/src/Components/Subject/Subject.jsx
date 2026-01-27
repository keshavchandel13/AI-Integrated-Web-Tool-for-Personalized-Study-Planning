import React, { useEffect, useState } from "react";
import { addSubject as addSubjectApi, getSubjects } from "../../Api/Subject";
import { ToastContainer, toast } from "react-toastify";
import Loader from "../common/Loader";
import SubjectHeader from "./SubjectHeader";
import AddSubjectForm from "./AddSubjectForm";
import SubjectList from "./SubjectList";

export default function Subject({ userId }) {
  const [subjects, setSubjects] = useState([]);
  const [windowOpen, setWindowOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    subject_name: "",
    start_date: "",
    end_date: "",
  });

  const fetchSubjects = async () => {
    try {
      setLoading(true);
      const res = await getSubjects(userId);
      setSubjects(res);
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
        setForm({ title: "", subject_name: "", start_date: "", end_date: "" });
        fetchSubjects();
      }
    } catch (err) {
      toast(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  return (
    <>
      <ToastContainer />
      {loading && <Loader />}

      <div className="bg-gradient-to-br from-white to-purple-50 dark:from-gray-800 dark:to-gray-900 rounded-xl p-6">
        <SubjectHeader onAdd={() => setWindowOpen(true)} />

        {windowOpen ? (
          <AddSubjectForm
            form={form}
            setForm={setForm}
            loading={loading}
            onSubmit={addSubject}
            onCancel={() => setWindowOpen(false)}
          />
        ) : (
          <SubjectList subjects={subjects} loading={loading} />
        )}
      </div>
    </>
  );
}
