import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

function estimateTime(){
    const waitingTime = 10;
    return(
        waitingTime
    );
}

function peopleAhead(){
    const peopleAhead = 0;
    return(
        peopleAhead
    );
}

export default function WaitingRoom() {
  const [peopleAhead, setPeopleAhead] = useState(0); // Starting with 15 people for demo
  const [estimatedTime, setEstimatedTime] = useState(0);

  useEffect(() => {
    // Function to update both values
    const updateQueueInfo = () => {
      const currentPeopleAhead = peopleAhead();
      const currentEstimatedTime = estimateTime();
      
      setNumPeopleAhead(currentPeopleAhead);
      setEstimatedTime(currentEstimatedTime);
    };

    // Initial call
    updateQueueInfo();

    // Set up the interval
    const intervalId = setInterval(updateQueueInfo, 5000);

    // Cleanup on unmount
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array means this runs once on mount

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <h1 className="text-3xl font-bold text-center text-gray-800">
            Jackie's CS 211 Office Hours
          </h1>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center space-y-4">
            <p className="text-2xl font-semibold text-gray-700">
              {peopleAhead} {peopleAhead === 1 ? 'person' : 'people'} ahead
            </p>
            <p className="text-xl text-gray-600">
              ETA: {estimatedTime}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}