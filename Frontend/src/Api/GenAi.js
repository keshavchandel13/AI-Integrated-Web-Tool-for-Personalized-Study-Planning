const url = `${import.meta.env.VITE_BACKEND_URL}`
export const geminires = async (prompt) => {
  try {
    const res = await fetch(`${url}/api/gemini/mentor`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    const data = await res.json();
    return data.reply;
  } catch (err) {
    console.log("Backend Gemini Error:", err);
    return "Something went wrong.";
  }
};

