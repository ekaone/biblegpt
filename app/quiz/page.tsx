"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuizStore } from "@/lib/store/quiz-store";
import { bibleQuizQuestions } from "@/data/bible-quiz-questions";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Leaderboard } from "@/components/quiz/leaderboard";

export default function Quiz() {
  const {
    currentQuestionIndex,
    score,
    selectedAnswer,
    isAnswerCorrect,
    badges,
    leaderboard,
    setCurrentQuestionIndex,
    setScore,
    setSelectedAnswer,
    setIsAnswerCorrect,
    setShowExplanation,
    addBadge,
    addToLeaderboard,
    resetGame,
    setLeaderboard,
  } = useQuizStore();

  const [gameState, setGameState] = useState<"playing" | "finished">("playing");
  const [playerName, setPlayerName] = useState("");
  const [showLeaderboard, setShowLeaderboard] = useState(false);

  const currentQuestion = bibleQuizQuestions[currentQuestionIndex];
  if (!currentQuestion) {
    return <div>Error: Question not found</div>;
  }
  const progress =
    ((currentQuestionIndex + 1) / bibleQuizQuestions.length) * 100;

  const handleAnswerSelect = (answer: string) => {
    if (selectedAnswer) return;

    const isCorrect = answer === currentQuestion.correctAnswer;
    setSelectedAnswer(answer);
    setIsAnswerCorrect(isCorrect);

    if (isCorrect) {
      setScore(score + 10);
      if (score + 10 >= 50) {
        addBadge("Bible Scholar");
      }
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < bibleQuizQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setIsAnswerCorrect(null);
      setShowExplanation(false);
    } else {
      setGameState("finished");
    }
  };

  const handleViewLeaderboard = () => {
    if (!playerName.trim()) {
      setPlayerName("Anonymous");
    }
    addToLeaderboard({
      id: Date.now().toString(),
      name: playerName.trim() || "Anonymous",
      score,
      badges,
      date: new Date().toISOString(),
    });
    setShowLeaderboard(true);
  };

  const handleClearLeaderboard = () => {
    setLeaderboard([]);
  };

  const handleRestart = () => {
    resetGame();
    setGameState("playing");
    setPlayerName("");
    setSelectedAnswer(null);
    setIsAnswerCorrect(null);
    setShowExplanation(false);
    setCurrentQuestionIndex(0);
  };

  return (
    <div className="min-h-screen py-8 flex items-center justify-center">
      <div className="w-full max-w-xl mx-auto px-4">
        {gameState === "playing" ? (
          <>
            <div className="relative w-full h-3 bg-white/30 rounded-full mb-12">
              <div
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-indigo-600 to-violet-500 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
              <div className="absolute -top-10 right-0 text-indigo-900 font-medium text-xl">
                {currentQuestionIndex + 1}/{bibleQuizQuestions.length}
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuestionIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="w-full"
              >
                <h2 className="text-indigo-900 text-2xl md:text-3xl font-semibold mb-10 text-center">
                  {currentQuestion.question}
                </h2>

                <div className="space-y-4">
                  {Object.entries(currentQuestion.options).map(
                    ([key, value]) => {
                      const isSelected = selectedAnswer === key;
                      const isCorrectAnswer =
                        currentQuestion.correctAnswer === key;
                      let optionClass =
                        "w-full text-left px-8 py-5 rounded-xl border-2 transition-all duration-200 text-lg";

                      if (selectedAnswer) {
                        if (isSelected) {
                          optionClass += isCorrectAnswer
                            ? " bg-green-100 border-green-500 text-green-700"
                            : " bg-red-100 border-red-500 text-red-700";
                        } else if (isCorrectAnswer) {
                          optionClass +=
                            " bg-green-100 border-green-500 text-green-700";
                        } else {
                          optionClass +=
                            " bg-white/50 border-indigo-200 text-indigo-900";
                        }
                      } else {
                        optionClass += isSelected
                          ? " bg-indigo-100 border-indigo-500 text-indigo-900"
                          : " bg-white/50 border-indigo-200 text-indigo-900 hover:bg-indigo-50 hover:border-indigo-400";
                      }

                      return (
                        <button
                          key={key}
                          onClick={() => handleAnswerSelect(key)}
                          disabled={!!selectedAnswer}
                          className={optionClass}
                        >
                          {value}
                        </button>
                      );
                    }
                  )}
                </div>

                <button
                  onClick={handleNextQuestion}
                  disabled={!selectedAnswer}
                  className={`w-full mt-10 py-5 rounded-xl text-xl font-medium transition-all duration-200 ${
                    selectedAnswer
                      ? "bg-gradient-to-r from-indigo-600 to-violet-500 text-white hover:from-indigo-700 hover:to-violet-600 shadow-md"
                      : "bg-indigo-100/50 text-indigo-300 cursor-not-allowed"
                  }`}
                >
                  Next
                </button>

                {selectedAnswer && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-10"
                  >
                    <div className="p-8 bg-white/70 rounded-xl backdrop-blur-sm">
                      <p className="text-xl font-medium mb-3 text-indigo-900">
                        {isAnswerCorrect ? "✨ Correct!" : "❌ Incorrect"}
                      </p>
                      <p className="text-indigo-700 text-lg">
                        {currentQuestion.explanation}
                      </p>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full"
          >
            <h2 className="text-indigo-900 text-3xl md:text-4xl font-semibold mb-6 text-center">
              Quiz Completed! 🎉
            </h2>
            <p className="text-2xl text-indigo-800 mb-8 text-center">
              Your final score: {score} points
            </p>

            {badges.length > 0 && (
              <div className="mb-10">
                <h3 className="text-xl font-semibold mb-4 text-indigo-900 text-center">
                  Badges Earned:
                </h3>
                <div className="flex flex-wrap gap-2 justify-center">
                  {badges.map((badge) => (
                    <Badge
                      key={badge}
                      variant="secondary"
                      className="text-lg px-4 py-2 bg-indigo-100 text-indigo-700 border-2 border-indigo-200"
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
                className="w-full px-8 py-5 rounded-xl border-2 border-indigo-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-lg text-indigo-900 bg-white/70 backdrop-blur-sm placeholder:text-indigo-400"
              />
              <div className="flex gap-4">
                <button
                  onClick={handleRestart}
                  className="flex-1 bg-gradient-to-r from-indigo-600 to-violet-500 text-white py-5 rounded-xl hover:from-indigo-700 hover:to-violet-600 transition-colors shadow-md text-xl font-medium"
                >
                  Try Again
                </button>
                <button
                  onClick={handleViewLeaderboard}
                  className="flex-1 bg-white/70 backdrop-blur-sm text-indigo-900 py-5 rounded-xl border-2 border-indigo-200 hover:bg-indigo-50 hover:border-indigo-400 transition-colors text-xl font-medium"
                >
                  Save Score
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {showLeaderboard && (
          <Leaderboard
            leaderboard={leaderboard}
            onClear={handleClearLeaderboard}
            onClose={() => setShowLeaderboard(false)}
          />
        )}
      </div>
    </div>
  );
}
