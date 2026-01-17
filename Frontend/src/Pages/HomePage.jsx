import React from 'react';
import Subject from '../Components/Subject/Subject';
import TodayTopics from '../Components/Subject/TodayTopics';

import AvatarMentor from "../Components/Animation/AvatarMentor";
import MentorBubble from "../Components/Animation/MentorBubble";

export default function HomePage() {
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user)

  // username
  const username = user?.name || user?.username || "User";

  const todayTasks = [
    "Complete 2 DSA problems",
    "1 hour MERN stack",
    "30 min AI notes"
  ];

  return (
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
      /> */}
      
    </div>
  );
}
