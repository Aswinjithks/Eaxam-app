import React from 'react';
import styled from 'styled-components';

const ResultsWrapper = styled.div`
  margin: 20px;
`;

interface Result {
    questionId: number;
    userAnswer: string;
    correctAnswer: string;
}

interface ResultsProps {
    answers: Result[];
}

interface Answer {
    questionId: number;
    userAnswer: string;
    correctAnswer: string;
}

const Results: React.FC<ResultsProps> = ({ answers }) => {


    const countCorrectAnswers = (answers: Answer[]): number => {
        return answers.reduce((count, answer) => {
            if (answer.userAnswer === answer.correctAnswer) {
                return count + 1;
            }
            return count;
        }, 0);
    };

    console.log(answers);

    return (
        <ResultsWrapper>
            <h1>Result</h1>
            <h2>Your Score : {countCorrectAnswers(answers)}</h2>
            {answers.map((answer, index) => (
                <div key={index}>
                    <h3>Question {index + 1}</h3>
                    <p>Your Answer: {answer.userAnswer}</p>
                    <p>Correct Answer: {answer.correctAnswer}</p>
                </div>
            ))}
        </ResultsWrapper>
    );
};

export default Results;
