import React from "react";
import { Link } from "react-router-dom";
import { Users, User } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="w-[90%] h-[95vh] mx-auto my-[2.5vh] bg-gray-50 flex flex-col justify-between p-6 border border-gray-300">
      <div className="w-full bg-blue-100 rounded-lg p-10 sm:p-40 border border-gray-200">
        <h1 className="text-4xl sm:text-6xl font-bold mb-3 text-blue-900 text-left">
          Welcome to <span className="text-blue-600">OHours</span>
        </h1>
        <p className="text-xl sm:text-2xl text-blue-600 text-left">
          Office Hours scheduling made easy
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 w-full mt-4">
        <Link
          to="/PMLand"
          className="flex-1 h-64 py-8 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col items-center justify-center border border-gray-300 group no-underline"
        >
          <Users className="w-16 h-16 mb-4 text-gray-600" />
          <span className="text-2xl sm:text-4xl font-semibold text-gray-700">
            Staff
          </span>
        </Link>

        <Link
          to="/student"
          className="flex-1 h-64 py-8 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col items-center justify-center border border-gray-300 group no-underline"
        >
          <User className="w-16 h-16 mb-4 text-gray-600" />
          <span className="text-2xl sm:text-4xl font-semibold text-gray-700">
            Students
          </span>
        </Link>
      </div>

      <div className="text-sm text-gray-500 mt-4 text-center">
        {/* Created by Team Navy (Lian, Soham, Janna, Jonny, Terry) */}
      </div>
    </div>
  );
}
