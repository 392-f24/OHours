// CreateSessionCard.jsx
import { useState } from "react";
import { Button } from "@components/Button";
import { Input } from "@components/Input";
import { Card } from "@components/Cards";
import { CardContent } from "@components/CardContent";
import { createNewSession } from "../../firebase/pmSideFunctions";

export default function CreateSession (){
  const [courseName, setCourseName] = useState("");
  const [sessionID, setSessionID] = useState("");
  const [studentCode, setStudentCode] = useState("");

  const generateRandomCode = () => {
    return Math.floor(1000 + Math.random() * 9000).toString();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newSessionID = generateRandomCode();
    const newStudentCode = generateRandomCode();

    setSessionID(newSessionID);
    setStudentCode(newStudentCode);

    try {
      await createNewSession(newSessionID, newStudentCode, courseName);
      console.log("Session successfully created!");
    } catch (error) {
      console.error("Error creating session: ", error);
    }
  };

  return (
    <Card className="h-full">
      <CardContent className="p-4">
        <div className="space-y-4">
          <div className="text-xl font-semibold">Create Session</div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                type="text"
                value={courseName}
                onChange={(e) => setCourseName(e.target.value)}
                placeholder="Enter course name"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded"
              />
            </div>

            <Button
              type="submit"
              className="w-full px-6 py-2 text-lg bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
            >
              Create Session
            </Button>
          </form>

          {sessionID && studentCode && (
            <div className="mt-4 text-left space-y-2 bg-green-50 p-4 rounded-lg">
              <p className="text-lg font-semibold text-green-700">
                Session Created!
              </p>
              <p>
                Session ID: <span className="font-bold">{sessionID}</span>
              </p>
              <p>
                Student Code: <span className="font-bold">{studentCode}</span>
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}