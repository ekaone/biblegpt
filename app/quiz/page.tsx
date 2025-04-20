"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuizStore } from "@/lib/store/quiz-store";
import { bibleQuizQuestions } from "@/data/bible-quiz-questions";
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
    <div className="min-h-screen py-8 flex items-center justify-center font-sans">
      <div className="w-full max-w-xl mx-auto px-4">
        {gameState === "playing" ? (
          <>
            <div className="relative w-full h-3 bg-[#F2E9E4] rounded-full mb-12">
              <div
                className="absolute top-0 left-0 h-full rounded-full transition-all duration-300 shadow-sm"
                style={{ width: `${progress}%`, background: 'linear-gradient(90deg, #F7B267 0%, #B4E9D6 100%)' }}
              />
              <div className="absolute -top-10 right-0 text-[#22223B] font-semibold text-xl">
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
                <h2 className="text-[#22223B] text-3xl md:text-4xl font-bold mb-10 text-center">
                  {currentQuestion.question}
                </h2>

                <div className="space-y-4">
                  {Object.entries(currentQuestion.options).map(
                    ([key, value], idx) => {
                      const isSelected = selectedAnswer === key;
                      const isCorrectAnswer =
                        currentQuestion.correctAnswer === key;
                      let optionClass =
                        "w-full py-5 px-6 rounded-2xl text-lg font-medium transition-all duration-200 cursor-pointer flex items-center shadow-sm border-2 ";
                      const pastelBg = [
                        "bg-[#F7B267] border-[#F7B267] text-[#22223B]", // peach
                        "bg-[#B4E9D6] border-[#B4E9D6] text-[#22223B]", // mint
                        "bg-[#E9A6A6] border-[#E9A6A6] text-[#22223B]", // pink
                        "bg-[#C3B6F7] border-[#C3B6F7] text-[#22223B]"  // lavender
                      ];
                      optionClass += pastelBg[idx % pastelBg.length] + " ";
                      if (isSelected) {
                        optionClass += isCorrectAnswer
                          ? "ring-4 ring-[#B4E9D6] border-[#22223B]"
                          : "ring-4 ring-[#E9A6A6] border-[#22223B] opacity-80";
                      } else {
                        optionClass += "hover:opacity-90 hover:shadow-md";
                      }
                      return (
                        <button
                          key={key}
                          onClick={() => handleAnswerSelect(key)}
                          disabled={!!selectedAnswer}
                          className={optionClass}
                        >
                          <span className="flex-1 text-left">{value}</span>
                          {isSelected && (
                            <span className="ml-4 text-2xl">{isCorrectAnswer ? "✔️" : "❌"}</span>
                          )}
                        </button>
                      );
                    }
                  )}
                </div>
                <button
                  onClick={handleNextQuestion}
                  disabled={!selectedAnswer}
                  className={`w-full mt-10 py-5 rounded-2xl text-xl font-bold transition-all duration-200 shadow-md border-2 border-[#F7B267] ${selectedAnswer ? "bg-[#F7B267] text-[#22223B] hover:bg-[#F2E9E4]" : "bg-[#F2E9E4] text-[#C3B6F7] cursor-not-allowed"}`}
                >
                  Next
                </button>

                {selectedAnswer && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-10"
                  >
                    <div className="p-8 bg-white/80 rounded-2xl shadow-lg border border-[#F2E9E4]">
                      <p className="text-xl font-bold mb-3 text-[#22223B]">
                        {isAnswerCorrect ? "✨ Correct!" : "❌ Incorrect"}
                      </p>
                      <p className="text-[#4A4E69] text-lg">
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
                      className={`text-lg px-4 py-2 rounded-full border-2 font-semibold shadow-sm ${["bg-[#F7B267] text-[#22223B] border-[#F7B267]","bg-[#B4E9D6] text-[#22223B] border-[#B4E9D6]","bg-[#E9A6A6] text-[#22223B] border-[#E9A6A6]","bg-[#C3B6F7] text-[#22223B] border-[#C3B6F7]"][idx%4]}`}
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
