import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store' //ES6 modules
import thunk from 'redux-thunk';
import '@testing-library/jest-dom';
import { startLogout } from '../../../actions/auth';
import { startNewNote } from '../../../actions/notes';
const { mount } = require("enzyme");
const { Sidebar } = require("../../../components/journal/Sidebar");

jest.mock('../../../actions/auth', () => (
    {
        startLogout: jest.fn()
    }
));
jest.mock('../../../actions/notes', () => (
    {
        startNewNote: jest.fn()
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
        active: null,
        notes: [
            {
                id: 123, 
                date: 978098723, 
                title: 'title', 
                body: 'body',
                url: 'https://images'
            }
        ]
    }
};

let store  = mockStore(initState);
store.dispatch = jest.fn();

const wrapper = mount(
    <Provider store={ store }>
        <Sidebar />
    </Provider>)
describe('Test on Sidebar', () => {

   test('should show correctly', () => {
     expect(wrapper).toMatchSnapshot();     
   });
   test('should call logout', () => {
       console.log(wrapper.find('button').html())
       wrapper.find('button').prop('onClick')();
       expect(startLogout).toHaveBeenCalled();
   });
   test('should call startNewnote', () => {
       wrapper.find('.journal__new-entry').prop('onClick')();
       expect(startNewNote).toHaveBeenCalled()
   });
   
   
    
});
