import React, { useEffect, useState } from "react";
import fetchUserData from "../Api/profile";
import ProfileView from "../Components/Profile/ProfileView";
import ProfileEdit from "../Components/Profile/EditProfile";
import { toast } from "react-toastify";

export default function ProfileContainer() {
  const [user, setUser] = useState(null);
  const [mode, setMode] = useState("view");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // safe parse
  let userobj = null;
  try {
    userobj = JSON.parse(localStorage.getItem("user"));
  } catch {
    userobj = null;
  }

  const userId = userobj?.access_token;

  const loadUser = async () => {
    if (!userId) {
      setError(true);
      setLoading(false);
      toast.error("User session missing");
      return;
    }

    setLoading(true);
    setError(false);

    try {
      const data = await fetchUserData(userId);
      if (!data?.user) throw new Error("Invalid response");

      setUser(data.user);
    } catch (err) {
      console.error("Profile load failed:", err);
      setError(true);
      toast.error("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUser();
  }, [userId]);

  // Shared responsive container
  const Wrapper = ({ children }) => (
    <div className="
      w-full
      max-w-5xl
      mx-auto
      px-3 sm:px-6 md:px-8
      py-6 md:py-10
    ">
      {children}
    </div>
  );

  // Loading
  if (loading) {
    return (
      <Wrapper>
        <div className="text-slate-500 text-center animate-pulse">
          Loading profile...
        </div>
      </Wrapper>
    );
  }

  // Error
  if (error) {
    return (
      <Wrapper>
        <div className="flex flex-col items-center gap-4 text-center">
          <p className="text-red-500 font-medium text-sm sm:text-base">
            Unable to load profile
          </p>
          <button
            onClick={loadUser}
            className="px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition w-full sm:w-auto"
          >
            Retry
          </button>
        </div>
      </Wrapper>
    );
  }

  // Normal view/edit
  return (
    <Wrapper>
      {mode === "view" ? (
        <ProfileView user={user} onEdit={() => setMode("edit")} />
      ) : (
        <ProfileEdit
          user={user}
          onCancel={() => setMode("view")}
          onSave={(updatedUser) => {
            setUser(updatedUser);
            setMode("view");
            toast.success("Profile updated");
          }}
        />
      )}
    </Wrapper>
  );
}
