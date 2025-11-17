import React, { useState } from "react";
import { addsyllabus } from "../../Api/Syllabus";

export default function SyllabusForm({ subjectId, onClose }) {
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) {
            alert("Please upload a PDF file.");
            return;
        }

        const formData = new FormData();
        formData.append("syllabus", file);
        formData.append("subject_Id", subjectId);

        try {
            await addsyllabus(formData);
            alert("Syllabus PDF uploaded successfully!");
            onClose();
            setFile(null);
        } catch (err) {
            console.error(err);
            alert("Failed to upload syllabus");
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="mt-4 p-4 border-t border-gray-700 bg-gray-800 rounded-lg space-y-3"
            encType="multipart/form-data"
        >
            <div>
                <label className="block text-gray-300 font-medium mb-1">
                    Upload Syllabus (PDF only)
                </label>
                <input
                    type="file"
                    accept="application/pdf"
                    onChange={handleFileChange}
                    className="
                        w-full rounded-lg px-3 py-2 
                        bg-gray-900 text-gray-100
                        border border-gray-600
                        focus:outline-none focus:ring-2 focus:ring-purple-500
                        transition
                    "
                    required
                />
            </div>

            {file && (
                <p className="text-sm text-green-400">
                    Selected File: <strong>{file.name}</strong>
                </p>
            )}

            <div className="flex justify-end space-x-3">
                <button
                    type="submit"
                    className="px-4 py-2 rounded-lg bg-purple-700 text-white hover:bg-purple-800 transition shadow"
                >
                    Upload
                </button>
                <button
                    type="button"
                    className="px-4 py-2 rounded-lg bg-gray-700 text-gray-200 hover:bg-gray-600 transition"
                    onClick={onClose}
                >
                    Cancel
                </button>
            </div>
        </form>
    );
}
