import React from 'react';
import styled from 'styled-components';

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

const MatrixWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-top: 20px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const MatrixRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  align-items: center;
`;

interface QuestionOptionsProps {
  type: string;
  options: string[];
  subQuestions?: string[];
  selectedAnswer: string | string[] | { [key: string]: string };
  onAnswerChange: (answer: string | string[] | { [key: string]: string }) => void;
}

const QuestionOptions: React.FC<QuestionOptionsProps> = ({
  type,
  options,
  subQuestions = [],
  selectedAnswer,
  onAnswerChange,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
    } else if (type === 'matrix') {
      const { name } = e.target;
      if (typeof selectedAnswer === 'object' && !Array.isArray(selectedAnswer)) {
        onAnswerChange({
          ...selectedAnswer,
          [name]: value,
        });
      } else {
        onAnswerChange({ [name]: value });
      }
    }
  };

  if (type === 'matrix') {
    return (
      <MatrixWrapper>
        {subQuestions.map((subQuestion, subIndex) => (
          <MatrixRow key={subIndex}>
            <span>{subQuestion}</span>
            <select
              name={subQuestion}
              value={(selectedAnswer as { [key: string]: string })[subQuestion] || ''}
              onChange={handleChange}
            >
              <option value="" disabled>Select an option</option>
              {options.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </MatrixRow>
        ))}
      </MatrixWrapper>
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
            onChange={handleChange}
          />
          {option}
        </OptionLabel>
      ))}
    </OptionsWrapper>
  );
};

export default QuestionOptions;



