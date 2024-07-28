import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import styled from 'styled-components';

const TimerWrapper = styled.div`
  font-size: 20px;
  @media (max-width: 768px) {
    background-color: white;
    border-radius: 10px;
    background: rgba(255, 255, 255, 0.9);
  }
`;

interface ExamTimerProps {
  duration: number;
  setShowResults: (showResults: boolean) => void;
}

const ExamTimer: React.FC<ExamTimerProps> = ({ duration, setShowResults }) => {
  const [timeLeft, setTimeLeft] = useState(duration * 60);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev > 0) {
          return prev - 1;
        } else {
          clearInterval(timer);
          setShowResults(true);
          toast.error('Time is up!');
          return 0;
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [setShowResults]);

  const formatTime = (seconds: number) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
  };

  return <TimerWrapper>Time Left: {formatTime(timeLeft)}</TimerWrapper>;
};

export default ExamTimer;

