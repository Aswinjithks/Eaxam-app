import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Loader from '@components/Loader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import styled from 'styled-components';

const HomePage = lazy(() => import('@pages/HomePage'));
const ExamPage = lazy(() => import('@pages/ExamPage'));

const StyledToastContainer = styled(ToastContainer)`
  width: auto;
  min-width: 300px;
  max-width: 90%;
  
  .Toastify__toast {
    body {
      color: #756f86;
    }
  }

  @media (max-width: 768px) {
    min-width: 250px;
  }
`;

const AppRoutes: React.FC = () => {
    return (
        <Suspense fallback={<Loader />}>
            <StyledToastContainer
                closeOnClick
                position="bottom-right"
            />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/exam" element={<ExamPage />} />
            </Routes>
        </Suspense>
    );
};

export default AppRoutes;

