import { create } from "zustand";
import { persist } from "zustand/middleware";

interface QuizState {
  questions: any[];
  setQuestions: (questions: any[]) => void;
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
