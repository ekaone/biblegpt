import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

type QuizOption = Record<string, string>;

interface BibleQuizQuestion {
  question: string;
  options: QuizOption;
  correctAnswer: string;
  explanation: string;
}

interface QuizQuestionProps {
  loading: boolean;
  progress: number;
  currentQuestionIndex: number;
  bibleQuizQuestionsLength: number;
  currentQuestion: BibleQuizQuestion[];
  selectedAnswer: string | null;
  isAnswerCorrect: boolean | null;
  handleAnswerSelect: (key: string) => void;
  handleNextQuestion: () => void;
  fetchQuestions: () => void;
}

const QuizQuestion: React.FC<QuizQuestionProps> = ({
  loading,
  progress,
  currentQuestionIndex,
  bibleQuizQuestionsLength,
  currentQuestion,
  selectedAnswer,
  isAnswerCorrect,
  handleAnswerSelect,
  handleNextQuestion,
  fetchQuestions,
}) => (
  <>
    <div className="flex gap-4 mb-4">
      <Button
        onClick={fetchQuestions}
        disabled={loading}
        className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
      >
        {loading ? "Generating Questions..." : "Generate More Questions"}
      </Button>
    </div>
    <div className="relative w-full h-3 bg-[#F2E9E4] rounded-full mb-12">
      <div
        className="absolute top-0 left-0 h-full rounded-full transition-all duration-300 shadow-sm"
        style={{
          width: `${progress}%`,
          background: "linear-gradient(90deg, #F7B267 0%, #B4E9D6 100%)",
        }}
      />
      <div className="absolute -top-10 right-0 text-[#22223B] font-semibold text-xl">
        {currentQuestionIndex + 1}/{bibleQuizQuestionsLength}
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
          {currentQuestion[currentQuestionIndex].question}
        </h2>

        <div className="space-y-4">
          {Object.entries(currentQuestion[currentQuestionIndex].options).map(
            ([key, value], idx) => {
              const isSelected = selectedAnswer === key;
              const isCorrectAnswer =
                currentQuestion[currentQuestionIndex].correctAnswer === key;
              let optionClass =
                "w-full py-5 px-6 rounded-2xl text-lg font-medium transition-all duration-200 cursor-pointer flex items-center shadow-sm border-2 ";
              const pastelBg = [
                "bg-[#F7B267] border-[#F7B267] text-[#22223B]", // peach
                "bg-[#B4E9D6] border-[#B4E9D6] text-[#22223B]", // mint
                "bg-[#E9A6A6] border-[#E9A6A6] text-[#22223B]", // pink
                "bg-[#C3B6F7] border-[#C3B6F7] text-[#22223B]", // lavender
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
                  <span className="flex-1 text-left">
                    {typeof value === "string" ? value : String(value)}
                  </span>
                  {isSelected && (
                    <span className="ml-4 text-2xl">
                      {isCorrectAnswer ? "✔️" : "❌"}
                    </span>
                  )}
                </button>
              );
            }
          )}
        </div>
        <button
          onClick={handleNextQuestion}
          disabled={!selectedAnswer}
          className={`w-full mt-10 py-5 rounded-2xl text-xl font-bold transition-all duration-200 shadow-md border-2 border-[#F7B267] ${
            selectedAnswer
              ? "bg-[#F7B267] text-[#22223B] hover:bg-[#F2E9E4]"
              : "bg-[#F2E9E4] text-[#C3B6F7] cursor-not-allowed"
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
            <div className="p-8 bg-white/80 rounded-2xl shadow-lg border border-[#F2E9E4]">
              <p className="text-xl font-bold mb-3 text-[#22223B]">
                {isAnswerCorrect ? "✨ Correct!" : "❌ Incorrect"}
              </p>
              <p className="text-[#4A4E69] text-lg">
                {currentQuestion[currentQuestionIndex].explanation}
              </p>
            </div>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  </>
);

export default QuizQuestion;
