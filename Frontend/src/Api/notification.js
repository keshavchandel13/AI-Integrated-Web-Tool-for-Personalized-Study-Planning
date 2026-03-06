import api from "./axios";

//  Fetch user notifications
export const getNotifications = async () => {
  const res = await api.get(`/notifications/getnotification`);
  
  return res.data;
};

//  Trigger notification generation ( manual trigger)
export const generateNotifications = async (userId) => {
  const res = await api.post("/notifications", { user_id: userId });
  return res.data;
};


