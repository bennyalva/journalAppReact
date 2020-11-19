const { setErrorAction, removeErrorAction, startLoading, finishLoading } = require("../../actions/ui");
const { types } = require("../../types/types");

describe('Tests on ui-actions', () => {
   test('should create all actions', () => {
      expect(setErrorAction('help alv')).toEqual({type: types.uiSetError, payload: 'help alv'});
      
      expect(removeErrorAction()).toEqual({type: types.uiRemoveError});

      expect(startLoading()).toEqual({type: types.uiStartLoading})

      expect(finishLoading()).toEqual({type: types.uiFinishLoading})
       
   });
    
});
