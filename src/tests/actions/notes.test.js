import configureStore from 'redux-mock-store' //ES6 modules
import thunk from 'redux-thunk';
import { startNewNote, startLoadingNotes, startSaveNote, startUploading } from '../../actions/notes';
import { types } from '../../types/types';
import { db } from '../../firebase/firebase-config';
import { fileUpload } from '../../helpers/fileUpload';

jest.mock('../../helpers/fileUpload', () =>({
   fileUpload: jest.fn(() => {
      return 'Https://holamundo.com/uno.jpg'
   })
}));
 
const middlewares = [thunk]
const mockStore = configureStore(middlewares)
const store = mockStore({
   auth: {
      uid: 'TESTING'
   },
   notes: {
      active: {
         id: '9VFSVU4JU72awRAkj7nB',
         title: 'hola',
         body: 'mundo'
      }
   }
});

describe('Test on actions notes', () => {
    beforeEach(() => {
       store.clearActions()
    });
   test('should startNewNote', async() => {
       await store.dispatch(startNewNote());
       const actions = store.getActions();

       expect(actions[0]).toEqual({
          type: types.notesActive,
          payload: {
             id: expect.any(String),
             title: '',
             body: '',
             date: expect.any(Number)
          }
       });

       expect(actions[1]).toEqual({
         type: types.notesAddNew,
         payload: {
            id: expect.any(String),
            title: '',
            body: '',
            date: expect.any(Number)
         }
      });

      const docId = actions[0].payload.id;
      await db.doc(`/TESTING/journal/notes/${docId}`).delete();
   });

   test('should load notes', async() => {
      await store.dispatch( startLoadingNotes('TESTING'));
      const actions = store.getActions();
      
      expect(actions[0]).toEqual({
         type: types.notesLoad,
         payload: expect.any(Array)
      });

      const expectedObject = {
         id: expect.any(String),
         title: expect.any(String),
         body: expect.any(String),
         date: expect.any(Number), 
      }
      expect(actions[0].payload[0]).toMatchObject(expectedObject);
   });
   test('should call start save note', async() => {
      const note = {
         id: '9VFSVU4JU72awRAkj7nB',
         title: 'titulo',
         body: 'body'
      }

      await store.dispatch(startSaveNote(note));
      const actions = store.getActions();
      // console.log(actions)
      expect(actions[0].type).toBe(types.notesUpdated);

   });
   
   test('should start uploading update url', async() => {
      const file = new File([], 'foto.jpg');
      await store.dispatch(startUploading(file));
      

   });
   
});
