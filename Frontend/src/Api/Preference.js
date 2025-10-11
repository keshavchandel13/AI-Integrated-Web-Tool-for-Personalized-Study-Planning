import axios from "axios";

const url = import.meta.env.VITE_BACKEND_URL;

export const subjectPreference = async (data) => {
  try {
    console.log(data)
    const response = await axios.post(`${url}/api/studyplan/preference`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error in subjectPreference:", error);
    throw error;
  }
};
