
import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = "AIzaSyD0j-gp-B9_QH9HUD3IXtxZWSMZr7WVLr8";

const genAI = new GoogleGenerativeAI(API_KEY);

interface CertificationQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export const generateCertificationQuestions = async (
  topic: string,
  difficultyLevel: 'beginner' | 'intermediate' | 'advanced',
  numberOfQuestions: number = 10
): Promise<CertificationQuestion[]> => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `
      Generate ${numberOfQuestions} multiple-choice questions for a ${difficultyLevel} level certification exam on "${topic}". 
      
      For each question:
      1. Provide a clear and concise question
      2. Provide 4 possible answers (labeled A, B, C, D)
      3. Indicate which answer is correct (0 for A, 1 for B, 2 for C, 3 for D)
      4. Provide a brief explanation of why the answer is correct
      
      The questions should test practical knowledge and critical thinking, not just memorization.
      
      Format your response as a JSON array with objects having the following structure:
      {
        "question": "Question text here",
        "options": ["Option A", "Option B", "Option C", "Option D"],
        "correctAnswer": 0,
        "explanation": "Explanation here"
      }
      
      ONLY return the JSON. Do not include any additional text, explanations, or formatting.
    `;

    const result = await model.generateContent(prompt);
    const response = result.response.text();
    
    // Extract the JSON part from the response
    const jsonMatch = response.match(/\[.*\]/s);
    if (!jsonMatch) {
      throw new Error("Failed to parse questions from AI response");
    }
    
    const jsonString = jsonMatch[0];
    const questions = JSON.parse(jsonString) as CertificationQuestion[];
    
    return questions;
  } catch (error) {
    console.error("Error generating certification questions:", error);
    throw error;
  }
};

export const analyzeCertificationResults = async (
  topic: string,
  questions: CertificationQuestion[],
  userAnswers: number[],
  timeSpent: number // in seconds
): Promise<{
  score: number;
  percentage: number;
  feedback: string;
  strengths: string[];
  weaknesses: string[];
  nextSteps: string[];
  certificateEligible: boolean;
}> => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
    // Calculate score
    let correctCount = 0;
    const incorrectQuestions: { question: string; userAnswer: string; correctAnswer: string; explanation: string }[] = [];
    
    questions.forEach((q, i) => {
      if (userAnswers[i] === q.correctAnswer) {
        correctCount++;
      } else {
        incorrectQuestions.push({
          question: q.question,
          userAnswer: q.options[userAnswers[i]],
          correctAnswer: q.options[q.correctAnswer],
          explanation: q.explanation
        });
      }
    });
    
    const score = correctCount;
    const percentage = Math.round((correctCount / questions.length) * 100);
    const certificateEligible = percentage >= 70; // Pass threshold
    
    // Format incorrect questions for analysis
    const incorrectQuestionsText = incorrectQuestions.map((q, i) => 
      `Question ${i+1}: "${q.question}"\n- Your answer: "${q.userAnswer}"\n- Correct answer: "${q.correctAnswer}"\n- Explanation: ${q.explanation}`
    ).join('\n\n');
    
    const prompt = `
      Analyze the following certification test results for a ${topic} exam:
      
      Total questions: ${questions.length}
      Correct answers: ${correctCount}
      Score percentage: ${percentage}%
      Time spent: ${Math.floor(timeSpent / 60)} minutes ${timeSpent % 60} seconds
      ${incorrectQuestions.length > 0 ? `\nIncorrect answers:\n${incorrectQuestionsText}` : 'All answers were correct.'}
      
      Based on this data, provide:
      1. A personalized paragraph of feedback on the performance
      2. 2-3 strengths demonstrated in the exam
      3. 2-3 areas for improvement based on the incorrect answers (if any)
      4. 3 specific next steps or resources to improve in the weak areas
      
      Format your response as a JSON object with the following structure:
      {
        "feedback": "Detailed feedback paragraph here",
        "strengths": ["Strength 1", "Strength 2", ...],
        "weaknesses": ["Weakness 1", "Weakness 2", ...],
        "nextSteps": ["Next step 1", "Next step 2", "Next step 3"]
      }
      
      ONLY return the JSON. Do not include any additional text, explanations, or formatting.
    `;
    
    const result = await model.generateContent(prompt);
    const response = result.response.text();
    
    // Extract the JSON part from the response
    const jsonMatch = response.match(/\{.*\}/s);
    if (!jsonMatch) {
      throw new Error("Failed to parse analysis from AI response");
    }
    
    const jsonString = jsonMatch[0];
    const analysis = JSON.parse(jsonString);
    
    return {
      score,
      percentage,
      feedback: analysis.feedback,
      strengths: analysis.strengths,
      weaknesses: analysis.weaknesses || [],
      nextSteps: analysis.nextSteps,
      certificateEligible
    };
  } catch (error) {
    console.error("Error analyzing certification results:", error);
    throw error;
  }
};
