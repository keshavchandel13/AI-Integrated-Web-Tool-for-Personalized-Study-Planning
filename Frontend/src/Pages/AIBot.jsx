import React, { useState } from "react";
import ChatInput from "../Components/mentorchat/ChatInput";
import MessageBubble from "../Components/mentorchat/MessageBubble";
import { geminires } from "../Api/GenAi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AIBot() {
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;
  const username = user?.username || "Guest";

  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const setQuerychange = (e) => {
    setQuery(e.target.value);
  };

  const getResponse = async () => {
    if (!query.trim() || loading) return;

    const userMessage = { role: "user", text: query };

    setLoading(true);
    setMessages((prev) => [...prev, userMessage]);
    setQuery("");

    try {
      const res = await geminires(query);

      if (!res) throw new Error("Empty response");

      setMessages((prev) => [
        ...prev,
        { role: "mentor", text: res },
      ]);
    } catch (err) {
      console.error("AI error:", err);

      setMessages((prev) => [
        ...prev,
        {
          role: "mentor",
          text: "⚠️ I couldn't process that. Please try again.",
        },
      ]);

      toast.error("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-102px)] w-full max-w-4xl mx-auto 
    bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">

      <ToastContainer
        position="top-right"
        autoClose={8000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover={false}
        theme="colored"
        limit={3}
      />

      {/* Header */}
      <div className="p-3 border-b bg-white dark:bg-gray-800 dark:border-gray-700 sticky top-0 z-10">
        <h1 className="text-center text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
          Mentor
        </h1>
      </div>

      {/* Chat messages */}
      <div className="flex-grow overflow-y-auto px-3 py-2 space-y-2 
      bg-gray-50 dark:bg-gray-900">

        {messages.length === 0 && !loading && (
          <div className="text-center text-gray-400 dark:text-gray-500 mt-10">
            Start a conversation…
          </div>
        )}

        <MessageBubble messages={messages} username={username} />

        {loading && (
          <div className="animate-pulse text-gray-500 dark:text-gray-400 text-sm px-2">
            Mentor is thinking…
          </div>
        )}
      </div>

      {/* Chat input */}
      <div className="p-2 border-t bg-white dark:bg-gray-800 dark:border-gray-700">
        <ChatInput
          query={query}
          setQuerychange={setQuerychange}
          getResponse={getResponse}
          disabled={loading}
        />
      </div>
    </div>
  );
}