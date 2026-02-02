import api from "./axios";

export const subjectPreference = async (data) => {
  try {
    const response = await api.post(`/studyplan/preference`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
