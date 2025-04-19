import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

interface LeaderboardPlayer {
  id: string;
  name: string;
  score: number;
  badges: string[];
  date: string;
}

interface LeaderboardProps {
  leaderboard: LeaderboardPlayer[];
  onClear: () => void;
  onClose: () => void;
}

export function Leaderboard({
  leaderboard,
  onClear,
  onClose,
}: LeaderboardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-10"
    >
      <div className="bg-white/70 backdrop-blur-sm rounded-xl p-8">
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-2xl font-semibold text-indigo-900">
            Leaderboard
          </h3>
          <div className="flex gap-3">
            <button
              onClick={onClear}
              className="bg-red-500 text-white px-6 py-3 rounded-xl hover:bg-red-600 transition-colors shadow-md text-lg font-medium"
            >
              Clear
            </button>
            <button
              onClick={onClose}
              className="bg-white/70 text-indigo-900 px-6 py-3 rounded-xl border-2 border-indigo-200 hover:bg-indigo-50 hover:border-indigo-400 transition-colors text-lg font-medium"
            >
              Close
            </button>
          </div>
        </div>
        <div className="space-y-4">
          {leaderboard.map((player) => (
            <div
              key={player.id}
              className="flex justify-between items-center p-6 bg-white/50 backdrop-blur-sm rounded-xl border-2 border-indigo-100"
            >
              <div>
                <p className="text-xl font-semibold text-indigo-900">
                  {player.name}
                </p>
                <div className="flex gap-2 mt-2">
                  {player.badges.map((badge) => (
                    <Badge
                      key={badge}
                      variant="default"
                      className="text-sm px-3 py-1 bg-indigo-100 text-indigo-700 border border-indigo-200"
                    >
                      {badge}
                    </Badge>
                  ))}
                </div>
              </div>
              <p className="text-2xl font-bold text-indigo-900">
                {player.score} points
              </p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
