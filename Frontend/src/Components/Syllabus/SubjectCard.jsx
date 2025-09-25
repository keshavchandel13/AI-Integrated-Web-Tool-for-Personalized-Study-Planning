import React, { useState } from "react";
import SyllabusForm from "./SyllabusForm";
import SyllabusList from "./SyllabusList";

export default function SubjectCard({ subject }) {
    const [showForm, setShowForm] = useState(false);
    const [showList, setShowList] = useState(false);


    return (
        <div className="p-4 bg-white rounded-xl border border-gray-200 shadow hover:shadow-md transition mb-4">
            {/* Card Content */}
            <div className="flex justify-between items-center">
                <div>
                    <p className="text-purple-900 font-semibold text-lg">{subject.title}</p>
                    <p className="text-purple-600 text-sm">{subject.subject_name}</p>
                    {subject.grade && (
                        <p className="text-gray-500 text-sm mt-1">
                            Grade: {subject.grade}
                        </p>
                    )}
                </div>

                <div className="text-gray-500 text-sm text-right">
                    <p>
                        {subject.start_date} - {subject.end_date}
                    </p>
                    <div>
                        <button
                            className="px-4 py-2 rounded-lg bg-green-500 text-white hover:bg-purple-700 transition shadow mt-5 mr-3"
                            onClick={() => setShowList(!showList)}
                        >
                            {showList ? "Hide Syllabus" : "Syllabus"}
                        </button>
                        <button
                            className="px-4 py-2 rounded-lg bg-black text-white hover:bg-purple-700 transition shadow mt-5"
                            onClick={() => setShowForm(!showForm)}
                        >
                            {showForm ? "Close Form" : "Add Syllabus"}
                        </button>
                    </div>
                </div>
            </div>

            {/* Conditional Components */}
            {showList && <SyllabusList subjectId={subject.id} />}
            {showForm && (
                <SyllabusForm
                
                    subjectId={subject.id}
                    onClose={() => setShowForm(false)}
                />
            )}
        </div>
    );
}
