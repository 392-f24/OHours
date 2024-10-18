import React, { useState } from "react";
import { Link } from "react-router-dom";
import { signInWithGoogle, useAuthState } from "../../firebase/firebaselogin";

const LoginForm = ({ profile }) => {
  const [user] = useAuthState();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async () => {
    setIsLoading(true);
    setError(null);
    try {
      signInWithGoogle();
    } catch (err) {
      setError("Failed to sign in. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = async () => {
    setIsLoading(true);
    setError(null);
    try {
      signOut();
    } catch (err) {
      setError("Failed to sign out. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (user) {
    return (
      <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
          Welcome, {user.displayName}!
        </h2>
        <p className="text-center mb-4">You are now logged in.</p>
        {isAdmin && (
          <p className="text-center mb-4 text-green-600">
            You have admin privileges.
          </p>
        )}
        <Link
          to="/pmLand"
          className="block w-full py-2 px-4 bg-blue-500 text-white text-center font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 mb-4"
        >
          Go to Peer Mentor Landing Page
        </Link>
        <button
          onClick={handleSignOut}
          disabled={isLoading}
          className={`w-full py-2 px-4 bg-red-500 text-white text-center font-semibold rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isLoading ? "Signing out..." : "Sign Out"}
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <div className="w-full flex justify-start mb-6">
        <Link to="/" className="text-blue-500 hover:text-blue-600">
          &larr; Back
        </Link>
      </div>
      <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
        Peer Mentor Login
      </h2>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      <button
        onClick={signInWithGoogle}
        disabled={isLoading}
        className={`w-full py-2 px-4 bg-white border border-gray-300 text-gray-700 font-semibold rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 flex items-center justify-center ${
          isLoading ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {isLoading ? (
          <span>Loading...</span>
        ) : (
          <>
            <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24">
              {/* SVG paths for Google icon */}
            </svg>
            Sign in with Google
          </>
        )}
      </button>
    </div>
  );
};

export default LoginForm;
