import React, { useEffect, useState } from "react";
import fetchUserData from "../Api/profile";
import ProfileView from "../Components/Profile/ProfileView";
import ProfileEdit from "../Components/Profile/EditProfile";

export default function ProfileContainer() {
  const [user, setUser] = useState(null);
  const [mode, setMode] = useState("view");

  const userobj = JSON.parse(localStorage.getItem("user"));
  const userId = userobj?.access_token;
  console.log(userId)

  useEffect(() => {
    async function loadUser() {
      try {
        const data = await fetchUserData(userId);
        setUser(data.user);
      } catch (err) {
        console.error(err);
      }
    }

    if (userId) loadUser();
  }, [userId]);

  if (!user) {
    return <div className="p-10 text-slate-500">Loading profile...</div>;
  }

  return mode === "view" ? (
    <ProfileView user={user} onEdit={() => setMode("edit")} />
  ) : (
    <ProfileEdit
      user={user}
      onCancel={() => setMode("view")}
      onSave={(updatedUser) => {
        setUser(updatedUser);
        setMode("view");
      }}
    />
  );
}
