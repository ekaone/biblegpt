import React from "react";

interface QuizCompletedProps {
  score: number;
  badges: string[];
  playerName: string;
  setPlayerName: (name: string) => void;
  handleRestart: () => void;
  handleViewLeaderboard: () => void;
}

import { Badge } from "@/components/ui/badge";

const badgeColors = [
  "bg-[#F7B267] text-[#22223B] border-[#F7B267]",
  "bg-[#B4E9D6] text-[#22223B] border-[#B4E9D6]",
  "bg-[#E9A6A6] text-[#22223B] border-[#E9A6A6]",
  "bg-[#C3B6F7] text-[#22223B] border-[#C3B6F7]",
];

const QuizCompleted: React.FC<QuizCompletedProps> = ({
  score,
  badges,
  playerName,
  setPlayerName,
  handleRestart,
  handleViewLeaderboard,
}) => (
  <div
    className="w-full"
    style={{ animation: "fadeIn .3s" }}
  >
    <h2 className="text-[#22223B] text-4xl md:text-5xl font-bold mb-6 text-center">
      Quiz Completed! 🎉
    </h2>
    <p className="text-2xl text-[#4A4E69] mb-8 text-center">
      Your final score: {score} points
    </p>

    {badges.length > 0 && (
      <div className="mb-10">
        <h3 className="text-xl font-semibold mb-4 text-[#22223B] text-center">
          Badges Earned:
        </h3>
        <div className="flex flex-wrap gap-2 justify-center">
          {badges.map((badge, idx) => (
            <Badge
              key={badge}
              variant="secondary"
              className={`text-lg px-4 py-2 rounded-full border-2 font-semibold shadow-sm ${badgeColors[idx % 4]}`}
            >
              {badge}
            </Badge>
          ))}
        </div>
      </div>
    )}

    <div className="space-y-4">
      <input
        type="text"
        placeholder="Enter your name"
        value={playerName}
        onChange={(e) => setPlayerName(e.target.value)}
        className="w-full px-8 py-5 rounded-2xl border-2 border-[#F2E9E4] focus:border-[#F7B267] focus:ring-2 focus:ring-[#F7B267] text-lg text-[#22223B] bg-white/80 placeholder:text-[#C3B6F7] shadow-sm"
      />
      <div className="flex gap-4">
        <button
          onClick={handleRestart}
          className="flex-1 bg-[#B4E9D6] text-[#22223B] py-5 rounded-2xl hover:bg-[#A0D9C7] transition-colors shadow-md text-xl font-bold border-2 border-[#B4E9D6]"
        >
          Try Again
        </button>
        <button
          onClick={handleViewLeaderboard}
          className="flex-1 bg-[#F7B267] text-[#22223B] py-5 rounded-2xl border-2 border-[#F7B267] hover:bg-[#F2E9E4] transition-colors shadow-md text-xl font-bold"
        >
          Save Score
        </button>
      </div>
    </div>
  </div>
);

export default QuizCompleted;
