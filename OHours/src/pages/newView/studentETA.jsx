
export default function StudentETA({peopleAhead, estimatedTime, onEdit, onLeave}) {
    return (
      <div className="h-full flex flex-col justify-center items-center space-y-6">
        <div className="text-center space-y-4">
          <p className="text-2xl font-semibold text-gray-600">
            {peopleAhead} {peopleAhead === 1 ? "person" : "people"} ahead
          </p>
          {peopleAhead === 0 && estimatedTime === 0 ? (
            <p className="text-3xl font-bold text-blue-500">It's Your Turn!</p>
          ) : (
            <p className="text-3xl font-bold text-gray-700">ETA: {estimatedTime} minutes</p>
          )}
        </div>
        <div className="flex space-x-4">
          <button onClick={onEdit} variant="outline" className="bg-white border border-blue-500 text-blue-500 py-2 px-4 rounded">
            Edit Question
          </button>
          <button onClick={onLeave} variant="destructive" className="bg-white border border-red-500 text-red-500 py-2 px-4 rounded">
            Leave Queue
          </button>
        </div>
      </div>
    );
  }
  