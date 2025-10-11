import React, { useState } from "react";
import { FiCalendar } from "react-icons/fi";
import Subject from "../Components/StudyPlan/Subject";

export default function StudyPlan() {
  const user = JSON.parse(localStorage.getItem("user"))
  return (
    <Subject userId={user.id} />
  );
}
