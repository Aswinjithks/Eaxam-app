import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import QuestionTimer from './QuestionTimer';
import QuestionOptions from './QuestionOptions';
import { toast } from 'react-toastify';

const QuestionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  width: 90%;
  margin: 20px auto;
  @media (max-width: 768px) {
    padding: 15px;
  }
`;

const QuestionText = styled.h2`
  font-size: 1.5rem;
  margin: 20px 0;
  text-align: center;
  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const SubmitButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  color: #fff;
  background-color: #0072ff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 20px;

  &:hover {
    background-color: #005bb5;
  }
`;

const Error = styled.p`
  color: red;
  margin-top: 10px;
  height: 1em;
  font-size: 0.9rem;
`;

interface QuestionProps {
  question: {
    id: number;
    type: string;
    question: string;
    options: string[];
    subQuestions?: string[];
  };
  questionTime: number;
  //: (questionId: number, answer: string | string[] | { [key: string]: string }) => void;
  onAnswer: any;
  setCurrentQuestionIndex: React.Dispatch<React.SetStateAction<number>>;
  currentQuestionIndex: number;
  questionsLength: number;
  setShowResults: (showResults: boolean) => void;
}

const Question: React.FC<QuestionProps> = ({ question, questionTime, onAnswer, setCurrentQuestionIndex, currentQuestionIndex, setShowResults, questionsLength }) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | string[] | { [key: string]: string }>('');
  const [timeLeft, setTimeLeft] = useState(questionTime * 60);
  const [error, setError] = useState<null | string>(null);

  const handleAnswerChange = (answer: string | string[] | { [key: string]: string }) => {
    setSelectedAnswer(answer);
  };

  const handleSubmit = () => {
    setError(null);
    if (question.type === 'multi-choice' && !selectedAnswer) {
      return setError('Please select an answer');
    }
    if (question.type === 'optional' && (!Array.isArray(selectedAnswer) || selectedAnswer.length < 2)) {
      return setError('Please select 2 or more answers');
    }
    if (question.type === 'matrix' && Object.keys(selectedAnswer).length !== question.subQuestions?.length) {
      return setError('Please complete all matches');
    }
    onAnswer(question.id, selectedAnswer);
  };


  useEffect(() => {
    if (timeLeft === 0 && currentQuestionIndex === questionsLength - 1) {
      setShowResults(true);
      toast.warn('Exam finished');
    }
  }, [timeLeft, currentQuestionIndex, questionsLength]); 
  

  useEffect(() => {
    setSelectedAnswer(question.type === 'matrix' ? {} : '');
    setTimeLeft(questionTime * 60);
  }, [question]);

  return (
    <QuestionWrapper>
      <h5>Question {currentQuestionIndex + 1}</h5>
      <QuestionTimer setTimeLeft={setTimeLeft} timeLeft={timeLeft} setCurrentQuestionIndex={setCurrentQuestionIndex} />
      <QuestionText>{question.question}</QuestionText>
      <QuestionOptions
        type={question?.type}
        options={question?.options}
        subQuestions={question?.subQuestions}
        selectedAnswer={selectedAnswer}
        onAnswerChange={handleAnswerChange}
      />
      <SubmitButton onClick={handleSubmit}>Submit</SubmitButton>
      <Error>{error}</Error>
    </QuestionWrapper>
  );
};

export default Question;




