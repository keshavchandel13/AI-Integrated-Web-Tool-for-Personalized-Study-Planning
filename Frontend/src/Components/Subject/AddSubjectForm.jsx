import React from "react";
export default function AddSubjectForm({
  form,
  setForm,
  onSubmit,
  onCancel,
  loading,
}) {
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <form onSubmit={onSubmit} className="space-y-4 border-t pt-5">
      {["title", "subject_name", "start_date", "end_date"].map((field) => (
        <div key={field}>
          <label className="block font-medium capitalize">
            {field.replace("_", " ")}
          </label>

          <input
            type={field.includes("date") ? "date" : "text"}
            name={field}
            value={form[field]}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>
      ))}

      <div className="flex justify-end gap-3">
        <button disabled={loading} className="bg-purple-600 text-white px-4 py-2 rounded">
          Save
        </button>
        <button type="button" onClick={onCancel} className="bg-gray-300 px-4 py-2 rounded">
          Cancel
        </button>
      </div>
    </form>
  );
}
