import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@components/Button";
import { Input } from "@components/Input";
import { db } from "../../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";
import { fetchAllActiveSessions } from "../../firebase/pmSideFunctions";

export default function PMLanding() {
  const navigate = useNavigate();
  const [sessionCode, setSessionCode] = useState("");

  const handleCreateSession = () => {
    navigate("/pmCreateSess");
  };

  const handleJoinSession = () => {
    if (sessionCode.trim()) {
      navigate(`/pmQ/${sessionCode}`);
    } else {
      alert("Please enter a valid session code.");
    }
  };

  const [sessions, setSessions] = useState({});

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
    <div className="h-screen flex flex-col justify-center items-center space-y-6">
      {/* Create New Session Button */}
      <Button onClick={handleCreateSession} className="px-6 py-3 text-lg">
        Create New Session
      </Button>

      {/* Join Existing Session Section */}
      <div className="flex items-center space-x-4">
        <Input
          type="text"
          value={sessionCode}
          onChange={(e) => setSessionCode(e.target.value)}
          placeholder="Enter session code"
          className="px-4 py-2 text-lg"
        />
        <Button onClick={handleJoinSession} className="px-6 py-2">
          Join Session
        </Button>
      </div>
      {/* Active Sessions Table */}
      <div>
        <h1>Active Sessions</h1>
        <table>
          <thead>
            <tr>
              <th>Session ID</th>
              <th>Class Name</th>
              <th>PM Code</th>
              <th>Queue Length</th>
            </tr>
          </thead>
          <tbody>
            {sessions &&
              Object.entries(sessions).map(([key, session]) => (
                <tr key={key}>
                  <td>{key}</td>
                  <td>{session.className}</td>
                  <td>{session.pmCode}</td>
                  <td>{session.queueLength}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
