import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


// placeholder functions for when fetching from db 
function estimateTime() {
  const waitingTime = 10;
  return waitingTime;
}

function getPeopleAhead() {
  const peopleAhead = 0;
  return peopleAhead;
}



export default function WaitingRoom() {
  const navigate = useNavigate();
  const [peopleAhead, setPeopleAhead] = useState(2); 
  const [estimatedTime, setEstimatedTime] = useState(10);

  useEffect(() => {
    const updateQueueInfo = () => {
      // const currentPeopleAhead = getPeopleAhead();
      // const currentEstimatedTime = estimateTime();
      
      // setPeopleAhead(currentPeopleAhead);
      // setEstimatedTime(currentEstimatedTime);

      // mock changes to demo how it would look to student
      setPeopleAhead((prevPeopleAhead) => prevPeopleAhead > 1 ? prevPeopleAhead - 1 : 0);
      setEstimatedTime((prevEstimatedTime) => prevEstimatedTime > 5 ? prevEstimatedTime - 5 : 0);
    };

    // updateQueueInfo();
    const intervalId = setInterval(updateQueueInfo, 5000);

    return () => clearInterval(intervalId);
  }, []);

  const handleLeaveQueue = () => {
    // temp leave queue page redirect ==> need to actually implement db changes
    if (window.confirm('Are you sure you want to leave the queue?')) {
      navigate('/student');
    };
  };


  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4 gap-8">
      <div id='main-card' className="w-full max-w-md rounded-xl overflow-hidden shadow-lg bg-white">
        <div id='card-header' className="bg-blue-500 text-white px-6 py-4">
          <h1 className="text-3xl font-bold text-center"> Jackie's CS 211 OH</h1>
        </div>
        <div id='card-content' className="px-6 py-4 space-y-6">
          <div className="text-center space-y-8 pt-4 pb-8">
            <p className="text-2xl font-semibold text-gray-600">{peopleAhead} {peopleAhead === 1 ? 'person' : 'people'} ahead</p>
            {(peopleAhead == 0 && estimatedTime == 0)? 
              <p className="text-3xl font-bold text-blue-500">It's Your Turn!</p> : 
              <p className="text-3xl font-bold text-gray-700">ETA: {estimatedTime} minutes</p>}
          </div>
        </div>
      </div>
      <button id='leave-queue' onClick={handleLeaveQueue} 
              className="bg-gray-200 hover:bg-gray-400 text-gray-400 hover:text-gray-100 font-bold py-3 px-6 rounded-lg transition-colors duration-200">
              Leave Queue
            </button>
    </div>
  );
}