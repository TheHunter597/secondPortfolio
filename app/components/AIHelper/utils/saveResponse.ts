import { checkIfQuestionExists, type PredefinedQA } from './fuzzySearch';

function capitalizeFirstLetter(value: string): string {
  if (!value) return value;
  return value.charAt(0).toUpperCase() + value.slice(1);
}

/**
 * Save a new question-answer pair to AIQuestionResponses.json
 * Uses fuzzy search to avoid duplicates with 70% match threshold
 */
export async function saveNewResponse(
  question: string,
  answer: string,
  existingQuestions: PredefinedQA[]
): Promise<boolean> {
  try {
    const normalizedQuestion = capitalizeFirstLetter(question.trim());

    // Check if a similar question already exists with 70% match threshold
    const isDuplicate = checkIfQuestionExists(normalizedQuestion, existingQuestions, 0.7);

    if (isDuplicate) {
      console.log('Question already exists with similar match, skipping save');
      return false;
    }

    // Generate a simple ID based on timestamp
    const id = `learned-${Date.now()}`;

    // Fetch the current data
    const response = await fetch('/api/ai-responses', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      console.error('Failed to fetch current responses');
      return false;
    }

    const data = await response.json();
    const currentQA = data.qa || [];

    // Add the new Q&A pair
    const newQA: PredefinedQA = {
      id,
      question: normalizedQuestion,
      answer: answer.trim(),
    };

    currentQA.push(newQA);

    // Save updated data back
    const saveResponse = await fetch('/api/ai-responses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ qa: currentQA }),
    });

    if (!saveResponse.ok) {
      console.error('Failed to save response');
      return false;
    }

    console.log('Successfully saved new response');
    return true;
  } catch (error) {
    console.error('Error saving response:', error);
    return false;
  }
}
