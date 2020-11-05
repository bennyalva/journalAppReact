import { db } from "../firebase/firebase-config"

export const loadNotes = async (uid) => {
  const noteSnap = await db.collection(`${ uid }/journal/notes`).get();
  const notes = [];
  noteSnap.forEach( snapHIjo => {
      notes.push({
          id: snapHIjo.id,
          ...snapHIjo.data()
       });

  });
  return notes;
}