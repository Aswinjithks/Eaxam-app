import React from 'react';
import styled from 'styled-components';
import MatrixTable from './MatrixTable';
const OptionsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-top: 20px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const OptionLabel = styled.label`
  display: flex;
  align-items: center;
  padding: 10px;
  background: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: #eee;
  }
`;

const Input = styled.input`
  margin-right: 10px;
`;

interface MatrixAnswer {
  [key: string]: string;
}

interface QuestionOptionsProps {
  type: string;
  options: string[];
  subQuestions?: string[];
  selectedAnswer: string | string[] | MatrixAnswer;
  onAnswerChange: (answer: string | string[] | MatrixAnswer) => void;
}

const QuestionOptions: React.FC<QuestionOptionsProps> = ({
  type,
  options,
  subQuestions = [],
  selectedAnswer,
  onAnswerChange,
}) => {
  if (type === 'matrix') {
    return (
      <MatrixTable
        options={options}
        subQuestions={subQuestions}
        selectedAnswer={selectedAnswer as MatrixAnswer}
        onAnswerChange={onAnswerChange}
      />
    );
  }

  return (
    <OptionsWrapper>
      {options.map((option, index) => (
        <OptionLabel key={index}>
          <Input
            type={type === 'multi-choice' ? 'radio' : 'checkbox'}
            name="options"
            value={option}
            checked={
              type === 'multi-choice'
                ? selectedAnswer === option
                : Array.isArray(selectedAnswer) && selectedAnswer.includes(option)
            }
            onChange={(e) => {
              const value = e.target.value;
              if (type === 'multi-choice') {
                onAnswerChange(value);
              } else if (type === 'optional') {
                let newSelectedAnswers: string[];
                if (Array.isArray(selectedAnswer)) {
                  if (selectedAnswer.includes(value)) {
                    newSelectedAnswers = selectedAnswer.filter((answer) => answer !== value);
                  } else {
                    newSelectedAnswers = [...selectedAnswer, value];
                  }
                } else {
                  newSelectedAnswers = [value];
                }
                onAnswerChange(newSelectedAnswers);
              }
            }}
          />
          {option}
        </OptionLabel>
      ))}
    </OptionsWrapper>
  );
};

export default QuestionOptions;



