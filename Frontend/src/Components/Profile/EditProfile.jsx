import React, { useState } from "react";

export default function ProfileEdit({ user, onCancel, onSave }) {
  const [form, setForm] = useState({
    username: user.username || "",
    college: user.college || "",
    branch: user.branch || "",
    aiPersona: user.aiPersona || "",
    avatar: null,
  });

  const [preview, setPreview] = useState(user.avatar || null);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  function handleFileChange(e) {
    const file = e.target.files[0];
    if (!file) return;

    setForm(prev => ({ ...prev, avatar: file }));
    setPreview(URL.createObjectURL(file));
  }

  function handleSubmit() {
    const formData = new FormData();

    Object.entries(form).forEach(([key, value]) => {
      if (value !== null && value !== "") {
        formData.append(key, value);
      }
    });

    onSave(formData);
  }

  return (
    <div className="bg-[#F8FAFC] min-h-[80vh]">

      <div className="
        max-w-2xl mx-auto
        px-3 sm:px-6 md:px-8
        py-6 md:py-10
      ">

        <div className="
          bg-white
          rounded-3xl
          border
          shadow-sm
          p-5 sm:p-8
          space-y-6
        ">

          <h2 className="text-xl sm:text-2xl font-bold text-center">
            Edit Profile
          </h2>

          {/* Avatar preview */}
          <div className="flex flex-col items-center gap-3">

            <div className="
              w-24 h-24 sm:w-28 sm:h-28
              rounded-2xl overflow-hidden
              border bg-gray-100
            ">
              {preview ? (
                <img
                  src={preview}
                  alt="preview"
                  className="w-full h-full object-cover"
                />
              ) : null}
            </div>

            <label className="
              text-sm text-indigo-600 cursor-pointer hover:underline
            ">
              Change avatar
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          </div>

          {/* Fields */}
          <div className="grid gap-4">

            {[
              { name: "username", placeholder: "Username" },
              { name: "college", placeholder: "College" },
              { name: "branch", placeholder: "Branch" },
              { name: "aiPersona", placeholder: "AI Persona" },
            ].map(field => (
              <input
                key={field.name}
                name={field.name}
                value={form[field.name]}
                onChange={handleChange}
                placeholder={field.placeholder}
                className="
                  w-full border rounded-xl p-3
                  focus:outline-none
                  focus:ring-2 focus:ring-indigo-500
                  transition
                "
              />
            ))}

          </div>

          {/* Buttons */}
          <div className="
            flex flex-col sm:flex-row
            gap-3 pt-2
          ">
            <button
              onClick={handleSubmit}
              className="
                bg-indigo-600 text-white
                px-6 py-3 rounded-xl
                hover:bg-indigo-700
                transition
                w-full
              "
            >
              Save changes
            </button>

            <button
              onClick={onCancel}
              className="
                border px-6 py-3 rounded-xl
                hover:bg-gray-50
                transition
                w-full
              "
            >
              Cancel
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
