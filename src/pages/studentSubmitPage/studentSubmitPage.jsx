import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "../../components/back";

function StudentSubmitForm() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [question, setQuestion] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate submission delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // For demo purposes, we'll just log the submission
    console.log("Submitted:", { name, question });

    // temp nav linking to demo wait room
    navigate("/waitroom");
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 px-4">
      <div className="w-full flex justify-start mb-6">
        <BackButton />
      </div>
      <h2 className="text-2xl font-bold text-center mb-8">
        Submit Your Question
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-center mb-2">
            Your Name:
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label htmlFor="question" className="block text-center mb-2">
            Your Question:
          </label>
          <textarea
            id="question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="w-full p-2 border border-gray-200 rounded-lg shadow-sm h-40 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors disabled:bg-blue-300 text-lg font-medium"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit Question"}
        </button>
      </form>
    </div>
  );
}

export default StudentSubmitForm;
