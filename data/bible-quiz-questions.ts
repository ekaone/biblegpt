export interface QuizQuestion {
  id: number;
  question: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
  correctAnswer: "A" | "B" | "C" | "D";
  explanation: string;
  category: "Old Testament" | "New Testament" | "Prophets" | "Gospels";
  difficulty: "easy" | "medium" | "hard";
}

export const bibleQuizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "Who was David's father?",
    options: {
      A: "Jesse",
      B: "Isaiah",
      C: "Saul",
      D: "Solomon",
    },
    correctAnswer: "A",
    explanation:
      "Jesse was David's father as mentioned in 1 Samuel 16:1-13. God sent Samuel to Jesse's house to anoint one of his sons as the next king of Israel.",
    category: "Old Testament",
    difficulty: "easy",
  },
  {
    id: 2,
    question: "What is the name of the mountain where Jesus often prayed?",
    options: {
      A: "Mount Sinai",
      B: "Mount Zion",
      C: "Mount of Olives",
      D: "Mount Carmel",
    },
    correctAnswer: "C",
    explanation:
      "The Mount of Olives is mentioned several times in the New Testament as a place where Jesus prayed, including before his arrest (Luke 22:39-46).",
    category: "Gospels",
    difficulty: "medium",
  },
  {
    id: 3,
    question: "Which prophet was swallowed by a great fish?",
    options: {
      A: "Jonah",
      B: "Elijah",
      C: "Isaiah",
      D: "Jeremiah",
    },
    correctAnswer: "A",
    explanation:
      "Jonah was swallowed by a great fish after trying to flee from God's command to preach to Nineveh (Jonah 1:17).",
    category: "Prophets",
    difficulty: "easy",
  },
];
