import React from "react";
export default function Loader({ text = "Loading..." }) {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="backdrop-blur-md bg-white/60 dark:bg-gray-800/60
        border border-purple-200 dark:border-gray-700
        rounded-2xl px-8 py-6 shadow-lg flex flex-col items-center gap-4">
        
        <div className="flex gap-2">
          {[1, 2, 3].map((i) => (
            <span
              key={i}
              className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"
              style={{ animationDelay: `${i * 150}ms` }}
            />
          ))}
        </div>

        <p className="text-sm text-purple-700 dark:text-purple-300">
          {text}
        </p>
      </div>
    </div>
  );
}
