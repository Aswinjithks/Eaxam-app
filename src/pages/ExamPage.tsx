import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from '../utils/fakeAPI';
import ExamTimer from '../components/ExamTimer';
import Question from '../components/Question';
import Results from '../components/Results';
import { capitalizeFirstLetter } from '../utils/functions';

const ExamWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
  background: linear-gradient(135deg, #00c6ff, #0072ff);
  text-align: center;
`;

const ContentWrapper = styled.div`
  width: 100%;
  max-width: 800px;
  height: 100%;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin: 10px;
    @media (max-width: 600px) {
    background: none;
  }
`;



const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #00c6ff, #0072ff);
  font-size: 1.5rem;
  color: #fff;
`;

interface Question {
    id: number;
    type: string;
    question: string;
    options: string[];
    answer: string;
}

interface ExamData {
    examTime: number;
    questionTime: number;
    questions: Question[];
    mode: string;
}

interface Answer {
    questionId: number;
    userAnswer: string;
    correctAnswer: string;
}

const ExamPage: React.FC = () => {
    const [examData, setExamData] = useState<ExamData | null>(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<Answer[]>([]);
    const [showResults, setShowResults] = useState(false);

    useEffect(() => {
        const fetchExamData = async () => {
            const response = await axios.get('/exam');
            setExamData(response.data);
        };
        fetchExamData();
    }, []);

    const handleAnswer = (questionId: number, answer: string) => {
        const question = examData?.questions.find((q) => q.id === questionId);
        if (examData && question) {
            setAnswers((prev) => [
                ...prev,
                {
                    questionId,
                    userAnswer: answer,
                    correctAnswer: question.answer,
                },
            ]);

            if (currentQuestionIndex < examData.questions.length - 1) {
                setCurrentQuestionIndex((prev) => prev + 1);
            } else {
                setShowResults(true);
            }
        }
    };

    if (!examData) {
        return <LoadingWrapper>Loading...</LoadingWrapper>;
    }

    return (
        <ExamWrapper>
            <ContentWrapper>
                <h4>Mode:{capitalizeFirstLetter(examData.mode)}</h4>
                {!showResults && <ExamTimer duration={examData.examTime} />}
                {showResults ? (
                    <Results answers={answers} />
                ) : (
                    <Question
                        question={examData.questions[currentQuestionIndex]}
                        questionTime={examData.questionTime}
                        onAnswer={handleAnswer}
                        setCurrentQuestionIndex={setCurrentQuestionIndex}
                    />
                )}
            </ContentWrapper>
        </ExamWrapper>
    );
};

export default ExamPage;


