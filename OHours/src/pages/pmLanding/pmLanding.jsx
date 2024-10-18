import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@components/Button";
import { Input } from "@components/Input";
import BackButton from "@components/back";

import { db } from "../../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";
import { fetchAllActiveSessions } from "../../firebase/pmSideFunctions";
import { useDbData } from "../../firebase/firebaseDb";

export default function PMLanding() {
  const navigate = useNavigate();
  const [sessionCode, setSessionCode] = useState("");
  const [sessions, setSessions] = useState({});
  const [PMSessions, error] = useDbData("pmToSession");

  const handleCreateSession = () => {
    navigate("/pmCreateSess");
  };

  const handleJoinSession = () => {
    console.log(PMSessions, sessions);
    if (sessionCode.trim() in PMSessions) {
      navigate(`/pmQ/${PMSessions[sessionCode]}/${sessionCode}`);
    } else if (sessionCode.trim() in sessions) {
      navigate(`/formqueue/${sessionCode}`);
    } else {
      alert("Please enter a valid session code.");
    }
  };

  useEffect(() => {
    fetchAllActiveSessions((data, error) => {
      if (error) {
        console.log("Error fetching data:", error);
        return;
      }
      setSessions(data);
    });
  }, []);

  return (
    <div className="h-screen flex flex-col justify-center items-center space-y-6 bg-gray-100">
      <div className="w-full flex justify-start mb-6">
        <BackButton />
      </div>
      {/* Create New Session Button */}
      <Button
        onClick={handleCreateSession}
        className="px-6 py-3 text-lg bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
      >
        Create New Session
      </Button>

      {/* Join Existing Session Section */}
      <div className="flex items-center space-x-4">
        <Input
          type="text"
          value={sessionCode}
          onChange={(e) => setSessionCode(e.target.value)}
          placeholder="Enter session code"
          className="px-4 py-2 text-lg border border-gray-300 rounded w-60"
        />
        <Button
          onClick={handleJoinSession}
          className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
        >
          Join Session
        </Button>
      </div>

      {/* Active Sessions Table */}
      <div>
        <h1 className="text-2xl font-bold mb-4 text-center">Active Sessions</h1>
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border px-4 py-2 bg-gray-200">Session ID</th>
              <th className="border px-4 py-2 bg-gray-200">Class Name</th>
              <th className="border px-4 py-2 bg-gray-200">PM Code</th>
              <th className="border px-4 py-2 bg-gray-200">Queue Length</th>
            </tr>
          </thead>
          <tbody>
            {sessions &&
              Object.entries(sessions).map(([key, session]) => (
                <tr key={key} className="odd:bg-white even:bg-gray-100">
                  <td className="border px-4 py-2">{key}</td>
                  <td className="border px-4 py-2">{session.className}</td>
                  <td className="border px-4 py-2">{session.pmCode}</td>
                  <td className="border px-4 py-2">{session.queueLength}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
