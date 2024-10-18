import { Card } from '@components/Cards';
import { CardContent } from '@components/CardContent';

export default function QueuePreview({ queueItems, userQueueItemId }) {
  return (
    <div className="h-[calc(100vh-350px)] sm:h-[calc(100vh-200px)] bg-gray-50 rounded p-4 flex flex-col">
      <h2 className="text-xl font-semibold mb-4 text-gray-600">
        Current Queue {queueItems.length > 0 && `(${queueItems.length})`}
      </h2>
      <div className="flex-1 overflow-y-auto">
        <div className="space-y-2">
          {queueItems.map((item) => (
            <Card key={item.id}>
              <CardContent className="p-3">
                <div className="font-medium">
                  {item.name} 
                  {item.id === userQueueItemId && (
                    <span className="ml-2 text-blue-600 text-medium">(You)</span>
                  )}
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  {item.question}
                </div>
              </CardContent>
            </Card>
          ))}
          {queueItems.length === 0 && (
            <div className="text-center text-gray-500 mt-4">
              Queue is currently empty
            </div>
          )}
        </div>
      </div>
    </div>
  );
}