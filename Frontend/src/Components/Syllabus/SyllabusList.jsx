import React, { useEffect, useState } from "react";
import { getsyllabus } from "../../Api/Syllabus";
export default function SyllabusList({ subjectId }) {
    const [syllabusItems, setSyllabusItems] = useState([]);

    useEffect(() => {
     
        const fetchData = async () => {
            try {
                const res = await getsyllabus(subjectId);
                console.log(res)
                setSyllabusItems(res);
            } catch (err) {
                console.error(err);
            }
        };
        fetchData();
    }, [subjectId]);

    return (
        <div className="mt-4 p-4 border-t border-gray-100 bg-gray-50 rounded-lg">
            <h3 className="text-purple-800 font-semibold mb-2">Syllabus</h3>
            {syllabusItems.length === 0 ? (
                <p className="text-gray-500">No syllabus found.</p>
            ) : (
                <ul className="space-y-2">
                    {syllabusItems.map((item) => (
                        <li
                            key={item.id}
                            className="p-3 bg-white border rounded shadow-sm"
                        >
                            <p className="text-blue-400 font-medium">
                                {item.topic}
                            </p>
                            <p className="text-gray-600 text-sm">
                              Dificulty:  {item.difficulty}
                            </p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
