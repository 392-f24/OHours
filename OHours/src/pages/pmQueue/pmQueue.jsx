import { useState, useEffect } from 'react';
import { Card } from '@components/Cards';
import { CardContent } from '@components/CardContent';
import { Checkbox } from '@components/Checkbox';
import { Button } from '@components/Button';

// Updated mock data to reflect student queue
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
  { 
    id: 4, 
    studentName: "Alice Brown",
    priorityNumber: "4",
    description: "Clarification on exam schedule",
    checked: false
  },
  { 
    id: 5, 
    studentName: "Charlie Davis",
    priorityNumber: "5",
    description: "Issues with installation of tools",
    checked: false
  },
  { 
    id: 6, 
    studentName: "Emily White",
    priorityNumber: "6",
    description: "Help with debugging code",
    checked: false
  },
  { 
    id: 7, 
    studentName: "Frank Harris",
    priorityNumber: "7",
    description: "Discussion about final project topic",
    checked: false
  },
  { 
    id: 8, 
    studentName: "Grace Lee",
    priorityNumber: "8",
    description: "Needs guidance on research paper",
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
      {/* Room Section */}
      <div className="p-4">
        <Card>
          <CardContent>
            <div className="text-sm font-semibold mb-1">Room:</div>
            <div className="text-2xl font-bold">{roomNumber}</div>
          </CardContent>
        </Card>
      </div>

      {/* Queue Section */}
      <div className="flex-1 overflow-y-auto p-4">
        <Card className="h-full flex flex-col">
          <CardContent className="flex-1">
            <div className="text-sm font-semibold mb-2">Queue</div>
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
                          onChange={() => handleCheckboxChange(item.id)}
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