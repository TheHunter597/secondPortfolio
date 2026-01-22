/**
 * Fuzzy search implementation for matching user input against questions
 * Uses Levenshtein-like distance scoring with word matching
 */

export interface PredefinedQA {
  id: string;
  question: string;
  answer: string;
}

export interface SearchResult {
  qa: PredefinedQA;
  score: number;
  source?: 'predefined' | 'learned';
}

/**
 * Calculate similarity score between two strings (0-1)
 * Uses a combination of:
 * - Substring matching (does input appear in question?)
 * - Word matching (how many words from input are in question?)
 * - Character-level fuzzy matching
 */
function calculateSimilarity(input: string, question: string): number {
  const inputLower = input.toLowerCase().trim();
  const questionLower = question.toLowerCase();

  // Exact match gets highest score
  if (questionLower === inputLower) {
    return 1;
  }

  // Check if input is contained as substring
  if (questionLower.includes(inputLower)) {
    return 0.9;
  }

  // Word-level matching
  const inputWords = inputLower.split(/\s+/).filter((w) => w.length > 0);
  const questionWords = questionLower.split(/\s+/);

  if (inputWords.length === 0) {
    return 0;
  }

  // Count matching words
  let matchingWords = 0;
  for (const inputWord of inputWords) {
    for (const questionWord of questionWords) {
      if (questionWord.includes(inputWord) || inputWord.includes(questionWord)) {
        matchingWords++;
        break;
      }
    }
  }

  const wordMatchScore = matchingWords / inputWords.length;

  // Character-level fuzzy matching (Levenshtein-based)
  const charScore = 1 - levenshteinDistance(inputLower, questionLower) / Math.max(inputLower.length, questionLower.length);

  // Combine scores with weights
  const combinedScore = wordMatchScore * 0.7 + charScore * 0.3;

  return Math.max(0, Math.min(1, combinedScore));
}

/**
 * Calculate Levenshtein distance between two strings
 */
function levenshteinDistance(str1: string, str2: string): number {
  const matrix: number[][] = [];

  for (let i = 0; i <= str2.length; i++) {
    matrix[i] = [i];
  }

  for (let j = 0; j <= str1.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= str2.length; i++) {
    for (let j = 1; j <= str1.length; j++) {
      if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }

  return matrix[str2.length][str1.length];
}

/**
 * Search through predefined QA pairs and return matching results
 * @param input - User's input text
 * @param qaList - List of Q&A pairs to search
 * @param threshold - Minimum similarity score (0-1) to include in results
 * @param maxResults - Maximum number of results to return
 * @param source - Source of the QA pairs (for tracking)
 */
export function fuzzySearch(
  input: string,
  qaList: PredefinedQA[],
  threshold: number = 0.4,
  maxResults: number = 3,
  source: 'predefined' | 'learned' = 'predefined'
): SearchResult[] {
  if (!input.trim()) {
    return [];
  }

  const results: SearchResult[] = qaList
    .map((qa) => ({
      qa,
      score: calculateSimilarity(input, qa.question),
      source,
    }))
    .filter((result) => result.score >= threshold)
    .sort((a, b) => b.score - a.score)
    .slice(0, maxResults);

  return results;
}

/**
 * Search through both predefined and learned questions
 */
export function fuzzySearchAll(
  input: string,
  predefinedList: PredefinedQA[],
  learnedList: PredefinedQA[],
  threshold: number = 0.4,
  maxResults: number = 3
): SearchResult[] {
  if (!input.trim()) {
    return [];
  }

  const predefinedResults = fuzzySearch(input, predefinedList, threshold, maxResults, 'predefined');
  const learnedResults = fuzzySearch(input, learnedList, threshold, maxResults, 'learned');

  // Combine and sort by score
  const combined = [...predefinedResults, ...learnedResults]
    .sort((a, b) => b.score - a.score)
    .slice(0, maxResults);

  return combined;
}

/**
 * Check if a question already exists with at least the given similarity threshold
 */
export function checkIfQuestionExists(
  question: string,
  qaList: PredefinedQA[],
  threshold: number = 0.7
): boolean {
  if (qaList.length === 0) {
    return false;
  }

  const maxScore = Math.max(
    ...qaList.map((qa) => calculateSimilarity(question, qa.question))
  );

  return maxScore >= threshold;
}
