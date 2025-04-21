"use client";

import { useState } from "react";
import { useQuizStore } from "@/lib/store/quiz-store";
import { useGetQuestionsStore } from "@/lib/store/quiz-get-questions-store";
import { bibleQuizQuestions } from "@/data/bible-quiz-questions";
import { Button } from "@/components/ui/button";
import { Leaderboard } from "@/components/quiz/leaderboard";
import QuizCompleted from "@/components/quiz/quiz-completed";
import QuizQuestion from "@/components/quiz/quiz-question";

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

  const { questions, setQuestions } = useGetQuestionsStore();
  const [gameState, setGameState] = useState<"playing" | "finished">("playing");
  const [playerName, setPlayerName] = useState("");
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showQuiz, setShowQuiz] = useState(false);

  const fetchQuestions = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch("/api/quiz", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          count: 3, // Generate 3 questions
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch questions");
      }

      const data = await response.json();
      setQuestions(data.questions);
      setShowQuiz(true); // Show quiz UI after questions are fetched
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  // const currentQuestion = bibleQuizQuestions[currentQuestionIndex];
  const currentQuestion = questions;
  // Check if questions are valid and available
  const hasValidQuestions =
    Array.isArray(questions) &&
    questions.length > 0 &&
    questions.every((q) => q && q.question && q.options && q.correctAnswer);

  if (!currentQuestion) {
    return <div>Error: Question not found</div>;
  }
  const progress =
    ((currentQuestionIndex + 1) / bibleQuizQuestions.length) * 100;

  const handleAnswerSelect = (answer: string) => {
    if (selectedAnswer) return;

    const isCorrect =
      answer === currentQuestion[currentQuestionIndex].correctAnswer;
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
        {!showQuiz ? (
          <div className="flex gap-4 mb-4 justify-center">
            <Button
              onClick={fetchQuestions}
              disabled={loading}
              className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? "Generating Questions..." : "Generate Questions"}
            </Button>
          </div>
        ) : !hasValidQuestions ? (
          <div className="text-red-600 text-center my-8">
            {error || "Failed to generate quiz questions. Please try again."}
            <div className="mt-4">
              <Button onClick={() => setShowQuiz(false)}>Back</Button>
            </div>
          </div>
        ) : (
          <>
            {gameState === "playing" ? (
              <QuizQuestion
                loading={loading}
                progress={progress}
                currentQuestionIndex={currentQuestionIndex}
                bibleQuizQuestionsLength={bibleQuizQuestions.length}
                currentQuestion={currentQuestion}
                selectedAnswer={selectedAnswer}
                isAnswerCorrect={isAnswerCorrect}
                handleAnswerSelect={handleAnswerSelect}
                handleNextQuestion={handleNextQuestion}
                fetchQuestions={fetchQuestions}
              />
            ) : (
              <QuizCompleted
                score={score}
                badges={badges}
                playerName={playerName}
                setPlayerName={setPlayerName}
                handleRestart={handleRestart}
                handleViewLeaderboard={handleViewLeaderboard}
              />
            )}
            {showLeaderboard && (
              <Leaderboard
                leaderboard={leaderboard}
                onClear={handleClearLeaderboard}
                onClose={() => setShowLeaderboard(false)}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}
