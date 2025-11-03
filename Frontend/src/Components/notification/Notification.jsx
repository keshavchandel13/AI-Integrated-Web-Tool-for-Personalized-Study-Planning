import React, { useEffect, useState } from "react";
import { getNotifications } from "../../Api/notification";
import { Bell } from "lucide-react";

const Notifications = ({ userId }) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getNotifications(userId);
        console.log("Fetched notifications:", data);
        // Data is an array, not an object with `notifications`
        setNotifications(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error fetching notifications:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [userId]);

  if (loading) return <p className="p-3 text-gray-500">Loading notifications...</p>;

  return (
    <div className="p-4 bg-white shadow-lg rounded-lg border border-gray-100 max-h-96 overflow-y-auto">
      <h2 className="text-lg font-semibold flex items-center gap-2 mb-3">
        <Bell className="text-blue-600" /> Notifications
      </h2>

      {notifications.length === 0 ? (
        <p className="text-gray-500 text-sm">No new notifications</p>
      ) : (
        <ul className="space-y-3">
          {notifications.map((n) => (
            <li
              key={n.id}
              className={`p-3 border rounded-lg ${
                n.type === "missed" ? "border-red-300 bg-red-50" : "border-green-300 bg-green-50"
              }`}
            >
              <h3 className="font-medium text-gray-800">{n.title}</h3>

              {/* Split message by newlines for readability */}
              <ul className="text-gray-600 text-sm mt-1 list-disc list-inside space-y-1">
                {n.message
                  .split("\n")
                  .filter(Boolean)
                  .map((line, idx) => (
                    <li key={idx}>{line}</li>
                  ))}
              </ul>

              <p className="text-gray-400 text-xs mt-2">
                {new Date(n.created_at).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Notifications;
