"use server";
import { promises as fs } from "fs";
import path from "path";
import { checkIfQuestionExists, type PredefinedQA } from "../utils/fuzzySearch";

function capitalizeFirstLetter(value: string): string {
  if (!value) return value;
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export async function saveQAAction(formData: FormData): Promise<{ saved: boolean }>{
  try {
    const rawQuestion = (formData.get("question") as string) ?? "";
    const rawAnswer = (formData.get("answer") as string) ?? "";
    console.log({rawQuestion,rawAnswer});
    
    const question = capitalizeFirstLetter(rawQuestion.trim());
    const answer = rawAnswer.trim();
    console.log({question,answer});
    
    if (!question || !answer) {
      return { saved: false };
    }

    const learnedFile = path.join(
      process.cwd(),
      "app/components/AIHelper/data/AIQuestionResponses.json"
    );
    console.log({learnedFile});
    
    const predefinedFile = path.join(
      process.cwd(),
      "app/components/AIHelper/data/predefinedQuestions.json"
    );
    console.log({predefinedFile});
    // Load learned and predefined
    let learned: { qa: PredefinedQA[] } = { qa: [] };
    try {
      const learnedContent = await fs.readFile(learnedFile, "utf-8");
      learned = JSON.parse(learnedContent || "{\"qa\":[]}");
    } catch {
      learned = { qa: [] };
    }

    let predefined: { qa: PredefinedQA[] } = { qa: [] };
    try {
      const preContent = await fs.readFile(predefinedFile, "utf-8");
      predefined = JSON.parse(preContent || "{\"qa\":[]}");
    } catch {
      predefined = { qa: [] };
    }

    // Check duplicates across learned and predefined (>= 0.7)
    const existsLearned = checkIfQuestionExists(question, learned.qa || [], 0.7);
    const existsPre = checkIfQuestionExists(question, predefined.qa || [], 0.7);
    if (existsLearned || existsPre) {
      return { saved: false };
    }

    const newQA: PredefinedQA = {
      id: `learned-${Date.now()}`,
      question,
      answer,
    };

    const updated = { qa: [...(learned.qa || []), newQA] };

    await fs.writeFile(learnedFile, JSON.stringify(updated, null, 2), "utf-8");
    return { saved: true };
  } catch (err) {
    console.error("saveQAAction error:", err);
    return { saved: false };
  }
}
