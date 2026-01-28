import React, { useState } from "react";

export default function ProfileEdit({ user, onCancel, onSave }) {
  const [form, setForm] = useState({
    username: user.username || "",
    college: user.college || "",
    branch: user.branch || "",
    aiPersona: user.aiPersona || "",
    avatar: null, // IMPORTANT: file, not URL
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleFileChange(e) {
    setForm((prev) => ({
      ...prev,
      avatar: e.target.files[0], // actual File object
    }));
  }

  function handleSubmit() {
    const formData = new FormData();

    Object.entries(form).forEach(([key, value]) => {
      if (value !== null && value !== "") {
        formData.append(key, value);
      }
    });

    onSave(formData); // backend MUST accept multipart/form-data
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-8">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl border space-y-4">

        <h2 className="text-2xl font-bold">Edit Profile</h2>

        <input
          name="username"
          value={form.username}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
          placeholder="Username"
        />

        <input
          name="college"
          value={form.college}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
          placeholder="College"
        />

        <input
          name="branch"
          value={form.branch}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
          placeholder="Branch"
        />

        <input
          name="aiPersona"
          value={form.aiPersona}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
          placeholder="AI Persona"
        />

        {/* Avatar upload */}
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full border rounded-lg p-3"
        />

        <div className="flex gap-3 pt-4">
          <button
            onClick={handleSubmit}
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg"
          >
            Save
          </button>

          <button
            onClick={onCancel}
            className="border px-6 py-2 rounded-lg"
          >
            Cancel
          </button>
        </div>

      </div>
    </div>
  );
}
