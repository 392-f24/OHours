import React, { useState } from "react";
import { Button } from "@components/Button";
import { Input } from "@components/Input";
import BackButton from "@components/back";
import { createNewSession } from "../../firebase/pmSideFunctions";

export default function CreateSession() {
  const [courseName, setCourseName] = useState("");
  const [sessionID, setSessionID] = useState("");
  const [studentCode, setStudentCode] = useState("");

  const generateRandomCode = () => {
    return Math.floor(1000 + Math.random() * 9000).toString();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Generate SessionID and StudentCode
    const newSessionID = generateRandomCode();
    const newStudentCode = generateRandomCode();

    setSessionID(newSessionID);
    setStudentCode(newStudentCode);

    // You can handle other processes here, like saving the session to a database, etc.
    try {
      await createNewSession(newSessionID, newStudentCode, courseName);

      console.log("Session successfully created!");
    } catch (error) {
      console.error("Error creating session: ", error);
    }
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center space-y-6 bg-gray-100">
      {/* Back Button */}
      <div className="w-full flex justify-start mb-6">
        <BackButton />
      </div>

      {/* Form for Creating Session */}
      <form
        onSubmit={handleSubmit}
        className="w-80 bg-white p-6 rounded-lg shadow-md space-y-4"
      >
        {/* Course Name Input */}
        <div>
          <label
            htmlFor="courseName"
            className="block text-sm font-medium text-gray-700"
          >
            Course Name
          </label>
          <Input
            type="text"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            placeholder="Enter course name"
            required
            className="w-full mt-1 px-3 py-2 border border-gray-300 rounded"
          />
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
        >
          Create Session
        </Button>
      </form>

      {/* Display Generated Codes */}
      {sessionID && studentCode && (
        <div className="text-center space-y-2 bg-green-50 p-4 rounded-lg shadow-md">
          <p className="text-lg font-semibold text-green-700">
            Session Created!
          </p>
          <p>
            Session ID: <span className="font-bold">{sessionID}</span>
          </p>
          <p>
            Student Code: <span className="font-bold">{studentCode}</span>
          </p>
        </div>
      )}
    </div>
  );
}