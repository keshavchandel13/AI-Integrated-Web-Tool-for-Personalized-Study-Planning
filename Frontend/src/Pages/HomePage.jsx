import React from 'react';
import Subject from '../Components/Subject/Subject';
import TodayTopics from '../Components/Subject/TodayTopics';

import AvatarMentor from "../Components/Animation/AvatarMentor";
import MentorBubble from "../Components/Animation/MentorBubble";

export default function HomePage() {
  const user = JSON.parse(localStorage.getItem("user"));

  // username
  const username = user?.name || user?.username || "User";

  // today’s tasks from TodayTopics API OR static fallback
  // If TodayTopics already fetches tasks internally, use a placeholder here:
  const todayTasks = [
    "Complete 2 DSA problems",
    "1 hour MERN stack",
    "30 min AI notes"
  ];

  return (
    // <div style={{ position: "relative", minHeight: "100vh" }}>
      <div>
      <Subject userId={user.id} />
      <TodayTopics userId={user.id} />

      {/* Avatar (bottom-right) */}
      {/* <AvatarMentor size={180} username={username} /> */}

      {/* Bubble above avatar */}
      {/* <MentorBubble  
        username={username}
        tasks={todayTasks}
        visible={true}
      />
      */}
    </div>
  );
}
