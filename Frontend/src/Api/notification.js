import axios from "axios";

const API_URL = "http://localhost:5000/api/notifications"

//  Fetch user notifications
export const getNotifications = async (userId) => {
  const res = await axios.get(`${API_URL}/${userId}`);
  
  return res.data;
};

//  Trigger notification generation ( manual trigger)
export const generateNotifications = async (userId) => {
  const res = await axios.post(API_URL, { user_id: userId });
  return res.data;
};


