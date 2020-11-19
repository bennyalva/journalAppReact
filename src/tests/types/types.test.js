const { types } = require("../../types/types");

describe('Tests on types', () => {
    const typesToCompare = {
        login: '[Auth] Login',
        logout: '[Auth] Logout',
        
        uiSetError: '[UI] set error',
        uiRemoveError: '[UI] remove error',
    
        uiStartLoading: '[UI] Start loading',
        uiFinishLoading: '[UI] Finish loading',
    
        notesAddNew: '[NOTES] New note',
        notesActive: '[NOTES] Set active note',
        notesLoad: '[NOTES] Load notes',
        notesUpdated: '[NOTES] Updated note',
        notesFileUrl: '[NOTES] Updated image url',
        notesDelete: '[NOTES] Delete note',
        notesLogoutCleaning: '[NOTES] Logout note cleaning',
    }
    test('should checks correct types', () => {
        expect(types).toEqual(typesToCompare);
    });
    
});
