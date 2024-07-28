import React, { useEffect, useState } from 'react';
import axios from '@utils/fakeAPI';
import ExamTimer from '@components/ExamTimer';
import Question from '@components/Question';
import Results from '@components/Results';
import { ExamData, Result } from '../types';
import { toast } from 'react-toastify';
import styled from 'styled-components';

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

const ExamPage: React.FC = () => {
    const [examData, setExamData] = useState<ExamData | null>(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<Result[]>([]);
    const [showResults, setShowResults] = useState(false);

    useEffect(() => {
        const fetchExamData = async () => {
            const response = await axios.get('/exam');
            setExamData(response.data);
        };
        fetchExamData();
    }, []);

    useEffect(() => {
        const handlePopState = (event: PopStateEvent) => {
            window.history.pushState(null, document.title, window.location.href);
            toast.warning('You cannot go back during the exam');
        };

        window.history.pushState(null, document.title, window.location.href);
        window.addEventListener('popstate', handlePopState);

        return () => {
            window.removeEventListener('popstate', handlePopState);
        };
    }, []);


    const handleAnswer = (questionId: number, answer: string | string[]) => {
        const question = examData?.questions.find((q) => q.id === questionId);
        console.log('question', question);

        if (examData && question) {
            const correctAnswer = question.type === 'multi-choice' ? question.answer : question.correctAnswers;
            console.log(correctAnswer);

            setAnswers((prev) => [
                ...prev,
                {
                    questionId,
                    userAnswer: answer,
                    correctAnswer: correctAnswer || '',
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
                {!showResults && <ExamTimer duration={examData.examTime} setShowResults={setShowResults} />}
                {showResults ? (
                    <Results answers={answers} numberOfQuestions={examData.questions.length} />
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









