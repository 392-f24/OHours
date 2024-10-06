import { useState, useEffect } from 'react';
import { Card } from '@components/Cards';
import { CardContent } from '@components/CardContent';
import { Checkbox } from '@components/Checkbox';
import { Button } from '@components/Button';
import { useNavigate } from 'react-router-dom';


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


export default function QueueManagement({ onLogout }) {
  const navigate = useNavigate();
  const [roomNumber, setRoomNumber] = useState("CS392");
  const [queueItems, setQueueItems] = useState([]);
  const [selectAll, setSelectAll] = useState(false);


  useEffect(() => {
    setQueueItems(mockQueueData);
  }, []);

  const handleCheckboxChange = (id) => {
    setQueueItems(queueItems.map(item => 
      item.id === id ? {...item, checked: !item.checked} : item
    ));

    //select all
    const updatedItems = queueItems.map(item => 
      item.id === id ? {...item, checked: !item.checked} : item
    );
    setSelectAll(updatedItems.every(item => item.checked));
  };


  const handleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    setQueueItems(queueItems.map(item => ({
      ...item,
      checked: newSelectAll
    })));
  };

  const handleLogout = () => {
    navigate('/');
  };

  const handleDelete = () => {
    const updatedQueue = queueItems.filter(item => !item.checked);
    setQueueItems(updatedQueue);
    setSelectAll(false);
  };

  return (
    <div className="h-[90vh] flex flex-col">
      {/* Room Section */}
      <div className="p-2 ">
        <Card>
          <CardContent className="flex justify-between items-center">
            <div>
              <div className="text-sm font-semibold mb-1">Room:</div>
              <div className="text-2xl font-bold">{roomNumber}</div>
            </div>
            <Button 
              variant="ghost" 
              onClick={handleLogout}
              className="flex items-center gap-2"
            >
              Logout
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Queue Section */}
      <div className=" w-full h-1/2 flex-1 p-4 flex">
        <Card className="w-full  flex flex-col">
          <CardContent className="flex flex-col h-full">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <div className="text-sm font-semibold">Queue</div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  checked={selectAll}
                  onChange={handleSelectAll}
                  id="select-all"
                />
                <label 
                  htmlFor="select-all" 
                  className="text-sm text-gray-700 cursor-pointer"
                >
                  Select All
                </label>
              </div>
            </div>
            
            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto pr-2">
              <div className="space-y-2">
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
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Button Section */}
      <div className="p-4">
        <Button 
          onClick={handleDelete}
          className="fixed bottom-4 left-1/2 transform -translate-x-1/2"
        >
          Resolve
        </Button>
      </div>
    </div>
  );
}