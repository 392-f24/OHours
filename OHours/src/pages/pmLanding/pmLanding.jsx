import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@components/Button';
import { Input } from '@components/Input';
import { db } from '../../firebase'; // Adjust the path as necessary
import { collection, getDocs } from 'firebase/firestore';

export default function PMLanding() {
  const navigate = useNavigate();
  const [sessionCode, setSessionCode] = useState('');
  const [activeSessions, setActiveSessions] = useState([]);

  const handleCreateSession = () => {
    navigate('/pmCreateSess');
  };

  const handleJoinSession = () => {
    if (sessionCode.trim()) {
      navigate(`/pmQ/${sessionCode}`);
    } else {
      alert('Please enter a valid session code.');
    }
  };

  useEffect(() => {
    const fetchActiveSessions = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'rooms'));
        const sessions = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setActiveSessions(sessions);
      } catch (error) {
        console.error('Error fetching sessions: ', error);
      }
    };
    fetchActiveSessions();
}, []);


  return (
    <div className="h-screen flex flex-col justify-center items-center space-y-6">
      {/* Create New Session Button */}
      <Button 
        onClick={handleCreateSession}
        className="px-6 py-3 text-lg"
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
          className="px-4 py-2 text-lg"
        />
        <Button 
          onClick={handleJoinSession}
          className="px-6 py-2"
        >
          Join Session
        </Button>
      </div>
      {/* Active Sessions Table */}
      <div className="w-full px-8 mt-8">
        <table className="min-w-full border-collapse border border-gray-200">
          <thead>
            <tr>
              <th className="border border-gray-200 px-4 py-2 text-left">Class Name</th>
              <th className="border border-gray-200 px-4 py-2 text-left">Session ID</th>
              <th className="border border-gray-200 px-4 py-2 text-left">Student Code</th>
            </tr>
          </thead>
          <tbody>
            {activeSessions.map((session) => (
              <tr key={session.id} className="hover:bg-gray-100">
                <td className="border border-gray-200 px-4 py-2">{session.ClassName}</td>
                <td className="border border-gray-200 px-4 py-2">{session.id}</td>
                <td className="border border-gray-200 px-4 py-2">{session.studentCode}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}