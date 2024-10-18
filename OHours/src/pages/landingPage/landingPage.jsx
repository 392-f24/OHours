import React from "react";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">OHours</h1>

      <div className="flex flex-col sm:flex-row gap-6 w-full max-w-2xl">
        <Link
          to="/staff"
          className="flex-1 h-40 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex items-center justify-center border-2 border-gray-200 hover:border-blue-500 group no-underline"
        >
          <span className="text-2xl font-semibold text-gray-700 group-hover:text-blue-600">
            Staff
          </span>
        </Link>

        <Link
          to="/student"
          className="flex-1 h-40 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex items-center justify-center border-2 border-gray-200 hover:border-blue-500 group no-underline"
        >
          <span className="text-2xl font-semibold text-gray-700 group-hover:text-blue-600">
            Student
          </span>
        </Link>
      </div>
    </div>
  );
}
