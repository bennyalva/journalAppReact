import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store' //ES6 modules
import thunk from 'redux-thunk';
import '@testing-library/jest-dom';
import { JournalEntry } from '../../../components/journal/JournalEntry';
import { activeNote } from '../../../actions/notes';
const { mount } = require("enzyme");


const middlewares = [thunk]; // config store
const mockStore = configureStore(middlewares); // config store

const initState = { // inicia es estado del store que se necesita cuando se renderiza el componente

};

let store  = mockStore(initState);
store.dispatch = jest.fn();

const nota = {
    id: 10,
    date: 1,
    title: 'Hola',
    body: 'Mundo',
    url: 'https://fjasdk.com'
}
const wrapper = mount(
    <Provider store={ store }>
        <JournalEntry {...nota} />
    </Provider>);

describe('Tests on JournalEntry', () => {
    test('should show correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });

    test('should active noteActive', () => {
        wrapper.find('.journal__entry').prop('onClick')();
        // expect(store.dispatch).toHaveBeenCalled();
        expect(store.dispatch).toHaveBeenCalledWith(// para ver si se llamo un dispatch desde el store mock
            activeNote(nota.id, {...nota })
        );
    })
    
    
});
