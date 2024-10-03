import { useState, useEffect } from 'react';
import { Card, CardContent } from '@shadcn/ui';
import { ScrollArea } from '@shadcn/ui';
import { Button } from '@shadcn/ui';
import { Checkbox } from '@shadcn/ui';
 
const mockQueueData = [
  { 
    id: 1, 
    studentName: "John Doe",
    priorityNumber: "1",
    description: "Question about assignment 3",
    checked: false
  },
  { 
    id: 2, 
    studentName: "Jane Smith",
    priorityNumber: "2",
    description: "Needs help with coding problem",
    checked: false
  },
  { 
    id: 3, 
    studentName: "Bob Johnson",
    priorityNumber: "3",
    description: "Discussion about project proposal",
    checked: false
  },
];

export default function QueueManagement() {
  const [roomNumber, setRoomNumber] = useState("A101");
  const [queueItems, setQueueItems] = useState([]);

  useEffect(() => {
    setQueueItems(mockQueueData);
  }, []);

  const handleCheckboxChange = (id) => {
    setQueueItems(queueItems.map(item => 
      item.id === id ? {...item, checked: !item.checked} : item
    ));
  };

  const handleButtonClick = () => {
    console.log("Next student");
  };

  return (
    <div className="h-screen flex flex-col">
      Room Section
      <div className="p-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-sm font-semibold mb-1">Room:</div>
            <div className="text-2xl font-bold">{roomNumber}</div>
          </CardContent>
        </Card>
      </div>

      {/* Queue Section */}
      <div className="flex-1 overflow-hidden p-4">
        <Card className="h-full flex flex-col">
          <CardContent className="p-4 flex-1">
            <div className="text-sm font-semibold mb-2">Queue</div>
            <ScrollArea className="h-[calc(100%-2rem)]">
              <div className="space-y-2 pr-4">
                {queueItems.map((item) => (
                  <Card key={item.id}>
                    <CardContent className="p-3">
                      <div className="flex justify-between items-center mb-2">
                        <div className="font-medium">
                          {item.studentName} #{item.priorityNumber}
                        </div>
                        <Checkbox 
                          checked={item.checked}
                          onCheckedChange={() => handleCheckboxChange(item.id)}
                          className="h-5 w-5"
                        />
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Description:</div>
                        <div className="text-sm">{item.description}</div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      {/* Button Section */}
      <div className="p-4">
        <Button 
          onClick={handleButtonClick}
          className="w-full"
        >
          Next Student
        </Button>
      </div>
    </div>
  );
}