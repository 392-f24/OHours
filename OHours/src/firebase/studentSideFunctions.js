import { app, db, analytics } from './firebase';
import { collection, getDocs, getDoc, setDoc, doc, updateDoc, deleteDoc, increment } from 'firebase/firestore';




// temporarily using this dummy room + queue
const roomDocRef = doc(db, 'rooms/GBKWr6aXNnEZR4P2uhvI');
const queueCollectionRef = collection(db, 'rooms/GBKWr6aXNnEZR4P2uhvI/queue');


// get the full queue -- all the questions
export const getQueue = async () => {
    try {
    //   console.log('attempting to fetch queue');
      const currentQueue = await getDocs(queueCollectionRef);
    //   console.log('number of docs:', querySnapshot.size);
      const queue = currentQueue.docs.map((question) => {
        return {
          id: question.id,
          ...question.data(),
        };
      });
    //   console.log('got queue:', questions);
      return queue;
    } catch (error) {
    //   console.error('error fetching queue:', error);
      throw error;
    }
  };


// add a new question
export const addQuestion = async (questionData) => {
    try {
        // console.log('attempting to add new question:', questionData);
        // update the current queue length
        await updateDoc(roomDocRef, {queueLength: increment(1)});
        const newId = (await getDoc(roomDocRef)).data().queueLength;
        const newQuestionRef = doc(db, 'rooms/GBKWr6aXNnEZR4P2uhvI/queue', newId.toString());
        await setDoc(newQuestionRef, {...questionData, id: newId});
        // console.log('new question added with ID:', newId);
        return newId;
    } catch (error) {
        // console.error('error adding question:', error);
        throw error;
    }
};

// update an existing question (user updates their own question)
export const updateQuestion = async (questionId, updatedData) => {
    try {
        // console.log('Attempting to update question:', questionId, updatedData);
        const questionRef = doc(db, 'rooms/GBKWr6aXNnEZR4P2uhvI/queue', questionId.toString());
        await updateDoc(questionRef, updatedData);
        // console.log('Question updated successfully');
    } catch (error) {
        // console.error('Error updating question:', error);
        throw error;
    }
};


// delete a question (user leaves queue) -- perhaps use for resolve question too?
export const deleteQuestion = async (questionId) => {
    try {
    //   console.log('attempting to delete question:', questionId);
      const questionRef = doc(db, 'rooms/GBKWr6aXNnEZR4P2uhvI/queue', questionId.toString());
      await deleteDoc(questionRef);
    //   console.log('question deleted successfully');
    } catch (error) {
    //   console.error('error deleting question:', error);
      throw error;
    }
  };