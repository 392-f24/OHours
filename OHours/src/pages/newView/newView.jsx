import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@components/Cards';
import { CardContent } from '@components/CardContent';
import SubmitQuestion  from './submitQuestion';
import StudentETA from './studentETA';
import QueuePreview from './queuePreview';
import { getQueue, addQuestion, updateQuestion, deleteQuestion } from '../../firebase/studentSideFunctions';

export default function NewView() {
    const navigate = useNavigate();
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [peopleAhead, setpeopleAhead] = useState(0)
    // new question states
    const [newQuestionId, setNewQuestionId] = useState(null)
    const [newQuestion, setNewQuestion] = useState({ name: '', question: '' });
    // editting states for saving 
    const [editedQuestion, setEditedQuestion] = useState('');
    const [queue, setQueue] = useState([]);
    // const [estimatedTime, setEstimatedTime] = useState(0);
    const roomNumber = "CS 392"; // replace with prop for this function, passed from enter code page

    // continously update queue
    useEffect(() => {
        fetchQueue();
    }, []);

    // get questions to display
    const fetchQueue = async () => {
        try {
          const fetchedQueue = await getQueue();
          setQueue(fetchedQueue);
          if (newQuestionId != null){
            setpeopleAhead(fetchQueue.length - 1)
          } else {
            setpeopleAhead(fetchQueue.length)
          }
          
        } catch (error) {
          console.error('Error fetching questions:', error);
        }
      };

    // call on submit question click
    const handleAddQuestion = async (name, question) => {
        try {
            setNewQuestion({ name: name, question: question })
            setNewQuestionId(await addQuestion(newQuestion));
            fetchQueue();
        } catch (error) {
            console.error('Error adding question:', error);
        }
        setIsSubmitted(true)
      };

      // call on save question edits
    const handleEditQuestion = async (e) => {
        e.preventDefault();
        setIsSubmitted(false);
        try {
            setNewQuestion({ name: newQuestion.name, question: editedQuestion });
            await updateQuestion(newQuestionId, newQuestion);
            fetchQuestions();

        } catch (error) {
            console.error('Error updating question:', error);
        }
      };

    // called on leave queue
    const handleLeaveQueue = async () => { // TODO DELETE to db 
        if (window.confirm("Are you sure you want to leave the queue?")) {
            try {
                await deleteQuestion(newQuestionId.toString());
                fetchQuestions();
              } catch (error) {
                console.error('Error deleting question:', error);
              }
 
        navigate('/');
        }
    };

    


    return (
        <div className="min-h-screen p-4">
        <div className="max-w-6xl mx-auto">
            {/* header */}
            <div className="mb-6 border border-blue-500 rounded-md p-5">
                <div className="text-2xl text-blue-500 font-bold">Jackie's {roomNumber} OH</div>
            </div>
            {/* main content */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* question form + eta display */}
                <Card className="h-[calc(100vh-200px)]">
                    <CardContent className="h-full p-4">
                    {!isSubmitted ? (
                        <SubmitQuestion
                        initialData={newQuestionId ? {newQuestion} : null}
                        onSubmit={handleAddQuestion}
                        onCancel={() => setIsSubmitted(true)}
                        />
                    ) : (
                        <StudentETA 
                        peopleAhead={peopleAhead}
                        estimatedTime={peopleAhead * 5}
                        onEdit={() => handleEditQuestion}
                        onLeave={handleLeaveQueue}
                        />
                    )}
                    </CardContent>
                </Card>
                {/* live queue preview */}
                <QueuePreview
                    queueItems={queue}
                    userQueueItemId={newQuestionId}
                />
            </div>
        </div>
        </div>
    );
    }