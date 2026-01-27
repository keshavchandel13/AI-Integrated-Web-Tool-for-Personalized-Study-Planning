import React from "react";
import SubjectCard from "./SubjectCard";

export default function SubjectList({ subjects }) {
  if (subjects.length === 0) {
    return <p className="text-center text-purple-500">No subjects found.</p>;
  }

  // Sort subjects basis of completed & start date

  const sortedSubject = [...subjects].sort((a,b)=>{
    if(a.completed!==b.completed){
        return a.completed - b.completed
    }
    return new Date(a.start_date) - new Date(b.start_date)
  })

  return (
    <div className="mt-6 grid gap-4 dark:from-gray-800 dark:to-gray-900">
      {sortedSubject.map((item) => (
        <SubjectCard key={item.id} item={item} />
      ))}
    </div>
  );
}
