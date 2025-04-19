"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuizStore } from "@/lib/store/quiz-store";
import { bibleQuizQuestions } from "@/data/bible-quiz-questions";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

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
    <div className="min-h-screen rainbow-gradient-bg py-8">
      <div className="quiz-container">
        {gameState === "playing" ? (
          <>
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-2xl font-bold text-primary">Bible Quiz</h1>
                <p className="text-muted-foreground">
                  Test your biblical knowledge
                </p>
              </div>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setShowLeaderboard(true)}
                  className="text-primary hover:text-primary/80 transition-colors"
                >
                  View Leaderboard
                </button>
                <div className="text-xl font-semibold text-primary">
                  Score: {score}
                </div>
              </div>
            </div>

            <Progress value={progress} className="mb-8 progress-bar" />

            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuestionIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="quiz-card"
              >
                <span className="question-number">
                  Question {currentQuestionIndex + 1}
                </span>
                <h2 className="question-text">{currentQuestion.question}</h2>

                <div className="grid gap-4">
                  {Object.entries(currentQuestion.options).map(
                    ([key, value]) => {
                      const isSelected = selectedAnswer === key;
                      const isCorrectAnswer =
                        currentQuestion.correctAnswer === key;
                      let optionClass = "quiz-option";

                      if (selectedAnswer) {
                        if (isSelected) {
                          optionClass += isCorrectAnswer
                            ? " correct"
                            : " incorrect";
                        } else if (isCorrectAnswer) {
                          optionClass += " correct";
                        }
                      } else if (isSelected) {
                        optionClass += " selected";
                      }

                      return (
                        <button
                          key={key}
                          onClick={() => handleAnswerSelect(key)}
                          disabled={!!selectedAnswer}
                          className={optionClass}
                        >
                          {key}) {value}
                        </button>
                      );
                    }
                  )}
                </div>

                <button
                  onClick={handleNextQuestion}
                  disabled={!selectedAnswer}
                  className={`w-full mt-6 py-4 rounded-xl text-lg font-semibold transition-colors ${
                    selectedAnswer
                      ? "bg-emerald-600 text-white hover:bg-emerald-700 shadow-lg"
                      : "bg-gray-200 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  {currentQuestionIndex < bibleQuizQuestions.length - 1
                    ? "Next Question →"
                    : "Finish Quiz 🎉"}
                </button>

                {selectedAnswer && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-8"
                  >
                    <div className="p-6 bg-secondary rounded-xl mb-4">
                      <p className="text-lg font-semibold mb-2">
                        {isAnswerCorrect ? "✨ Correct!" : "❌ Incorrect"}
                      </p>
                      <p className="text-muted-foreground">
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
            className="quiz-card text-center"
          >
            <h2 className="text-3xl font-bold text-primary mb-4">
              Quiz Completed! 🎉
            </h2>
            <p className="text-2xl mb-6">Your final score: {score} points</p>

            {badges.length > 0 && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-3">Badges Earned:</h3>
                <div className="flex flex-wrap gap-2 justify-center">
                  {badges.map((badge) => (
                    <Badge
                      key={badge}
                      variant="secondary"
                      className="text-sm px-3 py-1"
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
                className="w-full px-4 py-3 rounded-xl border border-input focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <div className="flex gap-4">
                <button
                  onClick={handleRestart}
                  className="flex-1 bg-emerald-600 text-white py-3 rounded-xl hover:bg-emerald-700 transition-colors shadow-md"
                >
                  Try Again
                </button>
                <button
                  onClick={handleViewLeaderboard}
                  className="flex-1 bg-secondary text-primary py-3 rounded-xl hover:bg-secondary/80 transition-colors"
                >
                  Save
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {showLeaderboard && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 quiz-card"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-primary">Leaderboard</h3>
              <div className="flex gap-2">
                <button
                  onClick={handleClearLeaderboard}
                  className="bg-red-600 text-white px-4 py-2 rounded-xl hover:bg-red-700 transition-colors shadow-md"
                >
                  Clear Leaderboard
                </button>
                <button
                  onClick={() => setShowLeaderboard(false)}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
            <div className="space-y-4">
              {leaderboard.map((player) => (
                <div
                  key={player.id}
                  className="flex justify-between items-center p-4 bg-secondary rounded-xl"
                >
                  <div>
                    <p className="font-semibold">{player.name}</p>
                    <div className="flex gap-2 mt-1">
                      {player.badges.map((badge) => (
                        <Badge
                          key={badge}
                          variant="default"
                          className="text-xs"
                        >
                          {badge}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <p className="text-lg font-bold text-primary">
                    {player.score} points
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
