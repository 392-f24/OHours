import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useProfile } from "../firebase/profile";
import LoginForm from "./loginForm/login_form";

const LandingPage = React.lazy(() => import("./landingPage/landingPage"));
const StudentPage = React.lazy(() =>
  import("./studentCodePage/studentCodePage")
);
const StaffPage = React.lazy(() => import("./staffLoginPage/staffLoginPage"));
const LoginPage = React.lazy(() => import("./loginForm/login_form"));
const StudentSubmitPage = React.lazy(() =>
  import("./studentSubmitPage/studentSubmitPage")
);
const PmQueue = React.lazy(() => import("./pmQueue/pmQueue"));
const PmLanding = React.lazy(() => import("./pmLanding/pmLanding"));
const PmCreateSess = React.lazy(() => import("./createSession/createSession"));

const FormQueueView = React.lazy(() => import("./formQueue/formQueueView"));

const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
  </div>
);

const NotFoundPage = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="text-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">404</h1>
      <p className="text-gray-600 mb-4">Page not found</p>
      <a href="/" className="text-blue-600 hover:text-blue-800 underline">
        Return to Home
      </a>
    </div>
  </div>
);

export default function App() {
  const [profile, profileLoading, profileError] = useProfile();
  if (profileError) return <h1>Error loading profile: {`${profileError}`}</h1>;
  if (!profile) return <h1>No profile data</h1>;

  return (
    <Router>
      <React.Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/student" element={<StudentPage />} />
          <Route path="/staff" element={<LoginForm profile={profile} />} />
          <Route path="/submit" element={<StudentSubmitPage />} />
          <Route path="/pmQ/:sessionID/:PMID" element={<PmQueue />} />
          <Route path="/pmLand" element={<PmLanding />} />
          <Route path="/pmCreateSess" element={<PmCreateSess />} />
          <Route path="/formqueue/:code" element={<FormQueueView />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </React.Suspense>
    </Router>
  );
}
