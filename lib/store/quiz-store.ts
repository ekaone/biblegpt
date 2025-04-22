import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface PlayerScore {
  id: string;
  name: string;
  score: number;
  badges: string[];
  date: string;
}

interface QuizState {
  currentQuestionIndex: number;
  score: number;
  selectedAnswer: string | null;
  isAnswerCorrect: boolean | null;
  showExplanation: boolean;
  badges: string[];
  leaderboard: PlayerScore[];
  setCurrentQuestionIndex: (index: number) => void;
  setScore: (score: number) => void;
  setSelectedAnswer: (answer: string | null) => void;
  setIsAnswerCorrect: (isCorrect: boolean | null) => void;
  setShowExplanation: (show: boolean) => void;
  addBadge: (badge: string) => void;
  addToLeaderboard: (player: PlayerScore) => void;
  setLeaderboard: (leaderboard: PlayerScore[]) => void;
  resetGame: () => void;
}

interface Question {
  question: string;
  options: Record<string, string>;
  correctAnswer: string;
  explanation: string;
}

interface QuizState {
  questions: Question[];
  setQuestions: (questions: Question[]) => void;
  clearQuestions: () => void;
}

export const useQuizStore = create<QuizState>()(
  persist(
    (set) => ({
      currentQuestionIndex: 0,
      score: 0,
      selectedAnswer: null,
      isAnswerCorrect: null,
      showExplanation: false,
      badges: [],
      leaderboard: [],
      setCurrentQuestionIndex: (index) => set({ currentQuestionIndex: index }),
      setScore: (score) => set({ score }),
      setSelectedAnswer: (answer) => set({ selectedAnswer: answer }),
      setIsAnswerCorrect: (isCorrect) => set({ isAnswerCorrect: isCorrect }),
      setShowExplanation: (show) => set({ showExplanation: show }),
      addBadge: (badge) =>
        set((state) => ({ badges: [...state.badges, badge] })),
      addToLeaderboard: (player) =>
        set((state) => ({
          leaderboard: [...state.leaderboard, player].sort(
            (a, b) => b.score - a.score
          ),
        })),
      setLeaderboard: (leaderboard) => set({ leaderboard }),
      resetGame: () =>
        set((state) => ({
          currentQuestionIndex: 0,
          score: 0,
          selectedAnswer: null,
          isAnswerCorrect: null,
          showExplanation: false,
          badges: [],
          leaderboard: state.leaderboard,
        })),
      questions: [],
      setQuestions: (questions) => set({ questions }),
      clearQuestions: () => set({ questions: [] }),
    }),
    {
      name: "bible-quiz-storage",
      partialize: (state) => ({
        leaderboard: state.leaderboard,
        previousquestions: state.questions,
      }),
    }
  )
);
