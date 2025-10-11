import React from "react";

export default function SubjectPlan({ plan }) {
  if (!plan || plan.length === 0) {
    return <p className="text-gray-500 text-sm">No plan available.</p>;
  }

  return (
    <div className="mt-4 border border-gray-200 rounded-lg shadow-sm p-4 bg-white">
      <h3 className="text-purple-700 font-semibold mb-3 text-lg">Study Plan</h3>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left border-collapse">
          <thead className="bg-purple-100 text-purple-800">
            <tr>
              <th className="px-3 py-2 border">Day</th>
              <th className="px-3 py-2 border">Date</th>
              <th className="px-3 py-2 border">Topic </th>
              <th className="px-3 py-2 border">Allocated Time </th>
              <th className="px-3 py-2 border">Status</th>
              <th className="px-3 py-2 border">Test</th>
            </tr>
          </thead>
          <tbody>
            {plan.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-3 py-2 border text-center">{item.day}</td>
                <td className="px-3 py-2 border">{item.date_assigned}</td>
                <td className="px-3 py-2 border text-center">{item.topic}</td>
                <td className="px-3 py-2 border text-center">
  {`${Math.floor(item.allocated_time / 60)}h ${item.allocated_time % 60}m`}
</td>

                <td className="px-3 py-2 border text-center">
                  {item.completed ? (
                    <span className="text-green-600 font-medium">Done</span>
                  ) : (
                    <span className="text-yellow-600 font-medium">Pending</span>
                  )}
                </td>
                  <td className="px-3 py-2 border text-center"><button type="submit" className="bg-green-400 p-2 rounded text-white">Quiz</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
