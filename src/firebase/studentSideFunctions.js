import { app } from './firebase';
import { getDatabase, ref, get, set, update, remove, increment } from 'firebase/database';

// Initialize the database
const db = getDatabase(app);

// Function to pad the ID with leading zeros
const padId = (id, length = 3) => {
  return id.toString().padStart(length, '0');
};

export const getClassName = async (code) => {

  try {
    const roomRef = ref(db, `sessionCode/${code}`);
    const roomSnapshot = await get(roomRef);
    const className = roomSnapshot.val()?.className || {}; 
    return className;

  } catch(error){
    throw error;
  }
}

// Get the full queue (all the questions)
export const getQueue = async (code) => {
  try {
    const roomRef = ref(db, `sessionCode/${code}`);
    const roomSnapshot = await get(roomRef);
    const queue = roomSnapshot.val()?.queue || {}; 
    // Sort the queue entries by their ID
    const sortedQueue = Object.entries(queue).sort((a, b) => a[0].localeCompare(b[0]));
    return sortedQueue.map(([id, data]) => ({ id, ...data }));
  } catch (error) {
    throw error;
  }
};

// Add a new question
export const addQuestion = async (questionData, code) => {
  try {
    const roomRef = ref(db, `sessionCode/${code}`);
    const roomSnapshot = await get(roomRef);
    const queueLength = roomSnapshot.val()?.queueLength || 0; 
    const newId = queueLength + 1; 
    const paddedId = padId(newId);
    
    await update(roomRef, {
      [`queueLength`]: newId,
      [`queue/${paddedId}`]: { ...questionData},
    });
    return paddedId;
  } catch (error) {
    throw error;
  }
};

// Update an existing question
export const updateQuestion = async (questionId, updatedData, code) => {
  try {
    const roomRef = ref(db, `sessionCode/${code}`);
    await update(roomRef, {
      [`queue/${questionId}`]: updatedData,
    });
  } catch (error) {
    throw error;
  }
};

// Delete a question -- maybe use a resolve for pm side too?
export const deleteQuestion = async (questionId, code) => {
  try {
    const sessionPath = `sessionCode/${code}/queue/${questionId}`;
    const questionRef = ref(db, sessionPath);

    await remove(questionRef);
    console.log(`success! ${questionId} deleted`);
  } catch (error) {
    console.error('Error deleting question:', error);
    throw error;
  }
};
