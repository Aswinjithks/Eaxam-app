import React from 'react';
import styled from 'styled-components';

const MatrixTableWrapper = styled.div`
  overflow-x: auto;
  max-width: 100%;
  margin-top: 20px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const MatrixHeader = styled.th`
  padding: 10px;
  border: 1px solid #ddd;
  background: #f9f9f9;
  text-align: center;
`;

const MatrixCell = styled.td`
  padding: 10px;
  border: 1px solid #ddd;
  text-align: center;
`;

interface MatrixTableProps {
  options: string[];
  subQuestions: string[];
  selectedAnswer: { [key: string]: string };
  onAnswerChange: (answer: { [key: string]: string }) => void;
}

const MatrixTable: React.FC<MatrixTableProps> = ({ options, subQuestions, selectedAnswer, onAnswerChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    onAnswerChange({
      ...(selectedAnswer),
      [name]: value,
    });
  };

  return (
    <MatrixTableWrapper>
      <Table>
        <thead>
          <tr>
            <MatrixHeader></MatrixHeader>
            {options.map((option, index) => (
              <MatrixHeader key={index}>{option}</MatrixHeader>
            ))}
          </tr>
        </thead>
        <tbody>
          {subQuestions.map((subQuestion, subIndex) => (
            <tr key={subIndex}>
              <MatrixCell>{subQuestion}</MatrixCell>
              {options.map((option, optIndex) => (
                <MatrixCell key={optIndex}>
                  <input
                    type="radio"
                    name={subQuestion}
                    value={option}
                    checked={selectedAnswer[subQuestion] === option}
                    onChange={handleChange}
                  />
                </MatrixCell>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </MatrixTableWrapper>
  );
};

export default MatrixTable;
