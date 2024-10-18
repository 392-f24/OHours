import { useState, useEffect } from 'react';

export default function SubmitQuestion({initialData, onSubmit, onEdit, setIsSubmitted, NewName, NewQuestion, setNewName}) {
    const [localQuestion, setLocalQuestion] = useState(NewQuestion);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(NewName, localQuestion);
    };

    const handleEdit = (e) => {
        e.preventDefault();
        onEdit(localQuestion);
    };

    const handleCancel = () => {
        setLocalQuestion(initialData.newQuestion);
        setIsSubmitted(true);
    };

    return (
        <div className="h-full flex flex-col">
            <h2 className="text-xl font-semibold mb-4">
                {initialData ? 'Edit Your Question' : 'Submit Your Question'}
            </h2>
            <form onSubmit={initialData ? handleEdit : handleSubmit} className="flex-1 flex flex-col space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1">Your Name:</label>
                    <input
                        type="text"
                        value={NewName}
                        onChange={(e) => setNewName(e.target.value)}
                        className="w-full p-2 border rounded-md"
                        required
                        disabled={initialData !== null}
                    />
                </div>
                <div className="flex-1">
                    <label className="block text-sm font-medium mb-1">Your Question:</label>
                    <textarea
                        value={localQuestion}
                        onChange={(e) => setLocalQuestion(e.target.value)}
                        className="w-full h-[calc(100%-2rem)] p-2 border rounded-md resize-none"
                        required
                    />
                </div>
                <div className="flex space-x-4">
                    {initialData && (
                        <button 
                            type="button" 
                            onClick={handleCancel}
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