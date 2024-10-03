import { useState, useEffect } from 'react';

function estimateTime() {
  const waitingTime = 10;
  return waitingTime;
}

function getPeopleAhead() {
  const peopleAhead = 0;
  return peopleAhead;
}

export default function WaitingRoom() {
  const [peopleAhead, setPeopleAhead] = useState(0); 
  const [estimatedTime, setEstimatedTime] = useState(0);

  useEffect(() => {
    const updateQueueInfo = () => {
      const currentPeopleAhead = getPeopleAhead();
      const currentEstimatedTime = estimateTime();
      
      setPeopleAhead(currentPeopleAhead);
      setEstimatedTime(currentEstimatedTime);
    };

    updateQueueInfo();
    const intervalId = setInterval(updateQueueInfo, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md rounded overflow-hidden shadow-lg bg-white">
        <div className="bg-gray-800 text-white px-6 py-4">
          <h1 className="text-3xl font-bold text-center">
            Jackie's CS 211 OH
          </h1>
        </div>
        <div className="px-6 py-4 space-y-6">
          <div className="text-center space-y-4">
            <p className="text-2xl font-semibold text-gray-700">
              {peopleAhead} {peopleAhead === 1 ? 'person' : 'people'} ahead
            </p>
            <p className="text-xl text-gray-600">
              ETA: {estimatedTime}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
