import React, { useState } from "react";
import { Link } from "react-router-dom";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (username.length < 3 || password.length < 6) {
      setError(
        "Username must be at least 3 characters and password at least 6 characters long."
      );
    } else {
      console.log("Login attempt", { username, password });
      // In a real application, you would typically make an API call here
      // and only set isSubmitted to true upon successful login
      setIsSubmitted(true);
    }
  };

  if (isSubmitted) {
    return (
      <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
          Login Successful
        </h2>
        <p className="text-center mb-4">You have successfully logged in.</p>
        <Link
          to="/pmLand"
          className="block w-full py-2 px-4 bg-blue-500 text-white text-center font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Go to Peer Mentor Landing Page
        </Link>
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
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            required
          />
        </div>
        {error && <div className="text-red-500 text-sm">{error}</div>}
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Log In
        </button>
      </form>
      <div className="mt-4 text-center">
        <Link
          to="/forgot-password"
          className="text-blue-500 hover:text-blue-600"
        >
          Forgot Password?
        </Link>
      </div>
      <div className="mt-2 text-center">
        <Link to="/register" className="text-blue-500 hover:text-blue-600">
          Don't have an account? Register here
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;
