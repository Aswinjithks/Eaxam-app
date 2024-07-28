import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const HomeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #6a11cb, #2575fc);
  text-align: center;
  padding: 0 20px;
  color: #fff;
  overflow: hidden;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const StartButton = styled.button`
  padding: 15px 30px;
  font-size: 18px;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.3);
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

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/exam');
  };

  return (
    <HomeWrapper>
      <Title>Welcome to the Exam</Title>
      <StartButton onClick={handleStart}>Start Exam</StartButton>
    </HomeWrapper>
  );
};

export default HomePage;




