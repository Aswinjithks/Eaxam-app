import React from 'react';
import styled from 'styled-components';

const OptionsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-top: 20px;
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

interface QuestionOptionsProps {
  type: string;
  options: string[];
  selectedAnswer: string;
  onAnswerChange: (answer: string) => void;
}

const QuestionOptions: React.FC<QuestionOptionsProps> = ({ type, options, selectedAnswer, onAnswerChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onAnswerChange(e.target.value);
  };

  return (
    <OptionsWrapper>
      {options.map((option, index) => (
        <OptionLabel key={index}>
          <Input
            type={type === 'multi-choice' ? 'radio' : 'checkbox'}
            name="option"
            value={option}
            checked={selectedAnswer === option}
            onChange={handleChange}
          />
          {option}
        </OptionLabel>
      ))}
    </OptionsWrapper>
  );
};

export default QuestionOptions;
