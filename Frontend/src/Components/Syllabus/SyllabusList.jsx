import React, { useEffect, useState } from "react";
import { getsyllabus } from "../../Api/Syllabus";

export default function SyllabusList({ subjectId }) {
    const [syllabusItems, setSyllabusItems] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getsyllabus(subjectId);
                setSyllabusItems(res);
            } catch (err) {
                console.error(err);
            }
        };
        fetchData();
    }, [subjectId]);

    return (
        <div className="mt-4 p-4 border-t border-gray-700 bg-gray-800 rounded-lg">
            <h3 className="text-purple-300 font-semibold mb-2">Syllabus</h3>

            {syllabusItems.length === 0 ? (
                <p className="text-gray-400">No syllabus found.</p>
            ) : (
                <ul className="space-y-2">
                    {syllabusItems.map((item) => (
                        <li
                            key={item.id}
                            className="p-3 bg-gray-900 border border-gray-700 rounded shadow-sm"
                        >
                            <p className="text-blue-300 font-medium">
                                {item.topic}
                            </p>
                            <p className="text-gray-400 text-sm">
                                Difficulty: {item.difficulty}
                            </p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
