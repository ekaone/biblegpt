import { generateObject } from "ai";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";

// Define the schema for Bible quiz questions
const quizQuestionSchema = z.object({
  id: z.number(),
  question: z.string(),
  options: z.object({
    A: z.string(),
    B: z.string(),
    C: z.string(),
    D: z.string(),
  }),
  correctAnswer: z.enum(["A", "B", "C", "D"]),
  explanation: z.string(),
  category: z.enum(["Old Testament", "New Testament", "Prophets", "Gospels"]),
  difficulty: z.enum(["easy", "medium", "hard"]),
});

export async function POST(req: Request) {
  try {
    const { count = 1 }: { count: number } = await req.json();

    const { object: questions } = await generateObject({
      model: openai("gpt-4.1-mini"),
      output: "array",
      schema: quizQuestionSchema,
      system: `You are an expert Bible scholar and quiz creator. Your task is to generate Bible quiz questions that are:
      1. Biblically accurate with proper scripture references
      2. Well-structured with clear and concise options
      3. Include detailed explanations with specific Bible verse references
      4. Properly categorized (Old Testament, New Testament, Prophets, or Gospels)
      5. Appropriately difficulty-rated (easy, medium, or hard)
      6. Have unique IDs starting from 1
      
      Guidelines for question creation:
      - Questions should be unique and not repeat previous content
      - Questions should test both knowledge and understanding
      - Options should be plausible but only one should be correct
      - Explanations should include relevant Bible verses
      - Categories should accurately reflect the content
      - Difficulty should match the complexity of the question
      - Each question should be unique and not repeat previous content`,
      prompt: `Generate ${count} Bible quiz questions following the schema above. Each question should be unique and cover different aspects of the Bible.`,
    });

    return Response.json({ questions });
  } catch (error) {
    console.error("Error generating quiz questions:", error);
    return Response.json(
      { error: "Failed to generate quiz questions" },
      { status: 500 }
    );
  }
}
