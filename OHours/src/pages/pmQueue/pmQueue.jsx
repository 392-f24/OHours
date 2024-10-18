import { useState, useEffect } from "react";
import { Card } from "@components/Cards";
import { CardContent } from "@components/CardContent";
import { Checkbox } from "@components/Checkbox";
import { Button } from "@components/Button";
import { useNavigate, useParams } from "react-router-dom";
import {
  getSessionDetails,
  deleteQueueItem,
  updateQueueItem,
  setupQueueListener,
  deleteSession,
} from "../../firebase/pmSideFunctions";

export default function QueueManagement({ onLogout }) {
  const { sessionID } = useParams();
  const navigate = useNavigate();
  const [queueItems, setQueueItems] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [roomNumber, setRoomNumber] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const details = await getSessionDetails(sessionID);
      if (details) {
        const formattedQueue = Object.entries(details.queue).map(
          ([id, item]) => ({
            id,
            studentName: item.name,
            description: item.question,
            checked: false,
          })
        );
        setQueueItems(formattedQueue);
        setRoomNumber(details.className);
      } else {
        console.log("No details found for session ID:", sessionID);
      }
    };

    fetchData();

    // Callback function to update local state when Firebase data changes
    const handleDataUpdate = (data) => {
      const formattedQueue = Object.entries(data).map(([id, item]) => ({
        id,
        studentName: item.name,
        description: item.question,
        checked: false,
      }));
      setQueueItems(formattedQueue);
    };

    // Set up the Firebase listener
    const detachListener = setupQueueListener(sessionID, handleDataUpdate);

    // Cleanup function to remove the listener
    return () => {
      detachListener();
    };
  }, [sessionID]);

  const handleCheckboxChange = (id) => {
    setQueueItems(
      queueItems.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );

    // Update select all state based on current items
    const updatedItems = queueItems.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setSelectAll(updatedItems.every((item) => item.checked));
  };

  const handleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    setQueueItems(
      queueItems.map((item) => ({
        ...item,
        checked: newSelectAll,
      }))
    );
  };

  const handleLogout = async () => {
    await deleteSession(sessionID);
    navigate("/");
  };

  const handleDelete = () => {
    queueItems.forEach((item) => {
      if (item.checked) {
        deleteQueueItem(sessionID, item.id)
          .then(() => {
            console.log(`Deleted ${item.id}`);
          })
          .catch((error) => {
            console.error(`Failed to delete ${item.id}:`, error);
          });
      }
    });

    // Filter out the items that were marked for deletion
    const updatedQueue = queueItems.filter((item) => !item.checked);
    setQueueItems(updatedQueue);
    setSelectAll(false);
  };

  const mergeActive = queueItems.filter((item) => item.checked).length > 1;

  const handleMerge = async () => {
    const selectedItems = queueItems.filter((item) => item.checked);
    if (selectedItems.length <= 1) {
      console.log("Not enough items selected to merge");
      return;
    }

    // First item is the base for merging
    const firstItem = selectedItems[0];
    const mergedName = selectedItems.map((item) => item.studentName).join(", ");
    const mergedDescription = selectedItems
      .map((item) => item.description)
      .join("; ");

    // Update the first item in the database
    const updatedFirstItem = {
      ...firstItem,
      name: mergedName,
      question: mergedDescription,
    };
    await updateQueueItem(sessionID, firstItem.id, updatedFirstItem);

    // Delete the other selected items from the database
    const deletePromises = selectedItems
      .slice(1)
      .map((item) => deleteQueueItem(sessionID, item.id));

    await Promise.all(deletePromises);

    // Update local state to reflect the merge and deletions
    setQueueItems((prevItems) => {
      // Create a new array with all unselected items plus the updated first item
      const newItems = prevItems
        .filter((item) => !item.checked || item.id === firstItem.id) // Remove all selected except the first
        .map((item) => {
          // Update the first item with merged data
          if (item.id === firstItem.id) {
            return updatedFirstItem;
          }
          return item;
        });

      return newItems;
    });

    await fetchQueueItems();
  };

  const fetchQueueItems = async () => {
    const details = await getSessionDetails(sessionID);
    if (details && details.queue) {
      const formattedQueue = Object.entries(details.queue).map(
        ([id, item]) => ({
          id,
          studentName: item.name,
          description: item.question,
          checked: false,
        })
      );
      setQueueItems(formattedQueue);
    } else {
      console.log("No details found for session ID:", sessionID);
    }
  };

  return (
    <div className="h-[90vh] flex flex-col bg-gray-100">
      {/* Room and Session Info */}
      <div className="p-4">
        <Card className="bg-white shadow-md rounded-lg">
          <CardContent className="flex justify-between items-center p-4">
            <div>
              <div className="text-sm font-semibold text-gray-600 mb-1">
                Room:
              </div>
              <div className="text-2xl font-bold">{roomNumber}</div>
            </div>
            <div>
              <div className="text-sm font-semibold text-gray-600 mb-1">
                Join Code:
              </div>
              <div className="text-2xl font-bold">{sessionID}</div>
            </div>
            <Button
              variant="ghost"
              onClick={handleLogout}
              className="flex items-center gap-2 text-red-600 hover:bg-red-100 transition duration-200 rounded-md"
            >
              End Session
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Queue Section */}
      <div className="w-full flex-1 p-4 flex">
        <Card className="w-full bg-white shadow-md rounded-lg flex flex-col">
          <CardContent className="flex flex-col h-full p-4">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <div className="text-sm font-semibold text-gray-600">Queue</div>
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
                  <Card
                    key={item.id}
                    className="bg-gray-50 hover:bg-gray-100 transition duration-150 rounded-lg shadow-sm"
                  >
                    <CardContent className="p-3">
                      <div className="flex justify-between items-center mb-2">
                        <div className="font-medium text-gray-800">
                          {item.studentName} #{item.id}
                        </div>
                        <Checkbox
                          checked={item.checked}
                          onChange={() => handleCheckboxChange(item.id)}
                        />
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">
                          Description:
                        </div>
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
      <div className="p-4 flex space-x-4">
        <Button
          onClick={handleDelete}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-200"
        >
          Resolve
        </Button>
        <Button
          onClick={handleMerge}
          disabled={!mergeActive}
          className={`px-4 py-2 rounded ${
            mergeActive
              ? "bg-blue-500 text-white hover:bg-blue-600"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          } transition duration-200`}
        >
          Merge
        </Button>
      </div>
    </div>
  );
}
