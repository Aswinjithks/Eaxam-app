import React from 'react';
import styled from 'styled-components';
import { Result } from '../types';
import { useNavigate } from 'react-router-dom';



interface ResultProps {
    answers: Result[];
    numberOfQuestions: number;

}



const ResultsWrapper = styled.div`
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
`;

const ResultItem = styled.div`
  margin: 10px 0;
  padding: 10px;
  background: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 5px;
  width: 100%;
`;

const CorrectAnswer = styled.span`
  color: green;
`;

const IncorrectAnswer = styled.span`
  color: red;
`;

const StartButton = styled.button`
  padding: 10px 20px;
  font-size: 14px;
  color: #fff;
  background-color: darkblue;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: rgba(0, 0, 0, 0.5);
  }

  @media (max-width: 768px) {
    padding: 10px 20px;
    font-size: 16px;
  }
`;

const Results: React.FC<ResultProps> = ({ answers, numberOfQuestions }) => {

    const navigate = useNavigate();

    const correctAnswersCount = answers.filter((answer) => {
        if (Array.isArray(answer.userAnswer)) {
            return answer.userAnswer.sort().toString() === (answer.correctAnswer as string[]).sort().toString();
        }
        return answer.userAnswer === answer.correctAnswer;
    }).length;

    const compareAnswers = (userAnswer: string | string[], correctAnswer: string | string[]) => {
        if (Array.isArray(userAnswer) && Array.isArray(correctAnswer)) {
            return userAnswer.sort().toString() === correctAnswer.sort().toString();
        }
        return userAnswer === correctAnswer;
    };


    return (
        <ResultsWrapper>
            <h2>Results</h2>
            <p>You have answered {answers.length} out of {numberOfQuestions} questions.</p>
            <p>You'r score is {correctAnswersCount}</p>

            {answers.map((answer, index) => (
                <ResultItem key={index}>
                    <p>Question {answer.questionId}</p>
                    <p>
                        Your Answer: {Array.isArray(answer.userAnswer) ? answer.userAnswer.join(', ') : answer.userAnswer} <br />
                        Correct Answer: {Array.isArray(answer.correctAnswer) ? (answer.correctAnswer as string[]).join(', ') : answer.correctAnswer}
                    </p>
                    <p>
                        {compareAnswers(answer.userAnswer, answer.correctAnswer)
                            ? <CorrectAnswer>Correct</CorrectAnswer>
                            : <IncorrectAnswer>Incorrect</IncorrectAnswer>}
                    </p>
                </ResultItem>
            ))}
            <StartButton onClick={() => navigate('/')}>Back to Home</StartButton>
        </ResultsWrapper>
    );
};

export default Results;




