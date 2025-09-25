import React from "react";
import SubjectCard from "./SubjectCard";

export default function SubjectList({ subjects }) {
    return (
        <div className="mt-6 grid gap-4">
            {subjects.length === 0 ? (
                <p className="text-purple-500 text-center">No subjects found.</p>
            ) : (
                subjects.map((item) => <SubjectCard key={item.id} subject={item} />)
            )}
        </div>
    );
}
