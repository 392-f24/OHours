import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Using React.lazy for code splitting
const LandingPage = React.lazy(() => import('./landingPage/landingPage'));
const StudentPage = React.lazy(() => import('./studentCodePage/studentCodePage'));
const StaffPage = React.lazy(() => import('./staffLoginPage/staffLoginPage'));

// Loading spinner component
const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
  </div>
);

// Error page component
const NotFoundPage = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="text-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">404</h1>
      <p className="text-gray-600 mb-4">Page not found</p>
      <a 
        href="/" 
        className="text-blue-600 hover:text-blue-800 underline"
      >
        Return to Home
      </a>
    </div>
  </div>
);

export default function App() {
  return (
    <Router>
      <React.Suspense fallback={<LoadingSpinner />}>
        <Routes> 
          <Route path="/" element={<LandingPage />} />
           
          <Route path="/student" element={<StudentPage />} />
           
          <Route path="/staff" element={<StaffPage />} />
           
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </React.Suspense>
    </Router>
  );
}