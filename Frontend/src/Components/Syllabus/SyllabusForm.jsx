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

        // Prepare form data for API
        const formData = new FormData();
        formData.append("syllabus", file);
        console.log(subjectId)
        formData.append("subject_Id", subjectId);

        console.log("Uploading syllabus:", { subjectId, file });

        try {
            const sy = await addsyllabus(formData)
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
            className="mt-4 p-4 border-t border-gray-200 space-y-3"
            encType="multipart/form-data"
        >
            <div>
                <label className="block text-gray-700 font-medium mb-1">
                    Upload Syllabus (PDF only)
                </label>
                <input
                    type="file"
                    accept="application/pdf"
                    onChange={handleFileChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
                    required
                />
            </div>

            {file && (
                <p className="text-sm text-green-600">
                    Selected File: <strong>{file.name}</strong>
                </p>
            )}

            <div className="flex justify-end space-x-3">
                <button
                    type="submit"
                    className="px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition shadow"
                >
                    Upload
                </button>
                <button
                    type="button"
                    className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 transition"
                    onClick={onClose}
                >
                    Cancel
                </button>
            </div>
        </form>
    );
}
