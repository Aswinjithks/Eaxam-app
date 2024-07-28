import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const TimerWrapper = styled.div`
  font-size: 20px;
`;

interface QuestionTimerProps {
    setTimeLeft: React.Dispatch<React.SetStateAction<number>>;
    timeLeft: number;
    setCurrentQuestionIndex: React.Dispatch<React.SetStateAction<number>>;
}

const QuestionTimer: React.FC<QuestionTimerProps> = ({ setTimeLeft, timeLeft, setCurrentQuestionIndex }) => {

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev: number) => {
                if (prev > 0) return prev - 1;
                setCurrentQuestionIndex((prev: number) => prev + 1);
                return 0;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [setCurrentQuestionIndex]);

    const formatTime = (seconds: number) => {
        const min = Math.floor(seconds / 60);
        const sec = seconds % 60;
        return `${min}:${sec < 10 ? '0' : ''}${sec}`;
    };

    return <TimerWrapper>Question Time Left: {formatTime(timeLeft)}</TimerWrapper>;
};

export default QuestionTimer;
