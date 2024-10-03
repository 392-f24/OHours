import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { collection, addDoc, serverTimestamp, getDoc, doc, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

function StudentSubmitForm() {
  const { roomCode } = useParams();
  const history = useHistory();
  const [name, setName] = useState('');
  const [question, setQuestion] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [roomInfo, setRoomInfo] = useState(null);
  const [queueLength, setQueueLength] = useState(0);

  useEffect(() => {
    const fetchRoomInfo = async () => {
      try {
        const roomRef = doc(db, 'rooms', roomCode);
        const roomSnap = await getDoc(roomRef);
        
        if (roomSnap.exists()) {
          setRoomInfo(roomSnap.data());
        } else {
          console.error('Room not found');
          // Handle room not found (e.g., redirect to error page)
        }

        const queueRef = collection(db, 'rooms', roomCode, 'queue');
        const queueQuery = query(queueRef, where('status', '==', 'waiting'));
        const queueSnap = await getDocs(queueQuery);
        setQueueLength(queueSnap.size);
      } catch (error) {
        console.error('Error fetching room info:', error);
        // Handle error (e.g., show error message)
      }
    };

    fetchRoomInfo();
  }, [roomCode]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const queueRef = collection(db, 'rooms', roomCode, 'queue');
      const docRef = await addDoc(queueRef, {
        name,
        question,
        timestamp: serverTimestamp(),
        status: 'waiting'
      });
      
      // Redirect to the wait room page after successful submission
      history.push(`/student/${roomCode}/waitroom/${docRef.id}`);
    } catch (error) {
      console.error('Error submitting question:', error);
      alert('Failed to submit question. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!roomInfo) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto mt-10 p-4">
      <h2 className="text-2xl font-bold mb-5">Submit Your Question</h2>
      <p className="mb-4">Room: {roomInfo.name} (Code: {roomCode})</p>
      <p className="mb-4">People ahead of you: {queueLength}</p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block mb-1">Your Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label htmlFor="question" className="block mb-1">Your Question:</label>
          <textarea
            id="question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="w-full p-2 border rounded h-32"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Question'}
        </button>
      </form>
    </div>
  );
}

export default StudentSubmitForm;