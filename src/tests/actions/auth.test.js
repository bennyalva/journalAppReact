import configureStore from 'redux-mock-store' //ES6 modules
import thunk from 'redux-thunk';
import '@testing-library/jest-dom';
const { login, logout, startLogout, startLoginEmailPassWord } = require("../../actions/auth");
const { types } = require("../../types/types");


const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {};

let store  = mockStore(initState);

describe('Tests on auth actions', () => {
    beforeEach(() => {
        store = mockStore(initState);
    });
   test('should call login and logout', () => {
      expect(login('test', 'rey')).toEqual({
          type: types.login,
          payload: {
              uid: 'test',
              displayName: 'rey'
          }
      });
      expect(logout()).toEqual({
          type: types.logout
      })
   });
   test('should start logout', async() => {
       await store.dispatch(startLogout());
        const actions = store.getActions();
       expect(actions[0]).toEqual({
            type: types.logout
       });
       expect(actions[1]).toEqual({
        type: types.notesLogoutCleaning
   });
   });
   
    test('should init startLoginEmailANdPassword', async() => {
        // para hacer correctamente la prueba en necesario agregar email y pass correctamente y hacer el return de firebase
        // para que regrese los otros dispatch que hay dentro del firebase
        await store.dispatch(startLoginEmailPassWord('email', 'pass'));
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: types.uiStartLoading
        });
        expect(actions[1]).toEqual({
            type: types.uiFinishLoading
        });
    });
    
});
