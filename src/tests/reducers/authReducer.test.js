const { authReducer } = require("../../reducers/authReducer");
const { types } = require("../../types/types");

describe('Test on authReducer', () => {
    
   test('should return login state', () => {
    const initSatate = {};
    const loginState = {type: types.login, payload : { uid: 'fldkjsaf', displayName: 'lbenny'}};
    const state = authReducer(initSatate, loginState);
     expect(state.uid).toEqual('fldkjsaf');
     expect(state.name).toEqual('lbenny')
   });

    test('should return logout state', () => {
     const logoutState = { type: types.logout}
     expect(authReducer( {}, logoutState)).toEqual({});
   });
   test('should return logout state', () => {
    const logoutState = { type: types.notesActive}
    expect(authReducer( {}, logoutState)).toEqual({});
  });
    
});
