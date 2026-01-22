"use server";
import { supabaseAdmin } from "@/app/lib/supabase";
import { checkIfQuestionExists, type PredefinedQA } from "../utils/fuzzySearch";
import predefinedQuestions from "../data/predefinedQuestions.json";

function capitalizeFirstLetter(value: string): string {
  if (!value) return value;
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export async function saveQAAction(formData: FormData): Promise<{ saved: boolean }>{
  try {
    const rawQuestion = (formData.get("question") as string) ?? "";
    const rawAnswer = (formData.get("answer") as string) ?? "";
    
    const question = capitalizeFirstLetter(rawQuestion.trim());
    const answer = rawAnswer.trim();
    
    if (!question || !answer) {
      return { saved: false };
    }

    // Fetch existing learned data from Supabase
    const { data: learnedData, error: fetchError } = await supabaseAdmin
      .from("learned_data")
      .select("question");

    if (fetchError) {
      console.error("Error fetching learned data:", fetchError);
      return { saved: false };
    }

    const learnedQAs: PredefinedQA[] = (learnedData || []).map((item: any, idx: number) => ({
      id: `learned-${idx}`,
      question: item.question,
      answer: "",
    }));

    // Check duplicates: learned (>= 0.7) and predefined (>= 0.7)
    const existsLearned = checkIfQuestionExists(question, learnedQAs, 0.7);
    const existsPre = checkIfQuestionExists(question, predefinedQuestions.qa as PredefinedQA[], 0.7);

    if (existsLearned || existsPre) {
      return { saved: false };
    }

    // Insert into Supabase
    const { error: insertError } = await supabaseAdmin
      .from("learned_data")
      .insert({
        id: `learned-${Date.now()}`,
        question,
        answer,
        created_at: new Date().toISOString(),
      });

    if (insertError) {
      console.error("Error inserting learned data:", insertError);
      return { saved: false };
    }

    return { saved: true };
  } catch (err) {
    console.error("saveQAAction error:", err);
    return { saved: false };
  }
}
