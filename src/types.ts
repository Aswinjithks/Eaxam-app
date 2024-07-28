// src/types.ts

export interface Question {
    id: number;
    type: 'multi-choice' | 'optional';
    question: string;
    options: string[];
    answer?: string;
    correctAnswers?: string[];
}

export interface ExamData {
    examTime: number;
    questionTime: number;
    questions: Question[];
    mode: string;
}

export interface Result {
    questionId: number;
    userAnswer: string | string[];
    correctAnswer: string | string[];
}
