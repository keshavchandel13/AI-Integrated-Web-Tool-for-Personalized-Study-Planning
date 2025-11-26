import React from 'react'

export default function MessageBubble({ messages, username }) {
  return (
    <div className="flex flex-col gap-4 p-4">
      {messages.map((ms, i) => {
        const isUser = ms.role === "user"

        return (
          <div
            key={i}
            className={`flex flex-col max-w-[70%] ${
              isUser ? "self-end items-end" : "self-start items-start"
            }`}
          >
            <span className="text-sm text-gray-400 mb-1">
              {isUser ? username : "Mentor"}
            </span>

            <div
              className={`px-4 py-2 rounded-xl text-white ${
                isUser ? "bg-blue-700" : "bg-gray-800"
              }`}
            >
              {ms.text}
            </div>
          </div>
        )
      })}
    </div>
  )
}
