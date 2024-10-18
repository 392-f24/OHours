import { app, db, analytics } from './firebase';
import { collection, getDocs, getDoc, setDoc, doc, updateDoc, deleteDoc, increment } from 'firebase/firestore';

// temporarily using this dummy room + queue
const roomDocRef = doc(db, 'rooms/GBKWr6aXNnEZR4P2uhvI');
const queueCollectionRef = collection(db, 'rooms/GBKWr6aXNnEZR4P2uhvI/queue');

// Function to pad the ID with leading zeros
const padId = (id, length = 3) => {
  return id.toString().padStart(length, '0');
};

// get the full queue -- all the questions
export const getQueue = async () => {
    try {
      const currentQueue = await getDocs(queueCollectionRef);
      const queue = currentQueue.docs.map((question) => {
        return {
          id: question.id,
          ...question.data(),
        };
      });
      return queue;
    } catch (error) {
      throw error;
    }
};

// add a new question
export const addQuestion = async (questionData) => {
    try {
        // update the current queue length
        await updateDoc(roomDocRef, {queueLength: increment(1)});
        const newId = (await getDoc(roomDocRef)).data().queueLength;
        const paddedId = padId(newId);
        const newQuestionRef = doc(db, 'rooms/GBKWr6aXNnEZR4P2uhvI/queue', paddedId);
        await setDoc(newQuestionRef, {...questionData, id: paddedId});
        return paddedId;
    } catch (error) {
        throw error;
    }
};

// update an existing question (user updates their own question)
export const updateQuestion = async (questionId, updatedData) => {
    try {
        const questionRef = doc(db, 'rooms/GBKWr6aXNnEZR4P2uhvI/queue', questionId);
        await updateDoc(questionRef, updatedData);
    } catch (error) {
        throw error;
    }
};

// delete a question (user leaves queue) -- perhaps use for resolve question too?
export const deleteQuestion = async (questionId) => {
    try {
      const questionRef = doc(db, 'rooms/GBKWr6aXNnEZR4P2uhvI/queue', questionId);
      await deleteDoc(questionRef);
    } catch (error) {
      throw error;
    }
};