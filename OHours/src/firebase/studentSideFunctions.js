import { app, db, analytics } from './firebase';
import { getDoc, setDoc, updateDoc, doc, increment } from 'firebase/firestore';

// temporarily using this dummy room reference
const roomDocRef = doc(db, 'rooms/7702');

// Function to pad the ID with leading zeros
const padId = (id, length = 3) => {
  return id.toString().padStart(length, '0');
};

// Get the full queue (all the questions)
export const getQueue = async () => {
  try {
    const roomDoc = await getDoc(roomDocRef);
    const queue = roomDoc.data().queue || {}; // Get the queue map, defaulting to an empty object
    return Object.entries(queue).map(([id, data]) => ({ id, ...data }));
  } catch (error) {
    throw error;
  }
};

// Add a new question
export const addQuestion = async (questionData) => {
  try {
    // Update the current queue length
    await updateDoc(roomDocRef, { queueLength: increment(1) });
    const newId = (await getDoc(roomDocRef)).data().queueLength;
    const paddedId = padId(newId);

    // Add the new question to the queue map
    await updateDoc(roomDocRef, {
      [`queue.${paddedId}`]: { ...questionData, id: paddedId },
    });
    return paddedId;
  } catch (error) {
    throw error;
  }
};

// Update an existing question (user updates their own question)
export const updateQuestion = async (questionId, updatedData) => {
  try {
    // Update the specific question in the queue map
    await updateDoc(roomDocRef, {
      [`queue.${questionId}`]: updatedData,
    });
  } catch (error) {
    throw error;
  }
};

// Delete a question (user leaves queue) -- perhaps use for resolve question too?
export const deleteQuestion = async (questionId) => {
  try {
    // Delete the specific question from the queue map
    await updateDoc(roomDocRef, {
      [`queue.${questionId}`]: deleteField(),
    });
  } catch (error) {
    throw error;
  }
};
