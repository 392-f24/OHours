import {
  getDatabase,
  ref,
  get,
  set,
  update,
  onValue,
  remove,
  off,
} from "firebase/database"; // Ensure you have these imports

import { useDbData } from "./firebaseDb";

export const createNewSession = async (
  newSessionID,
  newStudentCode,
  courseName
) => {
  const db = getDatabase(); // Get the database instance
  const sessionData = {
    className: courseName,
    pmCode: newStudentCode,
    queue: {},
    queueLength: 0,
  };

  // Set the data at the specific reference in the Realtime Database
  const updates = {};
  updates[`sessionCode/${newSessionID}`] = sessionData; // Set session data under sessionCode
  updates[`pmToSession/${newStudentCode}`] = newSessionID; // Link newStudentCode to newSessionID

  await update(ref(db), updates); // Perform a multi-path update
};

//Fetch active sessions
export const fetchAllActiveSessions = (callback) => {
  const db = getDatabase();
  const sessionsRef = ref(db, "sessionCode");

  onValue(
    sessionsRef,
    (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        callback(data); // Pass data to callback function
      } else {
        callback(null); // Pass null if no data exists
      }
    },
    (error) => {
      console.error("Failed to fetch active sessions:", error);
      callback(null, error); // Pass null and error to callback
    }
  );
};

//PmQueue session details
export const getSessionDetails = async (sessionID) => {
  const db = getDatabase();
  const sessionRef = ref(db, `sessionCode/${sessionID}`);

  try {
    const snapshot = await get(sessionRef);
    if (snapshot.exists()) {
      const data = snapshot.val();
      // Extract only the necessary details
      const { className, queue, queueLength } = data;
      return { className, queue, queueLength };
    } else {
      console.log("No data available for session ID:", sessionID);
      return null;
    }
  } catch (error) {
    console.error("Error fetching session details:", error);
    return null;
  }
};

// Function to delete a queue item

export const deleteQueueItem = async (sessionId, itemId) => {
  const db = getDatabase();
  try {
    await remove(ref(db, `sessionCode/${sessionId}/queue/${itemId}`));
    console.log(`Item with ID ${itemId} deleted successfully`);
  } catch (error) {
    console.error("Error deleting item:", error);
  }
};

// Function to update a queue item

export const updateQueueItem = async (sessionId, itemId, data) => {
  const db = getDatabase();
  try {
    await update(ref(db, `sessionCode/${sessionId}/queue/${itemId}`), data);
    console.log(`Item with ID ${itemId} updated successfully`);
  } catch (error) {
    console.error("Error updating item:", error);
  }
};

// Function to set up a real-time listener on the queue
export const setupQueueListener = (sessionID, onUpdate) => {
  const db = getDatabase();
  const queueRef = ref(db, `sessionCode/${sessionID}/queue`);

  const unsubscribe = onValue(queueRef, (snapshot) => {
    if (snapshot.exists()) {
      const data = snapshot.val();
      onUpdate(data);
    } else {
      onUpdate({});
    }
  });

  // Return a function to detach the listener when the component unmounts
  return () => off(queueRef, "value", unsubscribe);
};

export const deleteSession = async (sessionId, PMID) => {
  const db = getDatabase();
  try {
    await remove(ref(db, `sessionCode/${sessionId}`));
    await remove(ref(db, `pmToSession/${PMID}`));
    console.log(`Session with ID ${sessionId} deleted successfully`);
  } catch (error) {
    console.error("Error deleting session:", error);
  }
};
