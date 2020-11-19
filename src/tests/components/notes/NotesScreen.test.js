import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store' //ES6 modules
import thunk from 'redux-thunk';
import '@testing-library/jest-dom';
import { activeNote } from '../../../actions/notes';
import { NoteScreen } from '../../../components/notes/NoteScreen';
const { mount } = require("enzyme");

jest.mock('../../../actions/notes', () => (
    {
        activeNote: jest.fn()
    }
));
const middlewares = [thunk]; // config store
const mockStore = configureStore(middlewares); // config store

const initState = { // inicia es estado del store que se necesita cuando se renderiza el componente
    auth: {
        uid: 123,
        name: 'benny'
    },
    ui: {
        loading: false,
        msgError: ''
    },
    notes: {
        active:    {
            id: 123, 
            date: 978098723, 
            title: 'title', 
            body: 'body',
            url: 'https://images'
        },
        notes: [
         
        ]
    }
};

let store  = mockStore(initState);
store.dispatch = jest.fn();

const wrapper = mount(
    <Provider store={ store }>
        <NoteScreen />
    </Provider>);

describe('Tests on NOtescreen', () => {
   test('should show correctly', () => {
       expect(wrapper).toMatchSnapshot();
   });

   test('should fire activeNote', () => {
       wrapper.find('input[name="title"]').simulate('change', {
           target: {
               name: 'title',
               value: 'Hola mundo'
           }
       });

       expect(activeNote).toHaveBeenCalled();//se puede usar toHaveLastcalledWith para ver con que se llamo al ultimo
       // por defecto cuando se inicio un componente de react se lanza todo oh se llama todo, lo que recuerdo es que
       // el use ref solo se ejecuta una vez
   });
   
    
});
