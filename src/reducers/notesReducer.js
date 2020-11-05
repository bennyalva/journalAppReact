import { types } from "../types/types"

const initalState = {
    notes: [],
    active: null
}
export const notesRducer = (state = initalState, action) => {
    switch (action.type) {
     case types.notesActive:
         return {
             ...state,
             active: {
                 ...action.payload
             }
         }
     case types.notesLoad:
         return {
             ...state,
             notes: [...action.payload]
         }
    case types.notesUpdated:
             console.log('note: ', action.payload.note)
             return {
              ...state,
              notes: state.notes.map(
                  note => note.id === action.payload.id
                  ? action.payload.note
                  : note
              )
             }
    case types.notesDelete:
             return {
                 ...state,
                 active: null,
                 notes: state.notes.filter(note => note.id !== action.payload)
             }
    case types.notesLogoutCleaning:
        return {
            ...state,
            active: null,
            notes: []
        }
    case types.notesAddNew: 
        return {
            ...state,
            notes: [ action.payload, ...state.notes ]
        }
    default:
            return state
    }
}