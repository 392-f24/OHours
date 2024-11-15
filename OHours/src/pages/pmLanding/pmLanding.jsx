import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@components/Button";
import { Input } from "@components/Input";
import BackButton from "@components/back";
import { Card } from "@components/Cards";
import { CardContent } from "@components/CardContent";
import { fetchAllActiveSessions } from "../../firebase/pmSideFunctions";
import { useDbData } from "../../firebase/firebaseDb";
import CreateSession from "../createSession/createSession";

export default function PMLanding() {
  const navigate = useNavigate();
  const [sessionCode, setSessionCode] = useState("");
  const [sessions, setSessions] = useState({});
  const [PMSessions, error] = useDbData("pmToSession");

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
    <div className="min-h-screen p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex col">
          <BackButton/>
          <div className="w-full mb-2 sm:mb-6 border border-blue-500 rounded-md p-2 sm:p-5">
            <div className="text-2xl text-blue-500 font-bold">
              Welcome, PMs!
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <CreateSession />

          {/* Join Session Card */}
          <Card className="h-full">
            <CardContent className="p-4">
              <div className="space-y-4">
                <div className="text-xl font-semibold">Join Session</div>
                <div className="flex flex-col gap-4 w-full">
                  <Input
                    type="text"
                    value={sessionCode}
                    onChange={(e) => setSessionCode(e.target.value)}
                    placeholder="Enter session code"
                    className="flex-1 px-4 py-2 text-lg border border-gray-300 rounded"
                  />
                  <Button
                    onClick={handleJoinSession}
                    className="w-full px-6 py-2 text-lg bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
                  >
                    Join
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bottom card with Active Sessions table */}
        <Card>
          <CardContent className="p-4">
            <div className="text-xl font-semibold mb-4">Active Sessions</div>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="border px-4 py-2 bg-gray-50 text-left">Session ID</th>
                    <th className="border px-4 py-2 bg-gray-50 text-left">Class Name</th>
                    <th className="border px-4 py-2 bg-gray-50 text-left">PM Code</th>
                    <th className="border px-4 py-2 bg-gray-50 text-left">Queue Length</th>
                  </tr>
                </thead>
                <tbody>
                  {sessions &&
                    Object.entries(sessions).map(([key, session]) => (
                      <tr key={key} className="hover:bg-gray-50">
                        <td className="border px-4 py-2">{key}</td>
                        <td className="border px-4 py-2">{session.className}</td>
                        <td className="border px-4 py-2">{session.pmCode}</td>
                        <td className="border px-4 py-2">{session.queueLength}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}