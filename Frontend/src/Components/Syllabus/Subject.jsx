import React, { useEffect, useState } from "react";
import { FiBookOpen } from "react-icons/fi";
import { addSubject as addSubjectApi, getSubjects } from "../../Api/Subject";
import SubjectForm from "./SubjectForm";
import SubjectList from "./SubjectList";

export default function Subject({ userId }) {
    const date = new Date();
    const [subjects, setSubjects] = useState([]);
    const [windowOpen, setWindowOpen] = useState(false);

    const fetchSubjects = async () => {
        try {
            const res = await getSubjects(userId);
            setSubjects(res);
        } catch (err) {
            alert(err);
        }
    };

    const addSubject = async (form) => {
        try {
            const res = await addSubjectApi({ user_id: userId, ...form });
            if (res.message === "Subject added successfully") {
                alert("Subject Added");
                setWindowOpen(false);
                fetchSubjects();
            }
        } catch (err) {
            alert(err);
        }
    };

    useEffect(() => {
        fetchSubjects();
    }, []);

    return (
        <div className="bg-gradient-to-br from-white to-purple-50 border border-purple-200 rounded-xl shadow-md p-6 mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-purple-900 flex items-center text-xl font-semibold">
                    <FiBookOpen className="w-6 h-6 mr-2" />
                    Your Subjects
                </h2>
                <div className="text-right">
                    <p className="text-purple-600 font-medium">
                        {date.toLocaleDateString("en-GB", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                        })}
                    </p>
                    <button
                        className="text-white bg-purple-600 hover:bg-purple-700 px-3 py-1 mt-2 rounded shadow-sm transition"
                        onClick={() => setWindowOpen(true)}
                    >
                        Add Subject
                    </button>
                </div>
            </div>

            {/* Conditional Rendering */}
            {windowOpen ? (
                <SubjectForm
                    onCancel={() => setWindowOpen(false)}
                    onSave={addSubject}
                />
            ) : (
                <SubjectList subjects={subjects} />
            )}
        </div>
    );
}
