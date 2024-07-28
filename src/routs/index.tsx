import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Loader from '../components/Loader';

const HomePage = lazy(() => import('../pages/HomePage'));
const ExamPage = lazy(() => import('../pages/ExamPage'));

const AppRoutes: React.FC = () => {
    return (
        <Suspense fallback={<Loader />}>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/exam" element={<ExamPage />} />
            </Routes>
        </Suspense>
    );
};

export default AppRoutes;
