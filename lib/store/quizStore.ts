import { create } from "zustand";
import { persist } from "zustand/middleware";

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
      questions: [],
      setQuestions: (questions) => set({ questions }),
      clearQuestions: () => set({ questions: [] }),
    }),
    {
      name: "bible-quiz-storage",
    }
  )
);
