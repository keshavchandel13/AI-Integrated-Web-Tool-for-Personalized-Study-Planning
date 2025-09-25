import React, { useState } from "react";

export default function SubjectForm({ onSave, onCancel }) {
    const [form, setForm] = useState({
        title: "",
        subject_name: "",
        start_date: "",
        end_date: "",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(form);
        setForm({ title: "", subject_name: "", start_date: "", end_date: "" });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 border-t pt-5">
            {["title", "subject_name", "start_date", "end_date"].map((field) => (
                <div key={field}>
                    <label className="block text-gray-700 font-medium mb-1 capitalize">
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
                    onClick={onCancel}
                >
                    Cancel
                </button>
            </div>
        </form>
    );
}
