"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface ProfileCardProps {
  name: string;
  title: string;
  avatarUrl?: string;
  status?: "available" | "busy" | "offline";
  onMessageClick?: () => void;
}

export function ProfileCard({
  name = "Jay Dwivedi",
  title = "Web Designer",
  onMessageClick,
}: ProfileCardProps) {
  const [showCreativity, setShowCreativity] = useState(false);

  // Get current time in 12-hour format
  const currentTime = new Date().toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  return (
    <div className="relative w-[400px]">
      {/* Main Card */}
      <div className="relative bg-gradient-to-br from-zinc-800/90 to-zinc-900/90 rounded-[20px] p-6 backdrop-blur-sm shadow-xl border border-zinc-800/50">
        {/* Header */}
        <div className="flex justify-between items-center mb-6 text-zinc-400 text-sm">
          <span>{title}</span>
          <div className="flex items-center gap-1">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{currentTime}</span>
          </div>
        </div>

        {/* Profile Section */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 rounded-full bg-zinc-700 flex items-center justify-center text-2xl">
            👨‍💻
          </div>
          <div>
            <h3 className="text-white font-bold text-lg">{name}</h3>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span className="text-zinc-400 text-sm">Available for work</span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={() => {
            setShowCreativity(!showCreativity);
            onMessageClick?.();
          }}
          className="w-full bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl py-3 px-4 font-medium transition-colors flex items-center justify-center gap-2"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
            />
          </svg>
          {showCreativity ? "Hide Message" : "Show Message"}
        </button>
      </div>

      {/* Animated Creativity Section */}
      <motion.div
        initial={{ y: -10, opacity: 0 }}
        animate={showCreativity ? { y: 8, opacity: 1 } : { y: -10, opacity: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="absolute bottom-0 left-0 right-0 bg-[#faf0e6] rounded-[20px] p-4 transform translate-y-full shadow-lg"
      >
        <div className="flex items-center justify-center gap-2 text-zinc-900 font-medium">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
          Currently High on Creativity
        </div>
      </motion.div>
    </div>
  );
}
