import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card } from '@components/Cards';
import { CardContent } from '@components/CardContent';
import SubmitQuestion from './submitQuestion';
import StudentETA from './studentETA';
import QueuePreview from './queuePreview';
import { getClassName, getQueue, addQuestion, updateQuestion, deleteQuestion } from '../../firebase/studentSideFunctions';

export default function FormQueueView() {
    const navigate = useNavigate();
    const { code } = useParams();

    const [isSubmitted, setIsSubmitted] = useState(false);
    const [newQuestionId, setNewQuestionId] = useState(null);
    const [newName, setNewName] = useState('');
    const [newQuestion, setNewQuestion] = useState('');
    const [originalQuestion, setOriginalQuestion] = useState('');
    const [queue, setQueue] = useState([]);
    const [className, setClassName] = useState('');
    const [peopleAhead, setPeopleAhead] = useState(null)
    queue.findIndex(item => item.id === newQuestionId)
    // keep live updates
    useEffect(() => {
        const intervalId = setInterval(() => {
            fetchQueue();
        }, 500)
        return () => clearInterval(intervalId)
    }, [peopleAhead, newQuestionId]);

    // function for updating the queue
    const fetchQueue = async () => {
        try {
            const fetchedQueue = await getQueue(code);
            const classname = await getClassName(code);
            setClassName(classname);
            setQueue(fetchedQueue);

            if (newQuestionId !== null) {
                const index = fetchedQueue.findIndex(item => item.id === newQuestionId);
                setPeopleAhead(index); // Update peopleAhead with the new index
            }
        } catch (error) {
            console.error('Error fetching questions:', error);
        }
    };

    // call on initial submit quesiton
    const handleAddQuestion = async (name, question) => {
        try {
            setNewQuestion(question);
            setNewName(name);
            setOriginalQuestion(question);
            const id = await addQuestion({'name': name, 'question': question}, code);
            setNewQuestionId(id);
            fetchQueue();
        } catch (error) {
            console.error('Error adding question:', error);
        }
        setIsSubmitted(true);
    };

    // call on save edit for question form
    const handleEditQuestion = async (question) => {
        setIsSubmitted(true);
        try {
            setNewQuestion(question);
            setOriginalQuestion(question);
            await updateQuestion(newQuestionId, {'name': newName, 'question': question}, code);
            fetchQueue();
        } catch (error) {
            console.error('Error updating question:', error);
        }
    };


    // call on leave queue -- remove question from db
    const handleLeaveQueue = async () => {
        if (window.confirm("Are you sure you want to leave the queue?")) {
            try {
                await deleteQuestion(newQuestionId.toString(), code);
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
                <div className="mb-2 sm:mb-6 border border-blue-500 rounded-md p-2 sm:p-5">
                    <div className="text-2xl text-blue-500 font-bold">{className} OH </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="sm:h-[calc(100vh-200px)]">
                        <CardContent className="sm:h-full p-4">
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
                            peopleAhead={peopleAhead}
                            estimatedTime={peopleAhead * 5}
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