import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@components/Cards';
import { CardContent } from '@components/CardContent';
import SubmitQuestion from './submitQuestion';
import StudentETA from './studentETA';
import QueuePreview from './queuePreview';
import { getQueue, addQuestion, updateQuestion, deleteQuestion } from '../../firebase/studentSideFunctions';

export default function FormQueueView() {
    const navigate = useNavigate();
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [newQuestionId, setNewQuestionId] = useState(null);
    const [newName, setNewName] = useState('');
    const [newQuestion, setNewQuestion] = useState('');
    const [originalQuestion, setOriginalQuestion] = useState('');
    const [queue, setQueue] = useState([]);
    
    const roomNumber = "CS 392";

    useEffect(() => {
        const intervalId = setInterval(() => {
            fetchQueue();
        }, 500)
        return () => clearInterval(intervalId)
    }, []);

    const fetchQueue = async () => {
        try {
            const fetchedQueue = await getQueue();
            setQueue(fetchedQueue);
        } catch (error) {
            console.error('Error fetching questions:', error);
        }
    };

    const handleAddQuestion = async (name, question) => {
        try {
            setNewQuestion(question);
            setNewName(name);
            setOriginalQuestion(question);
            const id = await addQuestion({'name': name, 'question': question});
            setNewQuestionId(id);
            fetchQueue();
        } catch (error) {
            console.error('Error adding question:', error);
        }
        setIsSubmitted(true);
    };

    const handleEditQuestion = async (question) => {
        console.log('editing question');
        setIsSubmitted(true);
        try {
            setNewQuestion(question);
            setOriginalQuestion(question);
            await updateQuestion(newQuestionId, {'question': question});
            fetchQueue();
        } catch (error) {
            console.error('Error updating question:', error);
        }
    };

    const handleLeaveQueue = async () => {
        if (window.confirm("Are you sure you want to leave the queue?")) {
            try {
                await deleteQuestion(newQuestionId.toString());
                fetchQueue();
            } catch (error) {
                console.error('Error deleting question:', error);
            }
            navigate('/');
        }
    };
    

    return (
        <div className="min-h-screen p-4">
            <div className="max-w-6xl mx-auto">
                <div className="mb-6 border border-blue-500 rounded-md p-5">
                    <div className="text-2xl text-blue-500 font-bold">Jackie's {roomNumber} OH</div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="h-[calc(100vh-200px)]">
                        <CardContent className="h-full p-4">
                        {!isSubmitted ? (
                            <SubmitQuestion
                            initialData={newQuestionId ? {newQuestion: originalQuestion} : null}
                            onSubmit={handleAddQuestion}
                            onEdit={handleEditQuestion}
                            setIsSubmitted={setIsSubmitted}
                            NewName={newName}
                            NewQuestion={newQuestion}
                            setNewName={setNewName}
                            setNewQuestion={setNewQuestion}
                            />
                        ) : (
                            <StudentETA 
                            peopleAhead={(queue.length - 1)}
                            estimatedTime={(queue.length - 1) * 5}
                            onEdit={() => setIsSubmitted(false)}
                            onLeave={handleLeaveQueue}
                            />
                        )}
                        </CardContent>
                    </Card>
                    <QueuePreview
                        queueItems={queue}
                        userQueueItemId={newQuestionId}
                        newName={newName}
                    />
                </div>
            </div>
        </div>
    );
}