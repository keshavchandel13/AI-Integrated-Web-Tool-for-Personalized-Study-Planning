// src/components/MentorBubble.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MentorBubble.css";

export default function MentorBubble({ username = "Keshav", tasks = [], visible = true }) {
  const [index, setIndex] = useState(0); // 0 -> tasks, 1 -> CTA
  const navigate = useNavigate();

  useEffect(() => {
    const id = setInterval(() => setIndex((p) => (p === 0 ? 1 : 0)), 10000); // 10s
    return () => clearInterval(id);
  }, []);

  if (!visible) return null;

  return (
    <div className="mentor-bubble-wrapper">
      {index === 0 ? (
        <div className="mentor-bubble">
          <div className="bubble-title">Hi {username} 👋</div>
          <div className="bubble-sub">Today's tasks</div>
          <ul className="bubble-tasks">
            {tasks.length ? (
              tasks.map((t, i) => (
                <li key={i} className="task-item">
                  • {t}
                </li>
              ))
            ) : (
              <li className="task-item">No tasks for today</li>
            )}
          </ul>
        </div>
      ) : (
        <div className="mentor-bubble mentor-bubble-cta" onClick={() => navigate("/mentor-chat")}>
          <div className="cta-text">Have questions?</div>
          <div className="cta-action">Click here →</div>
        </div>
      )}
      <div className="bubble-tail" />
    </div>
  );
}
