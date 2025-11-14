// app/api/gemeni/route.ts

import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(req: NextRequest) {
  try {
    const { article } = await req.json();

    const summaryPrompt = `Please provide a concise summary of the following article: ${article}`;
    const summaryResponse = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: summaryPrompt,
    });

    const summary = summaryResponse.text?.trim() || "No summary generated.";

    const quizPrompt = `Generate 5 multiple choice questions based on this article: ${summary}. Return the response in this exact JSON format:
      [
        {
          "question": "Question text here",
          "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
          "answer": "0"
        }
      ]
      Make sure the response is valid JSON and the answer is the index (0-3) of the correct option.`;

    const quizResponse = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: quizPrompt,
    });
    const extractJsonArray = (t: string) => {
      const match = t.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
      return match ? match[1].trim() : t.trim();
    };
    const text = quizResponse as any;

    const cleaned = extractJsonArray(quizResponse.text || text);
    const quizList = JSON.parse(cleaned);

    // const quiz = quizResponse.text?.trim() || "[]";

    return NextResponse.json({ summary, quizList });
  } catch (error: any) {
    console.error("Error in /api/gemeni:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
