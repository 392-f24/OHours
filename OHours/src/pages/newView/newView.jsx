import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@components/Cards';
import { CardContent } from '@components/CardContent';
import SubmitQuestion  from './submitQuestion';
import StudentETA from './studentETA';
import QueuePreview from './queuePreview';

const mockQueueData = [ 
  { 
    id: 1, 
    studentName: "John Doe",
    priorityNumber: "1",
    description: "Question about assignment 3"
  },
  { 
    id: 2, 
    studentName: "Jane Smith",
    priorityNumber: "2",
    description: "Needs help with coding problem"
  },
  { 
    id: 3, 
    studentName: "Bob Johnson",
    priorityNumber: "3",
    description: "Discussion about project proposal"
  }
];

export default function NewView() {
    const navigate = useNavigate();
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [queueItems, setQueueItems] = useState([]);
    const [peopleAhead, setPeopleAhead] = useState(0);
    const [estimatedTime, setEstimatedTime] = useState(0);
    const [userQueueItemId, setUserQueueItemId] = useState(null);
    const roomNumber = "CS 392"; // replace with prop for this function, passed from enter code page

    // set initial state
    useEffect(() => {
        setQueueItems(mockQueueData);
    }, []);

    // update data 
    useEffect(() => {
        // update positions if user submitted
        if (isSubmitted && userQueueItemId !== null) {
            const updatePositions = () => { // TODO replace with fetch from firestore
                const userIndex = queueItems.findIndex(item => item.id === userQueueItemId);
                if (userIndex !== -1) {
                setPeopleAhead(userIndex);
                setEstimatedTime(userIndex * 5);
                }
            };
            updatePositions();

            // update positions in queue every 5s 
            const intervalId = setInterval(() => { 
                setQueueItems(prev => { // TODO replcae with fetch from firestore
                    if (prev.length <= 1) return prev;
                    const [, ...rest] = prev;
                    return rest.map((item, index) => ({
                        ...item,
                        priorityNumber: (index + 1).toString()
                    }));
                });
                updatePositions();
            }, 5000);

            return () => clearInterval(intervalId);
        }
    }, [isSubmitted, userQueueItemId, queueItems]);


    // call on submit click
    const handleSubmitQuestion = ({ name, question }) => {  // TODO PUT to db 
        if (userQueueItemId !== null) { // check if this is initial submit, update existing if not
        setQueueItems(prev => prev.map(item => 
            item.id === userQueueItemId 
            ? { ...item, description: question }
            : item
        ));
        } else { // create new item in db 
        const newId = Math.max(...queueItems.map(item => item.id), 0) + 1;
        const newQueueItem = {
            id: newId,
            studentName: name,
            priorityNumber: (queueItems.length + 1).toString(),
            description: question
        };
        setQueueItems(prev => [...prev, newQueueItem]);
        setUserQueueItemId(newId);
        }

        setIsSubmitted(true);
    };


    // called on leave queue
    const handleLeaveQueue = () => { // TODO DELETE to db 
        if (window.confirm("Are you sure you want to leave the queue?")) {
        setQueueItems(prev => {
            const filtered = prev.filter(item => item.id !== userQueueItemId);
            return filtered.map((item, index) => ({
            ...item,
            priorityNumber: (index + 1).toString()
            }));
        });
        // reset statuses
        setIsSubmitted(false);
        setUserQueueItemId(null);
        setPeopleAhead(0);
        setEstimatedTime(0);
        
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
                        initialData={userQueueItemId ? {
                            name: queueItems.find(item => item.id === userQueueItemId)?.studentName,
                            question: queueItems.find(item => item.id === userQueueItemId)?.description
                        } : null}
                        onSubmit={handleSubmitQuestion}
                        onCancel={() => setIsSubmitted(true)}
                        />
                    ) : (
                        <StudentETA 
                        peopleAhead={peopleAhead}
                        estimatedTime={estimatedTime}
                        onEdit={() => setIsSubmitted(false)}
                        onLeave={handleLeaveQueue}
                        />
                    )}
                    </CardContent>
                </Card>
                {/* live queue preview */}
                <QueuePreview
                    queueItems={queueItems}
                    userQueueItemId={userQueueItemId}
                />
            </div>
        </div>
        </div>
    );
    }