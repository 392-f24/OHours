  // SubmitQuestion.jsx
  import { useState } from 'react';
  import { getQueue, addQuestion, updateQuestion, deleteQuestion } from '../../firebase/studentSideFunctions';
  
  export default function SubmitQuestion({ initialData = null, onSubmit, onCancel }) {
    const [name, setName] = useState(initialData?.name || "");
    const [question, setQuestion] = useState(initialData?.question || "");
  
    const handleSubmit = (e) => {
      e.preventDefault();
      onSubmit(name, question);
    };
  
    return (
      <div className="h-full flex flex-col">
        <h2 className="text-xl font-semibold mb-4">
          {initialData ? 'Edit Your Question' : 'Submit Your Question'}
        </h2>
        <form onSubmit={handleSubmit} className="flex-1 flex flex-col space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Your Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border rounded-md"
              required
              disabled={initialData !== null}
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">Your Question:</label>
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="w-full h-[calc(100%-2rem)] p-2 border rounded-md resize-none"
              required
            />
          </div>
          <div className="flex space-x-4">
            {initialData && (
              <button 
                type="button" 
                onClick={onCancel}
                className="flex-1 bg-white border border-blue-500 text-blue-500 py-2 px-4 rounded">
                Cancel Edit
              </button>
            )}
            <button type="submit" className="flex-1 bg-blue-500 text-white py-2 px-4 rounded">
              {initialData ? 'Save Changes' : 'Submit Question'}
            </button>
          </div>
        </form>
      </div>
    );
  }
