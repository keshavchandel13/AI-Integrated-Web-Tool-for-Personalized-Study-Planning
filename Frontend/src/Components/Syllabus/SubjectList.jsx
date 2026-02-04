import React from "react";
import SubjectCard from "./SubjectCard";

export default function SubjectList({ subjects }) {
    if(subjects.length===0){
        return <p>Add Subject</p>
    }
  const sortedSubject = [...subjects].sort((a, b) => {
    if (a.completed != b.completed) {
      return a.completed - b.completed;
    }
    return new Date(a.start_date) - new Date(b.start_date);
  });
  return (
    <div className="mt-6 grid gap-4">
      {sortedSubject.length === 0 ? (
        <p className="text-purple-400 text-center">No subjects found.</p>
      ) : (
        sortedSubject.map((item) => <SubjectCard key={item.id} subject={item} />)
      )}
    </div>
  );
}
